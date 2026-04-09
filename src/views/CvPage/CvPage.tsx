import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { cvData } from "../../data/site/cv/cv.data";
import { CvPaper } from "./components/CvPaper";
import { CvPageHeader } from "./components/CvPageHeader";
import {
  CvEducationSection,
  CvExperienceSection,
  CvLanguagesSection,
  CvProfileSection,
  CvTechStackSection,
} from "./components/Sections";
import st from "./CvPage.module.css";

const CvPage = (): ReactElement => {
  const firstPrintPageExperience = cvData.experience;
  const hasSecondPrintPage =
    cvData.profileItems.length > 0 ||
    cvData.education.length > 0 ||
    cvData.languages.length > 0;

  return (
    <main className={st.root}>
      <LayoutContainer className={st.previewShell}>
        <CvPaper>
          <div className={st.screenDocument}>
            <CvPageHeader />

            <div className={st.columns}>
              <div className={st.primaryColumn}>
                {/* <CvProfileSection items={cvData.profileItems} /> */}
                <CvExperienceSection entries={cvData.experience} />
                <CvEducationSection entries={cvData.education} />
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
                </div>

                <aside className={st.secondaryColumn}>
                  <CvTechStackSection skillGroups={cvData.skillGroups} />
                </aside>
              </div>
            </section>

            {hasSecondPrintPage && (
              <section className={st.printPage}>
                <div className={st.columns}>
                  <div className={st.primaryColumn}>
                    <CvProfileSection items={cvData.profileItems} />
                    <CvEducationSection entries={cvData.education} />
                  </div>

                  <aside className={st.secondaryColumn}>
                    <CvLanguagesSection languages={cvData.languages} />
                  </aside>
                </div>
              </section>
            )}
          </div>
        </CvPaper>
      </LayoutContainer>
    </main>
  );
};

export default CvPage;
