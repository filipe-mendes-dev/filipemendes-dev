import type { ProjectDocsContent } from "../projects.interfaces";
import { project } from "./project.data";

export const projectDocs: ProjectDocsContent = {
  description:
    "Development-only docs used to validate featured docs, docs project pages and general docs UI behavior.",
  order: 999,
  documents: [
    {
      slug: "demo-docs-release-checklist",
      order: 2,
      projectSlug: project.slug,
      featured: true,
      title: "Release Checklist",
      summary:
        "Pre-flight release checklist covering QA sign-off, rollout readiness, observability checks and handoff expectations.",
      lastUpdatedLabel: "Last updated · March 2026",
      sections: [
        {
          id: "owner-alignment",
          title: "Owner Alignment",
          content: [
            {
              kind: "paragraph",
              text: "Every release needs an explicit owner before the final candidate is approved. That owner is responsible for driving the checklist to completion and resolving any missing approvals before the build is submitted.",
            },
            {
              kind: "list",
              items: [
                "Confirm engineering, QA and product owners for the release window.",
                "Record the final build number, version label and branch or tag reference.",
                "Verify that release notes and store text match the actual scope.",
              ],
            },
          ],
        },
        {
          id: "go-live-readiness",
          title: "Go-live Readiness",
          content: [
            {
              kind: "paragraph",
              text: "The final release candidate should be treated as a production artifact. Critical telemetry, authentication flows and support-facing messaging must be reviewed before rollout starts.",
            },
            {
              kind: "list",
              items: [
                "Validate production configuration and release flags.",
                "Check crash reporting, analytics and alert routing.",
                "Prepare rollout, monitoring and rollback owners.",
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "demo-docs-support-runbook",
      order: 3,
      projectSlug: project.slug,
      title: "Support Runbook",
      summary:
        "Operational support notes for triage, escalation and customer-impact assessment during production incidents.",
      lastUpdatedLabel: "Last updated · March 2026",
      sections: [
        {
          id: "incident-triage",
          title: "Incident Triage",
          content: [
            {
              kind: "paragraph",
              text: "Incoming production issues should be classified quickly so the team can decide whether the problem is a release regression, an environment issue, or a support-handled customer case.",
            },
            {
              kind: "list",
              items: [
                "Capture user impact, affected platform, app version and approximate first-seen time.",
                "Check whether the issue is reproducible on the current production build.",
                "Escalate security- or payment-sensitive incidents immediately.",
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "demo-docs-localization-guide",
      order: 4,
      projectSlug: project.slug,
      title: "Localization Guide",
      summary:
        "Reference notes for translation review, locale QA and release-safe handling of localized content changes.",
      lastUpdatedLabel: "Last updated · March 2026",
      sections: [
        {
          id: "translation-review",
          title: "Translation Review",
          content: [
            {
              kind: "paragraph",
              text: "Localized copy updates should go through the same review discipline as product text in the source language. Translation correctness, truncation and regulated terminology need to be checked before release.",
            },
            {
              kind: "list",
              items: [
                "Check key screens for truncation and label overflow.",
                "Review regulated or trust-sensitive wording with the product owner.",
                "Confirm store screenshots and metadata still reflect the targeted locales.",
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "demo-docs-incident-notes-template",
      order: 5,
      projectSlug: project.slug,
      featured: true,
      title: "Incident Notes Template",
      summary:
        "A lightweight structure for documenting production incidents, mitigations and follow-up actions after release events.",
      lastUpdatedLabel: "Last updated · March 2026",
      sections: [
        {
          id: "template-structure",
          title: "Template Structure",
          content: [
            {
              kind: "paragraph",
              text: "Incident notes should be concise but complete enough to support follow-up analysis. The goal is to preserve timeline, impact, decisions and unresolved gaps in one place.",
            },
            {
              kind: "list",
              ordered: true,
              items: [
                "Summarize the issue and the affected customer scope.",
                "Capture detection time, mitigation steps and final resolution.",
                "Document release relevance, support impact and next actions.",
              ],
            },
          ],
        },
      ],
    },
    {
      slug: "demo-docs-standalone-operations-memo",
      order: 999,
      projectSlug: project.slug,
      featured: true,
      title: "Standalone Operations Memo",
      summary:
        "A demo document used to validate docs UI behavior with low-risk reference content inside the docs sandbox project.",
      lastUpdatedLabel: "Last updated · April 2026",
      sections: [
        {
          id: "purpose",
          title: "Purpose",
          content: [
            {
              kind: "paragraph",
              text: "This document exists as a low-risk reference entry so the docs experience can be tested with development-only content that remains isolated from real project documentation.",
            },
            {
              kind: "list",
              items: [
                "Validate featured docs behavior inside the demo docs project.",
                "Exercise docs project listings with development-only content.",
                "Keep one low-risk fixture for future docs UI testing.",
              ],
            },
          ],
        },
        {
          id: "notes",
          title: "Notes",
          content: [
            {
              kind: "paragraph",
              text: "If demo docs stop being useful, this entire project module can be removed without affecting production portfolio content.",
            },
          ],
        },
      ],
    },
  ],
};
