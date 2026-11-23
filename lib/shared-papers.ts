import { desc } from "drizzle-orm";
import { db } from "./db";
import { sharedPapers } from "./schema";

export type SharedPaperView = {
  id: string;
  authorName: string;
  authorHandle: string;
  text: string;
  color: string | null;
  createdAt: string;
};

export async function getSharedPapers(limit = 12): Promise<SharedPaperView[]> {
  try {
    const rows = await db
      .select()
      .from(sharedPapers)
      .orderBy(desc(sharedPapers.createdAt))
      .limit(limit);

    return rows.map((row) => ({
      id: row.id,
      authorName: row.authorName,
      authorHandle: row.authorHandle,
      text: row.text,
      color: row.color,
      createdAt:
        row.createdAt instanceof Date
          ? row.createdAt.toISOString()
          : new Date(row.createdAt).toISOString(),
    }));
  } catch (err) {
    console.error("[shared-papers] could not load shared papers", err);
    return [];
  }
}
