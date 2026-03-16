import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import {
  getProjectBySlug,
  getProjectSlugs,
  portfolio,
  type ProjectDetail,
} from '../../../data/portfolio';
import { ProjectDetailPage } from '../../../pages/ProjectDetailPage';

interface ProjectDetailRouteParams {
  slug: string;
}

interface ProjectDetailRouteProps {
  params: Promise<ProjectDetailRouteParams>;
}

export const dynamicParams = false;

const getProjectFromParams = async (
  paramsPromise: ProjectDetailRouteProps['params'],
): Promise<ProjectDetail> => {
  const { slug } = await paramsPromise;
  const project = getProjectBySlug(slug);

  if (project === undefined) {
    notFound();
  }

  return project;
};

export const generateStaticParams = (): ProjectDetailRouteParams[] => {
  return getProjectSlugs().map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: ProjectDetailRouteProps): Promise<Metadata> => {
  const project = await getProjectFromParams(params);

  const title = `${project.name} | ${portfolio.siteTitle}`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
};

const ProjectRoute = async ({
  params,
}: ProjectDetailRouteProps): Promise<ReactElement> => {
  const project = await getProjectFromParams(params);

  return <ProjectDetailPage project={project} />;
};

export default ProjectRoute;
