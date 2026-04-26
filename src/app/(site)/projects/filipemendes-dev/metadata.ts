import type { Metadata } from "next";

import { createPageMetadata } from "../../../../shared/seo/createPageMetadata";
import { filipemendesDevPageMetadata } from "../../../../views/ProjectPages/FilipemendesDevPage";

export const metadata: Metadata = createPageMetadata(
  filipemendesDevPageMetadata
);
