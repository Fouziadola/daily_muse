const entries = [
  { date: "Oct 01", title: "Sun-warmed kitchen light", mood: "calm", excerpt: "Oat latte, still warm. Maya texted good morning…" },
  { date: "Sep 30", title: "Rainy café, good cry", mood: "tender", excerpt: "“What felt like home today?” got me…" },
  { date: "Sep 29", title: "Night walk, moon timer", mood: "sleepy", excerpt: "5 slow breaths. Sealed a note for Nov…" },
];

export default function ListPage() {
  return (
    <section>
      <p className="font-hand text-2xl text-lavender-deeper">☰ all entries</p>
      <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight">
        Your list
      </h1>
      <p className="mt-2 text-[15px] text-cocoa">
        Every page, newest first. Search your soft archive.
      </p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-espresso/15 bg-cream">
        <input
          type="search"
          placeholder="Search entries, moods, words…"
          aria-label="Search entries"
          className="w-full bg-transparent px-5 py-3.5 text-[15px] text-espresso placeholder:text-latte/70 focus:outline-none"
        />
      </div>

      <ul className="mt-5 space-y-3">
        {entries.map((e) => (
          <li
            key={e.date + e.title}
            className="rounded-2xl border border-espresso/10 bg-[#fffefd] p-5 shadow-[4px_4px_0_rgba(138,120,160,0.1)] transition hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                {e.date}
              </p>
              <span className="rounded-full bg-lavender-soft px-3 py-1 text-xs font-bold text-lavender-deeper">
                ● {e.mood}
              </span>
            </div>
            <h2 className="mt-2 font-serif text-xl font-semibold">{e.title}</h2>
            <p className="mt-1 font-serif text-[15px] italic text-cocoa">
              {e.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
