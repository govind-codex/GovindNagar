import { generateMetadata } from "~/utils/seo";
import JourneyPageClient from "./client";

export default function JourneyPage() {
  return <JourneyPageClient />;
}

export const metadata = generateMetadata({
  title: "My Developer Journey",
  description:
    "Explore Govind Nagar's developer journey through B.Tech studies, backend development, REST APIs, authentication, databases, and full-stack projects.",
  path: "/journey",
  keywords: [
    "developer journey",
    "software developer",
    "full-stack development",
    "Node.js",
    "Express.js",
    "MongoDB",
    "MySQL",
    "career growth",
    "Govind Nagar",
  ],
});
