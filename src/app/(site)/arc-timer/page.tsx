import { redirect } from "next/navigation";
import type { ReactElement } from "react";

const ArcTimerRoute = (): ReactElement => {
  redirect("/arc-timer/support");
};

export default ArcTimerRoute;
