import type { ElementType, ReactNode } from "react";

export interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}
