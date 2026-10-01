import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

// Allow local dev without Turso credentials – uses file: local DB
// drizzle-kit needs a URL; fallback to file:./data/local.db
const fallbackUrl = "file:./data/local.db";
const dbUrl = url || fallbackUrl;

if (!url) {
  console.warn(`[drizzle] TURSO_DATABASE_URL not set – using ${fallbackUrl} for local dev`);
}

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: dbUrl,
    authToken: authToken,
  },
});
