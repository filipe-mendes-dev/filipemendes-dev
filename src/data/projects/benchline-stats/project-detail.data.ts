import {
  createProjectPageMetadata,
  type ProjectDetailContent,
} from "../projects.interfaces";
import { project } from "./project.data";

export const projectDetail: ProjectDetailContent = {
  hero: {
    name: project.name,
    logo: project.logo,
    category: project.category,
    summary:
      "An installable rink-hockey PWA for offline match recording and post-match analysis.",
    description:
      "An actively developed beta covering roster preparation, live match events and post-match statistics. Recording requires a closed-beta account; shared results are publicly accessible.",
    isMobileApp: false,
    links: [
      {
        label: "Open app",
        href: "https://benchline.filipemendes.dev",
      },
    ],
  },
  screenshots: {
    title: "App Interface",
    subtitle: "Desktop and mobile views with simulated match data.",
    items: [
      {
        id: "benchline-stats-sign-in",
        alt: "Benchline Stats sign-in on a laptop and phone, with rink-hockey photography beside the desktop form.",
        caption: "Sign in to access match recording and team management.",
        url: "/images/projects/benchline-stats/sign-in.png",
      },
      {
        id: "benchline-stats-app-home",
        alt: "Desktop and mobile home screens with shortcuts to record a match and manage matches, teams and players.",
        caption: "Start a match or manage teams, rosters and players from the home screen.",
        url: "/images/projects/benchline-stats/app-page.png",
      },
      {
        id: "benchline-stats-live-recorder",
        alt: "Desktop and mobile match recorder showing the score, countdown, player lineup and action controls, with a rink and event timeline on desktop.",
        caption: "Record player actions and rink positions alongside the match clock and lineup.",
        url: "/images/projects/benchline-stats/recorder-page.png",
      },
      {
        id: "benchline-stats-match-summary",
        alt: "Two desktop views of a completed 4–3 match showing team statistics, player timelines and events plotted across the rink.",
        caption: "Review the result through team statistics, player timelines and rink-based event analysis.",
        url: "/images/projects/benchline-stats/match-summary.png",
      },
    ],
  },
  keyFeatures: [
    {
      title: "Installable PWA",
      description:
        "Install on supported browsers and launch in a standalone window.",
    },
    {
      title: "Offline Match Recording",
      description:
        "Prepare online, record and reload offline, then synchronize through the running app.",
    },
    {
      title: "Rosters and Match Preparation",
      description:
        "Manage players, reusable team rosters, call-ups and starting lineups before each match.",
    },
    {
      title: "Live Recording and Spatial Capture",
      description:
        "Capture player actions and rink positions alongside the match clock, lineups and timed penalties.",
    },
    {
      title: "Interactive Match Analysis",
      description:
        "Explore period-filtered statistics, recorded playing time and linked rink, event and lineup timelines.",
    },
    {
      title: "Public Match Sharing",
      description:
        "Share synchronized completed matches through revocable links that viewers can open without an account.",
    },
  ],
  implementationDetails: [
    {
      title: "Self-managed VPS Deployment",
      description:
        "Deployed the app and PostgreSQL on a Debian VPS with Docker Compose, Nginx reverse proxying and Certbot HTTPS.",
    },
    {
      title: "CI/CD and Container Delivery",
      description:
        "GitHub Actions validates pull requests and publishes versioned images to GHCR for manual deployment by immutable digest.",
    },
    {
      title: "Service Worker and Offline Launch",
      description:
        "Serwist precaches allowlisted HTML/RSC pages and assets for offline reloads, excluding authenticated responses and APIs.",
    },
    {
      title: "Deferred Service Worker Updates",
      description:
        "Worker updates wait for controlled tabs and windows to close, avoiding forced reloads during recording.",
    },
    {
      title: "Atomic Local Persistence",
      description:
        "IndexedDB transactions commit match changes, undo history and pending synchronization commands together.",
    },
    {
      title: "Retry-safe Foreground Synchronization",
      description:
        "Stable operation IDs and transactional PostgreSQL receipts prevent duplicate writes when foreground synchronization retries.",
    },
    {
      title: "Shared Match Rules",
      description:
        "Local and server workflows validate new events and undo operations against match chronology.",
    },
    {
      title: "Server-rendered Public Sharing",
      description:
        "Public pages reuse statistics calculations through a restricted presentation model without requiring IndexedDB.",
    },
  ],
  techStack: [
    "TypeScript",
    "Next.js",
    "React",
    "Mantine",
    "TanStack Query",
    "Zustand",
    "Dexie / IndexedDB",
    "Serwist",
    "Better Auth",
    "Drizzle ORM",
    "PostgreSQL",
    "Docker",
    "Docker Compose",
    "Nginx",
    "GitHub Actions",
  ],
  pageMetadata: createProjectPageMetadata(
    project.name,
    project.description,
    project.slug
  ),
};
