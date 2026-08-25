import type { NextRequest } from "next/server";
import { sendEmail } from "@/lib/resend";
import { formatTypeformResponse, verifyTypeformSignature } from "@/lib/typeform";
import type { TypeformResponse } from "@/lib/typeform";

export const dynamic = "force-dynamic";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: NextRequest) {
  const secret = process.env.TYPEFORM_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  if (!verifyTypeformSignature(rawBody, request.headers.get("typeform-signature"), secret)) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const payload = JSON.parse(rawBody) as { form_response?: TypeformResponse };
  if (!payload.form_response) {
    return Response.json({ success: false, error: "Missing form_response" }, { status: 400 });
  }

  const { title, fullName, email, phone, rows } = formatTypeformResponse(
    payload.form_response,
  );
  const notifyAddress =
    process.env.INQUIRY_NOTIFICATION_EMAIL || "meetyouonthetracks@gmail.com";

  const rowsHtml = rows
    .map(
      (row) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#555;white-space:nowrap;vertical-align:top;">${escapeHtml(row.question)}</td><td style="padding:6px 0;">${escapeHtml(row.value)}</td></tr>`,
    )
    .join("");

  await sendEmail({
    to: notifyAddress,
    ...(email ? { replyTo: email } : {}),
    subject: `${title}${fullName ? ` — ${fullName}` : ""}`,
    html: `<h2>${escapeHtml(title)}</h2><table>${rowsHtml}</table>`,
    text: rows.map((row) => `${row.question}: ${row.value}`).join("\n"),
  });

  return Response.json({
    success: true,
    form: title,
    contact: { fullName, email, phone },
  });
}
