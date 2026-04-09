import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { cvData } from "../../data/site/cv/cv.adapter";
import { CvPaper } from "./components/CvPaper";
import { CvPageHeader } from "./components/CvPageHeader";
import {
  CvEducationSection,
  CvExperienceSection,
  CvLanguagesSection,
  CvProjectsSection,
  CvPublicationsSection,
} from "./components/Sections";
import st from "./CvPage.module.css";

const CvPage = (): ReactElement => {
  return (
    <main className={st.root}>
      <LayoutContainer className={st.previewShell}>
        <CvPaper>
          <div className={st.screenDocument}>
            <CvPageHeader />

            <div className={st.contentFlow}>
              <CvExperienceSection
                entries={cvData.experience}
                hasBottomSeparator
              />
              <CvProjectsSection entries={cvData.projects} hasBottomSeparator />
              <CvEducationSection
                entries={cvData.education}
                hasBottomSeparator
              />
              <CvPublicationsSection
                entries={cvData.publications}
                hasBottomSeparator
              />
              <CvLanguagesSection languages={cvData.languages} />
            </div>
          </div>

          <div className={st.printDocument}>
            <section className={st.printPage}>
              <CvPageHeader />

              <div className={st.contentFlow}>
                <CvExperienceSection entries={cvData.experience} />
                <CvProjectsSection
                  entries={cvData.projects}
                  hasBottomSeparator
                />
                <CvEducationSection
                  entries={cvData.education}
                  hasBottomSeparator
                />
                <CvPublicationsSection
                  entries={cvData.publications}
                  hasBottomSeparator
                />
                <CvLanguagesSection languages={cvData.languages} />
              </div>
            </section>
          </div>
        </CvPaper>
      </LayoutContainer>
    </main>
  );
};

export default CvPage;
