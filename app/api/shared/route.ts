import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sharedPapers } from "@/lib/schema";
import { getSharedPapers } from "@/lib/shared-papers";

export const dynamic = "force-dynamic";

const MAX_LENGTH = 2000;

// GET /api/shared – newest shared journal pages from the community
export async function GET() {
  const papers = await getSharedPapers(30);
  return NextResponse.json({ papers });
}

// POST /api/shared – publish a journal page to the public shelf
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }
    if (text.length > MAX_LENGTH) {
      return NextResponse.json(
        { error: `keep it under ${MAX_LENGTH} characters` },
        { status: 400 }
      );
    }

    const authorName =
      typeof body?.authorName === "string" && body.authorName.trim()
        ? body.authorName.trim().slice(0, 60)
        : "A soft writer";
    const authorHandle =
      typeof body?.authorHandle === "string"
        ? body.authorHandle.trim().replace(/^@+/, "").slice(0, 40)
        : "";
    const color =
      typeof body?.color === "string" &&
      /^#[0-9a-fA-F]{3,8}$/.test(body.color)
        ? body.color
        : null;

    const [paper] = await db
      .insert(sharedPapers)
      .values({
        authorName,
        authorHandle: authorHandle || "dailymuse",
        text,
        color,
      })
      .returning();

    return NextResponse.json({ paper }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/shared]", err);
    return NextResponse.json(
      { error: "could not share this page" },
      { status: 500 }
    );
  }
}
