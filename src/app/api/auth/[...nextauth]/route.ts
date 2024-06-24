import NextAuth from "next-auth"
import {db} from "@/db";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import type { Adapter } from "next-auth/adapters";

const handler = NextAuth({
 adapter: DrizzleAdapter(db) as Adapter, // connect application with drizzle db
 providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    
    ]
})

export { handler as GET, handler as POST }