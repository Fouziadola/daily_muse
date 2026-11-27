import "dotenv/config";
import { db, client } from "./db";
import { users, posts, sharedPapers } from "./schema";

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
  await client.execute(`
    CREATE TABLE IF NOT EXISTS shared_papers (
      id TEXT PRIMARY KEY,
      author_name TEXT NOT NULL,
      author_handle TEXT NOT NULL,
      text TEXT NOT NULL,
      color TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    )
  `);

  // Seed the community shelf if it is empty
  const existingShared = await db.select().from(sharedPapers).limit(1);
  if (existingShared.length === 0) {
    await db.insert(sharedPapers).values([
      {
        authorName: "June Aurora",
        authorHandle: "june.aurora",
        color: "#dde5d0",
        text: "The light through the kitchen window at 7am. Oat latte, still warm. Maya texted “good morning sunshine” — I kept the whole morning in my pocket.",
      },
      {
        authorName: "Sofia Marlow",
        authorHandle: "sofiawrites",
        color: "#e9efe0",
        text: "Rain on the café window and a good cry. “What felt like home today?” got me. Home was the waitress refilling my cup without asking.",
      },
      {
        authorName: "Theo Park",
        authorHandle: "nightpages",
        color: "#e3ead8",
        text: "Night walk, moon timer. Five slow breaths, then a note sealed for November. Tomorrow can wait — tonight is mine.",
      },
      {
        authorName: "Amara Ellis",
        authorHandle: "slowmornings",
        color: "#f3ece1",
        text: "Pressed a maple leaf into this page. The season is changing and so am I, quietly, in the way that matters.",
      },
    ]);
  }

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
