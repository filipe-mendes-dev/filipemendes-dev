import { type SectionId, sectionIds } from '../navigation/sections';

const sectionAttributeName = 'data-landing-section';
const sectionHeadingAttributeName = 'data-landing-section-heading';
const sectionContentAttributeName = 'data-landing-section-content';

export interface LandingPageSectionDefinition {
  hasContentReveal: boolean;
  hasHeadingReveal: boolean;
  sectionId: SectionId;
}

export interface LandingPageResolvedSectionElements {
  content: HTMLElement | null;
  header: HTMLElement | null;
  section: HTMLElement | null;
}

const landingPageSectionDefinitions: readonly LandingPageSectionDefinition[] = [
  {
    hasContentReveal: false,
    hasHeadingReveal: false,
    sectionId: 'home',
  },
  {
    hasContentReveal: true,
    hasHeadingReveal: true,
    sectionId: 'projects',
  },
  {
    hasContentReveal: true,
    hasHeadingReveal: true,
    sectionId: 'about',
  },
  {
    hasContentReveal: true,
    hasHeadingReveal: true,
    sectionId: 'contact',
  },
] as const;

const getSectionDefinition = (
  sectionId: SectionId,
): LandingPageSectionDefinition => {
  const definition = landingPageSectionDefinitions.find((item) => item.sectionId === sectionId);

  if (definition === undefined) {
    throw new Error(`Missing landing-page section definition for "${sectionId}".`);
  }

  return definition;
};

const getSectionSelector = (sectionId: SectionId): string => {
  return `[${sectionAttributeName}="${sectionId}"]`;
};

const getSectionHeadingSelector = (sectionId: SectionId): string => {
  return `[${sectionHeadingAttributeName}="${sectionId}"]`;
};

const getSectionContentSelector = (sectionId: SectionId): string => {
  return `[${sectionContentAttributeName}="${sectionId}"]`;
};

const queryOptionalElement = <TElement extends HTMLElement>(
  parent: ParentNode | null,
  selector: string,
): TElement | null => {
  if (parent === null) {
    return null;
  }

  return parent.querySelector<TElement>(selector);
};

export const resolveLandingPageSectionElements = (
  root: ParentNode = document,
): Record<SectionId, LandingPageResolvedSectionElements> => {
  return sectionIds.reduce<Record<SectionId, LandingPageResolvedSectionElements>>(
    (result, sectionId) => {
      const definition = getSectionDefinition(sectionId);
      const section = root.querySelector<HTMLElement>(getSectionSelector(sectionId));

      result[sectionId] = {
        content: definition.hasContentReveal
          ? queryOptionalElement<HTMLDivElement>(section, getSectionContentSelector(sectionId))
          : null,
        header: definition.hasHeadingReveal
          ? queryOptionalElement<HTMLElement>(section, getSectionHeadingSelector(sectionId))
          : null,
        section,
      };

      return result;
    },
    {} as Record<SectionId, LandingPageResolvedSectionElements>,
  );
};
