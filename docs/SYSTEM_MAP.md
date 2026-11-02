Team and roles
Team name: Lost&Founders
Inherited project: RateMyStudy
Each of the four members owns one part of the map. Everyone reads code. Nobody spectates.
Role
Owns
Specific task
Name
Product Analyst
Part 1 and the questions in Part 4
Runs the app, picks the user action, writes the purpose sentence, and collects the team’s three questions for the original team.
Joshua Groh
Architect
Part 2 and the mismatches in Part 4
Draws the as-built diagram from the code, then compares it to the handoff UML and records every mismatch.
Adam Mohamed
Frontend Tracer
Part 3, client side
Traces the action from the button click to the request leaving the client. Every row gets a file path.
Joshua Groh
Backend Tracer
Part 3, server side
Traces from the API route to the database and back to the response. Every row gets a file path.
Adam Mohamed

The two Tracers must meet at the same API endpoint. If your halves don’t connect, your trace is wrong.
Part 1: Purpose
In one sentence: what does this system do, and for whom? Be specific. "It's a web app for users" is not an answer.
This system lets us submit reviews for a single study spot that exists on campus so students know if a place is good/sucks. This is meant to SDSU students primarily, and secondarily for anyone who uses the campus as a place to study, SDSU student or not.
User action we will trace: (for example, "create an account" or "submit a post". It must touch the backend and the database.
The system lets an anonymous user submit a comment review to a study spot, with a rating from 1 to 5, so that other users can see their review listed among other reviews.
User action we will trace: User submitted a review. The user logs into the website, fills in a review, and submits it.

## Part 2: As-built architecture diagram
Draw boxes and arrows for every major component. Draw only what the code proves exists. Label each arrow with what travels along it (HTTP request, SQL query, event, file).
Include any of these that exist:
Client (web, mobile, CLI)
Server or API layer
Database or storage
External services and APIs
CI/CD pipeline and hosting
Insert diagram image here.



## Part 3: Trace the click
Follow your one user action from the button click to the database and back. Minimum five hops. Every row needs a real file path and function name. Add rows as needed.
Example (create a user profile). Rows 1 and 2 belong to the Frontend Tracer. Rows 3 to 7 belong to the Backend Tracer. They meet at POST /api/profiles.
Step
Layer
File and function
Data in / data out
Notes or surprises
1
Frontend
client/src/pages/CreateProfile.jsx → handleSave()
Form state → calls createProfile(data)
Photo uploads to image storage before Save
2
Frontend
client/src/api/profiles.js → createProfile()
Profile object → POST /api/profiles with JWT


3
API route
server/routes/profiles.js → router.post('/')
JSON body → passed to auth middleware


4
Middleware
server/middleware/auth.js → requireAuth()
JWT → req.user.id
Token expiry is never checked
5
Backend logic
server/controllers/profileController.js → createProfile()
Body + user id → validated profile
Bio length is not validated
6
Database
server/models/Profile.js → Profile.create()
Profile → INSERT INTO profiles, returns id
Interests saved as one comma-separated string
7
Response
profileController.js → res.status(201).json()
New profile → client redirects to /profile/:id







Your trace:
Step
Layer
File and function
Data in / data out
Notes or surprises
1
Frontend
app\page.js


Form state -> calls app/page.tsx/submitReview()


2
Frontend
app/page.js
GET reviews, study_spot FROM PostgreSQL Database -> app/page.js


3
API route
Semi. There is no file for this, but Supabase is a fully functional Backend-as-a-Service. The way it reads your queries and methods is that it first makes its own API, resolves the HTTP methods, and does everything in the background.
submitCommentFormBody -> page.js/submitReview()


4
Backend logic
app\page.js
Hidden! The only backend logic is done by Supabase. Best definition is: 
Spot_id validated as correct , user_id validated as a real user


5
Database
app\page.tsx.js -> submitReview()
Form fields → insert into Supabase DB


6
Response back
SUPABASE HIDES FORMAT BUT SUCCESS -> 200
app/page.js -> submitReview()
New comment -> refreshes comment list on app/page.js

## Part 4: Reality check and open questions

Open the handoff UML and compare it to your diagram. Circle every mismatch on your diagram.
What the handoff docs got wrong or left out:
Handoff UML shows classes that are not used; in the actual code, everything is within StudySpotPage

Three questions for the original team. For each, note whether it is about intent ("was this on purpose?") or design ("why is it built this way?").

Design: Are we supposed to make our own file upload system to Supabase storage? 

Design: Is the Supabase Storage read/writes setup for us to build into?

Intent: Does a user own a study spot? Are they registering a single spot to exist? If so, are we supposed to rewrite the current logic of what is shown as a study spot?


## Part 5: Candidate Requirements

| ID | Candidate requirement | Type | Source | Status | Acceptance criterion |
|---|---|---|---|---|---|
| CR-1 | The system shall allow verified users to create study spots | Functional | Handoff document states a user creates study spots but the current one is hard coded and the create option doesn’t exist yet | Unconfirmed | Give a valid user session, not anonymous, the capabilities of adding photos of a place and from their it creates the study spot |
| CR-2 | The system shall allow anonymous/verfied users the ability to submit reviews | Functional | page.js -> SubmitReview() | Confirmed | The form submission will upload to the database on a button click |
| CR-3 | The system shall force a character limit | Functional | Reviews table, column comment has a varchar max of 1000 | Confirmed | A user cannot bypass the 1000 character limit via frontend limits and as a extra check backend limits |
| CR-4 | The system will force an anonymous session when no user is found | Functional | page.js -> SubmitReview() | Confirmed | If no session is found, an anonymous session is always forced so a “user” always exist for the review creation |
| CR-5 | The system shall allow file uploads to Supabase Storage for image handling | Functional | Handoff document shows the table having image_url but no direct capability to actually using this by user access | Unconfirmed | If a non-anonymous user session exist, the user will be able to upload a file 1-2MB sized directly to Supabase storage where image_url will be the value that access that image inside of a bucket |

## Part 6: Unit test cases

| ID Requirement | Kind | Input | Expected Output | Predicted Result Today |
|---|---|---|---|---|
| TC1-CR-1 | Negative | {name : “”} | {error: “Name left blank”} | Pass |
| TC-2 CR-3 | Negative | {Comment : (longer than 1000 chars) | {error: “Comment longer than 1000 chars} | Pass |
| TC-2 CR-3 | Boundary, negative | {Comment : “”} | {error: “Comment left blank”} | Pass |
