export const sectionIds = ['home', 'projects', 'about', 'contact'] as const;

export interface SectionPathMap {
  '/': 'home';
  '/projects': 'projects';
  '/about': 'about';
  '/contact': 'contact';
}

export type SectionId = (typeof sectionIds)[number];

const sectionPathMap: SectionPathMap = {
  '/': 'home',
  '/projects': 'projects',
  '/about': 'about',
  '/contact': 'contact',
};

const normalizeHash = (rawHash: string): string => {
  if (rawHash.length === 0) {
    return '';
  }

  return rawHash.startsWith('#') ? rawHash : `#${rawHash}`;
};

export const isSectionId = (value: string): value is SectionId => {
  return sectionIds.includes(value as SectionId);
};

export const getSectionFromHash = (rawHash: string): SectionId | undefined => {
  const hash = normalizeHash(rawHash);

  if (hash.length < 2) {
    return undefined;
  }

  const hashSection = hash.slice(1).toLowerCase();

  return isSectionId(hashSection) ? hashSection : undefined;
};

export const getSectionFromPath = (path: string): SectionId | undefined => {
  return sectionPathMap[path as keyof SectionPathMap];
};

export const getSectionFromHref = (href: string): SectionId | undefined => {
  const directHashSection = getSectionFromHash(href);

  if (directHashSection !== undefined) {
    return directHashSection;
  }

  const hashIndex = href.indexOf('#');
  const hashSection = hashIndex >= 0 ? getSectionFromHash(href.slice(hashIndex)) : undefined;

  if (hashSection !== undefined) {
    return hashSection;
  }

  return getSectionFromPath(href);
};
