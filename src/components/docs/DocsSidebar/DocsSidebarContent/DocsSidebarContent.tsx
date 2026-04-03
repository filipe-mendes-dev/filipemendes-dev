import { LayoutGroup, motion, stagger, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactElement, useState } from "react";

import { motionDurationMs, motionEase } from "../../../../shared/theme/motion";
import type { ProjectLogo } from "../../../../components/projects/ProjectLogoMark";
import { DocsSidebarAccordion } from "../DocsSidebarAccordion";
import { DocsSidebarFooter } from "../DocsSidebarFooter";
import { DocsSidebarNavItem } from "../DocsSidebarNavItem";
import type { DocsSidebarContentProps } from "./DocsSidebarContent.interfaces";
import st from "./DocsSidebarContent.module.css";

const getDocHref = (docSlug: string): string => `/docs/${docSlug}`;

const getProjectHref = (projectSlug: string): string =>
  `/docs/projects/${projectSlug}`;

const documentLogo: ProjectLogo = {
  logoIcon: "document",
};

const homeLogo: ProjectLogo = {
  logoIcon: "home",
};

const mobileBodyVariants: Variants = {
  hidden: {
    height: 0,
    transition: {
      duration: motionDurationMs.medium / 1000,
      ease: motionEase.standard,
      delayChildren: stagger(0.06),
    },
  },
  visible: {
    height: "calc(100dvh - var(--docs-sidebar-mobile-header-height))",
    transition: {
      duration: motionDurationMs.medium / 1000,
      ease: motionEase.emphasized,
      delayChildren: stagger(0.12, { startDelay: 0.12 }),
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: motionDurationMs.medium / 1000,
      ease: motionEase.standard,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.12,
      ease: motionEase.emphasized,
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
  const projectItems = projects.map((project) => {
    const href = getProjectHref(project.slug);

    return {
      logo: project.logo,
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
      logo: document.logo ?? documentLogo,
    };
  });

  const content = (
    <nav aria-label="Documentation navigation" className={st.nav}>
      <ul className={st.navList}>
        <li>
          <DocsSidebarNavItem
            href="/docs"
            isActive={isHomeActive}
            label="Home"
            logo={homeLogo}
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
  );

  return (
    <div className={st.root}>
      <div className={st.desktopBody}>
        <div className={st.navScroller}>{content}</div>
        <DocsSidebarFooter descriptor={descriptor} siteTitle={siteTitle} />
      </div>

      <motion.div
        animate={isMobileOpen ? "visible" : "hidden"}
        aria-hidden={!isMobileOpen}
        className={st.mobileBody}
        initial={false}
        variants={mobileBodyVariants}
      >
        <motion.div
          className={st.navScroller}
          initial={false}
          variants={itemVariants}
        >
          {content}
        </motion.div>
        <motion.div initial={false} variants={itemVariants}>
          <DocsSidebarFooter descriptor={descriptor} siteTitle={siteTitle} />
        </motion.div>
      </motion.div>
    </div>
  );
};
