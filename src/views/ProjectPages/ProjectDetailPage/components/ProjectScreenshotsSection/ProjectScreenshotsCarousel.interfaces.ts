export interface ProjectScreenshotsCarouselItem {
  alt: string;
  url: string;
}

export interface ProjectScreenshotsCarouselProps {
  items: ProjectScreenshotsCarouselItem[];
  onSelect: (index: number) => void;
}
