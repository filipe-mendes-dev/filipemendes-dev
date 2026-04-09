import { profileData } from "../profile.data";

export interface SocialLink {
  label: string;
  href: string;
}

export interface ContactData {
  intro: string;
  email: string;
  availability: string;
  socials: SocialLink[];
}

export const contactData: ContactData = {
  intro: "Open to focused frontend, mobile and product architecture work.",
  email: profileData.email,
  availability: `Based in ${profileData.location}. Available for remote collaboration.`,
  socials: profileData.socials.map((entry) => ({
    label: entry.label,
    href: entry.href,
  })),
};
