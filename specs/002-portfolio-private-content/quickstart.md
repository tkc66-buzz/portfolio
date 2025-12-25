# Quickstart: Private content via Google Sheets (POST token) + 24h cache

## Goal

Keep Experience/Projects in Google Sheets (Drive) while keeping the GitHub repo public.
The site loads **private overrides server-side** via a token-protected JSON endpoint,
and caches responses for 24 hours by default.

## 1) Create Google Sheet (template)

Create a new spreadsheet with two sheets:

### Sheet: `experience`

Header row:

- `year`
- `text`

Example rows:

- `2024` | `バックエンド開発（Go）。運用改善と開発体験の両立に取り組む`

### Sheet: `projects`

Header row:

- `visibility` (`public` or `private`; optional, defaults to `public`)
- `title`
- `summary` (optional; ignored when `visibility=private`)
- `role` (optional; ignored when `visibility=private`)
- `tech` (comma-separated; optional; ignored when `visibility=private`)
- `outcomeOrLearning` (optional; ignored when `visibility=private`)
- `status` (optional)
- `linkLabel` (optional; ignored when `visibility=private`)
- `linkHref` (optional; ignored when `visibility=private`)

## 2) Create Apps Script Web App (POST body token protected JSON)

In the Spreadsheet: **Extensions → Apps Script**.

Set Script Properties:

- `BEARER_TOKEN`: random long string (do not commit)

Implement `doPost(e)`:

- Read JSON body: `{ "token": "<secret>" }`
- Compare against Script Property `BEARER_TOKEN`
- (Optional) Also accept `Authorization: Bearer <token>` as a best-effort fallback
- Read the spreadsheet
- Return JSON shaped as `Partial<Portfolio>` (only overrides you need), e.g.:
  - `experience: { heading, highlights }`
  - `projects: { heading, items }`

Deploy:

- Deploy → New deployment → Web app
- Execute as: **Me**
- Who has access: **Anyone** (Bearer gate protects it)

Copy the Web App URL.

### IMPORTANT: After editing Code.gs, redeploy

If you change `Code.gs`, you MUST redeploy (edit deployment or create a new deployment),
otherwise the Web App may keep serving an older version (e.g., GET-only / no doPost).

## 3) Configure Vercel env vars

Set:

- `PORTFOLIO_PRIVATE_SOURCE=url`
- `PORTFOLIO_PRIVATE_URL=<your web app url>`
- `PORTFOLIO_PRIVATE_URL_BEARER=<your bearer token>`
- `PORTFOLIO_PRIVATE_REVALIDATE_SECONDS=86400`

## 4) Verify behavior

1. Open the site and confirm Experience/Projects reflect sheet values.
2. Change a sheet row and confirm it **does not** update immediately (cache).
3. To force fast iteration temporarily, set:
   - `PORTFOLIO_PRIVATE_REVALIDATE_SECONDS=0`

### Quick API test (local)

```bash
curl -i -L -H "Content-Type: application/json" \
  -d '{"token":"<your bearer token>"}' \
  "<your apps script web app url>"
```

If you still see HTML or `405 Allow: GET, HEAD`, the deployment is not updated or the URL is not
the Web App URL.
