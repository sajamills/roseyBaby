// Resolves this project's "@/*" tsconfig path alias (see tsconfig.json) so
// tests can import route/lib modules directly with native TypeScript
// type-stripping, without pulling in the Next.js bundler.
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";

const root = new URL("../../", import.meta.url);
const candidateExtensions = ["", ".ts", ".tsx", "/index.ts"];

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const base = new URL(specifier.slice(2), root);
      for (const extension of candidateExtensions) {
        const candidate = new URL(`${base.href}${extension}`);
        if (existsSync(fileURLToPath(candidate))) {
          return nextResolve(candidate.href, context);
        }
      }
    }
    return nextResolve(specifier, context);
  },
});
