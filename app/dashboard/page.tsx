import Link from "next/link";

export default function DashboardPage() {
  const sections = [
    {
      href: "/home/book",
      label: "My journal",
      icon: "📖",
      desc: "Your pages, drafts, and morning entries.",
    },
    {
      href: "/home/list",
      label: "Posts",
      icon: "☰",
      desc: "Every entry, newest first.",
    },
    {
      href: "/home/calendar",
      label: "Calendar",
      icon: "📅",
      desc: "Pink dots mark the days you wrote.",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: "☾",
      desc: "Your soft space and settings.",
    },
  ];

  return (
    <div className="paper-grain flex min-h-full flex-col text-espresso">
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-10 lg:px-16">
          <Link href="/" className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight">
              Daily Muse
            </span>
          </Link>
          <span className="rounded-full border border-espresso/15 bg-lavender-soft px-4 py-1.5 font-hand text-lg leading-none text-espresso">
            ✿ your space
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-12">
          <div>
            <p className="font-hand text-2xl text-lavender-deeper">
              ✿ welcome to your space
            </p>
            <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Choose where to wander
            </h1>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="relative rounded-[28px] border border-espresso/10 bg-[#fffefd] p-8 shadow-[5px_5px_0_rgba(138,120,160,0.12)] transition hover:-translate-y-0.5 hover:border-espresso/20"
            >
              <span aria-hidden className="text-4xl mb-3 block">{s.icon}</span>
              <h3 className="font-serif text-xl font-semibold tracking-tight mb-1">
                {s.label}
              </h3>
              <p className="font-hand text-lg text-cocoa">{s.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
