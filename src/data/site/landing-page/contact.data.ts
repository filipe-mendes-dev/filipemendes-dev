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
  email: "mendes.filipe.dev@gmail.com",
  availability:
    "Based in Madeira, Portugal. Available for remote collaboration.",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/mendes-filipe-dev" },
    { label: "GitHub", href: "https://github.com/Flaip10" },
  ],
};
