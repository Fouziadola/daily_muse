import Link from "next/link";
import { getSharedPapers, type SharedPaperView } from "@/lib/shared-papers";

const samplePapers = [
  {
    id: "sample-1",
    authorName: "June Aurora",
    authorHandle: "june.aurora",
    color: "#dde5d0",
    daysAgo: 0,
    text: "The light through the kitchen window at 7am. Oat latte, still warm. Maya texted “good morning sunshine” — I kept the whole morning in my pocket.",
  },
  {
    id: "sample-2",
    authorName: "Sofia Marlow",
    authorHandle: "sofiawrites",
    color: "#e9efe0",
    daysAgo: 1,
    text: "Rain on the café window and a good cry. “What felt like home today?” got me. Home was the waitress refilling my cup without asking.",
  },
  {
    id: "sample-3",
    authorName: "Theo Park",
    authorHandle: "nightpages",
    color: "#e3ead8",
    daysAgo: 2,
    text: "Night walk, moon timer. Five slow breaths, then a note sealed for November. Tomorrow can wait — tonight is mine.",
  },
  {
    id: "sample-4",
    authorName: "Amara Ellis",
    authorHandle: "slowmornings",
    color: "#f3ece1",
    daysAgo: 3,
    text: "Pressed a maple leaf into this page. The season is changing and so am I, quietly, in the way that matters.",
  },
];

function sampleToView(): SharedPaperView[] {
  return samplePapers.map((paper) => ({
    id: paper.id,
    authorName: paper.authorName,
    authorHandle: paper.authorHandle,
    color: paper.color,
    text: paper.text,
    createdAt: new Date(
      Date.now() - paper.daysAgo * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));
}

function formatDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function SharedPapers() {
  const papers = await getSharedPapers(8);
  const items = papers.length > 0 ? papers : sampleToView();

  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-hand text-2xl text-lavender-deeper">
            ✿ the community shelf
          </p>
          <h2 className="mt-1 font-serif text-3xl font-medium tracking-tight">
            Shared pages from soft writers
          </h2>
          <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-cocoa">
            Little moments other journalers chose to leave out in the open.
            Read gently.
          </p>
        </div>
        <Link
          href="/profile"
          className="rounded-full border border-espresso/20 bg-cream px-5 py-2 text-sm font-bold text-espresso transition hover:bg-parchment"
        >
          Share a page →
        </Link>
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {items.map((paper) => (
          <li
            key={paper.id}
            style={{ backgroundColor: paper.color ?? undefined }}
            className="relative flex flex-col rounded-[20px] border border-espresso/10 bg-cream p-5 shadow-[4px_4px_0_rgba(95,115,85,0.1)]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-cream/70 px-3 py-1 text-xs font-bold text-lavender-deeper">
                ✿ @{paper.authorHandle}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-latte">
                {formatDate(paper.createdAt)}
              </span>
            </div>
            <p className="mt-3 flex-1 whitespace-pre-line font-serif text-[15.5px] italic leading-relaxed text-espresso/90">
              {paper.text}
            </p>
            <p className="mt-4 border-t border-dashed border-espresso/20 pt-3 font-hand text-lg text-cocoa">
              {paper.authorName}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
