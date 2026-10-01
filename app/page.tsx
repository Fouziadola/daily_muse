import AuthButtons from "./components/auth-modal";

const prompts = [
  "what made you smile today?",
  "a small moment worth keeping",
  "letters I never sent",
  "today in three words",
  "things that feel like home",
  "gratitude, slow edition",
];

const features = [
  {
    icon: "✎",
    tape: "bg-rose-soft",
    title: "Gentle daily prompts",
    text: "A new handwritten-style prompt every morning. Never blank-page panic again — just one soft question to begin.",
    tag: "365 prompts",
  },
  {
    icon: "◍",
    tape: "bg-sage-soft",
    title: "Mood & season tracker",
    text: "Stamp your day with colors, weather, and feelings. Watch your inner seasons change across the months.",
    tag: "visual diary",
  },
  {
    icon: "❀",
    tape: "bg-linen",
    title: "Paper-soft pages",
    text: "Cream textures, serif type, washi edges. Designed to feel like your favorite notebook, not another app.",
    tag: "cozy UI",
  },
  {
    icon: "✉",
    tape: "bg-blush",
    title: "Letters to future you",
    text: "Seal entries as time capsules. Re-open them in 30 days, a year — and meet who you used to be.",
    tag: "time capsule",
  },
  {
    icon: "☾",
    tape: "bg-sage-soft",
    title: "Evening wind-down",
    text: "A 3-minute night ritual: release, gratitude, tomorrow's intention. Sleep with a lighter mind.",
    tag: "night ritual",
  },
  {
    icon: "✿",
    tape: "bg-rose-soft",
    title: "Private by default",
    text: "Your words stay yours. Lock with passcode, keep everything offline-first, export anytime.",
    tag: "safe space",
  },
];

const steps = [
  {
    no: "01",
    title: "Pour something warm",
    text: "Open Daily Muse with your morning tea. Pick today's prompt card — or shuffle for a surprise.",
    hand: "morning, 2 min",
  },
  {
    no: "02",
    title: "Write it messy",
    text: "No word counts, no streaks to break. Doodles, lists, long letters — everything belongs here.",
    hand: "no pressure, promise",
  },
  {
    no: "03",
    title: "Stamp & close",
    text: "Add a mood sticker, press save, watch your shelf fill with little spines of remembered days.",
    hand: "evening, 3 min",
  },
];

const testimonials = [
  {
    name: "Amara, 24",
    role: "slow mornings club",
    quote:
      "It feels like writing on sun-warmed paper. I actually look forward to journaling now instead of forcing it.",
    rotate: "-rotate-2",
    sticker: "☕",
  },
  {
    name: "Sofia",
    role: "keeps 3 journals",
    quote:
      "The prompts are so tender. 'What felt like home today?' made me cry in a café — in a good way.",
    rotate: "rotate-1",
    sticker: "🌷",
  },
  {
    name: "June",
    role: "night writer",
    quote:
      "My evening wind-down replaced doomscrolling. My sleep, my mood, everything is softer lately.",
    rotate: "-rotate-1",
    sticker: "☾",
  },
];

const faqs = [
  {
    q: "Is Daily Muse free?",
    a: "Yes — the cozy starter plan is free forever with daily prompts and unlimited entries. The Letterpress plan ($4/mo) adds time capsules, themes, and exports.",
  },
  {
    q: "Do I need to write every day?",
    a: "No streaks, no guilt. Daily Muse celebrates gaps as part of life. Come back whenever — your shelf waits patiently.",
  },
  {
    q: "Is my journal private?",
    a: "Completely. Passcode lock, private by default, and you can export or delete everything in one tap. We never sell words.",
  },
  {
    q: "Can I use it on phone and laptop?",
    a: "Yes. It is a soft web app that works everywhere, with offline-first pages so you can write on trains, cabins, and slow Sundays.",
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

function Sticker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-espresso/15 bg-cream px-3 py-1 font-hand text-lg leading-none shadow-[2px_2px_0_rgba(63,46,37,0.15)] ${className}`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="paper-grain flex min-h-full flex-col text-espresso">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-md">
        <nav className="flex w-full items-center justify-between px-5 py-4 sm:px-10 lg:px-16">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="leading-tight">
              <span className="block font-serif text-xl font-semibold tracking-tight">
                Daily Muse
              </span>
              <span className="block font-hand text-base leading-none text-cocoa">
                a soft place for thoughts
              </span>
            </span>
          </a>
          <div className="hidden items-center gap-7 text-[15px] font-medium text-cocoa md:flex">
            <a href="#features" className="transition hover:text-espresso">
              Rituals
            </a>
            <a href="#spread" className="transition hover:text-espresso">
              Pages
            </a>
            <a href="#letters" className="transition hover:text-espresso">
              Letters
            </a>
          </div>
          <AuthButtons />
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-rose-soft/70 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-40 h-80 w-80 rounded-full bg-sage-soft blur-3xl"
        />
        <div
          aria-hidden
          className="dotted-bg absolute inset-x-0 top-0 h-40 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />

        <div className="relative grid w-full items-center gap-12 px-5 pb-16 pt-12 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:pt-20">
          {/* copy */}
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Sticker>✿ slow journaling</Sticker>
              <Sticker className="-rotate-3">☕ for soft days</Sticker>
            </div>
            <p className="mb-3 font-hand text-2xl text-clay-deep">
              dear diary, but make it aesthetic —
            </p>
            <h1 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              Romanticize
              <br />
              your <em className="italic text-rose-deep">ordinary</em>
              <br />
              days.
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-cocoa">
              Daily Muse is a paper-soft digital journal with gentle prompts,
              mood stamps, and evening rituals. Five minutes a day to remember
              your life as it happens.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="rounded-full bg-clay px-7 py-3.5 font-semibold text-cream shadow-[3px_3px_0_#3f2e25] transition hover:-translate-y-0.5 hover:bg-clay-deep"
              >
                Open your journal →
              </a>
              <a
                href="#spread"
                className="rounded-full border border-espresso/20 bg-cream px-7 py-3.5 font-semibold text-espresso transition hover:border-espresso hover:bg-parchment"
              >
                Peek inside
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cocoa">
              <div className="flex items-center gap-2">
                <span className="tracking-tight text-gold">★★★★★</span>
                <span>
                  <strong className="text-espresso">4.9</strong> from 2,400+
                  soft writers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex -space-x-2">
                  {["AM", "SJ", "JK"].map((n) => (
                    <span
                      key={n}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-linen text-[11px] font-bold"
                    >
                      {n}
                    </span>
                  ))}
                </span>
                <span>loved by journal girls & guys</span>
              </div>
            </div>
          </div>

          {/* journal mock */}
          <div className="relative mx-auto w-full max-w-[440px]">
            <div
              aria-hidden
              className="absolute -inset-4 -rotate-2 rounded-[28px] bg-sand/60"
            />
            <div className="relative -rotate-2 rounded-[22px] border border-espresso/15 bg-[#fffdf7] p-6 shadow-[8px_8px_0_rgba(63,46,37,0.14)]">
              <Tape className="left-1/2 top-[-14px] -translate-x-1/2 rotate-[-3deg] bg-rose-soft" />
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                  ✿ Oct 01 — morning page
                </p>
                <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-bold text-sage-deep">
                  ● calm
                </span>
              </div>
              <p className="mt-4 font-hand text-[26px] leading-tight text-espresso">
                “What small moment do you want to keep from today?”
              </p>
              <div className="paper-lines mt-3 rounded-xl border border-espresso/10 bg-parchment/60 p-4 font-serif text-[15.5px] italic leading-[32px] text-espresso/90">
                The light through the kitchen window at 7am. Oat latte,
                still warm. Maya texted “good morning sunshine”…
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  {["#d9a5a0", "#a8b89a", "#c68b59", "#c9a86a", "#efe4d0"].map(
                    (c) => (
                      <span
                        key={c}
                        style={{ background: c }}
                        className="h-5 w-5 rounded-full border border-espresso/20"
                      />
                    ),
                  )}
                </div>
                <p className="font-hand text-lg text-cocoa">
                  mood: soft & golden ✓
                </p>
              </div>
            </div>

            <div className="animate-float absolute -right-4 top-8 rotate-6 rounded-2xl border border-espresso/15 bg-cream px-4 py-3 shadow-lg sm:-right-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-latte">
                streak, but gentle
              </p>
              <p className="font-serif text-lg font-semibold">12 cozy days</p>
            </div>
            <div
              className="animate-float-slow absolute -left-3 bottom-10 -rotate-6 rounded-2xl border border-espresso/15 bg-espresso px-4 py-3 text-cream shadow-lg sm:-left-8"
              style={{ ["--float-rotate" as string]: "-6deg" }}
            >
              <p className="font-hand text-xl leading-none text-gold">
                remember this!
              </p>
              <p className="mt-1 text-[13px] text-cream/80">
                letter opens in 30 days ✉
              </p>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="relative border-y border-espresso/15 bg-parchment py-3.5">
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex w-max shrink-0 items-center gap-8 pr-8">
              {[...prompts, ...prompts].map((p, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 whitespace-nowrap font-hand text-xl text-cocoa"
                >
                  {p} <span className="text-clay">✿</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="w-full px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-hand text-2xl text-clay-deep">
            everything smells like paper & vanilla
          </p>
          <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Little rituals for a{" "}
            <em className="italic text-sage-deep">softer mind</em>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-cocoa">
            Not productivity. Not performance. Just tiny, beautiful habits
            that help you notice your life while you are living it.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group relative rounded-3xl border border-espresso/12 bg-[#fffdf7] p-6 pt-8 shadow-[4px_4px_0_rgba(63,46,37,0.08)] transition hover:-translate-y-1 hover:shadow-[6px_8px_0_rgba(63,46,37,0.12)]"
            >
              <Tape
                className={`left-1/2 top-[-12px] -translate-x-1/2 rotate-[-4deg] ${f.tape}`}
              />
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-espresso/10 bg-parchment text-2xl">
                  {f.icon}
                </span>
                <span className="rounded-full border border-espresso/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-latte">
                  {f.tag}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-[22px] font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-cocoa">
                {f.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* RITUAL / STEPS */}
      <section className="border-y border-espresso/10 bg-parchment/70">
        <div className="grid w-full items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-16 lg:py-20">
          <div>
            <p className="font-hand text-2xl text-rose-deep">
              how a day with muse feels
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Five minutes,
              <br />
              morning & night.
            </h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-cocoa">
              Think of it like skincare for your inner world — small steps,
              warm water, gentle hands. No streak anxiety allowed.
            </p>
            <a
              href="#cta"
              className="mt-6 inline-block rounded-full border border-espresso bg-cream px-6 py-3 font-semibold shadow-[3px_3px_0_#3f2e25] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Try tonight&apos;s wind-down ☾
            </a>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-dashed border-espresso/25 bg-cream/70 p-4">
              <span className="font-serif text-4xl">“</span>
              <p className="font-hand text-xl leading-snug text-cocoa">
                I stopped trying to be interesting and just started being
                honest. Game changer.
              </p>
            </div>
          </div>
          <ol className="space-y-4">
            {steps.map((s, i) => (
              <li
                key={s.no}
                className={`relative rounded-3xl border border-espresso/12 bg-[#fffdf7] p-6 pl-6 shadow-[4px_4px_0_rgba(63,46,37,0.08)] ${
                  i === 1 ? "ml-0 sm:ml-8" : i === 2 ? "ml-0 sm:ml-16" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-serif text-3xl font-semibold text-sand">
                    {s.no}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold">
                      {s.title}
                    </h3>
                    <p className="font-hand text-lg leading-none text-clay-deep">
                      {s.hand}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[15.5px] leading-relaxed text-cocoa">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SPREAD PREVIEW */}
      <section id="spread" className="w-full px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[24px] border border-espresso/15 bg-[#fffdf7] shadow-[8px_8px_0_rgba(63,46,37,0.12)]">
              <div className="grid sm:grid-cols-2">
                <div className="border-b border-espresso/10 p-6 sm:border-b-0 sm:border-r">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-rose-deep">
                    ✉ prompt of the day
                  </p>
                  <p className="mt-3 font-serif text-2xl font-medium leading-snug">
                    Describe a place that feels like a hug.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["slow", "home", "autumn"].map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-blush px-3 py-1 text-[13px] font-semibold text-rose-deep"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl bg-sage-soft/70 p-4">
                    <p className="text-[13px] font-bold uppercase tracking-widest text-sage-deep">
                      mood stamps
                    </p>
                    <div className="mt-2 flex gap-2 text-xl">
                      <span>🌧</span>
                      <span className="rounded-full bg-cream px-2 ring-2 ring-sage-deep">
                        ☕
                      </span>
                      <span>🌷</span>
                      <span>☾</span>
                    </div>
                  </div>
                </div>
                <div className="paper-lines bg-parchment/50 p-6">
                  <p className="font-hand text-2xl text-espresso">
                    grandma&apos;s kitchen…
                  </p>
                  <p className="mt-1 font-serif text-[15px] italic leading-[32px] text-espresso/85">
                    checkered curtains, soup on the stove, radio humming low.
                    I felt seven and safe and entirely loved. I want to keep
                    that warmth in my pocket forever.
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-espresso/20 pt-3">
                    <span className="font-hand text-lg text-cocoa">
                      214 words · kept ✓
                    </span>
                    <span className="text-gold">✿ ✿ ✿</span>
                  </div>
                </div>
              </div>
              <Tape className="left-8 top-[-2px] rotate-[8deg] bg-sage-soft" />
              <Tape className="right-8 top-[-2px] rotate-[-8deg] bg-rose-soft" />
            </div>
            <p className="mt-4 text-center font-hand text-xl text-cocoa">
              ↑ an actual page from the community shelf
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <p className="font-hand text-2xl text-sage-deep">
              peek inside the pages
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Like your favorite notebook, but it <em className="italic text-clay-deep">prompts you back</em>
            </h2>
            <ul className="mt-6 space-y-4 text-[16px] text-cocoa">
              {[
                ["lined, dotted, or blank", "Switch paper styles per entry. Margin doodles encouraged."],
                ["photo corners & stickers", "Tape polaroids, ticket stubs, pressed flowers (digitally)."],
                ["word-soft stats", "See feelings across seasons — no charts that judge you."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
                    ✓
                  </span>
                  <span>
                    <strong className="text-espresso">{t} — </strong>
                    {d}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="letters" className="border-y border-espresso/10 bg-espresso py-16 text-cream lg:py-20">
        <div className="w-full px-5 sm:px-10 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-hand text-2xl text-gold">
                seasonal letter collections
              </p>
              <h2 className="mt-2 max-w-xl font-serif text-4xl font-medium tracking-tight sm:text-5xl">
                Journals for every version of you
              </h2>
            </div>
            <p className="max-w-sm text-[15.5px] leading-relaxed text-cream/70">
              Curated prompt packs written by poets & therapists. Collect
              them like postcards.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Autumn Letters", d: "30 prompts for letting go softly", c: "bg-clay", e: "🍂", n: "most loved" },
              { t: "Gratitude, Slow", d: "21 days of noticing enough", c: "bg-sage", e: "🌿", n: "beginner" },
              { t: "Love, Unsent", d: "letters you needed to write", c: "bg-rose", e: "💌", n: "tender" },
              { t: "Midnight Pages", d: "for overthinkers & dreamers", c: "bg-gold", e: "☾", n: "night owls" },
            ].map((c) => (
              <div
                key={c.t}
                className="group rounded-3xl border border-cream/15 bg-cream/[0.06] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-cream/[0.1]"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${c.c}`}
                >
                  {c.e}
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cream/60">
                  {c.n}
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold">{c.t}</h3>
                <p className="mt-2 text-[15px] text-cream/70">{c.d}</p>
                <p className="mt-4 font-hand text-xl text-gold transition group-hover:translate-x-1">
                  open collection →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="text-center">
          <p className="font-hand text-2xl text-clay-deep">
            pinned to the corkboard
          </p>
          <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
            Loved by soft writers everywhere
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className={`relative rounded-sm border border-espresso/10 bg-[#fffdf7] p-6 pb-14 pt-8 shadow-[5px_5px_0_rgba(63,46,37,0.1)] transition hover:rotate-0 ${t.rotate}`}
            >
              <Tape className="left-1/2 top-[-12px] -translate-x-1/2 bg-linen" />
              <span className="absolute right-4 top-4 text-2xl">{t.sticker}</span>
              <span className="tracking-tight text-gold">★★★★★</span>
              <blockquote className="mt-3 font-serif text-[17px] italic leading-relaxed">
                “{t.quote}”
              </blockquote>
              <figcaption className="absolute bottom-4 left-6 right-6 flex items-center justify-between border-t border-dashed border-espresso/20 pt-3">
                <span className="font-bold">{t.name}</span>
                <span className="font-hand text-lg text-cocoa">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-espresso/10 bg-parchment/70">
        <div className="w-full px-5 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="text-center">
            <p className="font-hand text-2xl text-sage-deep">
              cheaper than a fancy notebook
            </p>
            <h2 className="mt-2 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Choose your paper
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-espresso/15 bg-[#fffdf7] p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                ✿ starter
              </p>
              <h3 className="mt-2 font-serif text-3xl font-semibold">Cozy</h3>
              <p className="mt-1 font-hand text-xl text-cocoa">
                for dipping your toes in
              </p>
              <p className="mt-4 font-serif text-5xl font-semibold">
                $0
                <span className="text-lg font-normal text-cocoa"> / forever</span>
              </p>
              <ul className="mt-6 space-y-3 text-[15.5px] text-cocoa">
                {["Daily prompts + unlimited entries", "Mood stamps & paper styles", "1 keepsake shelf"].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="text-sage-deep">✓</span> {x}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="mt-7 block rounded-full border border-espresso/25 bg-cream py-3.5 text-center font-semibold transition hover:border-espresso hover:bg-parchment"
              >
                Start for free
              </a>
            </div>
            <div className="relative rounded-3xl border-2 border-espresso bg-espresso p-8 text-cream shadow-[6px_6px_0_rgba(198,139,89,0.9)]">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-clay px-4 py-1 text-[13px] font-bold uppercase tracking-wider text-cream">
                ✿ most kept
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                ✉ letterpress
              </p>
              <h3 className="mt-2 font-serif text-3xl font-semibold">Keepsake</h3>
              <p className="mt-1 font-hand text-xl text-cream/70">
                for the memory keepers
              </p>
              <p className="mt-4 font-serif text-5xl font-semibold">
                $4
                <span className="text-lg font-normal text-cream/60"> / month</span>
              </p>
              <ul className="mt-6 space-y-3 text-[15.5px] text-cream/85">
                {["Everything in Cozy", "Time-capsule letters to future you", "All seasonal collections + exports", "Passcode lock & custom themes"].map((x) => (
                  <li key={x} className="flex gap-2.5">
                    <span className="text-gold">✓</span> {x}
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className="mt-7 block rounded-full bg-clay py-3.5 text-center font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-clay-deep"
              >
                Keep everything →
              </a>
            </div>
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-14 max-w-3xl">
            <h3 className="text-center font-serif text-3xl font-medium">
              Soft questions, honest answers
            </h3>
            <div className="mt-6 space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-espresso/12 bg-[#fffdf7] px-5 py-4 open:shadow-[3px_3px_0_rgba(63,46,37,0.1)]"
                >
                  <summary className="cursor-pointer list-none font-serif text-[17px] font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-parchment transition group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-cocoa">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="relative w-full overflow-hidden rounded-[32px] border border-espresso/15 bg-blush px-6 py-14 text-center shadow-[8px_8px_0_rgba(63,46,37,0.12)] sm:px-14">
          <div aria-hidden className="dotted-bg absolute inset-0 opacity-50" />
          <Tape className="left-10 top-[-4px] rotate-[-10deg] bg-rose-soft" />
          <Tape className="right-10 top-[-4px] rotate-[10deg] bg-sage-soft" />
          <div className="relative">
            <p className="font-hand text-2xl text-rose-deep">
              psst — your future self says hi
            </p>
            <h2 className="mx-auto mt-2 max-w-xl font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Tonight, write one small beautiful thing.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[17px] text-cocoa">
              Free forever. No streaks. Just a warm page waiting with the
              kettle on.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="#top"
                className="rounded-full bg-espresso px-8 py-4 font-semibold text-cream shadow-[3px_3px_0_rgba(198,139,89,1)] transition hover:-translate-y-0.5"
              >
                Open Daily Muse ✎
              </a>
              <a
                href="#features"
                className="rounded-full border border-espresso/20 bg-cream px-8 py-4 font-semibold transition hover:bg-white"
              >
                Read a sample page
              </a>
            </div>
            <p className="mt-5 font-hand text-xl text-cocoa">
              join 12,000+ journalers keeping soft days ✿
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-espresso/10 bg-cream">
        <div className="grid w-full gap-10 px-5 py-12 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-16">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-espresso/15 bg-parchment font-serif text-2xl italic">
                D
              </span>
              <span className="font-serif text-xl font-semibold">Daily Muse</span>
            </div>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-cocoa">
              A soft place for your thoughts. Made slowly, with tea, for
              people who underline sentences in books.
            </p>
            <p className="mt-4 font-hand text-xl text-clay-deep">
              write softly, live fully ✿
            </p>
          </div>
          {[
            ["Explore", ["Today's prompt", "Collections", "Community shelf", "Gift a journal"]],
            ["Company", ["Our story", "Manifesto", "Privacy, gently", "Contact"]],
            ["Rituals", ["Morning pages", "Evening wind-down", "Time capsules", "Mood seasons"]],
          ].map(([h, links]) => (
            <div key={h as string}>
              <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                {h as string}
              </h4>
              <ul className="mt-4 space-y-2.5 text-[15px] font-medium text-cocoa">
                {(links as string[]).map((l) => (
                  <li key={l}>
                    <a href="#top" className="transition hover:text-espresso">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-espresso/10">
          <div className="flex w-full flex-wrap items-center justify-between gap-2 px-5 py-5 text-[13.5px] text-latte sm:px-10 lg:px-16">
            <p>© 2026 Daily Muse. All soft days reserved.</p>
            <p className="font-hand text-lg text-cocoa">
              made with paper cuts & warm tea ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
