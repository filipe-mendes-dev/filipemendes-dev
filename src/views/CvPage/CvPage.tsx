import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { educationData } from "../../data/site/education.data";
import { experienceData } from "../../data/site/experience.data";
import { publicationsData } from "../../data/site/publications.data";
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
                entries={experienceData}
                hasBottomSeparator
              />
              <CvProjectsSection entries={cvData.projects} hasBottomSeparator />
              <CvEducationSection
                entries={educationData}
                hasBottomSeparator
              />
              <CvPublicationsSection
                entries={publicationsData}
                hasBottomSeparator
              />
              <CvLanguagesSection languages={cvData.languages} />
            </div>
          </div>

          <div className={st.printDocument}>
            <section className={st.printPage}>
              <CvPageHeader />

              <div className={st.contentFlow}>
                <CvExperienceSection entries={experienceData} />
                <CvProjectsSection
                  entries={cvData.projects}
                  hasBottomSeparator
                />
                <CvEducationSection
                  entries={educationData}
                  hasBottomSeparator
                />
                <CvPublicationsSection
                  entries={publicationsData}
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
