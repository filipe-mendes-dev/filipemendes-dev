import type { ReactNode, Ref } from 'react';

export interface HeroWindowProps {
    children: ReactNode;
    isContentVisible: boolean;
    revealRef?: Ref<HTMLDivElement>;
}
