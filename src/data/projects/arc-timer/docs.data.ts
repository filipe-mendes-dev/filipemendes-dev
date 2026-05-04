import type { ProjectDocsContent } from "../projects.interfaces";
import { project } from "./project.data";

const lastUpdatedLabel = "Last updated · March 2026";

export const projectDocs: ProjectDocsContent = {
  description:
    "Documentation for Arc Timer app policies, support information and release-facing product details.",
  order: 1,
  documents: [
    {
      slug: "arc-timer-privacy-and-permissions-policy",
      order: 2,
      projectSlug: project.slug,
      title: "Arc Timer Privacy Policy",
      summary: "How Arc Timer handles your data, permissions and sharing.",
      lastUpdatedLabel,
      sections: [
        {
          id: "overview",
          title: "Overview",
          content: [
            {
              kind: "paragraph",
              text: "Arc Timer is designed to work without requiring personal data. The app does not require an account and does not collect personally identifiable information.",
            },
          ],
        },
        {
          id: "data-storage",
          title: "Data Storage",
          content: [
            {
              kind: "paragraph",
              text: "Workouts, settings and session history are stored locally on your device. This data is not transmitted to external servers.",
            },
          ],
        },
        {
          id: "data-collection",
          title: "Data Collection",
          content: [
            {
              kind: "paragraph",
              text: "Arc Timer does not collect personal data, tracking identifiers or analytics data.",
            },
          ],
        },
        {
          id: "permissions",
          title: "Permissions",
          content: [
            {
              kind: "paragraph",
              text: "Arc Timer may use device capabilities such as sound, haptics and notifications to support the workout experience. These capabilities are used only to deliver core app functionality and are not used for data collection.",
            },
          ],
        },
        {
          id: "sharing",
          title: "Sharing",
          content: [
            {
              kind: "paragraph",
              text: "Arc Timer allows you to export workouts as .arcw files. These files are shared only when you explicitly choose to export or share them.",
            },
          ],
        },
        {
          id: "third-parties",
          title: "Third Parties",
          content: [
            {
              kind: "paragraph",
              text: "Arc Timer does not share data with third parties.",
            },
          ],
        },
        {
          id: "changes",
          title: "Changes",
          content: [
            {
              kind: "paragraph",
              text: "If future updates introduce data collection, third-party sharing or new permissions, this policy will be updated accordingly.",
            },
          ],
        },
        {
          id: "contact",
          title: "Contact",
          content: [
            {
              kind: "paragraph",
              text: "If you have any questions about this policy, contact arctimer@filipemendes.dev.",
            },
          ],
        },
      ],
    },
  ],
};
