import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  arcTimerMetadata,
  ArcTimerPage,
} from "../../../../views/ProjectPages/ArcTimerPage";

export const generateMetadata = (): Metadata => {
  return arcTimerMetadata;
};

const ArcTimerRoute = (): ReactElement => {
  return <ArcTimerPage />;
};

export default ArcTimerRoute;
