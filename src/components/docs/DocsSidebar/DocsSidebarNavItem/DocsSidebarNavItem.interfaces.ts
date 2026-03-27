export interface DocsSidebarNavItemProps {
  compactLabel?: string;
  href: string;
  isActive: boolean;
  label: string;
  isNested?: boolean;
  onClick: () => void;
}
