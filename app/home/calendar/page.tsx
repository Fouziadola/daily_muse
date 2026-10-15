const weeks = ["M", "T", "W", "T", "F", "S", "S"];
// Oct 2026 placeholder grid — 1st is a Thursday
const blanks = 3;
const days = Array.from({ length: 31 }, (_, i) => i + 1);
const written = new Set([1, 4, 7, 12, 18, 21, 29]);

export default function CalendarPage() {
  return (
    <section>
      <p className="font-hand text-2xl text-rose-deep">📅 gentle streaks</p>
      <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight">
        Calendar
      </h1>
      <p className="mt-2 text-[15px] text-cocoa">
        Pink dots = days you wrote. No pressure, just a soft trail.
      </p>

      <div className="mt-6 rounded-[22px] border border-espresso/15 bg-[#fffefd] p-6 shadow-[8px_8px_0_rgba(100,80,85,0.12)]">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">October 2026</h2>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous month"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 bg-cream transition hover:bg-parchment"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next month"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 bg-cream transition hover:bg-parchment"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs font-bold uppercase tracking-widest text-latte">
          {weeks.map((w, i) => (
            <span key={i} className="py-1">
              {w}
            </span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1.5">
          {Array.from({ length: blanks }).map((_, i) => (
            <span key={`b-${i}`} />
          ))}
          {days.map((d) => {
            const has = written.has(d);
            const isToday = d === 15;
            return (
              <button
                key={d}
                type="button"
                aria-label={`Oct ${d}${has ? ", entry written" : ""}`}
                className={`flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm font-bold transition ${
                  isToday
                    ? "border-espresso/20 bg-clay text-espresso"
                    : has
                      ? "border-espresso/10 bg-rose-soft text-espresso"
                      : "border-transparent text-cocoa hover:bg-parchment"
                }`}
              >
                {d}
                {has && <span aria-hidden className="text-[10px] leading-none">✿</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
