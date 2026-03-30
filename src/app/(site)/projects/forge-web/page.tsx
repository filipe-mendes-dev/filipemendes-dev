import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  forgeWebMetadata,
  ForgeWebPage,
} from "../../../../views/ProjectPages/ForgeWebPage";

export const generateMetadata = (): Metadata => {
  return forgeWebMetadata;
};

const ForgeWebRoute = (): ReactElement => {
  return <ForgeWebPage />;
};

export default ForgeWebRoute;
