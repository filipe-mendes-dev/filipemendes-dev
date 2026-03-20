import type { SectionId } from '../shared/navigation/sections';

export interface NavigationItem {
    label: string;
    href: string;
    sectionId?: SectionId;
}

export interface ActionLink {
    label: string;
    href: string;
    sectionId?: SectionId;
    variant: 'primary' | 'secondary' | 'ghost';
}

export interface HeroContent {
    name: string;
    role: string;
    summary: string;
    now: string;
    photoAlt: string;
    photoUrl: string;
    photoSrcSet: string;
    photoSizes: string;
    actions: ActionLink[];
}

export interface ProjectNarrative {
    problem: string;
    approach: string;
    stack: string;
    outcome: string;
}

export interface ProjectListItem {
    href: string;
    name: string;
    logoText: string;
    category: string;
    description: string;
    narrative: ProjectNarrative;
}

export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    summary: string;
}

export interface EducationItem {
    title: string;
    period?: string;
    details?: string;
}

export interface PublicationItem {
    title: string;
    venue?: string;
    year?: string;
    href?: string;
}

export interface AboutContent {
    profile: string;
    experience: ExperienceItem[];
    skills: string[];
    education: EducationItem[];
    publications: PublicationItem[];
    principles: string[];
}

export interface ContactContent {
    intro: string;
    email: string;
    availability: string;
    socials: SocialLink[];
}

export interface SocialLink {
    label: string;
    href: string;
}

export interface PortfolioContent {
    siteTitle: string;
    descriptor: string;
    navigation: NavigationItem[];
    hero: HeroContent;
    projects: ProjectListItem[];
    about: AboutContent;
    contact: ContactContent;
}

export const portfolio: PortfolioContent = {
    siteTitle: 'Filipe Mendes',
    descriptor: 'Software Developer',
    navigation: [
        { label: 'Home', href: '/', sectionId: 'home' },
        { label: 'Projects', href: '/', sectionId: 'projects' },
        { label: 'About Me', href: '/', sectionId: 'about' },
        { label: 'Contact', href: '/', sectionId: 'contact' },
    ],
    hero: {
        name: 'Filipe Mendes',
        role: 'Frontend and mobile software developer with experience across React, React Native, TypeScript, GraphQL, and applied machine learning.',
        summary:
            'I enjoy solving complex problems efficiently, learning quickly, and adapting fast to new domains. My recent work spans frontend web platforms, mobile banking apps, and computer vision research.',
        now: 'Based in Madeira, Portugal.',
        photoAlt: 'Portrait of Filipe Mendes from CV',
        photoUrl: '/images/filipe-mendes-250.webp',
        photoSrcSet: '/images/filipe-mendes-250.webp 250w, /images/filipe-mendes-500.webp 500w',
        photoSizes: '(min-width: 64rem) 192px, (min-width: 48rem) 176px, 152px',
        actions: [
            { label: 'View Projects', href: '/', sectionId: 'projects', variant: 'primary' },
            { label: 'Contact', href: '/', sectionId: 'contact', variant: 'secondary' },
        ],
    },
    projects: [
        {
            href: '/projects/acin-web-platform',
            name: 'ACIN Web Platform',
            logoText: 'AC',
            category: 'Frontend Platform',
            description:
                'Web platform development work focused on responsive React interfaces, GraphQL integration, and native-like behavior on the web.',
            narrative: {
                problem:
                    'The platform needed modern frontend delivery with responsive behavior, API integration, and dependable test coverage.',
                approach:
                    'Built the product using React and TypeScript, integrated GraphQL data flows, worked in a Docker-based setup with Vite and Yarn, and covered flows with Vitest and Playwright.',
                stack: 'React, TypeScript, GraphQL, Capacitor, Docker, Vite, Yarn, Vitest, Playwright.',
                outcome:
                    'Shipped production frontend work for ACIN group from October 2023 to July 2025 with a strong focus on responsiveness and delivery quality.',
            },
        },
        {
            href: '/projects/nearsoft-mobile-apps',
            name: 'Nearsoft Mobile Banking Apps',
            logoText: 'NS',
            category: 'Mobile Development',
            description:
                'Mobile banking app development centered on React Native, TypeScript, Redux, REST integrations, and reusable UI components.',
            narrative: {
                problem:
                    'The apps required reliable mobile delivery, shared component reuse, and coordination across iOS and Android native workflows.',
                approach:
                    'Built mobile banking experiences with React Native, TypeScript, and Redux, integrated REST APIs, and worked with Xcode and Android Studio for native development.',
                stack: 'React Native, TypeScript, Redux, REST APIs, Xcode, Android Studio.',
                outcome:
                    'Delivered cross-platform banking app features, contributed to a shared internal component library, and supported the onboarding of a summer intern.',
            },
        },
        {
            href: '/projects/inov-infrared-detection',
            name: 'INOV Infrared Detection Research',
            logoText: 'IN',
            category: 'Applied Machine Learning',
            description:
                'Research and engineering work on real-time infrared image classification using EfficientDet, TensorFlow, and OpenCV.',
            narrative: {
                problem:
                    'The project needed real-time detection of vehicles, people, and deer from infrared video surveillance data.',
                approach:
                    'Developed EfficientDet-based detection solutions, collected and labeled infrared footage, tuned training parameters, and organized a real-world data acquisition event.',
                stack: 'Python, TensorFlow, OpenCV, EfficientDet.',
                outcome:
                    'Produced research that was published and presented at the 2022 International Conference on Electrical, Computer and Energy Technologies.',
            },
        },
    ],
    about: {
        profile:
            'I have a keen eye for detail and enjoy solving complex challenges efficiently. My background combines frontend web development, mobile app delivery, and machine learning research, shaped by a fast-learning and adaptable approach.',
        experience: [
            {
                role: 'Front-End Developer',
                company: 'ACIN group',
                period: 'Oct 2023 - Jul 2025',
                summary:
                    'Built web platform features with React and TypeScript, implemented responsive layouts with Capacitor, integrated GraphQL APIs, and worked with Vitest and Playwright.',
            },
            {
                role: 'Mobile Developer',
                company: 'Nearsoft',
                period: 'Jan 2023 - Sep 2023',
                summary:
                    'Developed mobile banking apps with React Native, TypeScript, and Redux, integrated REST APIs, and contributed to a shared internal component library.',
            },
            {
                role: 'Software Engineer',
                company: 'INOV',
                period: 'Mar 2021 - Feb 2022',
                summary:
                    'Developed real-time detection solutions with EfficientDet, collected and labeled infrared data, and published the resulting research at an international conference.',
            },
        ],
        skills: [
            'JavaScript',
            'TypeScript',
            'React',
            'React Native',
            'Redux',
            'Python',
            'GraphQL',
            'REST APIs',
            'Docker',
            'Vite',
            'Yarn',
            'Vitest',
            'Playwright',
            'TensorFlow',
            'OpenCV',
            'GitLab',
            'SCRUM',
        ],
        education: [
            {
                title: 'MSc in Engineering Physics',
                period: 'Sep 2015 - Jan 2021',
                details:
                    'Instituto Superior Tecnico - IST. Thesis on applying neural networks to radiation source localization, which marked the transition into software development and strengthened skills in machine learning, data analysis, and technical problem-solving.',
            },
        ],
        publications: [
            {
                title: 'Radioactive hot-spot localisation and identification using deep learning',
                venue: 'Journal of Radiological Protection',
                year: '2021',
                href: 'https://doi.org/10.1088/1361-6498/ac1a5c',
            },
            {
                title: 'Study on the Application of EfficientDet to Real-Time Classification of Infrared Images from Video Surveillance',
                venue: '2022 International Conference on Electrical, Computer and Energy Technologies (ICECET)',
                year: '2022',
                href: 'https://doi.org/10.1109/ICECET55527.2022.9872921',
            },
        ],
        principles: [
            'Solve problems efficiently instead of only working harder',
            'Learn quickly and think critically when the domain changes',
            'Adapt fast and keep systems running smoothly',
        ],
    },
    contact: {
        intro: 'I work across frontend web platforms, mobile applications, and machine learning systems. The best way to reach me is by email or LinkedIn.',
        email: 'mendes.filipe.dev@gmail.com',
        availability: 'Based in Madeira, Portugal.',
        socials: [{ label: 'LinkedIn', href: 'https://linkedin.com/in/mendes-filipe-dev' }],
    },
};
