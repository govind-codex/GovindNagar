import { Metadata } from "next";
import { generateMetadata } from "~/utils/seo";
import JourneyV2Client from "./client";

export default function JourneyV2Page() {
  return <JourneyV2Client />;
}

export const metadata: Metadata = generateMetadata({
  title: "The Journey",
  description:
    "Govind Nagar's work and project journey, told three ways: a cinematic scroll, a terminal log, or a keynote.",
  path: "/journey-v2",
  keywords: [
    "developer journey",
    "scrollytelling",
    "cinematic portfolio",
    "Govind Nagar",
  ],
});
