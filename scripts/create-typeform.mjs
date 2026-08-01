import { readFile } from "node:fs/promises";

const token = process.env.TYPEFORM_ACCESS_TOKEN;
if (!token) throw new Error("Set TYPEFORM_ACCESS_TOKEN before running this script.");

const definitionFile = process.argv[2] || "rosey-baby-catering.json";
if (!/^[a-z0-9-]+\.json$/i.test(definitionFile)) throw new Error("Pass a JSON filename from the typeform directory.");
const definition = JSON.parse(await readFile(new URL(`../typeform/${definitionFile}`, import.meta.url), "utf8"));
const response = await fetch("https://api.typeform.com/forms", {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify(definition),
});
const result = await response.json();
if (!response.ok) throw new Error(`Typeform API ${response.status}: ${JSON.stringify(result)}`);
console.log(JSON.stringify({ id: result.id, title: result.title, formUrl: result._links?.display }, null, 2));
