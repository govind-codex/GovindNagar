import { generateMetadata } from "~/utils/seo";
import ProjectsShowcase from "./client";

export default function ProjectsPage() {
  return <ProjectsShowcase />;
}

export const metadata = generateMetadata({
  title: "Projects Showcase",
  description:
    "Explore Govind Nagar's work across AI-powered website auditing, healthcare discovery, backend APIs, database design, and full-stack application development.",
  path: "/projects",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "full-stack",
    "AI agents",
    "SEO auditing",
    "accessibility",
    "healthcare discovery",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "REST APIs",
    "Govind Nagar",
  ],
  image: "/projects/opengraph-image",
});
