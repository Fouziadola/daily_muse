const items = [
  { emoji: "🌷", label: "Pressed flowers", count: 12 },
  { emoji: "🎟", label: "Ticket stubs", count: 8 },
  { emoji: "☕", label: "Café corners", count: 21 },
  { emoji: "🌙", label: "Night skies", count: 6 },
  { emoji: "✉", label: "Letters", count: 4 },
  { emoji: "🐈", label: "Small friends", count: 15 },
];

export default function MediaPage() {
  return (
    <section>
      <p className="font-hand text-2xl text-lavender-deeper">🖼 little museum</p>
      <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight">
        Media
      </h1>
      <p className="mt-2 text-[15px] text-cocoa">
        Photos, scraps and stickers saved from your entries.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((m, i) => (
          <figure
            key={m.label}
            className={`rounded-2xl border border-espresso/10 bg-[#fffefd] p-5 text-center shadow-[4px_4px_0_rgba(138,120,160,0.1)] ${
              i % 3 === 1 ? "rotate-1" : i % 3 === 2 ? "-rotate-1" : ""
            }`}
          >
            <span aria-hidden className="text-4xl">
              {m.emoji}
            </span>
            <figcaption className="mt-2 text-sm font-bold">{m.label}</figcaption>
            <p className="font-hand text-lg text-cocoa">{m.count} saved</p>
          </figure>
        ))}
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-full border border-dashed border-espresso/25 bg-cream/60 px-6 py-3.5 font-bold text-cocoa transition hover:bg-parchment hover:text-espresso"
      >
        + Add from today&apos;s page
      </button>
    </section>
  );
}
