"use client";

import { type ReactElement, type ReactNode, useEffect } from "react";

interface CvRouteDocumentStylesProps {
  children: ReactNode;
}

export const CvRouteDocumentStyles = ({
  children,
}: CvRouteDocumentStylesProps): ReactElement => {
  useEffect(() => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const previousHtmlTextSizeAdjust =
      htmlElement.style.getPropertyValue("text-size-adjust");
    const previousHtmlWebkitTextSizeAdjust =
      htmlElement.style.getPropertyValue("-webkit-text-size-adjust");
    const previousBodyTextSizeAdjust =
      bodyElement.style.getPropertyValue("text-size-adjust");
    const previousBodyWebkitTextSizeAdjust =
      bodyElement.style.getPropertyValue("-webkit-text-size-adjust");

    htmlElement.style.setProperty("text-size-adjust", "none");
    htmlElement.style.setProperty("-webkit-text-size-adjust", "none");
    bodyElement.style.setProperty("text-size-adjust", "none");
    bodyElement.style.setProperty("-webkit-text-size-adjust", "none");

    return () => {
      htmlElement.style.setProperty(
        "text-size-adjust",
        previousHtmlTextSizeAdjust,
      );
      htmlElement.style.setProperty(
        "-webkit-text-size-adjust",
        previousHtmlWebkitTextSizeAdjust,
      );
      bodyElement.style.setProperty(
        "text-size-adjust",
        previousBodyTextSizeAdjust,
      );
      bodyElement.style.setProperty(
        "-webkit-text-size-adjust",
        previousBodyWebkitTextSizeAdjust,
      );
    };
  }, []);

  return <>{children}</>;
};
