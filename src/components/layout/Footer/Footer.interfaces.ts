export interface FooterProps {
  actionHref?: string;
  actionLabel?: string;
  navigate?: (href: string) => void;
  name: string;
  descriptor: string;
  githubUrl: string;
  linkedInUrl: string;
}
