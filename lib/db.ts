import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

// Singleton Turso / libSQL client for Next.js (avoids hot-reload duplication in dev)

function getClientConfig() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  // Production / Turso remote
  if (url && url.startsWith("libsql://")) {
    if (!authToken) {
      console.warn("[db] TURSO_AUTH_TOKEN missing for remote libsql URL");
    }
    return { url, authToken };
  }

  // Allow explicit local file URL via env (e.g. file:./local.db)
  if (url) {
    return { url, authToken };
  }

  // Fallback to local SQLite file (works for dev and for build-time collection)
  // file: prefix is required by @libsql/client
  // In production you SHOULD set TURSO_DATABASE_URL=libsql://...
  const fallback = "file:./data/local.db";
  if (process.env.NODE_ENV === "production") {
    console.warn("[db] TURSO_DATABASE_URL not set – using fallback file:./data/local.db (set it to libsql://... for Turso)");
  }
  return { url: fallback, authToken: undefined };
}

declare global {
  // eslint-disable-next-line no-var
  var __libsqlClient: ReturnType<typeof createClient> | undefined;
  // eslint-disable-next-line no-var
  var __drizzleDb: ReturnType<typeof drizzle> | undefined;
}

function getLibsqlClient() {
  if (globalThis.__libsqlClient) return globalThis.__libsqlClient;

  const { url, authToken } = getClientConfig();
  const client = createClient({ url, authToken });

  if (process.env.NODE_ENV !== "production") {
    globalThis.__libsqlClient = client;
  }

  return client;
}

// Drizzle ORM instance (typed with schema)
export function getDb() {
  if (globalThis.__drizzleDb) return globalThis.__drizzleDb;

  const client = getLibsqlClient();
  const db = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalThis.__drizzleDb = db;
  }

  return db;
}

// Convenience singletons
export const client = getLibsqlClient();
export const db = getDb();

// Raw helpers if you prefer plain SQL without Drizzle
export async function execute(sql: string, args?: unknown[]) {
  return client.execute({ sql, args: args as never });
}

export type Database = ReturnType<typeof getDb>;
