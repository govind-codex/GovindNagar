import { NextResponse } from "next/server";
import { getSiteRealtimeResult } from "~/lib/analytics/service";

export const dynamic = "force-dynamic";

export async function GET() {
  const realtime = await getSiteRealtimeResult();
  return NextResponse.json(realtime, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=30",
    },
  });
}
