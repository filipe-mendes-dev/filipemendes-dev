import type { ReactElement } from "react";

import { Section } from "../../../components/ui/Section";
import { projectDetail } from "../../../data/projects/benchline-stats";
import {
  DetailBulletList,
  ProjectDetailPage,
  ProjectScreenshotsSection,
  ProjectTechStackSection,
} from "../ProjectDetailPage";
import shared from "../ProjectDetailPage/ProjectDetailPage.module.css";

export const BenchlineStatsPage = (): ReactElement => {
  return (
    <ProjectDetailPage hero={projectDetail.hero}>
      <ProjectScreenshotsSection screenshots={projectDetail.screenshots} />

      <Section
        contentClassName={shared.detailSectionContent}
        id="project-detail-features"
        title="Key Features"
      >
        <DetailBulletList items={projectDetail.keyFeatures} />
      </Section>

      <Section
        contentClassName={shared.detailSectionContent}
        id="project-detail-architecture"
        title="Implementation Details"
      >
        <DetailBulletList items={projectDetail.implementationDetails} />
      </Section>

      <ProjectTechStackSection items={projectDetail.techStack} />
    </ProjectDetailPage>
  );
};
