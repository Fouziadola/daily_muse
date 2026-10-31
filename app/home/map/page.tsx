const pins = [
  { place: "Kitchen window", note: "7am light + oat latte", left: "22%", top: "30%" },
  { place: "Café Lila", note: "cried a little, good cry", left: "62%", top: "48%" },
  { place: "Night hill", note: "moon timer walk", left: "42%", top: "68%" },
];

export default function MapPage() {
  return (
    <section>
      <p className="font-hand text-2xl text-lavender-deeper">🗺 where you felt it</p>
      <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight">
        Map
      </h1>
      <p className="mt-2 text-[15px] text-cocoa">
        Entries pinned to the places that held them.
      </p>

      <div className="dotted-bg relative mt-6 overflow-hidden rounded-[22px] border border-espresso/15 bg-parchment/60 p-6 shadow-[8px_8px_0_rgba(138,120,160,0.12)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-lavender-soft/70 blur-3xl"
        />
        {/* stylized map card */}
        <div className="relative h-64 overflow-hidden rounded-2xl border border-espresso/10 bg-cream">
          {/* fake streets */}
          <div aria-hidden className="absolute inset-0 opacity-60">
            <div className="absolute left-0 top-1/3 h-[3px] w-full rotate-[-8deg] bg-linen" />
            <div className="absolute left-1/4 top-0 h-full w-[3px] rotate-[12deg] bg-linen" />
            <div className="absolute bottom-6 left-0 h-[2px] w-full rotate-[4deg] bg-lavender-soft" />
          </div>
          {pins.map((p) => (
            <button
              key={p.place}
              type="button"
              title={`${p.place} — ${p.note}`}
              style={{ left: p.left, top: p.top }}
              className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-espresso/15 bg-lavender-soft px-3 py-1.5 text-lg shadow-md transition hover:scale-110 hover:bg-lavender-deep"
            >
              <span aria-hidden>📍</span>
              <span className="sr-only">{p.place}</span>
            </button>
          ))}
        </div>

        <ul className="relative mt-4 space-y-2">
          {pins.map((p) => (
            <li
              key={p.place}
              className="flex items-center justify-between gap-2 rounded-2xl border border-espresso/10 bg-[#fffefd] px-4 py-3"
            >
              <div>
                <p className="text-sm font-bold">📍 {p.place}</p>
                <p className="font-hand text-lg leading-tight text-cocoa">
                  {p.note}
                </p>
              </div>
              <span className="font-hand text-xl text-lavender-deeper">→</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
