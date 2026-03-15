import { motion, useReducedMotion } from 'framer-motion';
import { type ReactElement, useLayoutEffect, useRef, useState } from 'react';

import st from './HeroWindow.module.css';
import { emphasizedEase, getCollapsedHeight, heroMotionConfig } from '../heroMotion';
import type { HeroWindowProps } from './HeroWindow.interfaces';

export const HeroWindow = ({
    children,
    isContentVisible,
    revealRef,
}: HeroWindowProps): ReactElement => {
    const isReducedMotionEnabled = useReducedMotion() ?? false;
    const bodyContentRef = useRef<HTMLDivElement | null>(null);
    const [collapsedHeight, setCollapsedHeight] = useState<number>(getCollapsedHeight);
    const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

    useLayoutEffect(() => {
        const bodyNode = bodyContentRef.current;

        if (bodyNode === null) {
            return undefined;
        }

        const measure = (): void => {
            setCollapsedHeight(getCollapsedHeight());
            setExpandedHeight(bodyNode.scrollHeight);
        };

        measure();

        const resizeObserver = new ResizeObserver(() => {
            measure();
        });

        resizeObserver.observe(bodyNode);
        window.addEventListener('resize', measure);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    const heroBodyHeight =
        isReducedMotionEnabled || isContentVisible ? expandedHeight ?? collapsedHeight : collapsedHeight;

    return (
        <div ref={revealRef} className={st.root} data-landing-reveal="visible">
            <div className={st.windowBar} aria-hidden="true">
                <div className={st.windowControls}>
                    <span />
                    <span />
                    <span />
                </div>
            </div>

            <div className={st.windowBody}>
                <motion.div
                    className={st.windowBodyInner}
                    data-hero-window-body-inner="true"
                    style={{ height: isReducedMotionEnabled ? 'auto' : heroBodyHeight }}
                    initial={false}
                    animate={{ height: isReducedMotionEnabled ? 'auto' : heroBodyHeight }}
                    transition={{
                        duration: isReducedMotionEnabled ? 0 : heroMotionConfig.grow / 1000,
                        ease: emphasizedEase,
                    }}
                >
                    <div ref={bodyContentRef} className={st.windowBodyContent}>
                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
