import type { ReactElement, SVGProps } from 'react';

interface IconBaseProps extends SVGProps<SVGSVGElement> {
  children: ReactElement | ReactElement[];
}

type AppIconProps = SVGProps<SVGSVGElement>;

const IconBase = ({ children, ...props }: IconBaseProps): ReactElement => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
};

export const BackIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M10.7 5.3a1 1 0 0 1 0 1.4L6.42 11H20a1 1 0 1 1 0 2H6.41l4.3 4.3a1 1 0 1 1-1.42 1.4l-6-6a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.41 0Z" />
  </IconBase>
);

export const ExternalLinkIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M14 3h7v7h-2V6.41l-8.3 8.3-1.4-1.42 8.29-8.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z" />
  </IconBase>
);

export const GithubIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.25 3.4 9.7 8.1 11.28.6.11.82-.27.82-.58 0-.3-.01-1.3-.02-2.36-3.3.73-4-1.44-4-1.44-.54-1.41-1.33-1.79-1.33-1.79-1.1-.77.08-.75.08-.75 1.2.09 1.84 1.27 1.84 1.27 1.08 1.91 2.82 1.36 3.5 1.04.1-.8.42-1.36.77-1.68-2.64-.31-5.42-1.36-5.42-6.05 0-1.34.46-2.43 1.22-3.28-.12-.31-.53-1.56.12-3.25 0 0 1-.33 3.3 1.25a11.2 11.2 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.65 1.69.24 2.94.12 3.25.76.85 1.22 1.94 1.22 3.28 0 4.7-2.79 5.74-5.45 6.04.43.39.81 1.13.81 2.29 0 1.65-.01 2.98-.01 3.39 0 .31.21.7.82.58 4.7-1.58 8.1-6.03 8.1-11.28A11.5 11.5 0 0 0 12 .5Z"
    />
  </IconBase>
);

export const LinkedInIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM2.77 9.73h4.46V21.5H2.77V9.73Zm7.26 0h4.28v1.61h.06c.6-1.13 2.05-2.33 4.22-2.33 4.52 0 5.36 3.04 5.36 7v5.49h-4.46v-4.87c0-1.16-.02-2.66-1.58-2.66-1.58 0-1.82 1.26-1.82 2.57v4.96h-4.46V9.73Z"
    />
  </IconBase>
);

export const AppStoreIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      d="M16.7 12.2c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.1-1.7-1.3-.1-2.5.8-3.2.8-.7 0-1.7-.8-2.8-.7-1.4 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.4 1.1 8.6.7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.6-.7 3-.7s1.9.7 3.1.7c1.3 0 2.1-1.1 2.8-2.2.8-1.2 1.1-2.4 1.1-2.5 0-.1-2.2-.8-2.2-3.2Zm-2-6.3c.6-.8 1.1-2 1-3.2-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.9-1 3.1 1 .1 2.1-.5 2.8-1.3Z"
    />
  </IconBase>
);

export const GooglePlayIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="#34A853" d="M4.8 4.5c-.2.3-.3.8-.3 1.4v12.2c0 .6.1 1.1.3 1.4l10.8-7.5L4.8 4.5Z" />
    <path fill="#4285F4" d="M16.8 13.2 7.9 22c.4 0 .8-.1 1.3-.4l10.1-5.7-2.5-2.7Z" />
    <path fill="#FBBC04" d="M19.3 8.1 9.2 2.4c-.5-.3-.9-.4-1.3-.4l8.9 8.8 2.5-2.7Z" />
    <path fill="#EA4335" d="M21.1 10.3 19.3 9l-2.9 3 2.9 3 1.8-1c1.2-.7 1.2-2 0-2.7Z" />
  </IconBase>
);

export const ProfileIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.1 0-7.5 2.52-7.5 5.63a.75.75 0 0 0 1.5 0c0-2.06 2.5-4.13 6-4.13s6 2.07 6 4.13a.75.75 0 0 0 1.5 0c0-3.1-3.4-5.63-7.5-5.63Z" />
  </IconBase>
);

export const ExperienceIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M4.75 4.5A2.25 2.25 0 0 1 7 2.25h10A2.25 2.25 0 0 1 19.25 4.5v15A2.25 2.25 0 0 1 17 21.75H7A2.25 2.25 0 0 1 4.75 19.5v-15ZM7 3.75a.75.75 0 0 0-.75.75v15c0 .41.34.75.75.75h10c.41 0 .75-.34.75-.75v-15a.75.75 0 0 0-.75-.75H7Zm2.25 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Zm0 4a.75.75 0 0 1 .75-.75h6a.75.75 0 1 1 0 1.5h-6a.75.75 0 0 1-.75-.75Z" />
  </IconBase>
);

export const ProjectsIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M3.75 6.5A2.75 2.75 0 0 1 6.5 3.75h4A2.75 2.75 0 0 1 13.25 6.5v1h4.25A2.75 2.75 0 0 1 20.25 10.25v7.25a2.75 2.75 0 0 1-2.75 2.75h-11a2.75 2.75 0 0 1-2.75-2.75v-11Zm2.75-1.25a1.25 1.25 0 0 0-1.25 1.25V8h6.5V6.5a1.25 1.25 0 0 0-1.25-1.25h-4Zm-1.25 4.25v8a1.25 1.25 0 0 0 1.25 1.25h11a1.25 1.25 0 0 0 1.25-1.25v-7.25A1.25 1.25 0 0 0 17.5 9h-11a1.25 1.25 0 0 0-1.25.5Z" />
  </IconBase>
);

export const SkillsIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="m11.3 2.4-7 2.8A2.25 2.25 0 0 0 3 7.28v4.88a8.75 8.75 0 0 0 5.5 8.13l3.23 1.37a.75.75 0 0 0 .54 0l3.23-1.37a8.75 8.75 0 0 0 5.5-8.13V7.28a2.25 2.25 0 0 0-1.3-2.06l-7-2.8a2.25 2.25 0 0 0-1.4-.02ZM4.5 7.28a.75.75 0 0 1 .44-.69l7-2.8a.75.75 0 0 1 .58 0l7 2.8a.75.75 0 0 1 .43.69v4.88a7.25 7.25 0 0 1-4.57 6.74L12 20.18l-3.38-1.43a7.25 7.25 0 0 1-4.12-6.59V7.28Zm10.28 1.69a.75.75 0 0 1 .05 1.06l-3.5 3.85a.75.75 0 0 1-1.08.03l-1.75-1.75a.75.75 0 1 1 1.06-1.06l1.2 1.2 2.97-3.27a.75.75 0 0 1 1.05-.06Z" />
  </IconBase>
);

export const EducationIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M12 3.75 2.5 8.35v.8l9.5 4.6 9.5-4.6v-.8L12 3.75Zm0 11.6-6.97-3.37V16a1 1 0 0 0 .55.9l6 2.9a1 1 0 0 0 .84 0l6-2.9a1 1 0 0 0 .55-.9v-4.02L12 15.35Z" />
  </IconBase>
);

export const PublicationsIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      d="M6.75 3.25h8.8a2.75 2.75 0 0 1 2.75 2.75v10.5a.75.75 0 0 1-1.28.53l-1.52-1.51-1.52 1.51a.75.75 0 0 1-1.06 0l-1.42-1.41-1.42 1.41a.75.75 0 0 1-1.06 0L7.5 15.5 5.98 17a.75.75 0 0 1-1.28-.53V6a2.75 2.75 0 0 1 2.05-2.66Zm0 1.5A1.25 1.25 0 0 0 5.95 6v8.69l.77-.77a1.1 1.1 0 0 1 1.56 0l1.27 1.27 1.27-1.27a1.1 1.1 0 0 1 1.56 0l1.07 1.07 1.07-1.07a1.1 1.1 0 0 1 1.56 0l.77.77V6a1.25 1.25 0 0 0-1.25-1.25h-8.8Zm1.5 2.75A.75.75 0 0 1 9 6.75h4.3a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Zm0 3.5A.75.75 0 0 1 9 10.25h5.8a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
    />
  </IconBase>
);

export const PrinciplesIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path fill="currentColor" d="M6.73 2.75h10.54a2.5 2.5 0 0 1 2.5 2.5v13.5a2.5 2.5 0 0 1-2.5 2.5H6.73a2.5 2.5 0 0 1-2.5-2.5V5.25a2.5 2.5 0 0 1 2.5-2.5Zm0 1.5a1 1 0 0 0-1 1v13.5a1 1 0 0 0 1 1h10.54a1 1 0 0 0 1-1V5.25a1 1 0 0 0-1-1H6.73Zm2.02 3a.75.75 0 0 1 .75-.75h4.99a.75.75 0 1 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h4.99a.75.75 0 1 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h2.99a.75.75 0 1 1 0 1.5H9.5a.75.75 0 0 1-.75-.75Z" />
  </IconBase>
);

export const SunIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      d="M12 3.75a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V4.5a.75.75 0 0 1 .75-.75Zm0 13.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V18a.75.75 0 0 1 .75-.75ZM20.25 12a.75.75 0 0 1-.75.75H18a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75ZM6 12a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 6 12Zm10.03-5.78a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06ZM5.85 16.4a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06L5.85 17.46a.75.75 0 0 1 0-1.06Zm12.36 2.12a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM7.97 6.22a.75.75 0 0 1 0 1.06L6.9 8.34A.75.75 0 1 1 5.84 7.28L6.9 6.22a.75.75 0 0 1 1.06 0ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Z"
    />
  </IconBase>
);

export const MoonIcon = (props: AppIconProps): ReactElement => (
  <IconBase {...props}>
    <path
      fill="currentColor"
      d="M14.7 2.9a.75.75 0 0 1 .6 1.16A7.1 7.1 0 1 0 19.94 14.7a.75.75 0 0 1 1.16.6 9.1 9.1 0 1 1-6.4-12.4Zm4.58-.15a.75.75 0 0 1 .73.58l.15.62a.9.9 0 0 0 .66.66l.62.15a.75.75 0 0 1 0 1.46l-.62.15a.9.9 0 0 0-.66.66l-.15.62a.75.75 0 0 1-1.46 0l-.15-.62a.9.9 0 0 0-.66-.66l-.62-.15a.75.75 0 0 1 0-1.46l.62-.15a.9.9 0 0 0 .66-.66l.15-.62a.75.75 0 0 1 .73-.58Z"
    />
  </IconBase>
);
