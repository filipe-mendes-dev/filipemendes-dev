export interface ProjectScreenshotItem {
  id?: string | number;
  alt: string;
  url: string;
}

export interface ProjectScreenshotsSectionProps {
  screenshots: ProjectScreenshotItem[];
}
