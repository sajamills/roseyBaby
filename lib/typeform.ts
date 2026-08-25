import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyTypeformSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
) {
  if (!signatureHeader) return false;
  const expected =
    "sha256=" + createHmac("sha256", secret).update(rawBody).digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader);
  return a.length === b.length && timingSafeEqual(a, b);
}

type TypeformField = { id: string; ref?: string; title: string; type: string };
type TypeformAnswer = {
  field: { id: string; ref?: string; type: string };
  type: string;
  text?: string;
  email?: string;
  phone_number?: string;
  number?: number;
  boolean?: boolean;
  date?: string;
  url?: string;
  choice?: { label: string };
  choices?: { labels: string[] };
};
export type TypeformResponse = {
  form_id: string;
  submitted_at: string;
  definition: { title: string; fields: TypeformField[] };
  answers: TypeformAnswer[];
};

function answerValue(answer: TypeformAnswer): string {
  switch (answer.type) {
    case "text":
    case "email":
    case "phone_number":
    case "url":
      return String(
        answer.text ?? answer.email ?? answer.phone_number ?? answer.url ?? "",
      );
    case "number":
      return String(answer.number ?? "");
    case "boolean":
      return answer.boolean ? "Yes" : "No";
    case "date":
      return answer.date ?? "";
    case "choice":
      return answer.choice?.label ?? "";
    case "choices":
      return answer.choices?.labels?.join(", ") ?? "";
    default:
      return "";
  }
}

export function formatTypeformResponse(formResponse: TypeformResponse) {
  const titleByFieldId = new Map(
    formResponse.definition.fields.map((field) => [field.id, field.title]),
  );
  const rows = formResponse.answers
    .map((answer) => ({
      question: titleByFieldId.get(answer.field.id) || answer.field.ref || "Question",
      value: answerValue(answer),
    }))
    .filter((row) => row.value);

  const byRef = (ref: string) => {
    const field = formResponse.definition.fields.find((f) => f.ref === ref);
    if (!field) return undefined;
    const answer = formResponse.answers.find((a) => a.field.id === field.id);
    return answer ? answerValue(answer) : undefined;
  };

  return {
    title: formResponse.definition.title,
    submittedAt: formResponse.submitted_at,
    fullName: byRef("full_name"),
    email: byRef("email"),
    phone: byRef("phone"),
    rows,
  };
}
