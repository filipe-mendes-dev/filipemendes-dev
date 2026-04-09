export interface ProfileSocialLink {
  label: string;
  href: string;
  displayValue: string;
  kind: "github" | "linkedin";
}

export interface ProfileWebsiteLink {
  href: string;
  displayValue: string;
}

export interface ProfileData {
  name: string;
  location: string;
  email: string;
  website: ProfileWebsiteLink;
  socials: ProfileSocialLink[];
}

export const profileData: ProfileData = {
  name: "Filipe Mendes",
  location: "Madeira, Portugal",
  email: "contact@filipemendes.dev",
  website: {
    href: "https://filipemendes.dev",
    displayValue: "filipemendes.dev",
  },
  socials: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/mendes-filipe-dev",
      displayValue: "mendes-filipe-dev",
      kind: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/filipe-mendes-dev",
      displayValue: "filipe-mendes-dev",
      kind: "github",
    },
  ],
};
