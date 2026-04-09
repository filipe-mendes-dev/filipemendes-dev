import { permanentRedirect } from "next/navigation";
import type { ReactElement } from "react";

const CvRoute = (): ReactElement => {
  permanentRedirect("/curriculum-vitae");
};

export default CvRoute;
