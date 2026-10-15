"use client";

import { useState } from "react";

type Mode = "continue" | "new";

const draftText = `The light through the kitchen window at 7am. Oat latte, still warm. Maya texted “good morning sunshine”…`;

export default function BookPage() {
  const [mode, setMode] = useState<Mode>("continue");
  const [text, setText] = useState(draftText);

  const pick = (next: Mode) => {
    setMode(next);
    if (next === "new") setText("");
    else setText(draftText);
  };

  return (
    <section>
      <p className="font-hand text-2xl text-rose-deep">✿ your book — Oct 01</p>
      <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight">
        Today&apos;s page
      </h1>
      <p className="mt-2 max-w-md text-[15px] leading-relaxed text-cocoa">
        Choose one to begin — pick up your draft or open a fresh page.
      </p>

      {/* 1 + 2 — the two options */}
      <div
        role="tablist"
        aria-label="Choose writing option"
        className="mt-5 grid grid-cols-2 gap-3"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "continue"}
          onClick={() => pick("continue")}
          className={`rounded-2xl border p-4 text-left transition ${
            mode === "continue"
              ? "border-espresso/20 bg-clay text-espresso shadow-[4px_4px_0_rgba(100,80,85,0.15)]"
              : "border-espresso/10 bg-[#fffefd] hover:bg-parchment"
          }`}
        >
          <span aria-hidden className="text-2xl">
            ✎
          </span>
          <span className="mt-1 block font-serif text-lg font-semibold leading-tight">
            1. Continue writing
          </span>
          <span
            className={`mt-0.5 block font-hand text-lg leading-tight ${
              mode === "continue" ? "text-espresso/80" : "text-cocoa"
            }`}
          >
            resume your draft…
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === "new"}
          onClick={() => pick("new")}
          className={`rounded-2xl border p-4 text-left transition ${
            mode === "new"
              ? "border-espresso/20 bg-clay text-espresso shadow-[4px_4px_0_rgba(100,80,85,0.15)]"
              : "border-espresso/10 bg-[#fffefd] hover:bg-parchment"
          }`}
        >
          <span aria-hidden className="text-2xl">
            ＋
          </span>
          <span className="mt-1 block font-serif text-lg font-semibold leading-tight">
            2. New page
          </span>
          <span
            className={`mt-0.5 block font-hand text-lg leading-tight ${
              mode === "new" ? "text-espresso/80" : "text-cocoa"
            }`}
          >
            start fresh & blank
          </span>
        </button>
      </div>

      {/* editor card */}
      <div className="relative mt-4 -rotate-1 rounded-[22px] border border-espresso/15 bg-[#fffefd] p-6 shadow-[8px_8px_0_rgba(100,80,85,0.14)]">
        <div
          aria-hidden
          className="washi pointer-events-none absolute left-1/2 top-[-14px] h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-rose-soft opacity-90 shadow-sm"
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
          rows={6}
          placeholder={
            mode === "continue"
              ? "Keep writing your draft…"
              : "Begin your new page…"
          }
          aria-label={mode === "continue" ? "Continue draft" : "New page text"}
          className="paper-lines mt-3 min-h-40 w-full rounded-xl border border-espresso/10 bg-parchment/60 p-4 font-serif text-[15.5px] italic leading-[32px] text-espresso/90 placeholder:text-latte/70 focus:border-clay focus:outline-none"
        />
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="font-hand text-lg text-cocoa">
            {mode === "continue" ? "draft saved ✓" : "unsaved fresh page ○"}
          </p>
          <button
            type="button"
            className="rounded-full bg-clay px-6 py-2.5 text-sm font-bold text-espresso transition hover:bg-rose"
          >
            {mode === "continue" ? "Keep writing ✎" : "Start writing ✎"}
          </button>
        </div>
      </div>
    </section>
  );
}
