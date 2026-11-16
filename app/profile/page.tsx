import Link from "next/link";
import ProfileClient from "./profile-client";
import AppActions from "../components/app-actions";
import HomeNav from "../home/components/home-nav";

export default function ProfilePage() {
  return (
    <div className="paper-grain flex min-h-dvh flex-col text-espresso">
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-10 lg:px-16">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              aria-label="Back to space"
              title="Back to space"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 bg-blue-soft text-espresso transition hover:bg-parchment"
            >
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>
            </Link>
            <Link href="/" className="leading-tight">
              <span className="block font-serif text-lg font-semibold tracking-tight">
                Daily Muse
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <AppActions />
          </div>
        </div>
      </header>

      <main className="flex w-full flex-1 flex-col px-5 py-10 pb-28 sm:px-10 sm:py-14 sm:pb-28">
        <ProfileClient />
      </main>

      <HomeNav />
    </div>
  );
}
