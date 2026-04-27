import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { educationData } from "../../data/site/education.data";
import { experienceData } from "../../data/site/experience.data";
import { publicationsData } from "../../data/site/publications.data";
import { cvData } from "../../data/site/cv/cv.data";
import { CvPaper } from "./components/CvPaper";
import { CvPageHeader } from "./components/CvPageHeader";
import {
  CvEducationSection,
  CvExperienceSection,
  CvLanguagesSection,
  CvProjectsSection,
  CvPublicationsSection,
  CvSkillsSection,
} from "./components/Sections";
import st from "./CvPage.module.css";

interface CvSectionsContentProps {
  isPrint: boolean;
}

const CvSectionsContent = ({
  isPrint,
}: CvSectionsContentProps): ReactElement => {
  return (
    <div className={st.contentFlow}>
      <CvExperienceSection
        entries={experienceData}
        hasBottomSeparator={isPrint !== true}
      />
      <CvProjectsSection entries={cvData.projects} hasBottomSeparator />
      <CvEducationSection entries={educationData} hasBottomSeparator />
      <CvSkillsSection skills={cvData.skills} hasBottomSeparator />
      <CvPublicationsSection
        entries={publicationsData}
        hasBottomSeparator
      />
      <CvLanguagesSection languages={cvData.languages} />
    </div>
  );
};

const CvPage = (): ReactElement => {
  return (
    <main className={st.root}>
      <LayoutContainer className={st.previewShell}>
        <CvPaper>
          <div className={st.screenDocument}>
            <CvPageHeader />
            <CvSectionsContent isPrint={false} />
          </div>

          <div className={st.printDocument}>
            <section className={st.printPage}>
              <CvPageHeader />
              <CvSectionsContent isPrint />
            </section>
          </div>
        </CvPaper>
      </LayoutContainer>
    </main>
  );
};

export default CvPage;
