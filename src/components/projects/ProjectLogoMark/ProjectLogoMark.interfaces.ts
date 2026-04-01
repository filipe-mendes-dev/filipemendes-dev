export interface ProjectLogoImageSet {
  darkTheme: string;
  lightTheme: string;
}

export interface ProjectLogo {
  logoText: string;
  logoIcon?: "document";
  logoImage?: ProjectLogoImageSet;
}

export interface ProjectLogoMarkProps {
  logo: ProjectLogo;
}
