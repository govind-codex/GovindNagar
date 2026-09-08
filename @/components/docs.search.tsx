"use client";
import { Icon } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { getProjectList } from "@/lib/project.source";
import { cn } from "@/lib/utils";
import { useDocsSearch } from "fumadocs-core/search/client";
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useTheme } from "next-themes";
import { appConfig, resume_link } from "root/project.config";
import { useEffect, useState } from "react";

const quickLinks: SearchItemType[] = [
  {
    id: "quick-link-github",
    type: "action",
    node: <QuickLinkLabel icon="github" label="GitHub" />,
    onSelect: () => window.open(appConfig.social.github, "_blank", "noopener,noreferrer"),
  },
  {
    id: "quick-link-linkedin",
    type: "action",
    node: <QuickLinkLabel icon="linkedin" label="LinkedIn" />,
    onSelect: () => window.open(appConfig.social.linkedin, "_blank", "noopener,noreferrer"),
  },
  {
    id: "quick-link-resume",
    type: "action",
    node: <QuickLinkLabel icon="docs" label="Resume" />,
    onSelect: () => window.open(resume_link, "_blank", "noopener,noreferrer"),
  },
  {
    id: "quick-link-email",
    type: "action",
    node: <QuickLinkLabel icon="mail" label="Email" />,
    onSelect: () => {
      window.location.href = `mailto:${appConfig.emails[0]}`;
    },
  },
];

const projectList = getProjectList();
const quickProjects: SearchItemType[] = projectList.map((project) => ({
  id: `quick-project-${project.id}`,
  type: "action",
  node: <QuickLinkLabel icon="folder-open" label={project.title} />,
  onSelect: () => {
    window.location.href = `/projects/${project.id}`;
  },
}));
const launcherItems = [...quickLinks, ...quickProjects];
const firstProjectId = quickProjects[0]?.id;

function QuickLinkLabel({
  icon,
  label,
}: {
  icon: "github" | "linkedin" | "docs" | "mail" | "folder-open";
  label: string;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Icon name={icon} className="size-4 text-fd-muted-foreground" />
      <span>{label}</span>
    </span>
  );
}

function LauncherItem({
  item,
  onClick,
}: {
  item: SearchItemType;
  onClick: () => void;
}) {
  const isLauncherItem = item.type === "action" && item.id.startsWith("quick-");

  return (
    <>
      {item.id === "quick-link-github" && (
        <div className="mx-2 mb-1 border-b border-fd-border px-0.5 pb-2 pt-1 text-xs font-medium text-fd-muted-foreground">
          Links
        </div>
      )}
      {item.id === firstProjectId && (
        <div className="mx-2 mb-1 mt-2 border-b border-fd-border px-0.5 pb-2 pt-1 text-xs font-medium text-fd-muted-foreground">
          Projects
        </div>
      )}
      <SearchDialogListItem
        item={item}
        onClick={onClick}
        className={cn(isLauncherItem && "mx-1 px-2 py-2.5")}
      />
    </>
  );
}

function SearchThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <SearchDialogFooter className="flex items-center justify-between gap-4 border-t border-fd-border bg-fd-secondary/30 px-4 py-3">
      <span className="flex items-center gap-2 text-sm text-fd-muted-foreground">
        <Icon name={isDark ? "moon" : "sun"} className="size-4" />
        Dark mode
      </span>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        onKeyDown={(event) => event.stopPropagation()}
        aria-label="Toggle dark mode"
      />
    </SearchDialogFooter>
  );
}

export function DocsSearchDialog({ open, onOpenChange }: SharedProps) {
  const { locale } = useI18n(); // (optional) for i18n
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    locale,
  });
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setSearch("");
    onOpenChange(nextOpen);
  };

  return (
    <SearchDialog
      open={open}
      onOpenChange={handleOpenChange}
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
    >
      <SearchDialogOverlay className="z-100" />
      <SearchDialogContent className="z-100 mt-20 max-w-lg">
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList
          className="bg-fd-popover"
          items={
            search.trim().length === 0
              ? launcherItems
              : query.data !== "empty"
                ? query.data
                : []
          }
          Item={LauncherItem}
        />
        <SearchThemeToggle />
      </SearchDialogContent>
    </SearchDialog>
  );
}
export default function DocsSearch({
  iconOnly = false,
  compact = false,
  className,
}: {
  iconOnly?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      type="button"
      onClick={() => setOpenSearch(true)}
      aria-label="Search documentation"
      aria-keyshortcuts="Meta+K Control+K"
      className={cn(
        "inline-flex items-center border border-border/80 bg-card/75 text-sm text-muted-foreground transition-all group hover:border-border hover:bg-card hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 dark:bg-muted/50 dark:hover:bg-muted/80",
        iconOnly
          ? "size-8 justify-center rounded-lg p-2 [&>svg]:size-4"
          : compact
            ? "h-7 w-[7.25rem] gap-1.5 rounded-full px-2.5"
            : "h-9 w-56 gap-2 rounded-lg px-3",
        className,
      )}
    >
      <Icon
        name="search"
        className={cn(
          "size-3.5 opacity-50 group-hover:opacity-100 transition-opacity",
          iconOnly ? "size-6" : "",
        )}
      />
      {!iconOnly ? (
        <>
          <span className="flex-1 text-left">
            {compact ? "Search" : "Search..."}
          </span>
          <kbd
            className={cn(
              "pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted font-mono text-[10px] font-medium text-muted-foreground",
              compact ? "gap-0.5 px-1" : "gap-1 px-1.5",
            )}
          >
            <span className="text-xs">⌘</span>K
          </kbd>
        </>
      ) : null}
    </button>
  );
}
