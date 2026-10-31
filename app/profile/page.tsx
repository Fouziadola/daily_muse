import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="paper-grain flex min-h-full flex-col text-espresso">
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-10 lg:px-16">
          <Link href="/" className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight">
              Daily Muse
            </span>
          </Link>
          <Link href="/dashboard" className="rounded-full border border-espresso/15 bg-lavender-soft px-4 py-1.5 font-hand text-lg leading-none text-espresso">
            ← back to space
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16 sm:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-12">
          <div>
            <p className="font-hand text-2xl text-lavender-deeper">
              ☾ profile
            </p>
            <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight sm:text-5xl">
              Your soft space
            </h1>
          </div>
        </div>

        <div className="rounded-[28px] border border-espresso/10 bg-[#fffefd] p-8 shadow-[5px_5px_0_rgba(138,120,160,0.12)]">
          <p className="font-hand text-xl text-cocoa">
            Your profile lives here — soft days reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
