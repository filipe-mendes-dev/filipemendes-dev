import type { Metadata } from "next";

import { createPageMetadata } from "../../../../shared/seo/createPageMetadata";
import { arcTimerPageMetadata } from "../../../../views/ProjectPages/ArcTimerPage";

export const metadata: Metadata = createPageMetadata(arcTimerPageMetadata);
