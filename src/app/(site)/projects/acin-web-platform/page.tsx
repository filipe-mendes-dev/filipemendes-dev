import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  acinWebPlatformMetadata,
  AcinWebPlatformPage,
} from "../../../../views/ProjectPages/AcinWebPlatformPage";

export const generateMetadata = (): Metadata => {
  return acinWebPlatformMetadata;
};

const AcinWebPlatformRoute = (): ReactElement => {
  return <AcinWebPlatformPage />;
};

export default AcinWebPlatformRoute;
