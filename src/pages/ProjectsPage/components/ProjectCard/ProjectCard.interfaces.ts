import type { ProjectDetail } from '../../../../data/portfolio';

export interface ProjectCardProps {
  navigate: (href: string) => void;
  project: ProjectDetail;
}
