export interface ProjectScreenshotsCarouselItem {
  alt: string;
  caption?: string;
  url: string;
}

export interface ProjectScreenshotsCarouselProps {
  items: ProjectScreenshotsCarouselItem[];
  onSelect: (index: number) => void;
}
