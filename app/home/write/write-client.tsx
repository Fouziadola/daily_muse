"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function WriteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "new" ? "new" : "continue";

  const draftText = `The light through the kitchen window at 7am. Oat latte, still warm. Maya texted “good morning sunshine”…`;
  const [text, setText] = useState(mode === "continue" ? draftText : "");

  return (
    <section className="min-h-full">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-espresso/15 bg-cream px-4 py-1.5 font-hand text-lg text-espresso transition hover:bg-parchment"
        >
          ← back
        </button>
        <p className="font-hand text-xl text-lavender-deeper">
          {mode === "continue" ? "✿ continue writing" : "✿ new page"}
        </p>
      </div>

      <h1 className="font-serif text-3xl font-medium tracking-tight">
        {mode === "continue" ? "Keep writing" : "Start writing"}
      </h1>
      <p className="mt-1 text-[15px] text-cocoa">
        {mode === "continue"
          ? "Pick up where you left off."
          : "A blank page, just for you."}
      </p>

      <div className="relative mt-5 -rotate-1 rounded-[22px] border border-espresso/15 bg-[#fffefd] p-6 shadow-[8px_8px_0_rgba(138,120,160,0.14)]">
        <div
          aria-hidden
          className="washi pointer-events-none absolute left-1/2 top-[-14px] h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-lavender-soft opacity-90 shadow-sm"
          style={{
            clipPath:
              "polygon(2% 0, 98% 4%, 100% 90%, 97% 100%, 3% 96%, 0 88%)",
          }}
        />
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
          {mode === "continue" ? "✿ morning page — draft" : "✿ fresh page"}
        </p>
        <p className="mt-3 font-hand text-[26px] leading-tight">
          {mode === "continue"
            ? "“What small moment do you want to keep?”"
            : "“A blank page, just for you…”"}
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder={
            mode === "continue"
              ? "Keep writing your draft…"
              : "Begin your new page…"
          }
          aria-label={mode === "continue" ? "Continue draft" : "New page text"}
          className="paper-lines mt-3 min-h-[320px] w-full rounded-xl border border-espresso/10 bg-parchment/60 p-4 font-serif text-[16px] leading-[36px] text-espresso/90 placeholder:text-latte/70 focus:border-clay focus:outline-none"
          autoFocus
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-hand text-lg text-cocoa">
            {mode === "continue" ? "draft saved ✓" : "unsaved fresh page ○"}
          </p>
          <button
            type="button"
            onClick={() => router.push("/home/book")}
            className="rounded-full bg-lavender-deep px-6 py-2.5 text-sm font-bold text-espresso transition hover:bg-lavender-deeper"
          >
            Save & return
          </button>
        </div>
      </div>
    </section>
  );
}
