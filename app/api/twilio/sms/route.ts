import { NextResponse } from "next/server";
import { Resend } from "resend";

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

  const formData = await request.formData();
  const from = String(formData.get("From") || "");
  const to = String(formData.get("To") || "");
  const body = String(formData.get("Body") || "");

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
      const value = formData.get(key);
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

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(
    "Thanks for texting Eva Home Cleaning! We received your message and will reply shortly."
  )}</Message>
</Response>`;

  return new NextResponse(twiml, {
    status: 200,
    headers: {
      "Content-Type": "text/xml"
    }
  });
}
