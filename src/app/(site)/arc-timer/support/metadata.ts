import type { Metadata } from "next";

import { createPageMetadata } from "../../../../shared/seo/createPageMetadata";

const title = `Arc Timer | Support`;
const description =
  "Support page for the Arc Timer mobile app. Send questions, issues, bug reports or feedback by email.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/arc-timer/support",
});
