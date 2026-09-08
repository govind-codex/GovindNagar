import { cn } from "@/lib/utils";
import { Braces } from "lucide-react";
import Image from "next/image";
import { SiJira, SiMongoose, SiZod } from "react-icons/si";

const customIcons = {
  zod: { icon: SiZod, color: "#4f7ecb" },
  mongoose: { icon: SiMongoose, color: "#a9271c" },
  jira: { icon: SiJira, color: "#2684ff" },
  "rest-api": { icon: Braces, color: "#34d399" },
} as const;

const labels: Record<string, string> = {
  nodejs: "Node.js",
  nextjs: "Next.js",
  javascript: "JavaScript",
  js: "JavaScript",
  ts: "TypeScript",
  cpp: "C++",
  zod: "Zod",
  mongodb: "MongoDB",
  mysql: "MySQL",
  mongoose: "Mongoose",
  github: "GitHub",
  jira: "Jira",
  vercel: "Vercel",
  vscode: "VS Code",
  "rest-api": "REST API",
};

export function getSkillLabel(skill: string) {
  return labels[skill] ?? skill.charAt(0).toUpperCase() + skill.slice(1);
}

export function SkillIcon({
  skill,
  className,
}: {
  skill: string;
  className?: string;
}) {
  const custom = customIcons[skill as keyof typeof customIcons];

  if (custom) {
    const CustomIcon = custom.icon;
    return (
      <span
        role="img"
        aria-label={`${getSkillLabel(skill)} icon`}
        className={cn(
          "inline-flex aspect-square items-center justify-center rounded-xl bg-[#242938] p-[18%]",
          className,
        )}
      >
        <CustomIcon
          aria-hidden="true"
          className="size-full"
          style={{ color: custom.color }}
        />
      </span>
    );
  }

  return (
    <Image
      src={`https://skillicons.dev/icons?i=${skill}`}
      alt={`${getSkillLabel(skill)} icon`}
      width={64}
      height={64}
      className={cn("object-contain", className)}
      unoptimized
    />
  );
}
