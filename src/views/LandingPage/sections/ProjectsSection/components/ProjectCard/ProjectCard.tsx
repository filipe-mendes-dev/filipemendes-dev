import type { ReactElement } from "react";

import { ExternalLinkIcon } from "../../../../../../components/icons";
import { TextActionLink } from "../../../../../../components/navigation/TextActionLink";
import { ProjectLogoMark } from "../../../../../../components/projects/ProjectLogoMark";
import { SoftSurface } from "../../../../../../components/ui/SoftSurface";
import type { ProjectCardProps } from "./ProjectCard.interfaces";
import st from "./ProjectCard.module.css";

export const ProjectCard = ({ project }: ProjectCardProps): ReactElement => {
  return (
    <SoftSurface className={st.root}>
      <div className={st.header}>
        <div className={st.marker} aria-hidden="true">
          <ProjectLogoMark logo={project.logo} />
        </div>

        <div className={st.heading}>
          <p className={st.category}>{project.category}</p>
          <h2 className={st.title}>{project.name}</h2>
        </div>
      </div>

      <p className={st.description}>{project.description}</p>

      <TextActionLink
        href={project.href}
        className={st.link}
        trailingIcon={<ExternalLinkIcon />}
      >
        View Project Details
      </TextActionLink>
      {project.isProfessional === true ? (
        <span className={st.professionalBadge}>Professional</span>
      ) : null}
    </SoftSurface>
  );
};
