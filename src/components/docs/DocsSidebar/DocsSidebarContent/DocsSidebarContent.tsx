"use client";

import { LayoutGroup, motion, stagger, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactElement, useState } from "react";

import { DocsSidebarAccordion } from "../DocsSidebarAccordion";
import { DocsSidebarFooter } from "../DocsSidebarFooter";
import { DocsSidebarNavItem } from "../DocsSidebarNavItem";
import type { DocsSidebarContentProps } from "./DocsSidebarContent.interfaces";
import st from "./DocsSidebarContent.module.css";

const getDocHref = (docSlug: string): string => `/docs/${docSlug}`;

const getProjectHref = (projectSlug: string): string =>
  `/docs/projects/${projectSlug}`;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: stagger(0.06, { startDelay: 0.08 }),
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const DocsSidebarContent = ({
  descriptor,
  featuredDocs,
  isMobileOpen,
  onClose,
  projects,
  siteTitle,
}: DocsSidebarContentProps): ReactElement => {
  const pathname = usePathname() ?? "/docs";
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isFeaturedOpen, setIsFeaturedOpen] = useState(true);
  const isHomeActive = pathname === "/docs";
  const contentAnimationKey = isMobileOpen ? "mobile-open" : "default";
  const projectItems = projects.map((project) => {
    const href = getProjectHref(project.slug);

    return {
      href,
      isActive: pathname === href || pathname.startsWith(`${href}/`),
      label: project.name,
    };
  });
  const featuredItems = featuredDocs.map((document) => {
    const href = getDocHref(document.slug);

    return {
      href,
      isActive: pathname === href,
      label: document.title,
    };
  });

  return (
    <motion.div
      animate="visible"
      className={st.root}
      initial={isMobileOpen ? "hidden" : false}
      key={contentAnimationKey}
      variants={containerVariants}
    >
      <motion.div className={st.navScroller} variants={itemVariants}>
        <nav aria-label="Documentation navigation" className={st.nav}>
          <ul className={st.navList}>
            <li>
              <DocsSidebarNavItem
                compactLabel="H"
                href="/docs"
                isActive={isHomeActive}
                label="Home"
                onClick={onClose}
              />
            </li>
          </ul>

          <LayoutGroup>
            <DocsSidebarAccordion
              isExpanded={isFeaturedOpen}
              items={featuredItems}
              label="Featured"
              onItemClick={onClose}
              onToggle={() => {
                setIsFeaturedOpen((currentValue) => !currentValue);
              }}
            />
            <DocsSidebarAccordion
              isExpanded={isProjectsOpen}
              items={projectItems}
              label="Projects"
              onItemClick={onClose}
              onToggle={() => {
                setIsProjectsOpen((currentValue) => !currentValue);
              }}
            />
          </LayoutGroup>
        </nav>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DocsSidebarFooter descriptor={descriptor} siteTitle={siteTitle} />
      </motion.div>
    </motion.div>
  );
};
