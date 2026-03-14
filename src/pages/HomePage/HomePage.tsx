import { AnimatePresence, motion, useAnimate, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { Section } from '../../components/ui/Section';
import type { ActionLink } from '../../data/portfolio';
import su from '../../shared/styles/utilities.module.css';
import type { HomePageProps } from './HomePage.interfaces';
import st from './HomePage.module.css';

interface HeroMotionConfig {
    afterWindow: number;
    terminalEnter: number;
    beforeTyping: number;
    terminalExpand: number;
    typing: number;
    beforeExecute: number;
    execute: number;
    terminalExit: number;
    beforeExpand: number;
    grow: number;
    contentDelayFromGrowStart: number;
    contentStagger: number;
    contentEnter: number;
    mediaEnter: number;
}

const HERO_MOTION_CONFIG: HeroMotionConfig = {
    afterWindow: 120,
    terminalEnter: 240,
    beforeTyping: 240,
    terminalExpand: 600,
    typing: 600,
    beforeExecute: 120,
    execute: 240,
    terminalExit: 240,
    beforeExpand: 0,
    grow: 480,
    contentDelayFromGrowStart: 0,
    contentStagger: 120,
    contentEnter: 360,
    mediaEnter: 360,
};

const EMPHASIZED_EASE = [0.16, 1, 0.3, 1] as const;
const COLLAPSED_HEIGHT_MIN_REM = 6.75;
const COLLAPSED_HEIGHT_MAX_REM = 8.75;
const COLLAPSED_HEIGHT_VIEWPORT_RATIO = 0.12;

const getActionClassName = (action: ActionLink): string => {
    const variantClass =
        action.variant === 'primary'
            ? su.buttonPrimary
            : action.variant === 'secondary'
            ? su.buttonSecondary
            : su.textLink;

    return `${su.button} ${variantClass} ${st.heroActionLink}`;
};

const joinClassNames = (...classNames: (string | false | undefined)[]): string => classNames.filter(Boolean).join(' ');

const getRootFontSize = (): number => {
    if (typeof window === 'undefined') {
        return 16;
    }

    const computedFontSize = window.getComputedStyle(document.documentElement).fontSize;
    const parsedFontSize = Number.parseFloat(computedFontSize);

    return Number.isNaN(parsedFontSize) ? 16 : parsedFontSize;
};

const getCollapsedHeight = (): number => {
    if (typeof window === 'undefined') {
        return 160;
    }

    const rootFontSize = getRootFontSize();
    const minHeight = COLLAPSED_HEIGHT_MIN_REM * rootFontSize;
    const maxHeight = COLLAPSED_HEIGHT_MAX_REM * rootFontSize;
    const preferredHeight = window.innerWidth * COLLAPSED_HEIGHT_VIEWPORT_RATIO;

    return Math.min(Math.max(preferredHeight, minHeight), maxHeight);
};

const wait = (durationMs: number): Promise<void> =>
    new Promise((resolve) => {
        window.setTimeout(resolve, durationMs);
    });

type HeroCommandState = 'idle' | 'typing' | 'typed' | 'executing';

export const HomePage = ({ content, navigate, onSectionRequest, revealRef }: HomePageProps): ReactElement => {
    const [scope, animate] = useAnimate();
    const prefersReducedMotion = useReducedMotion();
    const bodyContentRef = useRef<HTMLDivElement | null>(null);
    const terminalPromptMeasureRef = useRef<HTMLParagraphElement | null>(null);
    const terminalFullMeasureRef = useRef<HTMLParagraphElement | null>(null);
    const hasStartedSequenceRef = useRef<boolean>(false);
    const hasCompletedSequenceRef = useRef<boolean>(false);
    const [collapsedHeight, setCollapsedHeight] = useState<number>(getCollapsedHeight);
    const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
    const [terminalCollapsedWidth, setTerminalCollapsedWidth] = useState<number>(0);
    const [terminalExpandedWidth, setTerminalExpandedWidth] = useState<number>(0);
    const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(false);
    const [commandState, setCommandState] = useState<HeroCommandState>('idle');
    const [isHeroExpanded, setIsHeroExpanded] = useState<boolean>(false);
    const [isContentVisible, setIsContentVisible] = useState<boolean>(false);
    const isHeroSequenceReady = expandedHeight !== null && terminalCollapsedWidth > 0 && terminalExpandedWidth > 0;

    useLayoutEffect(() => {
        const bodyNode = bodyContentRef.current;
        const promptNode = terminalPromptMeasureRef.current;
        const fullNode = terminalFullMeasureRef.current;

        if (bodyNode === null || promptNode === null || fullNode === null) {
            return undefined;
        }

        const measure = (): void => {
            const nextExpandedHeight = bodyNode.scrollHeight;
            const nextTerminalCollapsedWidth = promptNode.getBoundingClientRect().width;
            const nextTerminalExpandedWidth = fullNode.getBoundingClientRect().width;

            setCollapsedHeight(getCollapsedHeight());
            setExpandedHeight(nextExpandedHeight);
            setTerminalCollapsedWidth(nextTerminalCollapsedWidth);
            setTerminalExpandedWidth(nextTerminalExpandedWidth);
        };

        measure();

        const resizeObserver = new ResizeObserver(() => {
            measure();
        });

        resizeObserver.observe(bodyNode);
        resizeObserver.observe(promptNode);
        resizeObserver.observe(fullNode);
        window.addEventListener('resize', measure);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', measure);
        };
    }, []);

    useEffect(() => {
        if (!isHeroSequenceReady) {
            return undefined;
        }

        if (prefersReducedMotion) {
            hasStartedSequenceRef.current = true;
            hasCompletedSequenceRef.current = true;

            return undefined;
        }

        if (hasStartedSequenceRef.current || hasCompletedSequenceRef.current) {
            return undefined;
        }

        hasStartedSequenceRef.current = true;
        let isCancelled = false;

        const runSequence = async (): Promise<void> => {
            await wait(HERO_MOTION_CONFIG.afterWindow);

            if (isCancelled) {
                return;
            }

            setIsTerminalVisible(true);
            await wait(HERO_MOTION_CONFIG.terminalEnter + HERO_MOTION_CONFIG.beforeTyping);

            if (isCancelled) {
                return;
            }

            setCommandState('typing');

            await Promise.all([
                animate(
                    '[data-hero-command-text]',
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        opacity: 1,
                    },
                    {
                        duration: HERO_MOTION_CONFIG.typing / 1000,
                        ease: 'linear',
                    }
                ),
                animate(
                    '[data-hero-command-cursor]',
                    { opacity: [1, 0.2, 1, 0.2, 1, 0] },
                    {
                        duration: HERO_MOTION_CONFIG.typing / 1000,
                        ease: 'linear',
                    }
                ),
                wait(Math.max(HERO_MOTION_CONFIG.typing, HERO_MOTION_CONFIG.terminalExpand)),
            ]);

            if (isCancelled) {
                return;
            }

            setCommandState('typed');
            await wait(HERO_MOTION_CONFIG.beforeExecute);

            if (isCancelled) {
                return;
            }

            setCommandState('executing');
            await wait(HERO_MOTION_CONFIG.execute);

            if (isCancelled) {
                return;
            }

            setIsTerminalVisible(false);
            await wait(HERO_MOTION_CONFIG.terminalExit + HERO_MOTION_CONFIG.beforeExpand);

            if (isCancelled) {
                return;
            }

            setIsHeroExpanded(true);
            await wait(HERO_MOTION_CONFIG.contentDelayFromGrowStart);

            if (isCancelled) {
                return;
            }

            setIsContentVisible(true);

            if (!isCancelled) {
                hasCompletedSequenceRef.current = true;
            }
        };

        void runSequence();

        return () => {
            isCancelled = true;
            hasStartedSequenceRef.current = false;
        };
    }, [animate, isHeroSequenceReady, prefersReducedMotion]);

    const isReducedMotionEnabled = prefersReducedMotion ?? false;
    const resolvedExpandedHeight = expandedHeight ?? collapsedHeight;
    const resolvedTerminalCollapsedWidth = terminalCollapsedWidth > 0 ? terminalCollapsedWidth : 56;
    const resolvedTerminalExpandedWidth =
        terminalExpandedWidth > 0 ? terminalExpandedWidth : resolvedTerminalCollapsedWidth;
    const isTerminalActive = !isReducedMotionEnabled && isTerminalVisible;
    const resolvedCommandState = isReducedMotionEnabled ? 'typed' : commandState;
    const isExpanded = isReducedMotionEnabled || isHeroExpanded;
    const isContentShown = isReducedMotionEnabled || isContentVisible;
    const heroBodyHeight = isReducedMotionEnabled ? 'auto' : isExpanded ? resolvedExpandedHeight : collapsedHeight;
    const terminalWidth =
        resolvedCommandState === 'typing' || resolvedCommandState === 'typed' || resolvedCommandState === 'executing'
            ? resolvedTerminalExpandedWidth
            : resolvedTerminalCollapsedWidth;
    const revealItemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 14,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isReducedMotionEnabled ? 0 : HERO_MOTION_CONFIG.contentEnter / 1000,
                ease: EMPHASIZED_EASE,
            },
        },
    };
    const copyVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: isReducedMotionEnabled ? 0 : HERO_MOTION_CONFIG.contentStagger / 1000,
            },
        },
    };
    const mediaVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: isReducedMotionEnabled ? 0 : HERO_MOTION_CONFIG.mediaEnter / 1000,
                ease: EMPHASIZED_EASE,
            },
        },
    };

    return (
        <div className={st.root}>
            <Section className={st.heroSection}>
                <div ref={scope} className={st.heroWindowStage}>
                    <div ref={revealRef} className={st.heroWindow} data-landing-reveal="visible">
                        <div className={st.heroWindowBar} aria-hidden="true">
                            <div className={st.windowControls}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <AnimatePresence initial={false}>
                            {isTerminalActive ? (
                                <motion.div
                                    key="hero-terminal"
                                    className={st.heroTerminalLine}
                                    data-hero-terminal="true"
                                    initial={{
                                        opacity: 0,
                                        y: -10,
                                        width: resolvedTerminalCollapsedWidth,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        width: terminalWidth,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        width: resolvedTerminalCollapsedWidth,
                                        transition: {
                                            duration: HERO_MOTION_CONFIG.terminalExit / 1000,
                                            ease: EMPHASIZED_EASE,
                                        },
                                    }}
                                    transition={{
                                        duration: isReducedMotionEnabled
                                            ? 0
                                            : resolvedCommandState === 'typing'
                                            ? HERO_MOTION_CONFIG.terminalExpand / 1000
                                            : HERO_MOTION_CONFIG.terminalEnter / 1000,
                                        ease: EMPHASIZED_EASE,
                                    }}
                                    aria-hidden="true"
                                >
                                    <motion.p
                                        className={joinClassNames(
                                            st.heroCommand,
                                            resolvedCommandState === 'executing' && st.heroCommandExecuting
                                        )}
                                        data-hero-command="true"
                                        animate={{ y: 0, scale: 1 }}
                                        transition={{ duration: 0 }}
                                        aria-label="$ portfolio --open hero"
                                    >
                                        <span className={st.heroPrompt}>$</span>
                                        <span
                                            className={st.heroCommandText}
                                            data-hero-command-text="true"
                                            style={
                                                isReducedMotionEnabled || resolvedCommandState !== 'idle'
                                                    ? undefined
                                                    : {
                                                          clipPath: 'inset(0% 100% 0% 0%)',
                                                          opacity: 0,
                                                      }
                                            }
                                        >
                                            portfolio --open hero
                                        </span>
                                        <span
                                            className={st.heroCommandCursor}
                                            data-hero-command-cursor="true"
                                            aria-hidden="true"
                                        >
                                            _
                                        </span>
                                    </motion.p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>

                        <div className={st.heroWindowBody}>
                            <motion.div
                                className={st.heroWindowBodyInner}
                                data-hero-window-body-inner="true"
                                style={{ height: heroBodyHeight }}
                                initial={false}
                                animate={{ height: heroBodyHeight }}
                                transition={{
                                    duration: isReducedMotionEnabled ? 0 : HERO_MOTION_CONFIG.grow / 1000,
                                    ease: EMPHASIZED_EASE,
                                }}
                            >
                                <div ref={bodyContentRef} className={st.heroWindowBodyContent}>
                                    <div className={st.heroGrid}>
                                        <motion.div
                                            className={st.heroMediaColumn}
                                            data-hero-media="true"
                                            initial="hidden"
                                            animate={isContentShown ? 'visible' : 'hidden'}
                                            variants={mediaVariants}
                                        >
                                            <figure className={st.heroPhotoFrame}>
                                                <img
                                                    src={content.hero.photoUrl}
                                                    alt={content.hero.photoAlt}
                                                    className={st.heroPhoto}
                                                />
                                            </figure>
                                        </motion.div>

                                        <motion.div
                                            className={st.heroCopy}
                                            initial="hidden"
                                            animate={isContentShown ? 'visible' : 'hidden'}
                                            variants={copyVariants}
                                        >
                                            <motion.p
                                                className={joinClassNames(st.heroKicker, st.heroRevealItem)}
                                                data-hero-copy-item="true"
                                                variants={revealItemVariants}
                                            >
                                                Engineering Portfolio
                                            </motion.p>
                                            <motion.h1
                                                className={joinClassNames(st.heroTitle, st.heroRevealItem)}
                                                data-hero-copy-item="true"
                                                variants={revealItemVariants}
                                            >
                                                {content.hero.name}
                                            </motion.h1>
                                            <motion.div
                                                className={joinClassNames(st.heroBody, st.heroRevealItem)}
                                                data-hero-copy-item="true"
                                                variants={revealItemVariants}
                                            >
                                                <p className={st.heroRole}>{content.hero.role}</p>
                                                <p className={st.heroSummary}>{content.hero.summary}</p>
                                                <p className={st.heroNow}>{content.hero.now}</p>
                                            </motion.div>
                                            <motion.div
                                                className={joinClassNames(st.heroActions, st.heroRevealItem)}
                                                data-hero-copy-item="true"
                                                variants={revealItemVariants}
                                            >
                                                {content.hero.actions.map((action) => {
                                                    const sectionId = action.sectionId;

                                                    return (
                                                        <AppLink
                                                            key={action.label}
                                                            href={action.href}
                                                            navigate={navigate}
                                                            className={getActionClassName(action)}
                                                            {...(sectionId === undefined
                                                                ? {}
                                                                : {
                                                                      onClick: (event) => {
                                                                          event.preventDefault();
                                                                          onSectionRequest(sectionId);
                                                                      },
                                                                  })}
                                                        >
                                                            {action.label}
                                                        </AppLink>
                                                    );
                                                })}
                                            </motion.div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Section>
            <div className={st.heroTerminalMeasure} aria-hidden="true">
                <p ref={terminalPromptMeasureRef} className={joinClassNames(st.heroCommand, st.heroCommandMeasure)}>
                    <span className={st.heroPrompt}>$</span>
                </p>
                <p ref={terminalFullMeasureRef} className={joinClassNames(st.heroCommand, st.heroCommandMeasure)}>
                    <span className={st.heroPrompt}>$</span>
                    <span className={st.heroCommandMeasureText}>portfolio --open hero</span>
                    <span className={st.heroCommandMeasureCursor}>_</span>
                </p>
            </div>
        </div>
    );
};
