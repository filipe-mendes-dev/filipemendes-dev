"use client";

import { animate, motion, type PanInfo, useMotionValue } from "framer-motion";
import {
  type CSSProperties,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ProjectScreenshotsCarouselItem,
  ProjectScreenshotsCarouselProps,
} from "./ProjectScreenshotsCarousel.interfaces";
import st from "./ProjectScreenshotsCarousel.module.css";

const SWIPE_VELOCITY_THRESHOLD = 500;
const SWIPE_DISTANCE_RATIO = 0.3;
const CLICK_SUPPRESSION_DISTANCE_PX = 8;
const SLIDE_GAP_PX = 16;

const BREAKPOINTS = {
  desktop: 1024,
  tablet: 768,
} as const;

const ChevronBackIcon = (): ReactElement => {
  return (
    <svg aria-hidden="true" className={st.arrowIcon} viewBox="0 0 512 512">
      <path
        d="M328 112L184 256l144 144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
    </svg>
  );
};

const ChevronForwardIcon = (): ReactElement => {
  return (
    <svg aria-hidden="true" className={st.arrowIcon} viewBox="0 0 512 512">
      <path
        d="M184 112l144 144-144 144"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
    </svg>
  );
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const ProjectScreenshotsCarousel = ({
  items,
  onSelect,
}: ProjectScreenshotsCarouselProps): ReactElement | null => {
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const didDragRef = useRef(false);
  const x = useMotionValue(0);
  const maxIndex = Math.max(0, items.length - slidesToShow);
  const clampedIndex = clamp(index, 0, maxIndex);

  useEffect(() => {
    const updateLayout = (): void => {
      const width = window.innerWidth;
      const nextContainerWidth = containerRef.current?.offsetWidth ?? null;

      setContainerWidth(nextContainerWidth);

      if (width >= BREAKPOINTS.desktop) {
        setSlidesToShow(Math.min(3, items.length));
        return;
      }

      if (width >= BREAKPOINTS.tablet) {
        setSlidesToShow(Math.min(2, items.length));
        return;
      }

      setSlidesToShow(1);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, [items.length]);

  useEffect(() => {
    if (!isDragging && containerWidth !== null) {
      const slideWidth =
        (containerWidth - SLIDE_GAP_PX * Math.max(slidesToShow - 1, 0)) /
        slidesToShow;
      const targetX = -clampedIndex * (slideWidth + SLIDE_GAP_PX);
      const controls = animate(x, targetX, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });

      return () => {
        controls.stop();
      };
    }

    return undefined;
  }, [clampedIndex, containerWidth, isDragging, slidesToShow, x]);

  if (items.length === 0) {
    return null;
  }

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    setIsDragging(false);

    const measuredContainerWidth =
      containerWidth ?? containerRef.current?.offsetWidth ?? null;

    if (measuredContainerWidth === null) {
      return;
    }

    const slideWidth =
      (measuredContainerWidth - SLIDE_GAP_PX * Math.max(slidesToShow - 1, 0)) /
      slidesToShow;
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    let nextIndex = clampedIndex;

    if (Math.abs(velocity) > SWIPE_VELOCITY_THRESHOLD) {
      nextIndex = velocity > 0 ? clampedIndex - 1 : clampedIndex + 1;
    } else if (Math.abs(offset) > slideWidth * SWIPE_DISTANCE_RATIO) {
      nextIndex = offset > 0 ? clampedIndex - 1 : clampedIndex + 1;
    }

    setIndex(clamp(nextIndex, 0, maxIndex));
  };

  const handleCardClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
    itemIndex: number
  ): void => {
    if (didDragRef.current) {
      event.preventDefault();
      event.stopPropagation();
      didDragRef.current = false;
      return;
    }

    onSelect(itemIndex);
  };

  const slideWidth =
    containerWidth === null
      ? null
      : (containerWidth - SLIDE_GAP_PX * Math.max(slidesToShow - 1, 0)) /
        slidesToShow;

  return (
    <div className={st.root}>
      <div className={st.viewport} ref={containerRef}>
        <motion.div
          className={st.track}
          drag="x"
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={() => {
            setIsDragging(true);
            didDragRef.current = false;
          }}
          onDrag={(_event, info) => {
            if (Math.abs(info.offset.x) > CLICK_SUPPRESSION_DISTANCE_PX) {
              didDragRef.current = true;
            }
          }}
          onDragEnd={handleDragEnd}
          style={{ x }}
        >
          {items.map((item: ProjectScreenshotsCarouselItem, itemIndex) => (
            <div
              key={`${item.url}-${itemIndex}`}
              className={st.slide}
              style={
                slideWidth === null
                  ? undefined
                  : ({ width: `${slideWidth}px` } as CSSProperties)
              }
            >
              <button
                type="button"
                className={st.slideButton}
                onClick={(event) => handleCardClick(event, itemIndex)}
                onPointerDown={() => {
                  didDragRef.current = false;
                }}
                onDragStart={(event) => event.preventDefault()}
                aria-label={`Open screenshot ${itemIndex + 1}: ${item.alt}`}
              >
                <span className={st.media}>
                  <img
                    src={item.url}
                    alt={item.alt}
                    className={st.image}
                    draggable={false}
                    onDragStart={(event) => event.preventDefault()}
                    loading="lazy"
                    width="1200"
                    height="750"
                  />
                </span>
              </button>
            </div>
          ))}
        </motion.div>

        <button
          type="button"
          aria-label="Show previous screenshots"
          className={`${st.arrowButton} ${st.arrowButtonPrev}`}
          disabled={clampedIndex === 0}
          onClick={() => setIndex(Math.max(0, clampedIndex - 1))}
        >
          <ChevronBackIcon />
        </button>

        <button
          type="button"
          aria-label="Show next screenshots"
          className={`${st.arrowButton} ${st.arrowButtonNext}`}
          disabled={clampedIndex === maxIndex}
          onClick={() => setIndex(Math.min(maxIndex, clampedIndex + 1))}
        >
          <ChevronForwardIcon />
        </button>
      </div>

      {maxIndex > 0 && (
        <div className={st.footer}>
          <div className={st.dots} aria-label="Carousel positions" role="group">
            {Array.from({ length: maxIndex + 1 }, (_, itemIndex) => (
              <button
                key={`dot-${itemIndex}`}
                type="button"
                className={st.dotButton}
                data-active={itemIndex === clampedIndex}
                onClick={() => setIndex(itemIndex)}
                aria-label={`Go to screenshot ${itemIndex + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
