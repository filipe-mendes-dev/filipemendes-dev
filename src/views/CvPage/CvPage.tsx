import type { ReactElement } from "react";

import { LayoutContainer } from "../../components/layout/LayoutContainer";
import { CvPaper } from "./components/CvPaper";
import { CvResumeHeader } from "./components/CvResumeHeader";
import { CvShowcaseHeader } from "./components/CvShowcaseHeader";
import {
  CvEducationSection,
  CvExperienceSection,
  CvLanguagesSection,
  CvProjectsSection,
  // CvPublicationsSection,
  CvSkillsSection,
} from "./components/Sections";
import type {
  CvPageProps,
  CvPresentation,
} from "./CvPage.interfaces";
import st from "./CvPage.module.css";

interface CvSectionsContentProps {
  data: CvPageProps["data"];
  isPrint: boolean;
}

const CvSectionsContent = ({
  data,
  isPrint,
}: CvSectionsContentProps): ReactElement => {
  return (
    <div className={st.contentFlow}>
      <CvEducationSection entries={data.education} hasBottomSeparator />
      <CvExperienceSection
        entries={data.experience}
        hasBottomSeparator={isPrint !== true}
      />
      <CvProjectsSection entries={data.projects} hasBottomSeparator />

      <CvSkillsSection skills={data.skills} hasBottomSeparator />
      <CvLanguagesSection languages={data.languages} />
    </div>
  );
};

const renderHeader = (
  data: CvPageProps["data"],
  presentation: CvPresentation,
): ReactElement => {
  const headerProps = {
    contactLinks: data.contactLinks,
    personalInfo: data.personalInfo,
  };

  if (presentation === "resume") {
    return <CvResumeHeader {...headerProps} />;
  }

  return <CvShowcaseHeader {...headerProps} />;
};

const CvPage = ({ data, presentation }: CvPageProps): ReactElement => {
  return (
    <main className={st.root}>
      <LayoutContainer className={st.previewShell}>
        <CvPaper>
          <div
            className={st.screenDocument}
            data-cv-presentation={presentation}
          >
            {renderHeader(data, presentation)}
            <CvSectionsContent data={data} isPrint={false} />
          </div>

          <div className={st.printDocument}>
            <section
              className={st.printPage}
              data-cv-presentation={presentation}
            >
              {renderHeader(data, presentation)}
              <CvSectionsContent data={data} isPrint />
            </section>
          </div>
        </CvPaper>
      </LayoutContainer>
    </main>
  );
};

export default CvPage;
