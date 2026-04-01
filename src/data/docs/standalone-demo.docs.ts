import type { Doc } from "./docs.interfaces";

export const standaloneOperationsMemo: Doc = {
  slug: "standalone-operations-memo",
  order: 999,
  featured: true,
  title: "Standalone Operations Memo",
  summary:
    "A demo document with no project association, used to validate standalone docs behavior and the document-logo fallback path.",
  lastUpdatedLabel: "Last updated · April 2026",
  sections: [
    {
      id: "purpose",
      title: "Purpose",
      content: [
        {
          kind: "paragraph",
          text: "This document exists as a standalone reference entry so the docs experience can be tested without assuming every article belongs to a tracked product.",
        },
        {
          kind: "list",
          items: [
            "Validate the featured-doc fallback logo path.",
            "Confirm breadcrumbs and context blocks work without project metadata.",
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
          text: "If standalone documentation stops being a supported use case, this file can be removed. Until then, it provides a concrete test case instead of relying on synthetic placeholder data.",
        },
      ],
    },
  ],
};
