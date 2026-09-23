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

## Requirement Traceability

## REQ-1: Display a study spot picture
- The system displays a picture of the selected study spot
- When a user opens the Love Library page, a picture of Love Library will be displayed

## REQ-3: Submit a rating and a comment
- The system allows users to rate the study spot 1-5 stars and are able to write comments
- After the user submits a rating and comment, it will be visible to the public after it is refreshed
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
