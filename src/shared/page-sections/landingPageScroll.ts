export const scrollArrivalTolerancePx = 2;

export const getHeaderOffset = (): number => {
  const rootStyles = window.getComputedStyle(document.documentElement);
  const headerOffsetValue = Number.parseFloat(rootStyles.getPropertyValue('--header-offset'));
  const safeHeaderOffset = Number.isFinite(headerOffsetValue) ? headerOffsetValue : 72;

  return safeHeaderOffset;
};

const getMaxScrollTop = (): number => {
  const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  return Math.max(documentHeight - window.innerHeight, 0);
};

export const getSectionTargetTop = (sectionElement: HTMLElement): number => {
  const sectionTop = sectionElement.getBoundingClientRect().top + window.scrollY;

  return Math.min(Math.max(sectionTop - getHeaderOffset(), 0), getMaxScrollTop());
};

export const hasReachedTarget = (targetTop: number): boolean => {
  return Math.abs(window.scrollY - targetTop) <= scrollArrivalTolerancePx;
};

export const scrollToTop = ({
  shouldSmoothScroll,
  targetTop,
}: {
  shouldSmoothScroll: boolean;
  targetTop: number;
}): void => {
  if (hasReachedTarget(targetTop)) {
    return;
  }

  window.scrollTo({
    top: targetTop,
    behavior: shouldSmoothScroll ? 'smooth' : 'auto',
  });
};
