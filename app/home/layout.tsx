import HomeNav from "./components/home-nav";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="paper-grain flex min-h-full flex-col text-espresso">
      {/* top bar — full-bleed so brand + cozy sit in page corners */}
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-10 lg:px-16">
          <a href="/home" className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight">
              Daily Muse
            </span>
            <span className="block font-hand text-base leading-none text-cocoa">
              your journal home
            </span>
          </a>
          <span className="rounded-full border border-espresso/15 bg-lavender-soft px-4 py-1.5 font-hand text-lg leading-none text-espresso">
            ✿ cozy space
          </span>
        </div>
      </header>

      {/* page content — extra bottom padding clears the fixed nav */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-28 pt-6">
        {children}
      </main>

      <HomeNav />
    </div>
  );
}
