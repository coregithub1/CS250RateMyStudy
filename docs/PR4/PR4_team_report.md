# Team Members
- Adam Mohamed
- Joshua Groh
- Hyejoo Lee
- Julio Miyazaqui

# Bug Triage Table
| Test Name | Bucket | Issue Link | Severity | Priority | Owner | Status |
|---|---|---|---|---|---|---|
| Supabase works with no environment variables passed | Code Bug | https://github.com/coregithub1/CS250RateMyStudy/issues/84 | Medium | Medium | Adam | Fixed |
| Invisible characters can be submitted | Code Bug | https://github.com/coregithub1/CS250RateMyStudy/issues/85 | Low | Medium | Adam | Fixed |
| Comment Limit of 2 | Code Bug | https://github.com/coregithub1/CS250RateMyStudy/issues/80 | Low | Low | Joshua | Fixed |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

# Regression Log
### A fix broke CI without me noticing - Adam Mohamed
This is extremely developer error. Im so used to type notation that I tried to add a string type check without realizing this is javascript.
The fix is simple, I removed the type check so JS would stop throwing ReferenceError, which is weird because it worked in dev but not that CI.
Issue is https://github.com/coregithub1/CS250RateMyStudy/issues/88

# Final Test Run
Failing tests were written by previous team, no actual issues remaining

# Feature Decision
### User story
As a user, I want the functionality of making reviews as a real user and applying my own username and account to a single review for online presence. 
### Why
This improves the entirety of the application as reviews can be updated, removed, and you can see peoples account history for other reviews they might've made.

### Who owns which part
Joshua: Review updates, being able to remove reviews

### Tests
1. TC-1 | A user can register a account | The user will be able to register for an account,recieve a generated username
2. TC-2 | Every user will have their own profile page | The user will be able to visit a /u/[slug] page where they can see someone page and reviews

# Board Snapshot
included in screenshots

# Sprint Summary
We had difficulty finding bugs for this project, which is very small in scope. As a result, the fixes were not too difficult to implement and were done fast. 