# RateMyStudy

RateMyStudy helps SDSU students find study spots and share their experiences through ratings and comments.

## Team

- Sidharth Nair
- Karan Hooda
- Nhan Nguyen
- Hamza Akbari

## Current Walking Skeleton

The current version has one study spot page for Love Library:

- **REQ-1:** Display a picture of the study spot.
- **REQ-3:** Submit a rating from 1–5 and a written comment.
- Display saved reviews retrieved from Supabase.
- Keep reviews available after refreshing the page.
- Show loading, validation, and error messages.

Search, rankings, and availability are planned for later sprints.

## Tech Stack

- **Frontend:** Next.js, React, JavaScript/JSX, and CSS
- **Backend and database:** Supabase
- **Authentication:** Supabase anonymous sign-ins
- **Testing:** Playwright
- **Continuous integration:** GitHub Actions

## Run Locally

Install Node.js 22 LTS or newer, then clone the repository:

```bash
git clone https://github.com/coregithub1/CS250RateMyStudy.git
cd CS250RateMyStudy
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process (allows to you bypass powershell script execution restrictions temprarily)
npm ci
npm run dev
```
