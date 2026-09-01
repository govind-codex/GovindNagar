import { generateMetadata } from "~/utils/seo";
import ProjectsShowcase from "./client";

export default function ProjectsPage() {
  return <ProjectsShowcase />;
}

export const metadata = generateMetadata({
  title: "Projects Showcase",
  description:
    "Explore Govind Nagar's financial planning project, including backend APIs, database design, business logic, and full-stack application development.",
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
