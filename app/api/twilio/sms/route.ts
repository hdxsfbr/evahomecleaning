import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateRequest } from "twilio";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "hello@evahomecleaning.com";
const leadsTo = process.env.LEADS_TO || "hello@evahomecleaning.com";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY || !process.env.FROM_EMAIL || !process.env.LEADS_TO) {
    return new NextResponse("Email configuration missing", { status: 500 });
  }
  if (!process.env.TWILIO_AUTH_TOKEN) {
    return new NextResponse("Twilio configuration missing", { status: 500 });
  }

  const rawBody = await request.text();
  const params = new URLSearchParams(rawBody);
  const from = String(params.get("From") || "");
  const to = String(params.get("To") || "");
  const body = String(params.get("Body") || "");

  const signature = request.headers.get("x-twilio-signature") || "";
  const url = request.url;
  const paramObject: Record<string, string> = {};
  params.forEach((value, key) => {
    paramObject[key] = value;
  });

  const isValid = validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    signature,
    url,
    paramObject
  );

  if (!isValid) {
    return new NextResponse("Invalid signature", { status: 403 });
  }

  const timestamp = new Date().toISOString();
  const extraFields = [
    "MessageSid",
    "SmsSid",
    "AccountSid",
    "NumMedia",
    "FromCity",
    "FromState",
    "FromZip",
    "FromCountry"
  ]
    .map((key) => {
      const value = params.get(key);
      return value ? `${key}: ${value}` : null;
    })
    .filter(Boolean)
    .join("\n");

  const safeMessage = escapeHtml(body || "-").replace(/\n/g, "<br/>");
  const safeExtra = extraFields ? escapeHtml(extraFields).replace(/\n/g, "<br/>") : "";

  const html = [
    `<p><strong>From:</strong> ${escapeHtml(from || "-")}</p>`,
    `<p><strong>To:</strong> ${escapeHtml(to || "-")}</p>`,
    `<p><strong>Received:</strong> ${timestamp}</p>`,
    `<p><strong>Message:</strong><br/>${safeMessage}</p>`,
    safeExtra ? `<p><strong>Twilio:</strong><br/>${safeExtra}</p>` : ""
  ].join("");

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: leadsTo,
      subject: `New SMS lead from ${from || "Unknown"}`,
      html
    });

    if (result.error) {
      console.error("Resend SMS email error:", result.error);
      return new NextResponse("Email send failed", { status: 500 });
    }
  } catch (error) {
    console.error("Resend SMS unexpected error:", error);
    return new NextResponse("Email send failed", { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}
