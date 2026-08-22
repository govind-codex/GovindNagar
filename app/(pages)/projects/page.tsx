import { generateMetadata } from "~/utils/seo";
import ProjectsShowcase from "./client";

export default function ProjectsPage() {
  return <ProjectsShowcase />;
}

export const metadata = generateMetadata({
  title: "Projects Showcase",
  description:
    "Explore Govind Nagar's projects, including backend APIs, asset management workflows, financial planning tools, authentication, and database-backed applications.",
  path: "/projects",
  keywords: [
    "projects",
    "portfolio",
    "web development",
    "full-stack",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "REST APIs",
    "Govind Nagar",
  ],
  image: "/projects/opengraph-image",
});
