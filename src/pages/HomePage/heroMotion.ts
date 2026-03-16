export interface HeroMotionConfig {
    afterWindow: number;
    terminalEnter: number;
    beforeTyping: number;
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

export const heroMotionConfig: HeroMotionConfig = {
    afterWindow: 120,
    terminalEnter: 240,
    beforeTyping: 360,
    typing: 600,
    beforeExecute: 0,
    execute: 600,
    terminalExit: 240,
    beforeExpand: 0,
    grow: 480,
    contentDelayFromGrowStart: 0,
    contentStagger: 120,
    contentEnter: 360,
    mediaEnter: 360,
};

export const emphasizedEase = [0.16, 1, 0.3, 1] as const;

const COLLAPSED_HEIGHT_MIN_REM = 6.75;
const COLLAPSED_HEIGHT_MAX_REM = 8.75;
const COLLAPSED_HEIGHT_VIEWPORT_RATIO = 0.12;

const getRootFontSize = (): number => {
    if (typeof window === 'undefined') {
        return 16;
    }

    const computedFontSize = window.getComputedStyle(document.documentElement).fontSize;
    const parsedFontSize = Number.parseFloat(computedFontSize);

    return Number.isNaN(parsedFontSize) ? 16 : parsedFontSize;
};

export const getCollapsedHeight = (): number => {
    if (typeof window === 'undefined') {
        return 160;
    }

    const rootFontSize = getRootFontSize();
    const minHeight = COLLAPSED_HEIGHT_MIN_REM * rootFontSize;
    const maxHeight = COLLAPSED_HEIGHT_MAX_REM * rootFontSize;
    const preferredHeight = window.innerWidth * COLLAPSED_HEIGHT_VIEWPORT_RATIO;

    return Math.min(Math.max(preferredHeight, minHeight), maxHeight);
};

export const wait = (durationMs: number): Promise<void> =>
    new Promise((resolve) => {
        window.setTimeout(resolve, durationMs);
    });
