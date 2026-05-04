import type { ReactNode } from "react";

export interface ClickToCopyProps {
  ariaLabel?: string;
  children?: ReactNode;
  className?: string;
  copiedLabel?: string;
  failedLabel?: string;
  value: string;
}
