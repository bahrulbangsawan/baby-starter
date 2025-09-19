"use server";
import { db } from "@/db";
import { orgs } from "@/db/schema";

export async function listOrgs() {
  return db.select().from(orgs).limit(100);
}

export async function createOrg(data: { name: string }) {
  await db.insert(orgs).values({ id: crypto.randomUUID(), name: data.name });
}