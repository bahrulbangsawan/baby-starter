export const runtime = "edge";

import { NextResponse } from "next/server";
import { searchClient } from "@/lib/typesense";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const collection = process.env.TYPESENSE_COLLECTION!;
  if (!q) return NextResponse.json({ hits: [] });
  const result = await searchClient.collections(collection).documents().search({
    q,
    query_by: "name",
    per_page: 20,
  });
  return NextResponse.json(result);
}