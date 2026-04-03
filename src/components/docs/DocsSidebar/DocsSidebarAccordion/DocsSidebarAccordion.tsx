import { motion, stagger, type Variants } from "framer-motion";
import type { ReactElement } from "react";

import {
  motionDurationMs,
  motionEase,
  motionStaggerMs,
} from "../../../../shared/theme/motion";
import { DocsSidebarNavItem } from "../DocsSidebarNavItem";
import { DocsSidebarAccordionToggle } from "./DocsSidebarAccordionToggle";
import type { DocsSidebarAccordionProps } from "./DocsSidebarAccordion.interfaces";
import st from "./DocsSidebarAccordion.module.css";

const listVariants: Variants = {
  collapsed: {
    height: 0,
    transition: {
      delay: motionStaggerMs.tight / 1000,
      delayChildren: stagger(motionStaggerMs.tight / 1000, {
        from: "last",
      }),
    },
  },
  expanded: {
    height: "auto",
    transition: {
      delayChildren: stagger(motionStaggerMs.tight / 1000, {
        startDelay: motionStaggerMs.tight / 1000,
        from: "first",
      }),
    },
  },
};

const itemVariants: Variants = {
  collapsed: {
    opacity: 0,
    transition: {
      duration: motionDurationMs.fast / 1000,
      ease: motionEase.emphasized,
    },
  },
  expanded: {
    opacity: 1,
    transition: {
      duration: motionDurationMs.medium / 1000,
      ease: motionEase.emphasized,
    },
  },
};

export const DocsSidebarAccordion = ({
  isExpanded,
  items,
  label,
  onItemClick,
  onToggle,
}: DocsSidebarAccordionProps): ReactElement => {
  return (
    <motion.div className={st.root}>
      <DocsSidebarAccordionToggle
        isExpanded={isExpanded}
        label={label}
        onToggle={onToggle}
      />
      <motion.ul
        animate={isExpanded ? "expanded" : "collapsed"}
        aria-hidden={!isExpanded}
        className={st.list}
        variants={listVariants}
      >
        {items.map((item) => (
          <motion.li variants={itemVariants} key={item.label}>
            <DocsSidebarNavItem
              logo={item.logo}
              compactLabel={item.compactLabel}
              href={item.href}
              isActive={item.isActive}
              isHighlighted={item.isHighlighted}
              isNested
              label={item.label}
              onClick={onItemClick}
            />
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};
