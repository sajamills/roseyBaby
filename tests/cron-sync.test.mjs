import assert from "node:assert/strict";
import test, { mock } from "node:test";

// Loads the real route handler (with native TS + the "@/" alias resolved by
// tests/helpers/register-alias-loader.mjs, registered via --import in
// package.json's test script) so this exercises production code, not a copy.
// The two sync sources are mocked so the test doesn't depend on live
// third-party APIs; Sanity write env vars are left unset so the route's
// syncStatus-write branch is skipped rather than needing a real dataset.

mock.module("@/lib/sports-sync", {
  exports: {
    syncHailStateSports: async () => ({ synced: 3, removed: 1 }),
  },
});
mock.module("@/lib/community-events-sync", {
  exports: {
    syncStarkvilleMainStreetEvents: async () => ({ synced: 5, removed: 0 }),
  },
});

const { GET } = await import("../app/api/cron/sync-sports/route.ts");

const endpoint = "http://localhost/api/cron/sync-sports";

test("event cron rejects requests without a valid bearer token", async () => {
  process.env.CRON_SECRET = "test-secret";
  const unauthenticated = await GET(new Request(endpoint));
  assert.equal(unauthenticated.status, 401);

  const wrongToken = await GET(
    new Request(endpoint, { headers: { authorization: "Bearer nope" } }),
  );
  assert.equal(wrongToken.status, 401);
});

test("event cron authenticated success path syncs both sources and returns 200", async () => {
  process.env.CRON_SECRET = "test-secret";
  delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  delete process.env.SANITY_API_WRITE_TOKEN;

  const response = await GET(
    new Request(endpoint, {
      headers: { authorization: "Bearer test-secret" },
    }),
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.success, true);
  assert.equal(body.partial, false);
  assert.equal(body.sports.synced, 3);
  assert.equal(body.community.synced, 5);
  assert.ok(body.completedAt);
});
