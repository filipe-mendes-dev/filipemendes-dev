import { motion, stagger, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactElement, useRef, useState } from 'react';

import { AppLink } from '../../components/navigation/AppLink';
import { Section } from '../../components/ui/Section';
import type { ActionLink } from '../../data/portfolio';
import su from '../../shared/styles/utilities.module.css';
import { HeroTerminal } from './HeroTerminal';
import { HeroWindow } from './HeroWindow';
import type { HomePageProps } from './HomePage.interfaces';
import st from './HomePage.module.css';
import { heroMotionConfig } from './heroMotion';

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

export const HomePage = ({ content, navigate, onSectionRequest, revealRef }: HomePageProps): ReactElement => {
    const isReducedMotionEnabled = useReducedMotion() ?? false;
    const hasCompletedSequenceRef = useRef<boolean>(false);
    const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(!isReducedMotionEnabled);
    const [isContentVisible, setIsContentVisible] = useState<boolean>(isReducedMotionEnabled);

    const isContentShown = isReducedMotionEnabled || isContentVisible;
    const handleTerminalComplete = (): void => {
        if (hasCompletedSequenceRef.current) {
            return;
        }

        setIsTerminalVisible(false);
        setIsContentVisible(true);
        hasCompletedSequenceRef.current = true;
    };
    const revealItemVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: isReducedMotionEnabled ? 0 : heroMotionConfig.contentEnter / 1000,
                ease: 'easeOut',
            },
        },
    };

    const copyVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: isReducedMotionEnabled ? 0 : stagger(heroMotionConfig.contentStagger / 1000),
            },
        },
    };
    const mediaVariants: Variants = {
        hidden: {
            opacity: 0,
            x: -20,
            scale: 0.96,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: isReducedMotionEnabled ? 0 : heroMotionConfig.mediaEnter / 1000,
                ease: 'easeOut',
            },
        },
    };

    return (
        <div className={st.root}>
            <Section className={st.heroSection}>
                <div className={st.heroWindowStage}>
                    <HeroWindow isContentVisible={isContentShown} {...(revealRef === undefined ? {} : { revealRef })}>
                        {isTerminalVisible ? <HeroTerminal onComplete={handleTerminalComplete} /> : null}
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
                                    className={st.heroRevealItem}
                                    data-hero-copy-item="true"
                                    variants={revealItemVariants}
                                >
                                    <span className={st.heroKicker}>Engineering Portfolio</span>
                                </motion.p>
                                <motion.h1
                                    className={st.heroTitle}
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
                    </HeroWindow>
                </div>
            </Section>
        </div>
    );
};
