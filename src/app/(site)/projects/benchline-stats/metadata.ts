import type { Metadata } from "next";

import { projectDetail } from "../../../../data/projects/benchline-stats";
import { createPageMetadata } from "../../../../shared/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata(projectDetail.pageMetadata);
