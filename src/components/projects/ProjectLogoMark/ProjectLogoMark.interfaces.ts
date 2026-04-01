export interface ProjectLogoImageSet {
  darkTheme: string;
  lightTheme: string;
}

export interface ProjectLogo {
  logoText: string;
  logoImage?: ProjectLogoImageSet;
}

export interface ProjectLogoMarkProps {
  logo: ProjectLogo;
}
