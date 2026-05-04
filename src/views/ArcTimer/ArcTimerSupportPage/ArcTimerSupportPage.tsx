import type { ReactElement } from "react";

import { LayoutContainer } from "../../../components/layout/LayoutContainer";
import { ProjectLogoMark } from "../../../components/projects/ProjectLogoMark";
import { ClickToCopy } from "../../../components/ui/ClickToCopy";
import { PageSectionSurface } from "../../../components/ui/PageSectionSurface";
import surface from "../../../components/ui/PageSectionSurface/PageSectionSurface.module.css";
import { project as arcTimerProject } from "../../../data/projects/arc-timer/project.data";
import st from "./ArcTimerSupportPage.module.css";

const APP_VERSION = "1.0.0";
const SUPPORT_EMAIL = "arctimer@filipemendes.dev";

export const ArcTimerSupportPage = (): ReactElement => {
  return (
    <PageSectionSurface>
      <LayoutContainer className={st.layoutContainer}>
        <section className={`${surface.section} ${st.root}`}>
          <header className={st.header}>
            <div className={st.titleRow}>
              <div className={st.projectLogo} aria-hidden="true">
                <ProjectLogoMark logo={arcTimerProject.logo} />
              </div>
              <div className={st.headerIntro}>
                <p className={st.eyebrow}>
                  {arcTimerProject.category} · Support
                </p>
                <h1 className={st.title}>{arcTimerProject.name} Support</h1>
              </div>
            </div>

            <div className={st.headerContent}>
              <p className={st.positioning}>
                This page is the official support channel for Arc Timer.
              </p>
              <p className={st.description}>
                If you have any questions, issues or feedback about the app, you
                can contact support using the email below. I aim to respond
                within 24–48 hours.
              </p>
            </div>
          </header>

          <dl className={st.meta}>
            <div className={st.metaRow}>
              <dt className={st.metaLabel}>Contact</dt>
              <dd className={st.metaValue}>
                <ClickToCopy value={SUPPORT_EMAIL} />
              </dd>
            </div>

            <div className={st.metaRow}>
              <dt className={st.metaLabel}>Version</dt>
              <dd className={st.metaValue}>{APP_VERSION}</dd>
            </div>
          </dl>
        </section>
      </LayoutContainer>
    </PageSectionSurface>
  );
};
