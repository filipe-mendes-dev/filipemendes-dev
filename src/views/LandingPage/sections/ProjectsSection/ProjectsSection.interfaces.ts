import type { LandingProjectCardViewModel } from '../../../../data/view-models/landing-page.view-model';

export interface ProjectsSectionProps {
  content: LandingProjectCardViewModel[];
  isRevealEnabled: boolean;
}
