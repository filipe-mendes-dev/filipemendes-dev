import type { ProjectDocsContent } from "../projects.interfaces";
import { project } from "./project.data";

const lastUpdatedLabel = "Last updated · March 2026";

export const projectDocs: ProjectDocsContent = {
  description:
    "Operational notes, publishing policies, and delivery references for the Nearsoft mobile work.",
  order: 2,
  documents: [
    {
      slug: "app-publishing-policy",
      order: 1,
      projectSlug: project.slug,
      featured: true,
      title: "App Publishing Policy",
      summary:
        "Release policy covering submission readiness, store metadata, compliance checks, rollout discipline, and post-release follow-up for mobile app publishing.",
      lastUpdatedLabel,
      sections: [
        {
          id: "scope-and-ownership",
          title: "Scope and Ownership",
          content: [
            {
              kind: "paragraph",
              text: "This policy applies to every production submission prepared for the mobile banking apps across the App Store and Google Play. It covers new releases, urgent hotfixes, and store listing changes that materially affect customer-facing information.",
            },
            {
              kind: "paragraph",
              text: "A release owner must be assigned before the publishing cycle starts. That owner is responsible for coordinating engineering, QA, product, design, and compliance inputs, and for confirming that the final store submission matches the approved build and metadata.",
            },
            {
              kind: "list",
              items: [
                "Engineering owns build integrity, versioning, signing, and release notes accuracy.",
                "QA owns regression coverage, release validation, and device-level confidence for the selected build.",
                "Product owns go-live timing, customer-facing messaging, and business approval for release scope.",
                "Compliance or legal stakeholders must review policy-sensitive wording, privacy declarations, and regulated disclosures before submission.",
              ],
            },
          ],
        },
        {
          id: "release-readiness",
          title: "Release Readiness",
          content: [
            {
              kind: "paragraph",
              text: "No build should be submitted until the release candidate has passed the agreed validation checklist. Publishing is treated as the final operational step, not as a replacement for unresolved release preparation.",
            },
            {
              kind: "list",
              items: [
                "The release candidate must come from the tagged production branch or equivalent approved revision.",
                "Version number and build number must be unique, internally tracked, and reflected in release notes.",
                "Critical and high-severity defects must be resolved or explicitly waived by product and engineering leadership.",
                "Authentication, onboarding, payment-adjacent flows, notifications, analytics, and crash reporting must be verified on the release candidate.",
                "Environment configuration must be checked to confirm production endpoints, feature flags, and store-specific identifiers are correct.",
              ],
            },
          ],
        },
        {
          id: "store-metadata-and-assets",
          title: "Store Metadata and Assets",
          content: [
            {
              kind: "paragraph",
              text: "Store content should be prepared with the same discipline as the binary itself. Every submission must include current screenshots, accurate feature copy, and release notes that describe meaningful user-facing changes without exaggeration.",
            },
            {
              kind: "list",
              items: [
                "App title, subtitle, short description, and full description must match the current product positioning and approved naming.",
                "Screenshots must represent the current visual experience on supported devices and locales.",
                "Release notes should be concise, truthful, and aligned with what changed in the submitted build.",
                "Support URL, privacy policy URL, and contact details must remain valid and publicly reachable.",
                "Store badges, promotional copy, and preview assets should not mention features hidden behind disabled flags or pending approvals.",
              ],
            },
          ],
        },
        {
          id: "compliance-and-privacy",
          title: "Compliance and Privacy",
          content: [
            {
              kind: "paragraph",
              text: "Because the product domain includes sensitive customer expectations, compliance checks must be completed before the submission window. Teams should assume that privacy disclosures, permissions, and identity-related flows will receive closer scrutiny during review.",
            },
            {
              kind: "list",
              items: [
                "Privacy labels and data safety declarations must reflect the current implementation of analytics, authentication, diagnostics, and third-party services.",
                "Permission prompts must be justified by in-app behavior and supported by clear user-facing explanations.",
                "Any change affecting personal data collection, retention, or sharing requires review before release sign-off.",
                "If a release changes account recovery, identity verification, or security-sensitive settings, support and operational teams must be briefed before submission.",
              ],
            },
          ],
        },
        {
          id: "submission-and-rollout",
          title: "Submission and Rollout",
          content: [
            {
              kind: "paragraph",
              text: "Publishing should follow a controlled rollout path whenever the platform allows it. Immediate full distribution should be reserved for low-risk updates or time-critical fixes that have already been validated against operational risk.",
            },
            {
              kind: "list",
              ordered: true,
              items: [
                "Prepare the approved binary, store metadata, and release notes in the publishing console.",
                "Complete the final review with the release owner and verify that the selected build identifiers match the approved candidate.",
                "Submit for review or release to staged rollout according to platform and release risk.",
                "Monitor review feedback, approval status, crash signals, and customer support inputs during the first release window.",
                "Expand the rollout only after the initial monitoring window shows no material regression or compliance concern.",
              ],
            },
          ],
        },
        {
          id: "post-release-follow-up",
          title: "Post-release Follow-up",
          content: [
            {
              kind: "paragraph",
              text: "A release is not complete at the moment of store approval. The team should confirm distribution health, production telemetry, and customer-facing stability before closing the publishing cycle.",
            },
            {
              kind: "list",
              items: [
                "Review crash-free session trends, sign-in success, payment-related telemetry, and major navigation funnels after release.",
                "Track store review messages, rejection notes, and customer support tickets for issues tied to the new build.",
                "Document any incident, rollback, or submission correction required during the release window.",
                "Update this policy when a release exposes a recurring operational gap or a new store requirement becomes part of the standard process.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
