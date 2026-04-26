export interface ProjectScreenshotItem {
  id?: string | number;
  alt: string;
  caption?: string;
  url: string;
}

export interface ProjectScreenshotsContent {
  items: ProjectScreenshotItem[];
  title?: string;
  subtitle?: string;
}

export interface ProjectScreenshotsSectionProps {
  screenshots: ProjectScreenshotsContent;
}
