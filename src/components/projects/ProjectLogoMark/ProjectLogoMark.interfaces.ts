export interface ProjectLogoImageSet {
  darkTheme: string;
  lightTheme: string;
}

export interface ProjectLogo {
  logoText: string;
  logoIcon?: "document" | "home";
  logoImage?: ProjectLogoImageSet;
}

export interface ProjectLogoMarkProps {
  isFilled?: boolean;
  logo: ProjectLogo;
}
