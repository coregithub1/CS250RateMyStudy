# Test Cases: [Your First Name Last Initial]

**Team number:** [3]
**My area:** [Review saving, Review Ordering, Anonymous Submissions, and Rating Validation]


---

**Test ID: TC-AM-1**
**From Part 6:** New, REQ-AM-1
**Written by: Adam Mohamed**
**Title:** Reviews will always be persisted across sessions
**Traces to:** REQ-AM-1
**Test type:** Integration
**Preconditions:** The application must me connected to the supabase database
**Test data:** Rating 5/5, body will be testing database connection

**Steps:**
1. Start the developent server and go to localhost:3000
2. Submit a review with a rating and a body
3. Kill the server, reload the page, then restart the server to see if the review persisted

**Expected result:** The review will be saved in the database to be retrieved for every user
**Actual result:** The review is saved in the database to be retrieved by every user
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TC-AM-2
**From Part 6:** new, REQ-AM-2
**Written by:** Adam Mohamed
**Title:** Anonymous users can post reviews without an account
**Traces to:** REQ-AM-2
**Test type:** Acceptance
**Preconditions:** A first time user, supabase connection, and a started server
**Test data:** Rating 5/5, test a anonymous user insert

**Steps:**
1. Start the server and go to the localserver tab.
2. Try to post a review as a first time user
3. Reload to see if the comment persisted.

**Expected result:** A users review will be accepeted as the server will make an anonymous session for them
**Actual result:** A users review is accepeted without an account
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TC-AM-3
**From Part 6:** New, REQ-AM-3
**Written by:** Adam Mohamed
**Title:** Rejecting reviews outside of 1-5 inclusive
**Traces to:** REQ-AM-3
**Test type:**  Boundary
**Preconditions:** Supabase connection and a review to test
**Test data:** Ratings, 0, 3, 5, 10000 with bodys.

**Steps:**
1. Open the localhost tab after starting dev server
2. Submit a review from one of the prompts and check if it submits.
3. Then open a second review, open the development tools using inspect, update one of the option tags value to either 0 or 10000, and check if it submits.

**Expected result:** An error messaging indicating the value is not between 1-5 inclusive.
**Actual result:** An error messaging indicating the value is not between 1-5 inclusive.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TC-AM-4
**From Part 6:** New, REQ-4
**Written by:** Adam Mohamed
**Title:** Reviews will always be sorted in descending my timestamp
**Traces to:** REQ-4
**Test type:** System
**Preconditions:** Supabase connection and website ready
**Test data:** Review: 5/5, testing sorted comments x 2

**Steps:**
1. Start the development server and open the localhost tab
2. View dates on reviews, then post two comments to ensure newer is after the older one
3. Reload the page and see if it persisted

**Expected result:** Both comments appear from newest to oldest
**Actual result:** Both comments are newest to oldest
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---
