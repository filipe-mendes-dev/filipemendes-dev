import type { ProjectDocsContent } from "../projects.interfaces";
import { project } from "./project.data";

const lastUpdatedLabel = "Last updated · March 2026";

export const projectDocs: ProjectDocsContent = {
  description:
    "Release, privacy and operational policy documentation for the Arc Timer mobile app.",
  order: 1,
  documents: [
    {
      slug: "arc-timer-privacy-and-permissions-policy",
      order: 2,
      projectSlug: project.slug,
      title: "Arc Timer Privacy and Permissions Policy",
      summary:
        "Policy for handling user data, device permissions and disclosure updates in a workout timer product built around low-friction usage.",
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
                "Collect only the data needed to support core workout timing, diagnostics and clearly defined product improvements.",
                "Do not introduce new analytics events or identifiers without reviewing their retention, purpose and user-facing disclosure impact.",
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
              text: "Store disclosures, privacy text and support-facing explanations must stay aligned with the shipped app behavior. Changes that affect data handling or permission usage should be treated as release-gating items rather than documentation follow-up.",
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
    },
  ],
};
