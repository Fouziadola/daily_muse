import AuthButtons from "./components/auth-modal";

const prompts = [
  "what made you smile today?",
  "a small moment worth keeping",
  "letters I never sent",
  "today in three words",
  "things that feel like home",
  "gratitude, slow edition",
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

      {/* CTA — evening ritual */}
      <section id="cta" className="relative overflow-hidden px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="relative w-full overflow-hidden rounded-[36px] bg-espresso text-cream shadow-[8px_8px_0_rgba(111,92,196,0.25)]">
          {/* lavender glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-clay/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-sage/40 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(rgba(250,248,255,0.35) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative grid gap-12 p-8 sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-14">
            {/* copy */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-rose-soft">
                  ✦ evening ritual • 9:47 pm
                </span>
                <span className="rounded-full border border-white/15 px-4 py-1.5 font-hand text-lg leading-none text-linen">
                  no streaks, just softness
                </span>
              </div>
              <h2 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
                End your day in
                <br />
                <em className="italic text-rose-soft">lavender</em> light.
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-cream/75">
                A 5-minute wind-down: breathe, keep one small moment, and
                drift off. Your page glows softly — like lamplight on lilac
                paper.
              </p>

              <ul className="mt-7 space-y-3">
                {[
                  ["01", "Breathe", "60-second exhale with a moon timer"],
                  ["02", "Keep", "one line + one tiny gratitude"],
                  ["03", "Dream", "seal a capsule for future-you"],
                ].map(([n, t, d]) => (
                  <li
                    key={n}
                    className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-soft font-serif text-sm font-bold text-espresso">
                      {n}
                    </span>
                    <div>
                      <p className="font-bold leading-none">{t}</p>
                      <p className="mt-1 text-sm text-cream/65">{d}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#top"
                  className="rounded-full bg-cream px-8 py-4 font-semibold text-espresso shadow-[3px_3px_0_rgba(157,140,255,1)] transition hover:-translate-y-0.5"
                >
                  Start tonight&apos;s entry ✎
                </a>
                <a
                  href="#top"
                  className="rounded-full border border-white/25 px-7 py-4 font-semibold text-cream/90 transition hover:bg-white/10"
                >
                  Peek at prompts
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-cream/70">
                <span className="tracking-tight text-rose-soft">★★★★★ 4.9</span>
                <span className="flex -space-x-2">
                  {["AM", "SJ", "JK"].map((ini) => (
                    <span
                      key={ini}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-espresso bg-linen text-[11px] font-bold text-espresso"
                    >
                      {ini}
                    </span>
                  ))}
                </span>
                <span>join 12,000+ journalers winding down</span>
              </div>
            </div>

            {/* night note card */}
            <div className="relative mx-auto w-full max-w-[400px]">
              <div className="relative rounded-[24px] border border-white/15 bg-white/[0.08] p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-soft">
                    ☾ night note — Oct 01
                  </p>
                  <span className="flex gap-1.5" aria-hidden>
                    {["○", "◐", "●"].map((m) => (
                      <span key={m} className="text-sm text-linen/80">
                        {m}
                      </span>
                    ))}
                  </span>
                </div>
                <p className="mt-4 font-hand text-[26px] leading-tight text-cream">
                  “What do you want to dream about tonight?”
                </p>
                <div className="mt-4 space-y-0 rounded-xl border border-white/10 bg-espresso/40 p-4">
                  {[
                    "lavender on my pillow, window cracked,",
                    "the day folding itself away softly…",
                    "tomorrow can wait — tonight is mine.",
                  ].map((line) => (
                    <p
                      key={line}
                      className="border-b border-white/10 py-2 font-serif text-[15px] italic leading-6 text-cream/85 last:border-0"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    {["#e9ddff", "#c4a8f0", "#9db4e8", "#8b7bd8", "#faf8ff"].map(
                      (c) => (
                        <span
                          key={c}
                          style={{ background: c }}
                          className="h-5 w-5 rounded-full border border-white/30"
                        />
                      ),
                    )}
                  </div>
                  <p className="font-hand text-lg text-linen">
                    saved • 9:48 pm ✓
                  </p>
                </div>
              </div>

              <div className="animate-float absolute -right-3 -top-5 rotate-3 rounded-2xl bg-cream px-4 py-3 text-espresso shadow-lg sm:-right-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-clay-deep">
                  ☁ drift off
                </p>
                <p className="font-serif text-base font-semibold">
                  5-min moon timer
                </p>
              </div>
              <div
                className="animate-float-slow absolute -bottom-6 -left-3 -rotate-3 rounded-2xl bg-rose-soft px-4 py-3 text-espresso shadow-lg sm:-left-6"
                style={{ ["--float-rotate" as string]: "-3deg" }}
              >
                <p className="font-hand text-xl leading-none text-clay-deep">
                  sealed with stardust!
                </p>
                <p className="mt-1 text-[13px] text-espresso/70">
                  ✉ opens Nov 1 for future-you
                </p>
              </div>
            </div>
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
