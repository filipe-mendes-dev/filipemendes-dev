# CV writing guidelines

## Purpose and scope

Use these guidelines when writing or reviewing CV and resume summaries, experience bullets, personal-project entries and stack lines. They apply to the frontend and full-stack variants in `src/data/site/cv/cv.data.ts` and experience content in `src/data/site/experience.data.ts` when it appears in the CV.

Write for a recruiter who has 15 seconds to recognize relevant qualifications, while keeping every claim accurate enough for an engineering interview. Balance recruiter readability, relevant ATS keywords and technical accuracy.

The primary goal is to give a recruiter a credible reason to start a conversation. Show recognizable skills through concrete contributions, useful product capabilities and ownership. Leave detailed implementation explanations for the linked project page or interview.

## 1. Communicate what, how and why

Each bullet should identify the contribution, the method and its purpose. The sentence structure can vary, but all three elements should be identifiable.

| Element | Question | Example |
| --- | --- | --- |
| What | What did you build or accomplish? | Patient management interfaces |
| How | Which technologies or methods did you use? | React, TypeScript and GraphQL |
| Why | What purpose did it serve? | Support healthcare workflows |

Example: Built React and TypeScript interfaces for patient management and prescriptions, integrating GraphQL APIs to support healthcare workflows.

## 2. Explain the capability before the implementation

A non-technical recruiter should understand the contribution without knowing how the technology works. Include implementation details when they explain an important engineering decision or a concrete benefit.

- Avoid: Implemented a state-based timer system with a 1Hz update cycle ensuring predictable execution under runtime constraints.
- Prefer: Built a configurable workout timer supporting custom routines, intervals and execution tracking.

Technical precision remains useful when its purpose is clear. For example, explain that synchronization prevents duplicate match events before describing transaction receipts or operation IDs.

## 3. Include 2–4 relevant keywords naturally

Aim for approximately three meaningful keywords per bullet, usually within a range of two to four. Select terms relevant to the target role and, when available, the target job description.

Relevant terms can include:

- Technologies such as React, TypeScript, Next.js, GraphQL and Redux.
- Engineering concepts such as state management, REST APIs and responsive design.
- Practices such as testing, code reviews, accessibility and CI/CD.
- Collaboration with designers, backend engineers and QA.

Each keyword should explain the contribution or how it was accomplished. Do not force unrelated technologies into one sentence to increase keyword density. Use the stack line for additional relevant tools that do not need space in a bullet.

### Select keywords by relevance

The user's examples, including Next.js, TypeScript, React, PostgreSQL, SQL, VPS, CI/CD, GitHub Actions and Docker, illustrate relevant keywords. They are not an exhaustive list or a fixed ranking. Consider other technologies, engineering capabilities, practices and collaboration terms supported by the work.

| Focus | Examples to consider |
| --- | --- |
| Frontend and mobile | React, Next.js, TypeScript, React Native, responsive design, accessibility and state management |
| Backend and data | PostgreSQL / Postgres, SQL, REST APIs, authentication, relational databases and transactions |
| Infrastructure and delivery | VPS, Linux, Docker, Nginx, CI/CD and GitHub Actions |
| Quality and engineering practices | Automated testing, integration testing, Jest, Playwright, code reviews and Git |
| Product capabilities | PWA, offline support, local persistence, API integration and cross-platform delivery |

Choose terms based on the target role, the contribution's relevance and the evidence available. Prefer keywords a recruiter can connect to a useful capability. Do not add every example or claim a technology merely because it is listed here. PostgreSQL names the database; SQL describes relevant query, schema or migration work. Use both only where the contribution supports them.

Specialized tools such as Mantine, Dexie, Serwist, Better Auth and Certbot can appear in a bullet when they explain a relevant or distinctive contribution. Otherwise, keep them in the stack line or project page. Keep valuable capabilities such as offline PWA behavior and self-managed deployment visible, even when their supporting libraries are omitted from a bullet.

Tailor priorities to the target role or job description when one is supplied. Evaluate keyword coverage across the complete entry and keep each bullet readable on its own.

## 4. Keep one primary capability per bullet

Each bullet should communicate one coherent achievement or engineering capability. Related activities can share a bullet, such as feature development and API integration.

Keep separate capabilities distinct. For example, UI implementation, deployment infrastructure and CI/CD should not become one long inventory. Combining testing with AI-assisted development also needs a specific shared purpose to make sense.

## 5. Use simple, direct language

Use recognizable terms and concrete actions. Start with verbs such as Built, Developed, Designed, Implemented, Integrated, Improved, Collaborated, Tested, Deployed or Owned.

| Avoid | Prefer |
| --- | --- |
| API-driven workflows | Integrated REST or GraphQL APIs |
| UI primitives | Reusable UI components |
| Data-dense interfaces | Complex dashboards |
| Multi-surface architecture | Web application |
| Runtime constraints | The specific performance problem |
| Leveraged synergies | Collaborated |
| Facilitated implementation | Built or implemented |

Avoid unsupported adjectives such as robust, cutting-edge, innovative, seamless and state-of-the-art.

## 6. Explain the purpose

Describe why the contribution mattered, rather than listing responsibilities or tools. The purpose may be a supported workflow, a user capability or a specific engineering benefit.

- Weak: Integrated REST APIs supporting authentication, pagination and error handling.
- Better: Integrated REST APIs for authentication, transactions and error handling to support secure mobile banking features.

Avoid generic endings such as "improving efficiency" unless they describe a credible consequence. Do not invent impact to complete the sentence.

## 7. Distribute keywords across the entry

The context sentence should establish the product, contribution, main technologies and relevant scale. Subsequent bullets should expand on distinct capabilities.

Do not repeat React, TypeScript or another established technology in every bullet. Use later bullets to cover relevant APIs, UI architecture, state management, testing, delivery or collaboration. Some repetition is useful, but it should be intentional.

## 8. Demonstrate ownership and collaboration

Show responsibility beyond implementing assigned interfaces when there is evidence for it. Relevant examples include owning feature delivery, collaborating with designers and backend engineers, building reusable components, improving existing systems, mentoring developers and participating in production releases.

For independent projects, emphasize product decisions, implementation ownership and delivery. Do not invent collaborators or imply team leadership where the work was individual.

## 9. Use evidence and meaningful metrics

Metrics are optional. Include verified scale, usage, downloads or release platforms when they provide useful context. Do not invent percentages, performance improvements, user counts or dates.

Only include claims that can be explained and defended in an interview. Distinguish implemented behavior from plans and automated delivery steps from manual releases.

## 10. Prioritize relevance and readability

- Put the capabilities most relevant to the CV variant first.
- Keep each bullet concise, ideally one or two lines in the rendered CV.
- Avoid repeating information already established in the context.
- Prefer recognizable technologies and concrete achievements.
- Do not dedicate space to tools used only briefly.
- Review wrapping and printed page breaks after increasing the copy length.

## Entry structure

For professional experience, use one context sentence and approximately three to five bullets, depending on the role's significance and duration. A useful order is core feature development and API integration, frontend architecture or state management, collaboration or ownership, then testing or delivery.

For personal projects, explain what the product does and expand on relevant technical decisions, independent ownership and delivery. Choose the order and number of bullets to suit the project and CV variant.

The structure is guidance, not a requirement to add a bullet for every category. Keep less relevant technologies in the stack line or linked project page.

## Review checklist

Before accepting a bullet, check:

1. What: Is the contribution immediately understandable?
2. How: Are the relevant technologies or methods identified?
3. Why: Is the purpose or benefit clear?
4. Keywords: Does it naturally contain roughly 2–4 relevant terms?
5. Focus: Does it communicate one coherent capability?
6. Accuracy: Is every claim supported and defensible?
7. Relevance: Does it demonstrate suitability for the target role?
8. Interest: Does it give a recruiter a concrete reason to start a conversation?

Review the complete entry for repetition, ownership, keyword coverage and page length. Keyword quantity alone is not the measure of a strong bullet.
