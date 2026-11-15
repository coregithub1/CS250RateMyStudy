# Test Cases: [Joshua G]

**Team number:** [3]
**My area:** User Submissions (Comments)


---

**Test ID:** TC-1
**From Part 6:** New
**Written by:** Joshua Groh
**Title:** Comments will persist for other users
**Traces to:** REQ-JG-03, G-JG-01
**Test type:** Acceptance
**Preconditions:** Comment has been posted, site is reloaded and user enters as a new anonymous user
**Test data:** Comment "hi"

**Steps:**
1. Leave a comment "hi"
2. Reload the site
3. Check if comment is still there

**Expected result:** Comment stays
**Actual result:** Comment stays
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TC-2
**From Part 6:** CR-3
**Written by:** Joshua Groh
**Title:** Empty Comment
**Traces to:** REQ-JG-02
**Test type:** Negative
**Preconditions:** Site is running and user is successfully loaded in as anonymous user
**Test data:** ""

**Steps:**
1. Open Site
2. Write an empty comment with no characters
3. Submit empty comment

**Expected result:** ERROR: Comment has no characters, comment not posted
**Actual result:** Pop-up asking field to be filled out appears, comment is not posted
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TC-3
**From Part 6:** TC-2 CR-3
**Written by:** Joshua Groh
**Title:** Comment exactly 1001 characters
**Traces to:** REQ-JG-01
**Test type:** Boundary
**Preconditions:** Site is running and user is successfully loaded in as anonymous user
**Test data:** "this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a comment that is exactly 1001 characters long this is a " 

**Steps:**
1. Load into website
2. Type in the comment that is exactly 1001 characters
3. Attempt to submit

**Expected result:** ERROR: Comment is > 1000 characters, comment not posted
**Actual result:** Comment box stops allowing text once 1000 characters is reached
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** TC-4
**From Part 6:** New
**Written by:** Joshua Groh
**Title:** Comment limit of One for Anonymous Users
**Traces to:** REQ-JG-04
**Test type:** Security
**Preconditions:** User has loaded in to the site and posted one comment
**Test data:** Comment "hi", 2nd comment "hello"

**Steps:**
1. Load into site
2. Post first comment
3. Attempt to post second comment

**Expected result:** 2nd comment is blocked
**Actual result:** 2nd comment was posted successfully
**Status:** Fail
**Severity:** Minor
**V or V:** Verification
**GitHub Issue:** https://github.com/coregithub1/CS250RateMyStudy/issues/80

---
