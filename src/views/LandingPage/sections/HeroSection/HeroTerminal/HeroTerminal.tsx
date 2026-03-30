import { motion } from 'framer-motion';
import { type ReactElement, useEffect, useState } from 'react';

import st from './HeroTerminal.module.css';
import { emphasizedEase, heroMotionConfig, wait } from '../heroMotion';
import type { HeroTerminalProps } from './HeroTerminal.interfaces';

type HeroCommandStage = 'idle' | 'typing' | 'typed' | 'executing' | 'exiting';
const HERO_COMMAND_TEXT = 'portfolio --launch';

export const HeroTerminal = ({ onComplete }: HeroTerminalProps): ReactElement => {
    const [stage, setStage] = useState<HeroCommandStage>('idle');
    const textRevealDuration = heroMotionConfig.typing / 1000;

    useEffect(() => {
        let isCancelled = false;

        const runIntroTimeline = async (): Promise<void> => {
            await wait(heroMotionConfig.beforeTyping);

            if (isCancelled) {
                return;
            }

            setStage('typing');
            await wait(heroMotionConfig.typing);

            if (isCancelled) {
                return;
            }

            setStage('typed');
            await wait(heroMotionConfig.beforeExecute);

            if (isCancelled) {
                return;
            }

            setStage('executing');
            await wait(heroMotionConfig.execute);

            if (isCancelled) {
                return;
            }

            setStage('exiting');
            await wait(heroMotionConfig.terminalExit);

            if (!isCancelled) {
                onComplete?.();
            }
        };

        void runIntroTimeline();

        return () => {
            isCancelled = true;
        };
    }, [onComplete]);

    return (
        <div className={st.root}>
            <motion.div
                className={st.terminalLine}
                data-hero-terminal="true"
                initial={{
                    opacity: 0,
                    y: -10,
                }}
                animate={
                    stage === 'exiting'
                        ? {
                              opacity: 0,
                              y: -8,
                          }
                        : {
                              opacity: 1,
                              y: 0,
                          }
                }
                transition={{
                    duration:
                        stage === 'exiting'
                            ? heroMotionConfig.terminalExit / 1000
                            : heroMotionConfig.terminalEnter / 1000,
                    ease: emphasizedEase,
                }}
                aria-hidden="true"
            >
                <p
                    className={st.command}
                    data-hero-command="true"
                    data-state={stage}
                >
                    <span className={st.prompt}>$</span>
                    <motion.span
                        className={st.commandText}
                        data-hero-command-text="true"
                        initial={false}
                        animate={{
                            width: stage === 'idle' ? '0ch' : `${HERO_COMMAND_TEXT.length}ch`,
                        }}
                        transition={{
                            duration: stage === 'typing' ? textRevealDuration : 0,
                            ease: 'linear',
                        }}
                    >
                        {HERO_COMMAND_TEXT}
                    </motion.span>
                    <motion.span
                        className={st.commandCursor}
                        data-hero-command-cursor="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 360 / 1000,
                            ease: emphasizedEase,
                            repeat: Infinity,
                            repeatType: 'mirror',
                        }}
                        aria-hidden="true"
                    >
                        _
                    </motion.span>
                </p>
            </motion.div>
        </div>
    );
};
