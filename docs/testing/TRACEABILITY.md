# Traceability Matrix

**Team number:** [3]
**Filled in by (captain):** [Adam & Josh]

Fill this in **after** everyone's work is merged. One row per requirement.

## Requirements to Tests

| Requirement ID | From Part 5 | Owner | Test case IDs | Result | GitHub Issue # |
|---|---|---|---|---|---|
| REQ-AM-1 | CR-2 | Adam Mohamed | AM-1 | Pass | N/A |
| REQ-AM-2 | CR-4 | Adam Mohamed | AM-2 | Pass | N/A |
| REQ-AM-3 | New | Adam Mohamed | AM-3 | Pass | N/A |
| REQ-AM-4 | New | Adam Mohamed | AM-4 | Pass | N/A |
| REQ-JG-01 | CR-3 | Joshua Groh | TC-JG-01 | Pass | N/A |
| REQ-JG-02 | New | Joshua Groh | TC-JG-02 | Pass | N/A |
| REQ-JG-03 | New | Joshua Groh | TC-JG-03 | Pass | N/A |
| REQ-JG-04 | New | Joshua Groh | TC-JG-04 | Fail | #80 |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |
| | | | | | |

## Gaps

List any requirement with no test, any test with no requirement, and any Part 5 requirement or Part 6 test that nobody brought over. Write "None" if there are none.
### As of Nov 15th midnight

- **CR-1**: The current code only displays a hardcoded study spot with a hardcoded image, nothing was actually inserted by users just yet besides reviews.

- **CR-5**: The current code shows that the database tabel holds a column for study_spots image urls which would point to url in a supabase bucket but its not possible in this current architecture as the buckets are not setup.

- **Test cases**: 1 of part 6 test cases where not brought while the other 2 where.

## Test Type Coverage

Put a Test ID next to each type. Team minimum: all 7.

| Test type | Test ID |
|---|---|
| Unit | |
| Integration | TC-AM-1 |
| System (E2E) | TC-AM-4 |
| Acceptance | TC-JG-01 |
| Boundary Value | TC-JG-03 |
| Negative | TC-JG-02 |
| Security | TC-JG-04 |

## Validation Findings

A Validation finding means the system does what the requirement says, but the requirement does not serve the Stakeholder Goal. Remember the alphabetical leaderboard.

| Requirement ID | Goal it fails | Why | Issue # |
|---|---|---|---|
| | | | |

**If you found none,** explain in 2 to 3 sentences why every requirement truly serves its Goal:

>

## Summary

| | Count |
|---|---|
| Part 5 requirements carried over | 3 |
| New requirements added | 5 |
| Part 6 tests upgraded (out of 3) | 2 |
| Total requirements | |
| Total test cases | 8 |
| Passed | 7 |
| Failed | 1 |
| Issues opened | 1 |
| Critical issues | 0 |

**In one sentence, would you ship this system today? Why or why not?**
No, it's not flushed out to be completely usable by indivisuals.
>
