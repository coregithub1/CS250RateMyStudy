Instructions
You are not fixing anything today. You are reading. Your team will map the inherited system as it actually exists, not as the handoff docs say it exists.
Time: 40 minutes.
Goal: Trace one user action end to end and draw the as-built architecture.
Submit: Commit this map to your repo as docs/SYSTEM_MAP.md with the diagram as an image and submit a photo of the paper version.
Rule: Every claim needs proof in the code. "Probably somewhere in utils" does not count.
AI use: AI may explain unfamiliar syntax. The diagram and trace must come from your own reading of the code.
Time
Phase
0 to 5 min
Pick one user action that touches the backend and database
5 to 15 min
Draw the architecture diagram
15 to 30 min
Tracers trace their halves. Analyst and Architect start Part 4.
30 to 35 min
Cross-check: each person explains one section they did not write to a teammate.
35 to 40 min
Clean up and submit

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

Part 2: As-built architecture diagram
Draw boxes and arrows for every major component. Draw only what the code proves exists. Label each arrow with what travels along it (HTTP request, SQL query, event, file).
Include any of these that exist:
Client (web, mobile, CLI)
Server or API layer
Database or storage
External services and APIs
CI/CD pipeline and hosting
Insert diagram image here.



Part 3: Trace the click
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

Part 4: Reality check and open questions
Open the handoff UML and compare it to your diagram. Circle every mismatch on your diagram.
What the handoff docs got wrong or left out:
Handoff UML shows classes that are not used; in the actual code, everything is within StudySpotPage

Three questions for the original team. For each, note whether it is about intent ("was this on purpose?") or design ("why is it built this way?").

Design: Are we supposed to make our own file upload system to Supabase storage? 

Design: Is the Supabase Storage read/writes setup for us to build into?

Intent: Does a user own a study spot? Are they registering a single spot to exist? If so, are we supposed to rewrite the current logic of what is shown as a study spot?
