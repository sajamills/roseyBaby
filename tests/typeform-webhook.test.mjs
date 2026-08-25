import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test, { mock } from "node:test";
import { formatTypeformResponse, verifyTypeformSignature } from "../lib/typeform.ts";

test("verifyTypeformSignature accepts a correctly signed body and rejects everything else", () => {
  const secret = "test-secret";
  const body = JSON.stringify({ hello: "world" });
  const signature =
    "sha256=" + createHmac("sha256", secret).update(body).digest("base64");

  assert.equal(verifyTypeformSignature(body, signature, secret), true);
  assert.equal(verifyTypeformSignature(body, signature, "wrong-secret"), false);
  assert.equal(verifyTypeformSignature(body, "sha256=not-it", secret), false);
  assert.equal(verifyTypeformSignature(body, null, secret), false);
  assert.equal(verifyTypeformSignature("tampered body", signature, secret), false);
});

test("formatTypeformResponse maps answers back to their question titles", () => {
  const formResponse = {
    form_id: "abc123",
    submitted_at: "2026-08-25T12:00:00Z",
    definition: {
      title: "Rosey Baby Catering Inquiry",
      fields: [
        { id: "f1", ref: "full_name", title: "What is your full name?", type: "short_text" },
        { id: "f2", ref: "email", title: "What is your email address?", type: "email" },
        { id: "f3", ref: "guest_count", title: "How many guests?", type: "number" },
        { id: "f4", ref: "venue_confirmed", title: "Is the venue confirmed?", type: "yes_no" },
      ],
    },
    answers: [
      { field: { id: "f1", type: "text" }, type: "text", text: "Jane Doe" },
      { field: { id: "f2", type: "email" }, type: "email", email: "jane@example.com" },
      { field: { id: "f3", type: "number" }, type: "number", number: 50 },
      { field: { id: "f4", type: "boolean" }, type: "boolean", boolean: true },
    ],
  };

  const result = formatTypeformResponse(formResponse);
  assert.equal(result.title, "Rosey Baby Catering Inquiry");
  assert.equal(result.fullName, "Jane Doe");
  assert.equal(result.email, "jane@example.com");
  assert.deepEqual(
    result.rows.find((row) => row.question === "How many guests?"),
    { question: "How many guests?", value: "50" },
  );
  assert.deepEqual(
    result.rows.find((row) => row.question === "Is the venue confirmed?"),
    { question: "Is the venue confirmed?", value: "Yes" },
  );
});

mock.module("@/lib/resend", {
  exports: { sendEmail: async () => ({ id: "test-email-id" }) },
});

const { POST } = await import("../app/api/typeform-webhook/route.ts");

test("typeform webhook rejects requests with a missing or invalid signature", async () => {
  process.env.TYPEFORM_WEBHOOK_SECRET = "test-secret";
  const unauthenticated = await POST(
    new Request("http://localhost/api/typeform-webhook", {
      method: "POST",
      body: "{}",
    }),
  );
  assert.equal(unauthenticated.status, 401);

  const wrongSignature = await POST(
    new Request("http://localhost/api/typeform-webhook", {
      method: "POST",
      headers: { "typeform-signature": "sha256=nope" },
      body: "{}",
    }),
  );
  assert.equal(wrongSignature.status, 401);
});

test("typeform webhook accepts a correctly signed submission and emails the summary", async () => {
  process.env.TYPEFORM_WEBHOOK_SECRET = "test-secret";
  const body = JSON.stringify({
    form_response: {
      form_id: "abc123",
      submitted_at: "2026-08-25T12:00:00Z",
      definition: {
        title: "Rosey Baby Catering Inquiry",
        fields: [
          { id: "f1", ref: "full_name", title: "What is your full name?", type: "short_text" },
        ],
      },
      answers: [{ field: { id: "f1", type: "text" }, type: "text", text: "Jane Doe" }],
    },
  });
  const signature =
    "sha256=" + createHmac("sha256", "test-secret").update(body).digest("base64");

  const response = await POST(
    new Request("http://localhost/api/typeform-webhook", {
      method: "POST",
      headers: { "typeform-signature": signature },
      body,
    }),
  );

  assert.equal(response.status, 200);
  const json = await response.json();
  assert.equal(json.success, true);
  assert.equal(json.contact.fullName, "Jane Doe");
});
