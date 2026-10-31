"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "Home", icon: "✿" },
  { href: "/home/book", label: "Book", icon: "📖" },
  { href: "/home/list", label: "List", icon: "☰" },
  { href: "/home/calendar", label: "Calendar", icon: "📅" },
  { href: "/home/media", label: "Media", icon: "🖼" },
  { href: "/home/map", label: "Map", icon: "🗺" },
];

export default function HomeNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Journal sections"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-espresso/10 bg-cream/90 backdrop-blur-md"
    >
      {/* safe-area padding for mobile */}
      <div className="mx-auto grid max-w-xl grid-cols-6 px-2 pb-[env(safe-area-inset-bottom)] pt-2">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 rounded-2xl px-2 py-2 text-xs font-bold transition ${
                active
                  ? "bg-lavender-soft text-espresso shadow-[2px_2px_0_rgba(138,120,160,0.15)]"
                  : "text-cocoa hover:bg-parchment hover:text-espresso"
              }`}
            >
              <span aria-hidden className="text-xl leading-none">
                {t.icon}
              </span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
