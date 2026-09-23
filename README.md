# CS250RateMyStudy
# Project group
# Nhan Nguyen
# Sidharth Nair
# Hamza Akbari
# Karan Hooda

## Walking skeleton: Next.js frontend

This sprint implements one study spot page for **REQ-1 (picture)** and
**REQ-3 (rating and comment)**. It uses JavaScript, Next.js App Router, plain
CSS, and Supabase. There is no search, ranking, availability, or directions UI.

### Run on your laptop

Use Node.js 22 LTS. Open a terminal in the project folder:

```sh
npm ci
```

Copy `.env.example` to `.env.local` (Windows PowerShell):

```powershell
Copy-Item .env.example .env.local
```

On macOS/Linux, use `cp .env.example .env.local` instead.

Fill in `.env.local` using the team's Supabase project URL and publishable key.
An older project's public **anon** key also works. Never use a service-role or
secret key in this frontend. Keep `NEXT_PUBLIC_BASE_PATH` empty locally.
Restart the development server after changing environment variables.

```sh
npm run dev
```

Open http://localhost:3000. Without configured Supabase values, the page shows
setup instructions; it does not pretend reviews have been saved locally.

### Backend teammate: one-time setup

1. In your team's Supabase project SQL editor, run
   `supabase/migrations/20260923000000_study_spots_and_reviews.sql` once.
   It creates `study_spots` and `reviews`, permissions and row-level security,
   and one Love Library record. If these tables already exist in the remote
   project, reconcile the schema with your teammate before running it.
2. Enable **anonymous sign-ins** in Supabase Auth settings. This creates an
   authenticated guest ID without requiring a login screen. It does not verify
   that a visitor is an SDSU student. The local CLI configuration also enables
   this option, but that does not change your hosted project automatically.
3. Share the project URL and public publishable key with the frontend developer.
4. Verify the image URL in `study_spots`. The seed references a real, credited
   Wikimedia photo. Its download could not be verified in the development
   environment. You may replace it with your own campus photo hosted in
   Supabase Storage. Update the caption/credit in `app/page.js` if you replace it.

The browser reads the spot and reviews through the Supabase client. On submit,
it establishes a guest session if needed, inserts the review with that user's
ID, and displays the row returned by Supabase. Reloading retrieves database
rows again. Reviews are publicly readable; only authenticated users can insert
reviews under their own user ID. Editing and deletion are not implemented.

### Files to understand

| File | Purpose |
| --- | --- |
| `app/page.js` | Picture, review form, validation, loading/error states, saved reviews |
| `app/globals.css` | Basic responsive layout |
| `app/layout.js` | Shared document and title |
| `lib/supabase.js` | Creates the browser Supabase client |
| `.env.example` | Names of the required local configuration values |
| `supabase/migrations/20260923000000_study_spots_and_reviews.sql` | Suggested backend schema and permissions |
| `tests/study-spot.spec.js` | Automated frontend requirement checks |
| `.github/workflows/ci.yml` | Runs tests and checks a static build on every PR |

### Tests and acceptance checks

```sh
npx playwright install chromium
npm test
npm run build
```

Automated Playwright checks cover REQ-1 image rendering and REQ-3 submission,
retrieval after refresh, invalid input, failed saves, and a failed initial load.
They mock Supabase responses and use an image fixture. They do **not** validate
a real database, its policies, or the live image host. No real credentials are
required for these tests, including on pull requests from forks.

Before demonstrating the walking skeleton, test against the real project:

1. Load the page; confirm the actual Love Library photo appears (REQ-1).
2. Select 4/5 and enter a distinctive comment; submit (REQ-3).
3. Confirm the success message and that the rating/comment appear.
4. Refresh; confirm the same review remains. Open a second browser and confirm
   it can also read the review. Check the row in Supabase's table editor.
5. Try a blank comment; no review should be inserted.

Local verification for this handoff: the Next.js static production build passed.
Real Supabase verification needs your team's project configuration. The browser tests could not run here because the Chromium download failed;
all five stopped at browser launch, before their assertions. Run them locally
or through the included pull-request workflow.

### GitHub Pages limitation

GitHub Pages serves the static files produced in `out/`; it cannot run a Next.js
server. This project uses `output: 'export'` and calls Supabase from the browser,
so it does not require Next.js API routes or server actions. Configure your
team's Pages build with these values **before** running `npm run build`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_BASE_PATH=/CS250RateMyStudy`

Use the actual repository name if it differs, or leave the base path empty for
a site hosted at the domain root. Publish `out/` using your team's Pages
workflow. The included CI workflow only tests/builds; it does not deploy.
The CI build uses no real Supabase configuration and is not a deployment artifact.

References: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports),
[Supabase anonymous Auth](https://supabase.com/docs/guides/auth/auth-anonymous),
[Supabase row-level security](https://supabase.com/docs/guides/database/postgres/row-level-security).

### Copy into your existing clone and open a PR

Copy the extracted project files into your laptop's existing repository folder.
The handoff ZIP excludes `.git`, `.env.local`, dependencies, and generated files.
Keep your laptop's existing `.git` folder. Include the new `.github` folder and
`.env.example` when copying. Then, from your existing clone:

```sh
git switch -c karan/frontend-skeleton
git status
git add app lib tests .github .env.example .gitignore next.config.mjs playwright.config.js package.json package-lock.json README.md supabase/config.toml supabase/migrations
git commit -m "Add Next.js walking skeleton for REQ-1 and REQ-3"
git push -u origin karan/frontend-skeleton
```

Use a different branch name if that one already exists. Review `git status` so
only intended changes go into your commit. On GitHub, open a pull request to
`main` and ask a teammate to review and approve it. The team still needs Issues
for every REQ, project-board entries, and its RAD/wireframe deliverables.

### Image credit

The seed image is [LoveLibrarySDSUByPhilKonstantin.jpg](https://commons.wikimedia.org/wiki/File:LoveLibrarySDSUByPhilKonstantin.jpg)
by **Phil Konstantin**, licensed under
[CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
It is displayed with a CSS crop. The photograph retains its own license.
