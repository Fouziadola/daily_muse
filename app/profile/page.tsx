import Link from "next/link";
import ProfileClient from "./profile-client";
import AppActions from "../components/app-actions";
import HomeNav from "../home/components/home-nav";

export default function ProfilePage() {
  return (
    <div className="paper-grain flex min-h-dvh flex-col text-espresso">
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-cream/85 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-5 py-3.5 sm:px-10 lg:px-16">
          <Link href="/" className="leading-tight">
            <span className="block font-serif text-lg font-semibold tracking-tight">
              Daily Muse
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-espresso/15 bg-blue-soft px-4 py-1.5 font-hand text-lg leading-none text-espresso sm:inline-block"
            >
              ← back to space
            </Link>
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
