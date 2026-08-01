# Untappd for Business integration

The beer wall is ready to consume a published Untappd for Business menu. The public Untappd API does not provide venue tap lists, so this requires an Untappd for Business Premium account.

Required server-side environment variables:

```text
UNTAPPD_BUSINESS_EMAIL=
UNTAPPD_BUSINESS_API_TOKEN=
UNTAPPD_BUSINESS_MENU_ENDPOINT=
```

Use the primary Untappd for Business user’s read-only API token. The account email and token are Basic-auth encoded only on the server and are never exposed to the browser. Set the exact menu endpoint from the account’s Untappd for Business API documentation; it may require the Location ID, Menu ID, or Section ID shown in the business dashboard.

The page refreshes the live menu every five minutes. If the feed is unavailable or not configured, the page displays evergreen beer-style content instead of an error.
