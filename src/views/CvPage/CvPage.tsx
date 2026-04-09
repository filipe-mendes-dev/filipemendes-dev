import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { cvData } from "../../data/site/cv/cv.data";
import { CvPaper } from "./components/CvPaper";
import { CvPageHeader } from "./components/CvPageHeader";
import {
  CvEducationSection,
  CvExperienceSection,
  CvLanguagesSection,
  CvProjectsSection,
  CvPublicationsSection,
  CvTechStackSection,
} from "./components/Sections";
import st from "./CvPage.module.css";

const CvPage = (): ReactElement => {
  const firstPrintPageExperience = cvData.experience;

  return (
    <main className={st.root}>
      <LayoutContainer className={st.previewShell}>
        <CvPaper>
          <div className={st.screenDocument}>
            <CvPageHeader />

            <div className={st.columns}>
              <div className={st.primaryColumn}>
                <CvExperienceSection entries={cvData.experience} />
                <CvProjectsSection entries={cvData.projects} />
                <CvEducationSection entries={cvData.education} />
                <CvPublicationsSection entries={cvData.publications} />
              </div>

              <aside className={st.secondaryColumn}>
                <CvTechStackSection skillGroups={cvData.skillGroups} />
                <CvLanguagesSection languages={cvData.languages} />
              </aside>
            </div>
          </div>

          <div className={st.printDocument}>
            <section className={st.printPage}>
              <CvPageHeader />

              <div className={st.columns}>
                <div className={st.primaryColumn}>
                  <CvExperienceSection entries={firstPrintPageExperience} />
                  <CvProjectsSection entries={cvData.projects} />
                  <CvEducationSection entries={cvData.education} />
                  <CvPublicationsSection entries={cvData.publications} />
                </div>

                <aside className={st.secondaryColumn}>
                  <CvTechStackSection skillGroups={cvData.skillGroups} />
                  <CvLanguagesSection languages={cvData.languages} />
                </aside>
              </div>
            </section>
          </div>
        </CvPaper>
      </LayoutContainer>
    </main>
  );
};

export default CvPage;
