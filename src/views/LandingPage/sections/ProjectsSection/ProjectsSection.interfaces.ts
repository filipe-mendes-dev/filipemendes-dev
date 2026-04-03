import type { LandingProjectData } from '../../../../data/site/landing-page/projects.data';

export interface ProjectsSectionProps {
  content: LandingProjectData[];
  isRevealEnabled: boolean;
}
