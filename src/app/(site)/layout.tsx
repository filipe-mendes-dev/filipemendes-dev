import type { ReactElement, ReactNode } from "react";

import { Footer } from "../../components/layout/Footer/Footer";
import { Header } from "../../components/layout/Header/Header";
import { getShellViewModel } from "../../data/view-models/shell.view-model";
import st from "../layout.module.css";

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = ({
  children,
}: SiteLayoutProps): ReactElement => {
  const shellViewModel = getShellViewModel();
  const linkedInUrl = shellViewModel.footerSocials.find(
    (social) => social.label === "LinkedIn",
  )?.href;
  const githubUrl = shellViewModel.footerSocials.find(
    (social) => social.label === "GitHub",
  )?.href;

  return (
    <>
      <Header
        navigation={shellViewModel.navigation}
        siteTitle={shellViewModel.siteTitle}
      />
      <main className={st.main}>{children}</main>
      <Footer
        descriptor={shellViewModel.descriptor}
        githubUrl={githubUrl}
        linkedInUrl={linkedInUrl}
        name={shellViewModel.siteTitle}
      />
    </>
  );
};

export default SiteLayout;
