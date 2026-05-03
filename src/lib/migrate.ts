import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";

config({ path: ".env.local" });

if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is not set in .env.local");
}

const sql = neon(process.env.NEON_DATABASE_URL);
const db = drizzle(sql);

async function main() {
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "./migrations" });
  console.log("Migrations applied successfully.");
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
