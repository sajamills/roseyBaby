export async function sendEmail({
  to,
  replyTo,
  subject,
  html,
  text,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_ACCESS_TOKEN;
  if (!apiKey) throw new Error("RESEND_ACCESS_TOKEN is not configured.");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_ADDRESS || "Rosey Baby <onboarding@resend.dev>",
      to: [to],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API ${response.status}: ${body}`);
  }

  return response.json() as Promise<{ id: string }>;
}
