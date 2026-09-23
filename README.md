
## Table of Contents

- [Project Group](#project-group)
  - [Nhan Nguyen](#nhan-nguyen)
  - [Sidharth Nair](#sidharth-nair)
  - [Hamza Akbari](#hamza-akbari)
  - [Karan Hooda](#karan-hooda)
- [Walking Skeleton: Next.js Frontend](#walking-skeleton-nextjs-frontend)
  - [Run on Your Laptop](#run-on-your-laptop)
  - [Backend Teammate: One-Time Setup](#backend-teammate-one-time-setup)
  - [Files to Understand](#files-to-understand)
  - [Tests and Acceptance Checks](#tests-and-acceptance-checks)
  - [GitHub Pages Limitation](#github-pages-limitation)
  - [Copy Into Your Existing Clone and Open a PR](#copy-into-your-existing-clone-and-open-a-pr)
  - [Image Credit](#image-credit)


## Walking Skeleton: Next.js Frontend

This sprint implements one study spot page for **REQ-1 (picture)** and **REQ-3 (rating and comment)**.

It uses JavaScript, Next.js App Router, plain CSS, and Supabase. There is no search, ranking, availability, or directions UI.

### Run on Your Laptop

Use Node.js 22 LTS. Open a terminal in the project folder:

```bash
npm ci
```

Copy `.env.example` to `.env.local`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

On macOS/Linux:

```bash
cp .env.example .env.local
```

Fill in `.env.local` using the team's Supabase project URL and publishable key. An older project's public **anon** key also works.

Never use a service-role or secret key in this frontend.

Keep `NEXT_PUBLIC_BASE_PATH` empty when running locally. Restart the development server after changing environment variables.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without configured Supabase values, the page shows setup instructions. It does not pretend reviews have been saved locally.

### Backend Teammate: One-Time Setup

1. In the team's Supabase project SQL editor, run this migration once:

   ```text
   supabase/migrations/20260923000000_study_spots_and_reviews.sql
   ```

   It creates the `study_spots` and `reviews` tables, permissions, row-level security, and one Love Library record. If these tables already exist in the remote project, reconcile the schema with your teammate before running the migration.

2. Enable **anonymous sign-ins** in Supabase Auth settings.

   This creates an authenticated guest ID without requiring a login screen. It does not verify that a visitor is an SDSU student.

   The local CLI configuration also enables this option, but that does not automatically change the hosted Supabase project.

3. Share the project URL and public publishable key with the frontend developer.

4. Verify the image URL in `study_spots`.

   The seed references a real, credited Wikimedia photo. Its download could not be verified in the development environment. You may replace it with your own campus photo hosted in Supabase Storage. Update the caption and credit in `app/page.js` if you replace it.

The browser reads the study spot and reviews through the Supabase client.

When a user submits a review, the application establishes a guest session if needed, inserts the review with that user's ID, and displays the row returned by Supabase.

Reloading the page retrieves the database rows again.

Reviews are publicly readable. Only authenticated users can insert reviews under their own user ID.

Editing and deletion are not implemented.

### Files to Understand

| File | Purpose |
|---|---|
| `app/page.js` | Picture, review form, validation, loading/error states, and saved reviews |
| `app/globals.css` | Basic responsive layout |
| `app/layout.js` | Shared document and page title |
| `lib/supabase.js` | Creates the browser Supabase client |
| `.env.example` | Names of the required local configuration values |
| `supabase/migrations/20260923000000_study_spots_and_reviews.sql` | Suggested backend schema and permissions |
| `tests/study-spot.spec.js` | Automated frontend requirement checks |
| `.github/workflows/ci.yml` | Runs tests and checks a static build on every pull request |

### Tests and Acceptance Checks

Install the Playwright browser:

```bash
npx playwright install chromium
```

Run the automated tests:

```bash
npm test
```

Run the production build:

```bash
npm run build
```

Automated Playwright checks cover:

- REQ-1 image rendering
- REQ-3 review submission
- Review retrieval after refresh
- Invalid input
- Failed saves
- Failed initial loads

The tests mock Supabase responses and use an image fixture.

They do not validate a real database, its policies, or the live image host. No real credentials are required for these tests, including pull requests from forks.

Before demonstrating the walking skeleton, test against the real Supabase project:

1. Load the page and confirm that the actual Love Library photo appears.
2. Select a rating of 4 or 5 and enter a distinctive comment.
3. Submit the review.
4. Confirm that the success message appears and the rating/comment are displayed.
5. Refresh the page and confirm that the same review remains.
6. Open a second browser and confirm that it can also read the review.
7. Check the review row in Supabase's table editor.
8. Try submitting a blank comment and confirm that no review is inserted.

Local verification for this handoff:

- The Next.js static production build passed.
- Real Supabase verification requires the team's project configuration.
- The browser tests could not run in the development environment because the Chromium download failed. All five tests stopped at browser launch before their assertions.

Run the tests locally or through the included pull-request workflow.

### GitHub Pages Limitation

GitHub Pages serves the static files produced in `out/`. It cannot run a Next.js server.

This project uses:

```javascript
output: 'export'
```

It calls Supabase directly from the browser, so it does not require Next.js API routes or server actions.

Configure the team's GitHub Pages build with these environment variables before running `npm run build`:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_BASE_PATH=/CS250RateMyStudy
```

Use the actual repository name if it differs.

Leave `NEXT_PUBLIC_BASE_PATH` empty for a site hosted at the domain root.

Publish the generated `out/` folder using the team's GitHub Pages workflow.

The included CI workflow only tests and builds the project. It does not deploy the site.

The CI build uses no real Supabase configuration and is not a deployment artifact.

References:

- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [Supabase Anonymous Auth](https://supabase.com/docs/guides/auth/auth-anonymous)
- [Supabase Row-Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)

### Copy Into Your Existing Clone and Open a PR

Copy the extracted project files into your laptop's existing repository folder.

The handoff ZIP excludes:

- `.git`
- `.env.local`
- Dependencies
- Generated files

Keep your laptop's existing `.git` folder.

Include the new `.github` folder and `.env.example` when copying.

From your existing clone, run:

```bash
git switch -c karan/frontend-skeleton
git status
git add app lib tests .github .env.example .gitignore next.config.mjs playwright.config.js package.json package-lock.json README.md supabase/config.toml supabase/migrations
git commit -m "Add Next.js walking skeleton for REQ-1 and REQ-3"
git push -u origin karan/frontend-skeleton
```

Use a different branch name if `karan/frontend-skeleton` already exists.

Review `git status` so only the intended changes are included in the commit.

On GitHub, open a pull request to `main` and ask a teammate to review and approve it.

The team still needs:

- Issues for every requirement
- Project-board entries
- RAD deliverables
- Wireframe deliverables

### Image Credit


It is licensed under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).

The image is displayed with a CSS crop. The photograph retains its original license.
