import type { ReactElement, ReactNode } from "react";

import { Footer } from "../../components/layout/Footer/Footer";
import { Header } from "../../components/layout/Header/Header";
import { portfolio } from "../../data/portfolio";
import st from "../layout.module.css";

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = ({
  children,
}: SiteLayoutProps): ReactElement => {
  const linkedInUrl = portfolio.contact.socials.find(
    (social) => social.label === "LinkedIn",
  )?.href;
  const githubUrl = portfolio.contact.socials.find(
    (social) => social.label === "GitHub",
  )?.href;

  return (
    <>
      <Header
        navigation={portfolio.navigation}
        siteTitle={portfolio.siteTitle}
      />
      <main className={st.main}>{children}</main>
      <Footer
        descriptor={portfolio.descriptor}
        githubUrl={githubUrl}
        linkedInUrl={linkedInUrl}
        name={portfolio.siteTitle}
      />
    </>
  );
};

export default SiteLayout;
