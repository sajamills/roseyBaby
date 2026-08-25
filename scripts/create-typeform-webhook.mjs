import { randomBytes } from "node:crypto";

const token = process.env.TYPEFORM_ACCESS_TOKEN;
if (!token) throw new Error("Set TYPEFORM_ACCESS_TOKEN before running this script.");

const formId = process.argv[2];
if (!formId) throw new Error("Usage: node scripts/create-typeform-webhook.mjs <form_id> [site_url]");

const siteUrl = (process.argv[3] || "https://www.roseybaby.com").replace(/\/$/, "");
const secret = process.env.TYPEFORM_WEBHOOK_SECRET || randomBytes(24).toString("hex");

const response = await fetch(
  `https://api.typeform.com/forms/${formId}/webhooks/rosey-baby-notify`,
  {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      url: `${siteUrl}/api/typeform-webhook`,
      enabled: true,
      secret,
    }),
  },
);
const result = await response.json();
if (!response.ok) throw new Error(`Typeform API ${response.status}: ${JSON.stringify(result)}`);

console.log(JSON.stringify({ formId, webhookUrl: result.url, enabled: result.enabled }, null, 2));
if (!process.env.TYPEFORM_WEBHOOK_SECRET) {
  console.log(
    `\nGenerated secret (save this as TYPEFORM_WEBHOOK_SECRET in Vercel — Typeform will not show it again):\n${secret}`,
  );
}
