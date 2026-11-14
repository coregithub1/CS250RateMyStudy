# Testable Requirements: [Project Name]

**Team number:** [XX]
**Inherited from:** Team [XX]

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| [Rs] | [Adam] | [AM] |
| | | |
| | | |
| | | |

<!--
RULES
- Only edit YOUR OWN section below. This keeps merge conflicts away.
- Categories: G = Stakeholder Goal, REQ = Functional, NFR = Non-Functional.
- "From Part 5": write the original CR ID and its text from SYSTEM_MAP.md. Write "New" if you added it this sprint.
- Status: Confirmed or Suspected bug. No Unconfirmed allowed. Every Suspected bug needs a GitHub Issue.
- The test: could a stranger write a Pass or Fail test without asking you a question?
-->

---

## Section: Review saving, Review Ordering, Anonymous Submissions, and Rating Validation, ([Adam Mohamed])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-AM-01 | SDSU Students | Any user will be allowed to see persisted reviews of study spots around the SDSU campus to help them mke decisions on where to study.|

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-AM-1 | The system shall allow all reviews to be persisted across sessions using Supabase so any refreshes, new tabs, and other users will always see the correct information.| Confirmed | CR2 |
| REQ-AM-2 | The system shall allow users with no exisiting account be able to submit reviews anonymously on any study spot. This will be done by creating an anonymous session for them.| Confirmed |CR-4: System will allow users/anonymous users the ability to submit reviews |
| REQ-AM-3 | The system shall reject any rating that isnt betwee 1 and 5 inclusive, including when values are manipulated using DevTools | Confirmed | New |
| REQ-AM-4 | The system shall display reviews in a newest-to-oldest fashion, ensuring the newest ones are always at the top, | Confirmed | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-AM-1 | The UI will display an error message when it detects a rating outside the given range | Confirmed | New |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
