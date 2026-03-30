import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  nearsoftMobileAppsMetadata,
  NearsoftMobileAppsPage,
} from "../../../../views/ProjectPages/NearsoftMobileAppsPage";

export const generateMetadata = (): Metadata => {
  return nearsoftMobileAppsMetadata;
};

const NearsoftMobileAppsRoute = (): ReactElement => {
  return <NearsoftMobileAppsPage />;
};

export default NearsoftMobileAppsRoute;
