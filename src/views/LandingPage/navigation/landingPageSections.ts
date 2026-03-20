import { type SectionId, sectionIds } from '../../../shared/navigation/sections';

const sectionAttributeName = 'data-landing-section';

interface OrderedLandingPageSectionElement {
  element: HTMLElement;
  sectionId: SectionId;
}

const getSectionSelector = (sectionId: SectionId): string => {
  return `[${sectionAttributeName}="${sectionId}"]`;
};

export const getLandingPageSectionElement = (
  sectionId: SectionId,
  root: ParentNode = document,
): HTMLElement | null => {
  return root.querySelector<HTMLElement>(getSectionSelector(sectionId));
};

export const getOrderedLandingPageSectionElements = (
  root: ParentNode = document,
): OrderedLandingPageSectionElement[] => {
  return sectionIds
    .map((sectionId) => {
      const element = getLandingPageSectionElement(sectionId, root);

      if (element === null) {
        return null;
      }

      return {
        element,
        sectionId,
      };
    })
    .filter((section): section is OrderedLandingPageSectionElement => {
      return section !== null;
    })
    .sort((leftSection, rightSection) => {
      return leftSection.element.offsetTop - rightSection.element.offsetTop;
    });
};
