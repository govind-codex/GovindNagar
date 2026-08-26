import type { ProfilePage as ProfilePageSchema, WithContext } from "schema-dts";

const githubAvatarUrl = "https://github.com/govind-codex.png?size=200";

const appConfig = {
  displayName: "Govind Nagar",
  shortName: "Govind",
  initials: "GN",
  role: "Software Developer",
  avatar: githubAvatarUrl,
  location: "Indore, Madhya Pradesh",
  description:
    "Software Developer focused on backend development, RESTful APIs, authentication, databases, and full-stack web applications.",
  summary: `I am a B.Tech student and software developer who enjoys building practical web applications with clean APIs, secure authentication, and reliable database design. My work focuses on Node.js, Express.js, MongoDB, MySQL, and JavaScript, with a growing interest in full-stack product development.`,
  applicableRoles: [
    "Software Developer",
    "Backend Developer",
    "Node.js Developer",
    "Full Stack Developer",
    "JavaScript Developer",
    "REST API Developer",
    "Building reliable web applications.",
  ],

  siteName: "Govind Nagar Portfolio",
  siteUrl: "govind-codex.github.io",
  url: "https://govind-codex.github.io",
  emails: ["nagargovind902@gmail.com"],
  creator: "Govind Nagar",
  authors: [{ name: "Govind Nagar", url: "https://github.com/govind-codex" }],

  skills: {
    frontend: Array.from(new Set(["html", "css", "javascript", "react"])),
    backend: Array.from(new Set(["nodejs", "express", "javascript", "rest-api"])),
    database: Array.from(new Set(["mongodb", "mysql", "mongoose"])),
    devops: Array.from(new Set(["git", "github", "postman"])),
    tools: Array.from(new Set(["git", "github", "postman", "jira"])),
  },

  attribution: {
    journey: [
      "This portfolio is adapted from an open-source template and customized with Govind Nagar's resume, projects, skills, and contact information.",
    ],
    list: [],
  },

  bucketList: [
    {
      name: "Complete B.Tech",
      completed: false,
      description: "Bachelor of Technology at SKITM, expected May 2027.",
      images: [],
    },
    {
      name: "Build production-ready backend systems",
      completed: true,
      description: "Built REST APIs, authentication, RBAC, and database-backed project workflows.",
      images: [],
    },
    {
      name: "Grow as a full-stack developer",
      completed: false,
      description: null,
      images: [],
    },
  ],

  keywords: [
    "Govind Nagar",
    "Software Developer",
    "Backend Developer",
    "Node.js Developer",
    "Express.js",
    "MongoDB",
    "MySQL",
    "React",
    "Portfolio",
  ],

  seo: {
    title: "Govind Nagar - Software Developer",
    description:
      "Personal portfolio of Govind Nagar, a software developer focused on backend APIs, databases, authentication, and full-stack web applications.",
    locale: "en_US",
    category: "Portfolio",
    type: "website",
    publisher: "Govind Nagar",
    geo: {
      position: "22.7196;75.8577",
      placename: "Indore, Madhya Pradesh",
      region: "IN",
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      dateCreated: new Date("2026-07-31").toISOString(),
      dateModified: new Date().toISOString(),
      mainEntity: {
        "@type": "Person",
        name: "Govind Nagar",
        identifier: "govind-codex",
        image: githubAvatarUrl,
      },
      description:
        "Personal portfolio of Govind Nagar - Software Developer.",
      sameAs: [
        "https://www.linkedin.com/in/govindnagar",
        "https://github.com/govind-codex",
        "https://x.com/Govindnagar__",
      ],
      jobTitle: "Software Developer",
      worksFor: { "@type": "Organization", name: "IndoRyque Technologies" },
    } as WithContext<ProfilePageSchema>,
  },

  social: {
    github: "https://github.com/govind-codex",
    linkedin: "https://www.linkedin.com/in/govindnagar",
    twitter: "https://x.com/Govindnagar__",
    "cal.com": "https://cal.com/govind-nagar-oufzbo",
  },

  usernames: {
    github: "govind-codex",
    youtube: "govind-codex",
    twitter: "Govindnagar__",
    linkedin: "govindnagar",
    medium: "",
  },

  flags: {
    enableOgImage: false,
  },

  verifications: {
    "google.analytics": "",
    "google.adsense": "",
  },

  analytics: {
    site: {
      label: "govind-codex.github.io",
      source: "ga" as const,
      measurementId: "",
      propertyId: "",
    },
    projects: [] as Array<{
      id: string;
      source: "ga" | "posthog";
      label: string;
      propertyId?: string;
      projectId?: string;
    }>,
  },

  statsConfig: {
    npmPackages: [] as string[],
    repositories: [
      {
        name: "asset-management-system",
        repo: "govind-codex/asset-management-system",
        repoBeatsUri: "",
      },
      {
        name: "smart-financial-planning-app",
        repo: "govind-codex/smart-financial-planning-app",
        repoBeatsUri: "",
      },
    ],
    flags: {
      repoBeats: false,
      versionAdoptionGraph: false,
    },
  },

  footerLinks: {
    general: [
      { label: "Home", href: "/" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
    ],
    specifics: [
      { label: "Bucket List", href: "/bucket-list" },
      { label: "Journey", href: "/journey" },
    ],
    more: [
      { label: "Contact", href: "/contact" },
      { label: "Links", href: "/links" },
      { label: "Attributions", href: "/attribution" },
    ],
  },
};

Object.freeze(appConfig);

export { appConfig };
export const resume_link = "https://drive.google.com/file/d/1zj_e4I0QD1orfJLxpxUsse7KtpuuDzvY/view?usp=drive_link";
