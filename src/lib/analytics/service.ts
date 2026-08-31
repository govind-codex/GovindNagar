import { unstable_cache } from "next/cache";
import { appConfig } from "root/project.config";
import { fetchGaRealtime, fetchGaResult, type ServiceAccount } from "./ga";
import {
  RANGES,
  type AnalyticsResult,
  type AnalyticsSnapshot,
  type AnalyticsTotals,
  type Growth,
  type RangeKey,
  type RealtimeAnalytics,
} from "./types";

const REVALIDATE = 3600; // 1h; GA data isn't real-time
const REALTIME_REVALIDATE = 30;

function serviceAccount(): ServiceAccount | null {
  const raw = process.env.GA_SERVICE_ACCOUNT_KEY?.trim();
  if (!raw) return null;

  try {
    // Environment dashboards often make multiline JSON awkward. Accept both
    // regular JSON and base64-encoded JSON, then restore escaped PEM newlines.
    const json = raw.startsWith("{")
      ? raw
      : Buffer.from(raw, "base64").toString("utf8");
    const parsed = JSON.parse(json) as Partial<ServiceAccount>;
    const privateKey = parsed.private_key?.replace(/\\n/g, "\n");

    if (
      !parsed.client_email?.endsWith(".iam.gserviceaccount.com") ||
      !privateKey?.includes("-----BEGIN PRIVATE KEY-----") ||
      !privateKey.includes("-----END PRIVATE KEY-----")
    ) {
      console.error("[analytics] GA_SERVICE_ACCOUNT_KEY is missing valid client_email/private_key fields");
      return null;
    }

    return { client_email: parsed.client_email, private_key: privateKey };
  } catch (error) {
    console.error("[analytics] GA_SERVICE_ACCOUNT_KEY is not valid JSON or base64 JSON", error);
    return null;
  }
}

function sitePropertyId(): string | null {
  const raw = (process.env.GA_SITE_PROPERTY_ID || appConfig.analytics.site.propertyId).trim();
  if (!raw) return null;

  const propertyId = raw.replace(/^properties\//, "");
  if (!/^\d+$/.test(propertyId)) {
    console.error("[analytics] GA_SITE_PROPERTY_ID must be the numeric GA4 property ID");
    return null;
  }

  return propertyId;
}

const zeroTotals = (): AnalyticsTotals => ({
  users: 0,
  pageViews: 0,
  sessions: 0,
  avgEngagementSeconds: 0,
  bounceRate: 0,
});

function zeroSnapshot(days: number, label: string): AnalyticsSnapshot {
  return {
    source: "ga",
    live: false,
    label,
    propertyId: null,
    range: { start: "", end: "", days },
    totals: zeroTotals(),
    previousTotals: zeroTotals(),
    series: Array.from({ length: days }, () => ({ date: "", users: 0, pageViews: 0, sessions: 0 })),
    topPages: [],
    topCountries: [],
    topReferrers: [],
    devices: [],
    generatedAt: "",
  };
}

function zeroResult(label: string, error: string): AnalyticsResult {
  const ranges = Object.fromEntries(
    RANGES.map((r) => [r.key, zeroSnapshot(r.days, label)]),
  ) as Record<RangeKey, AnalyticsSnapshot>;
  return { ok: false, error, label, source: "ga", ranges, generatedAt: "" };
}

async function buildSiteData(): Promise<AnalyticsResult> {
  const sa = serviceAccount();
  const cfg = appConfig.analytics.site;
  const propertyId = sitePropertyId();
  if (!sa) return zeroResult(cfg.label, "Analytics credentials aren't configured correctly.");
  if (!propertyId) return zeroResult(cfg.label, "The GA4 property ID isn't configured correctly.");
  try {
    return await fetchGaResult({ sa, propertyId, label: cfg.label });
  } catch (e) {
    console.error("[analytics] site GA fetch failed:", e);
    return zeroResult(cfg.label, "Couldn't load analytics right now.");
  }
}

const emptyRealtime = (error: string): RealtimeAnalytics => ({
  ok: false,
  error,
  activeUsers: 0,
  pageViews: 0,
  windowMinutes: 30,
  topPages: [],
  topCountries: [],
  devices: [],
  generatedAt: new Date().toISOString(),
});

async function buildRealtimeData(): Promise<RealtimeAnalytics> {
  const sa = serviceAccount();
  const propertyId = sitePropertyId();
  if (!sa) return emptyRealtime("Analytics credentials aren't configured correctly.");
  if (!propertyId) return emptyRealtime("The GA4 property ID isn't configured correctly.");
  try {
    return await fetchGaRealtime({ sa, propertyId });
  } catch (error) {
    console.error("[analytics] realtime GA fetch failed:", error);
    return emptyRealtime("Realtime analytics is temporarily unavailable.");
  }
}

async function buildProjectData(id: string): Promise<AnalyticsResult | null> {
  const sa = serviceAccount();
  const entry = appConfig.analytics.projects.find((p) => p.id === id);
  if (!entry || entry.source !== "ga") return null;
  if (!sa || !entry.propertyId) return null;
  try {
    return await fetchGaResult({ sa, propertyId: entry.propertyId, label: entry.label });
  } catch (e) {
    console.error(`[analytics] project ${id} GA fetch failed:`, e);
    return zeroResult(entry.label, "Couldn't load analytics right now.");
  }
}

const fetchSiteData = unstable_cache(buildSiteData, ["analytics", "site", "v2"], {
  revalidate: REVALIDATE,
  tags: ["analytics:site"],
});

const fetchRealtimeData = unstable_cache(buildRealtimeData, ["analytics", "site", "realtime", "v1"], {
  revalidate: REALTIME_REVALIDATE,
  tags: ["analytics:site:realtime"],
});

// Label applied after caching so multiple domains share one cached GA fetch.
export async function getSiteResult(label: string): Promise<AnalyticsResult> {
  const data = await fetchSiteData();
  const ranges = Object.fromEntries(
    Object.entries(data.ranges).map(([k, s]) => [k, { ...s, label }]),
  ) as Record<RangeKey, AnalyticsSnapshot>;
  return { ...data, label, ranges };
}

export function getSiteRealtimeResult(): Promise<RealtimeAnalytics> {
  return fetchRealtimeData();
}

export function getProjectResult(id: string): Promise<AnalyticsResult | null> {
  return unstable_cache(() => buildProjectData(id), ["analytics", "project", "v2", id], {
    revalidate: REVALIDATE,
    tags: [`analytics:project:${id}`],
  })();
}

export function computeGrowth(current: number, previous: number): Growth {
  if (!previous) return { delta: current, percent: current ? 100 : 0, trend: current > 0 ? 1 : 0 };
  const delta = current - previous;
  return { delta, percent: (delta / previous) * 100, trend: delta > 0 ? 1 : delta < 0 ? -1 : 0 };
}
