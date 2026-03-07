import type { ReactNode } from 'react';

export interface SectionProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
    id?: string;
    containerClassName?: string;
    contained?: boolean;
}
