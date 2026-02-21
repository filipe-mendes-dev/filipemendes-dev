import type { NavigationItem } from '../../../data/portfolio';

export interface FooterProps {
  name: string;
  descriptor: string;
  navigation: NavigationItem[];
  navigate: (href: string) => void;
  githubUrl: string;
  linkedInUrl: string;
}
