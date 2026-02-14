import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().email().optional()
  ),
  city_or_zip: z.string().min(2),
  message: z.string().optional(),
  company: z.string().optional()
});

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitWindowMs = 15 * 60 * 1000;
const rateLimitMax = 5;
const rateLimitStore = new Map<string, RateLimitEntry>();

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "hello@evahomecleaning.com";
const leadsTo = process.env.LEADS_TO || "hello@evahomecleaning.com";

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  if (entry.count >= rateLimitMax) {
    return true;
  }
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

function isLikelyBot(payload: z.infer<typeof leadSchema>) {
  if (payload.company && payload.company.trim().length > 0) {
    return true;
  }
  const message = payload.message || "";
  if (/https?:\/\//i.test(message) || /www\./i.test(message)) {
    return true;
  }
  return false;
}

function leadSummary(payload: z.infer<typeof leadSchema>) {
  return [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email?.trim() || "-"}`,
    `City/ZIP: ${payload.city_or_zip}`,
    `Message: ${payload.message?.trim() || "-"}`,
    "Note: Future: forward to Clawdbot / CRM"
  ].join("\n");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.LEADS_TO) {
    return NextResponse.json(
      { error: "Server email configuration missing." },
      { status: 500 }
    );
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let payload: z.infer<typeof leadSchema>;
  try {
    payload = leadSchema.parse(await request.json());
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid form submission." },
      { status: 400 }
    );
  }

  if (isLikelyBot(payload)) {
    return NextResponse.json(
      { error: "Submission rejected." },
      { status: 400 }
    );
  }

  const internalText = leadSummary(payload);
  const internalHtml = internalText
    .split("\n")
    .map((line) => `<p style=\"margin:0 0 8px\">${line}</p>`)
    .join("");

  try {
    const internalResult = await resend.emails.send({
      from: fromEmail,
      to: leadsTo,
      subject: `New cleaning lead: ${payload.name}`,
      html: internalHtml,
      reply_to: fromEmail
    });

    if (internalResult.error) {
      console.error("Resend internal email error:", internalResult.error);
      return NextResponse.json(
        { error: "Unable to send email right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend unexpected error:", error);
    return NextResponse.json(
      { error: "Unable to send email right now." },
      { status: 500 }
    );
  }
}
