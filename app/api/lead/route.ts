import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  city_or_zip: z.string().min(2),
  home_type: z.enum(["house", "condo", "apartment"]),
  beds: z.number().optional(),
  baths: z.number().optional(),
  frequency: z.enum(["one-time", "weekly", "bi-weekly", "monthly"]),
  condition: z.enum(["light", "normal", "heavy"]),
  message: z.string().optional(),
  consent: z.boolean(),
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
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    `City/ZIP: ${payload.city_or_zip}`,
    `Home type: ${payload.home_type}`,
    `Beds: ${payload.beds ?? "-"}`,
    `Baths: ${payload.baths ?? "-"}`,
    `Frequency: ${payload.frequency}`,
    `Condition: ${payload.condition}`,
    `Consent to text: ${payload.consent ? "Yes" : "No"}`,
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

  if (!payload.consent) {
    return NextResponse.json(
      { error: "Consent is required." },
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

  const confirmationHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0c1c1a;">
      <p>Hi ${payload.name},</p>
      <p>We got your request for a quote. Eva will ask a few quick questions and get back to you shortly.</p>
      <p>If you have any updates, just reply to this email.</p>
      <p>Thank you,<br/>Eva Home Cleaning</p>
    </div>
  `;

  try {
    const internalResult = await resend.emails.send({
      from: fromEmail,
      to: leadsTo,
      subject: `New cleaning lead: ${payload.name}`,
      html: internalHtml,
      reply_to: payload.email
    });

    if (internalResult.error) {
      console.error("Resend internal email error:", internalResult.error);
      return NextResponse.json(
        { error: "Unable to send email right now." },
        { status: 500 }
      );
    }

    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: payload.email,
      subject: "We got your quote request",
      html: confirmationHtml,
      reply_to: fromEmail
    });

    if (confirmationResult.error) {
      console.error("Resend confirmation email error:", confirmationResult.error);
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
