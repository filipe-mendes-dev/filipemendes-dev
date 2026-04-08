import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { cvData } from "../../data/site/cv/cv.data";
import { CvPaper } from "./components/CvPaper";
import { CvPageHeader } from "./components/CvPageHeader";
import {
  CvContactSection,
  CvEducationSection,
  CvExperienceSection,
  CvLanguagesSection,
  CvProfileSection,
  CvTechStackSection,
} from "./components/Sections";
import st from "./CvPage.module.css";

const CvPage = (): ReactElement => {
  const firstPrintPageExperience = cvData.experience.slice(0, 2);
  const secondPrintPageExperience = cvData.experience.slice(2);

  return (
    <main className={st.root}>
      <LayoutContainer className={st.previewShell}>
        <CvPaper>
          <div className={st.screenDocument}>
            <CvPageHeader />

            <div className={st.columns}>
              <div className={st.primaryColumn}>
                <CvProfileSection items={cvData.profileItems} />
                <CvExperienceSection entries={cvData.experience} />
                <CvEducationSection entries={cvData.education} />
              </div>

              <aside className={st.secondaryColumn}>
                <CvContactSection contactLinks={cvData.contactLinks} />
                <CvTechStackSection skillGroups={cvData.skillGroups} />
                <CvLanguagesSection languages={cvData.languages} />
              </aside>
            </div>
          </div>

          <div className={st.printDocument}>
            <section className={st.printPage}>
              <CvPageHeader />

              <div className={st.printColumns}>
                <div className={st.printPrimaryColumn}>
                  <CvProfileSection items={cvData.profileItems} />
                  <CvExperienceSection entries={firstPrintPageExperience} />
                </div>

                <aside className={st.printSecondaryColumn}>
                  <CvContactSection contactLinks={cvData.contactLinks} />
                  <CvTechStackSection skillGroups={cvData.skillGroups} />
                </aside>
              </div>
            </section>

            <section className={st.printPage}>
              <div className={st.printColumns}>
                <div className={st.printPrimaryColumn}>
                  {secondPrintPageExperience.length > 0 &&
                    <CvExperienceSection entries={secondPrintPageExperience} />}
                  <CvEducationSection entries={cvData.education} />
                </div>

                <aside className={st.printSecondaryColumn}>
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
