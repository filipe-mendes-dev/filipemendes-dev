import type { Metadata } from "next";
import type { ReactElement } from "react";

import {
  filipemendesDevMetadata,
  FilipemendesDevPage,
} from "../../../../views/ProjectPages/FilipemendesDevPage";

export const generateMetadata = (): Metadata => {
  return filipemendesDevMetadata;
};

const FilipemendesDevRoute = (): ReactElement => {
  return <FilipemendesDevPage />;
};

export default FilipemendesDevRoute;
