import type { ReactElement } from "react";

import { BenchlineStatsPage } from "../../../../views/ProjectPages/BenchlineStatsPage";
export { metadata } from "./metadata";

const BenchlineStatsRoute = (): ReactElement => {
  return <BenchlineStatsPage />;
};

export default BenchlineStatsRoute;
