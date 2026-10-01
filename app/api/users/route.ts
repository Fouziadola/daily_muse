import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";

export const dynamic = "force-dynamic";

// GET /api/users – list users (example Turso + Drizzle usage)
export async function GET() {
  try {
    const allUsers = await db.select().from(users).limit(50);
    return NextResponse.json({ users: allUsers });
  } catch (err) {
    console.error("[GET /api/users]", err);
    return NextResponse.json(
      { error: "Failed to fetch users. Run `pnpm db:seed` or check TURSO env vars." },
      { status: 500 }
    );
  }
}

// POST /api/users – create user { email, name }
export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const [user] = await db.insert(users).values({ email, name }).returning();
    return NextResponse.json({ user }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const isUnique = message.includes("UNIQUE") || message.includes("unique");
    if (isUnique) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }
    console.error("[POST /api/users]", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
