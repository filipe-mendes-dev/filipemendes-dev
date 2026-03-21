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
  intro:
    "I work across frontend web platforms, mobile applications, and machine learning systems. The best way to reach me is by email or LinkedIn.",
  email: "mendes.filipe.dev@gmail.com",
  availability: "Based in Madeira, Portugal.",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/mendes-filipe-dev" },
    { label: "GitHub", href: "https://github.com/Flaip10" },
  ],
};
