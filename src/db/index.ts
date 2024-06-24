import * as schema from "./schema";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Ensure the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create the query client
// const queryClient = postgres(process.env.DATABASE_URL, { ssl: { rejectUnauthorized: false} }); ///this is giving  ssl error

const queryClient = postgres(process.env.DATABASE_URL);  // this is showing the correct result


// Initialize drizzle with the query client and schema
const db = drizzle(queryClient, { schema });

export { db };
