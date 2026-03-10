export const sectionIds = ['home', 'projects', 'about', 'contact'] as const;

export type SectionId = (typeof sectionIds)[number];

export const isSectionId = (value: string): value is SectionId => {
  return sectionIds.includes(value as SectionId);
};
