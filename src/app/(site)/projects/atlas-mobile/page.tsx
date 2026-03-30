import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  atlasMobileMetadata,
  AtlasMobilePage,
} from "../../../../views/ProjectPages/AtlasMobilePage";

export const generateMetadata = (): Metadata => {
  return atlasMobileMetadata;
};

const AtlasMobileRoute = (): ReactElement => {
  return <AtlasMobilePage />;
};

export default AtlasMobileRoute;
