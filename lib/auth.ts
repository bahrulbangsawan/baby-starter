import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { users } from "@/db/schema";

export const auth = betterAuth({
  adapter: drizzleAdapter(db, { usersTable: users }),
  session: { strategy: "database" }, // swap to "jwt" if you want edge-only later
  providers: { emailPassword: { enabled: true } },
  pages: { signIn: "/signin" },
});