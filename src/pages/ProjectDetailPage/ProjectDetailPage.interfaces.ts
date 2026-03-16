import type { ProjectDetail } from '../../data/portfolio';

export interface ProjectDetailPageProps {
  project: ProjectDetail;
  navigate?: (href: string) => void;
}
