import Link from "next/link";
import { connection } from "next/server";

const features = [
  {
    href: "/home/list",
    icon: "☰",
    title: "Your list",
    hand: "every page, newest first",
    description:
      "Search your soft archive by words, moods, or the little moments you kept.",
    rotate: "rotate-1",
  },
  {
    href: "/home/calendar",
    icon: "📅",
    title: "Calendar",
    hand: "gentle streaks",
    description:
      "Pink dots mark the days you wrote. No pressure, just a soft trail.",
    rotate: "-rotate-1",
  },
  {
    href: "/home/media",
    icon: "🖼",
    title: "Little museum",
    hand: "photos, scraps & stickers",
    description:
      "Pressed flowers, ticket stubs, café corners and other small treasures.",
    rotate: "-rotate-1",
  },
  {
    href: "/home/map",
    icon: "🗺",
    title: "Map",
    hand: "where you felt it",
    description:
      "Your entries pinned to the places that held them, all in one view.",
    rotate: "rotate-1",
  },
  {
    href: "/home/write?mode=new",
    icon: "✎",
    title: "Fresh page",
    hand: "start writing now",
    description:
      "Skip the choosing and open a blank page. Just you, the prompt, and a pen.",
    rotate: "rotate-1",
  },
];

function Tape({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`washi pointer-events-none absolute h-7 w-24 opacity-90 shadow-sm ${className}`}
      style={{
        clipPath:
          "polygon(2% 0, 98% 4%, 100% 90%, 97% 100%, 3% 96%, 0 88%)",
      }}
    />
  );
}

export default async function HomeIndex() {
  await connection();
  const dateLabel = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-16 h-64 w-64 rounded-full bg-lavender-soft/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-64 w-64 rounded-full bg-lavender-soft blur-3xl"
      />

      <section className="relative">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-hand text-2xl text-lavender-deeper">
              ✿ welcome to your nook
            </p>
            <h1 className="mt-1 max-w-xl font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              What shall we muse about?
            </h1>
            <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-cocoa">
              Pick a soft corner to wander into — your pages, moods and little
              keepsakes all live here.
            </p>
          </div>
          <span className="rounded-full border border-espresso/15 bg-cream px-4 py-1.5 font-hand text-lg leading-none text-espresso shadow-[2px_2px_0_rgba(138,120,160,0.12)]">
            ☾ {dateLabel}
          </span>
        </div>

        {/* featured — today's page */}
        <Link
          href="/home/book"
          className="group relative mt-7 block overflow-hidden rounded-[24px] border border-espresso/15 bg-lavender-soft p-6 shadow-[6px_6px_0_rgba(168,152,208,0.9)] transition hover:-translate-y-0.5 sm:p-8"
        >
          <Tape className="left-1/2 top-[-14px] -translate-x-1/2 rotate-[-3deg] bg-cream" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-lavender-deeper">
                ✎ today&apos;s page
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
                Pick up your pen
              </h2>
              <p className="mt-2 font-hand text-[22px] leading-tight text-espresso">
                “What small moment do you want to keep?”
              </p>
              <p className="mt-2 text-sm leading-relaxed text-espresso/75">
                Continue your morning draft or open a fresh page. Five soft
                minutes is enough.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-lavender-deep px-5 py-2.5 text-sm font-bold text-espresso transition group-hover:bg-lavender-deeper">
                Open your book →
              </span>
            </div>

            <div className="relative w-full max-w-[190px] shrink-0 self-center">
              <div className="paper-lines rotate-2 rounded-2xl border border-espresso/15 bg-[#fffefd] p-4 font-serif text-[13px] italic leading-[32px] text-espresso/80 shadow-[4px_4px_0_rgba(138,120,160,0.12)]">
                The light through the kitchen window at 7am. Oat latte, still
                warm…
              </div>
              <span className="absolute -bottom-3 -right-2 rotate-[-4deg] rounded-full border border-espresso/15 bg-cream px-3 py-1 font-hand text-base leading-none text-cocoa shadow-sm">
                12 cozy days
              </span>
            </div>
          </div>
        </Link>

        {/* feature cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`group relative flex flex-col rounded-[20px] border border-espresso/10 bg-[#fffefd] p-5 shadow-[4px_4px_0_rgba(138,120,160,0.1)] transition hover:-translate-y-0.5 hover:rotate-0 hover:border-espresso/20 ${f.rotate}`}
            >
              <span aria-hidden className="text-2xl leading-none">
                {f.icon}
              </span>
              <h3 className="mt-2 font-serif text-xl font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="font-hand text-lg leading-tight text-lavender-deeper">
                {f.hand}
              </p>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-cocoa">
                {f.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-lavender-deeper transition group-hover:text-espresso">
                Wander in <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-7 text-center font-hand text-xl text-cocoa">
          come as you are — no streaks to keep, just pages to hold ✿
        </p>
      </section>
    </div>
  );
}
