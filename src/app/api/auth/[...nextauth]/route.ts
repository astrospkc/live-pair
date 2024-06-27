import NextAuth from "next-auth"


import type { Adapter } from "next-auth/adapters";
import { authConfig } from "@/lib/auth";

const handler = NextAuth(authConfig) 

export { handler as GET, handler as POST }