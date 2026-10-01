import "dotenv/config";
import { db, client } from "./db";
import { users, posts } from "./schema";

async function main() {
  // Ensure tables exist if not using drizzle-kit migrate yet (quick dev fallback)
  await client.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      content TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);

  // Idempotent seed
  const existing = await db.select().from(users).limit(1);
  if (existing.length > 0) {
    console.log("[seed] already seeded, skipping");
    return;
  }

  const [user] = await db
    .insert(users)
    .values({ email: "hello@daily-muse.dev", name: "Daily Muse" })
    .returning();

  await db.insert(posts).values({
    userId: user.id,
    title: "Hello Turso 👋",
    content: "Your Turso + Drizzle setup is working!",
  });

  console.log("[seed] done:", user.email);
}

main()
  .catch((e) => {
    console.error("[seed] failed:", e);
    process.exit(1);
  })
  .finally(() => client.close());
