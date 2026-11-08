import Link from "next/link";
import ProfileClient from "./profile-client";

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
          <Link
            href="/dashboard"
            className="rounded-full border border-espresso/15 bg-blue-soft px-4 py-1.5 font-hand text-lg leading-none text-espresso"
          >
            ← back to space
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-10 sm:py-14">
        <ProfileClient />
      </main>
    </div>
  );
}
