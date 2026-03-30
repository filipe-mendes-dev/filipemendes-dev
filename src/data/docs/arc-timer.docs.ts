import type { Doc } from "./docs.interfaces";

const arcTimerProjectSlug = "arc-timer";
const arcTimerProjectName = "Arc Timer";
const lastUpdatedLabel = "Last updated · March 2026";

export const arcTimerReleasePolicy: Doc = {
  slug: "arc-timer-release-policy",
  order: 1,
  projectSlug: arcTimerProjectSlug,
  projectName: arcTimerProjectName,
  featured: true,
  title: "Arc Timer Release Policy",
  summary:
    "Operational release policy covering build readiness, store submissions, rollout discipline, and post-release monitoring for Arc Timer.",
  lastUpdatedLabel,
  sections: [
    {
      id: "scope-and-owners",
      title: "Scope and Owners",
      content: [
        {
          kind: "paragraph",
          text: "This policy applies to every production release of Arc Timer, including feature releases, bug-fix submissions, metadata-only store updates, and urgent hotfixes. It exists to keep the app reliable during live workouts, where timing regressions have an immediate user impact.",
        },
        {
          kind: "list",
          items: [
            "Engineering owns build integrity, versioning, timing accuracy validation, and production configuration checks.",
            "Product owns release scope, changelog accuracy, and go-live timing.",
            "QA owns regression validation across session setup, active workout execution, pause and resume, and session completion.",
            "The release owner must confirm that the submitted binary and store metadata match the approved candidate before rollout starts.",
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
          text: "Arc Timer releases should be treated as reliability releases, even when the visible change set is small. No build should be submitted until the release candidate has been validated on the flows that users depend on while exercising without constant screen interaction.",
        },
        {
          kind: "list",
          items: [
            "The candidate must come from the approved production revision and use a unique version and build number.",
            "Session start, interval transitions, rest periods, completion state, and cancel flows must be validated on the release build.",
            "Audio and haptic cues must be checked on supported devices with sound enabled and disabled.",
            "Background behavior, interruption recovery, and screen lock handling must be verified for the release candidate.",
            "Critical and high-severity defects that affect workout trust, timing accuracy, or session continuity must be resolved before submission.",
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
          text: "Publishing should favor controlled rollout whenever the platform allows it. Arc Timer is a utility app, so regressions are more damaging to trust than delayed rollout speed.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Prepare store metadata, screenshots, and release notes so they reflect the actual release behavior.",
            "Verify the submitted binary matches the tested build identifier and approved release scope.",
            "Submit for review and use phased rollout when available for medium- or high-risk releases.",
            "Monitor crash signals, timing-related feedback, and store review messages during the initial rollout window.",
            "Expand rollout only after the early monitoring window shows no material regression in timing, stability, or session completion.",
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
          text: "A release is not complete when the app becomes available in the store. The team must confirm that the shipped build behaves correctly in production and that support signals do not indicate timing drift, missing cues, or session-state failures.",
        },
        {
          kind: "list",
          items: [
            "Review crash trends, session completion telemetry, and user-reported workout interruptions after release.",
            "Track store reviews and support messages for reports about inaccurate intervals, missing feedback cues, or broken background behavior.",
            "Document any rollback, hotfix, or support advisory triggered during the release window.",
            "Update this policy when a release exposes a recurring operational gap or a new release control becomes standard practice.",
          ],
        },
      ],
    },
  ],
};

export const arcTimerPrivacyAndPermissionsPolicy: Doc = {
  slug: "arc-timer-privacy-and-permissions-policy",
  order: 2,
  projectSlug: arcTimerProjectSlug,
  projectName: arcTimerProjectName,
  title: "Arc Timer Privacy and Permissions Policy",
  summary:
    "Policy for handling user data, device permissions, and disclosure updates in a workout timer product built around low-friction usage.",
  lastUpdatedLabel,
  sections: [
    {
      id: "data-minimization",
      title: "Data Minimization",
      content: [
        {
          kind: "paragraph",
          text: "Arc Timer should collect the minimum information required to operate the product and improve reliability. The app is a focused timer experience, so data collection should never drift into broad behavioral tracking without clear product justification and explicit policy review.",
        },
        {
          kind: "list",
          items: [
            "Collect only the data needed to support core workout timing, diagnostics, and clearly defined product improvements.",
            "Do not introduce new analytics events or identifiers without reviewing their retention, purpose, and user-facing disclosure impact.",
            "Avoid storing sensitive workout context unless it is necessary for a user-facing feature and documented in release planning.",
          ],
        },
      ],
    },
    {
      id: "permissions-and-device-access",
      title: "Permissions and Device Access",
      content: [
        {
          kind: "paragraph",
          text: "Any permission prompt must be justified by a direct product need and explained in plain language. Permission requests should appear only when the related functionality is about to be used, not preemptively during onboarding.",
        },
        {
          kind: "list",
          items: [
            "Audio, haptic, notification, or background-related capabilities must align with the actual user experience delivered by the app.",
            "If a permission is optional, the app must remain usable in a degraded but understandable state when the user declines it.",
            "Explanatory copy for permission prompts must describe the user benefit instead of relying on generic technical wording.",
            "Any new permission or expanded device access requires a policy review before release sign-off.",
          ],
        },
      ],
    },
    {
      id: "disclosures-and-change-control",
      title: "Disclosures and Change Control",
      content: [
        {
          kind: "paragraph",
          text: "Store disclosures, privacy text, and support-facing explanations must stay aligned with the shipped app behavior. Changes that affect data handling or permission usage should be treated as release-gating items rather than documentation follow-up.",
        },
        {
          kind: "list",
          items: [
            "Update privacy disclosures before shipping changes to analytics, diagnostics, or permission-backed features.",
            "Review store listing text and in-app explanations whenever permission behavior changes.",
            "Brief support and product owners on any behavior that users may interpret as increased data collection or expanded background activity.",
            "Block release approval if shipped behavior and public disclosures are materially inconsistent.",
          ],
        },
      ],
    },
  ],
};
