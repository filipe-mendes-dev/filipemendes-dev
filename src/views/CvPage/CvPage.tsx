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
import type { CvPageProps, CvPresentation } from "./CvPage.interfaces";
import st from "./CvPage.module.css";
// import { publicationsData } from "@data/site/publications.data";

interface CvSectionsContentProps {
  data: CvPageProps["data"];
}

const CvSectionsContent = ({
  data,
}: CvSectionsContentProps): ReactElement => {
  return (
    <div className={st.contentFlow}>
      <CvExperienceSection
        entries={data.experience}
        hasBottomSeparator
      />
      <CvEducationSection entries={data.education} hasBottomSeparator />
      <CvProjectsSection entries={data.projects} hasBottomSeparator />

      <CvSkillsSection skills={data.skills} hasBottomSeparator />
      {/* <CvPublicationsSection entries={publicationsData}></CvPublicationsSection> */}
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
    return (
      <div className={st.introduction}>
        <CvResumeHeader {...headerProps} />
        {data.personalInfo.summary !== undefined && (
          <p className={st.summary}>{data.personalInfo.summary}</p>
        )}
      </div>
    );
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
            <CvSectionsContent data={data} />
          </div>

          <div className={st.printDocument}>
            <section
              className={st.printPage}
              data-cv-presentation={presentation}
            >
              {renderHeader(data, presentation)}
              <CvSectionsContent data={data} />
            </section>
          </div>
        </CvPaper>
      </LayoutContainer>
    </main>
  );
};

export default CvPage;
