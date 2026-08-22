import { appConfig } from "root/project.config";
import { ProjectConfig } from "./_components/insight";

export const statsConfig = appConfig.statsConfig;

export const insightConfig: ProjectConfig[] = [
  {
    id: "asset-management-system",
    title: "Asset Management System",
    description: "Analytics for Asset Management System",
    endpoint: "",
    headers: {
      "X-Authorization": "",
    },
  },
];
