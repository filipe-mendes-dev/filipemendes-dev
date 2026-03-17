import type { SectionId } from '../../../shared/navigation/sections';

export interface LandingPageSectionElements {
  content: HTMLElement | null;
  header: HTMLElement | null;
  section: HTMLElement | null;
}

export interface LandingPageRevealControllerProps {
  initialVisibleSectionId?: SectionId;
}
