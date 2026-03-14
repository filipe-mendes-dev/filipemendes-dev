import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from 'framer-motion';
import {
    type ReactElement,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

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
    beforeContent: number;
    contentStagger: number;
    contentEnter: number;
    mediaEnter: number;
}

type HeroPhase =
    | 'idle'
    | 'terminal'
    | 'typing'
    | 'typed'
    | 'executing'
    | 'terminal-exit'
    | 'expanding'
    | 'content';

type HeroCommandPhase = 'idle' | 'typing' | 'typed' | 'executing';

const HERO_MOTION_CONFIG: HeroMotionConfig = {
    afterWindow: 120,
    terminalEnter: 240,
    beforeTyping: 120,
    terminalExpand: 720,
    typing: 720,
    beforeExecute: 240,
    execute: 120,
    beforeExpand: 0,
    terminalExit: 240,
    grow: 240,
    beforeContent: -120,
    contentStagger: 160,
    contentEnter: 760,
    mediaEnter: 900,
};

const EMPHASIZED_EASE = [0.16, 1, 0.3, 1] as const;
const COLLAPSED_HEIGHT_MIN_REM = 8;
const COLLAPSED_HEIGHT_MAX_REM = 10.5;
const COLLAPSED_HEIGHT_VIEWPORT_RATIO = 0.16;

const getActionClassName = (action: ActionLink): string => {
    const variantClass =
        action.variant === 'primary'
            ? su.buttonPrimary
            : action.variant === 'secondary'
            ? su.buttonSecondary
            : su.textLink;

    return `${su.button} ${variantClass} ${st.heroActionLink}`;
};

const joinClassNames = (
    ...classNames: (string | false | undefined)[]
): string => classNames.filter(Boolean).join(' ');

const getRootFontSize = (): number => {
    if (typeof window === 'undefined') {
        return 16;
    }

    const computedFontSize = window.getComputedStyle(
        document.documentElement
    ).fontSize;
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

const isTerminalVisibleForPhase = (phase: HeroPhase): boolean =>
    phase === 'terminal' ||
    phase === 'typing' ||
    phase === 'typed' ||
    phase === 'executing' ||
    phase === 'terminal-exit';

const getCommandPhase = (phase: HeroPhase): HeroCommandPhase => {
    if (phase === 'typing') {
        return 'typing';
    }

    if (phase === 'executing') {
        return 'executing';
    }

    if (phase === 'typed' || phase === 'terminal-exit') {
        return 'typed';
    }

    return 'idle';
};

const getTerminalWidth = (
    phase: HeroPhase,
    collapsedWidth: number,
    expandedWidth: number
): number =>
    phase === 'typing' || phase === 'typed' || phase === 'executing'
        ? expandedWidth
        : collapsedWidth;

const getTerminalTransition = (phase: HeroPhase, isReducedMotion: boolean) => {
    if (isReducedMotion) {
        return { duration: 0 };
    }

    if (phase === 'typing') {
        return {
            duration: HERO_MOTION_CONFIG.terminalExpand / 1000,
            ease: EMPHASIZED_EASE,
        };
    }

    if (phase === 'terminal-exit') {
        return {
            duration: HERO_MOTION_CONFIG.terminalExit / 1000,
            ease: EMPHASIZED_EASE,
        };
    }

    return {
        duration: HERO_MOTION_CONFIG.terminalEnter / 1000,
        ease: EMPHASIZED_EASE,
    };
};

export const HomePage = ({
    content,
    navigate,
    onSectionRequest,
    revealRef,
}: HomePageProps): ReactElement => {
    const prefersReducedMotion = useReducedMotion();
    const bodyContentRef = useRef<HTMLDivElement | null>(null);
    const terminalPromptMeasureRef = useRef<HTMLParagraphElement | null>(null);
    const terminalFullMeasureRef = useRef<HTMLParagraphElement | null>(null);
    const hasStartedSequenceRef = useRef<boolean>(false);
    const [heroPhase, setHeroPhase] = useState<HeroPhase>('idle');
    const [collapsedHeight, setCollapsedHeight] =
        useState<number>(getCollapsedHeight);
    const [expandedHeight, setExpandedHeight] = useState<number | null>(null);
    const [terminalCollapsedWidth, setTerminalCollapsedWidth] =
        useState<number>(0);
    const [terminalExpandedWidth, setTerminalExpandedWidth] =
        useState<number>(0);

    useLayoutEffect(() => {
        const bodyNode = bodyContentRef.current;
        const promptNode = terminalPromptMeasureRef.current;
        const fullNode = terminalFullMeasureRef.current;

        if (bodyNode === null || promptNode === null || fullNode === null) {
            return undefined;
        }

        const measure = (): void => {
            setCollapsedHeight(getCollapsedHeight());
            setExpandedHeight(bodyNode.scrollHeight);
            setTerminalCollapsedWidth(promptNode.getBoundingClientRect().width);
            setTerminalExpandedWidth(fullNode.getBoundingClientRect().width);
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
        if (
            hasStartedSequenceRef.current ||
            expandedHeight === null ||
            terminalCollapsedWidth <= 0 ||
            terminalExpandedWidth <= 0
        ) {
            return undefined;
        }

        if (prefersReducedMotion) {
            hasStartedSequenceRef.current = true;
            return undefined;
        }

        hasStartedSequenceRef.current = true;

        const timeoutIds: number[] = [];
        let elapsed = HERO_MOTION_CONFIG.afterWindow;

        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('terminal');
            }, elapsed)
        );

        elapsed +=
            HERO_MOTION_CONFIG.terminalEnter + HERO_MOTION_CONFIG.beforeTyping;
        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('typing');
            }, elapsed)
        );

        elapsed += Math.max(
            HERO_MOTION_CONFIG.terminalExpand,
            HERO_MOTION_CONFIG.typing
        );
        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('typed');
            }, elapsed)
        );

        elapsed += HERO_MOTION_CONFIG.beforeExecute;
        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('executing');
            }, elapsed)
        );

        elapsed += HERO_MOTION_CONFIG.execute;
        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('terminal-exit');
            }, elapsed)
        );

        elapsed +=
            HERO_MOTION_CONFIG.terminalExit + HERO_MOTION_CONFIG.beforeExpand;
        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('expanding');
            }, elapsed)
        );

        elapsed += HERO_MOTION_CONFIG.grow + HERO_MOTION_CONFIG.beforeContent;
        timeoutIds.push(
            window.setTimeout(() => {
                setHeroPhase('content');
            }, elapsed)
        );

        return () => {
            timeoutIds.forEach((timeoutId) => {
                window.clearTimeout(timeoutId);
            });
        };
    }, [
        expandedHeight,
        prefersReducedMotion,
        terminalCollapsedWidth,
        terminalExpandedWidth,
    ]);

    const isReducedMotionEnabled = prefersReducedMotion ?? false;
    const resolvedExpandedHeight = expandedHeight ?? collapsedHeight;
    const resolvedTerminalCollapsedWidth =
        terminalCollapsedWidth > 0 ? terminalCollapsedWidth : 56;
    const resolvedTerminalExpandedWidth =
        terminalExpandedWidth > 0
            ? terminalExpandedWidth
            : resolvedTerminalCollapsedWidth;
    const isWindowExpanded =
        isReducedMotionEnabled ||
        heroPhase === 'expanding' ||
        heroPhase === 'content';
    const isContentVisible = isReducedMotionEnabled || heroPhase === 'content';
    const isTerminalVisible =
        !isReducedMotionEnabled && isTerminalVisibleForPhase(heroPhase);
    const commandPhase = getCommandPhase(heroPhase);
    const terminalWidth = getTerminalWidth(
        heroPhase,
        resolvedTerminalCollapsedWidth,
        resolvedTerminalExpandedWidth
    );
    const terminalTransition = getTerminalTransition(
        heroPhase,
        isReducedMotionEnabled
    );
    const revealItemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 14,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: isReducedMotionEnabled
                    ? 0
                    : HERO_MOTION_CONFIG.contentEnter / 1000,
                ease: EMPHASIZED_EASE,
            },
        },
    };
    const copyVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: isReducedMotionEnabled
                    ? 0
                    : HERO_MOTION_CONFIG.contentStagger / 1000,
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
                duration: isReducedMotionEnabled
                    ? 0
                    : HERO_MOTION_CONFIG.mediaEnter / 1000,
                ease: EMPHASIZED_EASE,
            },
        },
    };

    return (
        <div className={st.root}>
            <Section className={st.heroSection}>
                <div className={st.heroWindowStage}>
                    <div
                        ref={revealRef}
                        className={st.heroWindow}
                        data-landing-reveal="visible"
                    >
                        <div className={st.heroWindowBar} aria-hidden="true">
                            <div className={st.windowControls}>
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <AnimatePresence>
                            {isTerminalVisible ? (
                                <motion.div
                                    key="hero-terminal"
                                    className={st.heroTerminalLine}
                                    initial={{
                                        opacity: 0,
                                        y: -10,
                                        width: resolvedTerminalCollapsedWidth,
                                    }}
                                    animate={{
                                        opacity:
                                            heroPhase === 'terminal-exit'
                                                ? 0
                                                : 1,
                                        y:
                                            heroPhase === 'terminal-exit'
                                                ? -8
                                                : 0,
                                        width: terminalWidth,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: -8,
                                        width: resolvedTerminalCollapsedWidth,
                                        transition: {
                                            duration:
                                                HERO_MOTION_CONFIG.terminalExit /
                                                1000,
                                            ease: EMPHASIZED_EASE,
                                        },
                                    }}
                                    transition={terminalTransition}
                                    aria-hidden="true"
                                >
                                    <p
                                        className={joinClassNames(
                                            st.heroCommand,
                                            commandPhase === 'typing' &&
                                                st.heroCommandTyping,
                                            commandPhase === 'typed' &&
                                                st.heroCommandTyped,
                                            commandPhase === 'executing' &&
                                                st.heroCommandExecuted
                                        )}
                                        aria-label="$ portfolio --open hero"
                                    >
                                        <span className={st.heroPrompt}>$</span>
                                        <span className={st.heroCommandText}>
                                            portfolio --open hero
                                        </span>
                                    </p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>

                        <div className={st.heroWindowBody}>
                            <motion.div
                                className={st.heroWindowBodyInner}
                                initial={false}
                                animate={{
                                    height: isWindowExpanded
                                        ? resolvedExpandedHeight
                                        : collapsedHeight,
                                }}
                                transition={{
                                    duration: isReducedMotionEnabled
                                        ? 0
                                        : HERO_MOTION_CONFIG.grow / 1000,
                                    ease: EMPHASIZED_EASE,
                                }}
                            >
                                <div
                                    ref={bodyContentRef}
                                    className={st.heroWindowBodyContent}
                                >
                                    <div className={st.heroGrid}>
                                        <motion.div
                                            className={st.heroMediaColumn}
                                            initial="hidden"
                                            animate={
                                                isContentVisible
                                                    ? 'visible'
                                                    : 'hidden'
                                            }
                                            variants={mediaVariants}
                                        >
                                            <figure
                                                className={st.heroPhotoFrame}
                                            >
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
                                            animate={
                                                isContentVisible
                                                    ? 'visible'
                                                    : 'hidden'
                                            }
                                            variants={copyVariants}
                                        >
                                            <motion.p
                                                className={joinClassNames(
                                                    st.heroKicker,
                                                    st.heroRevealItem
                                                )}
                                                variants={revealItemVariants}
                                            >
                                                Engineering Portfolio
                                            </motion.p>
                                            <motion.h1
                                                className={joinClassNames(
                                                    st.heroTitle,
                                                    st.heroRevealItem
                                                )}
                                                variants={revealItemVariants}
                                            >
                                                {content.hero.name}
                                            </motion.h1>
                                            <motion.div
                                                className={joinClassNames(
                                                    st.heroBody,
                                                    st.heroRevealItem
                                                )}
                                                variants={revealItemVariants}
                                            >
                                                <p className={st.heroRole}>
                                                    {content.hero.role}
                                                </p>
                                                <p className={st.heroSummary}>
                                                    {content.hero.summary}
                                                </p>
                                                <p className={st.heroNow}>
                                                    {content.hero.now}
                                                </p>
                                            </motion.div>
                                            <motion.div
                                                className={joinClassNames(
                                                    st.heroActions,
                                                    st.heroRevealItem
                                                )}
                                                variants={revealItemVariants}
                                            >
                                                {content.hero.actions.map(
                                                    (action) => {
                                                        const sectionId =
                                                            action.sectionId;

                                                        return (
                                                            <AppLink
                                                                key={
                                                                    action.label
                                                                }
                                                                href={
                                                                    action.href
                                                                }
                                                                navigate={
                                                                    navigate
                                                                }
                                                                className={getActionClassName(
                                                                    action
                                                                )}
                                                                {...(sectionId ===
                                                                undefined
                                                                    ? {}
                                                                    : {
                                                                          onClick:
                                                                              (
                                                                                  event
                                                                              ) => {
                                                                                  event.preventDefault();
                                                                                  onSectionRequest(
                                                                                      sectionId
                                                                                  );
                                                                              },
                                                                      })}
                                                            >
                                                                {action.label}
                                                            </AppLink>
                                                        );
                                                    }
                                                )}
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
                <p
                    ref={terminalPromptMeasureRef}
                    className={joinClassNames(
                        st.heroCommand,
                        st.heroCommandMeasure
                    )}
                >
                    <span className={st.heroPrompt}>$</span>
                </p>
                <p
                    ref={terminalFullMeasureRef}
                    className={joinClassNames(
                        st.heroCommand,
                        st.heroCommandMeasure
                    )}
                >
                    <span className={st.heroPrompt}>$</span>
                    <span className={st.heroCommandMeasureText}>
                        portfolio --open hero
                    </span>
                </p>
            </div>
        </div>
    );
};
