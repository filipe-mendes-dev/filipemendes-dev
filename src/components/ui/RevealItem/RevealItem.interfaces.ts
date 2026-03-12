import type { CSSProperties, ReactNode } from 'react';

export interface RevealItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
  role?: 'default' | 'support' | 'form-field';
}

export interface RevealItemStyle extends CSSProperties {
  '--reveal-index'?: number;
}
