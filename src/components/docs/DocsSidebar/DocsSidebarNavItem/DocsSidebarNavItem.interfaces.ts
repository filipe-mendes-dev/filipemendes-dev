export interface DocsSidebarNavItemProps {
  compactLabel?: string;
  href: string;
  isActive: boolean;
  isExpanded: boolean;
  label: string;
  isNested?: boolean;
  onClick: () => void;
}
