"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

const THEME_KEY = "daily-muse-theme";
const THEME_EVENT = "daily-muse-theme-change";

function subscribeTheme(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

function ProfileIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.7 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.7a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.7a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.3 9a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

export default function AppActions() {
  const [open, setOpen] = useState(false);
  const dark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggleDark = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      // storage may be unavailable; keep in-memory
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const iconButton =
    "flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 bg-cream text-espresso transition hover:bg-parchment";

  return (
    <div className="flex items-center gap-2.5">
      <Link href="/profile" aria-label="Profile" className={iconButton}>
        <ProfileIcon />
      </Link>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          aria-label="Settings"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={iconButton}
        >
          <SettingsIcon />
        </button>

        {open && (
          <div
            role="menu"
            aria-label="Settings"
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-espresso/15 bg-cream p-4 text-espresso shadow-[6px_6px_0_rgba(138,120,160,0.16)]"
          >
            <p className="font-hand text-lg leading-none text-lavender-deeper">
              ✿ settings
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-espresso/10 bg-parchment/60 px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm font-bold">
                <span aria-hidden>{dark ? "☾" : "☀"}</span>
                Dark mode
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={dark}
                aria-label="Toggle dark mode"
                onClick={toggleDark}
                className={`relative h-6 w-11 shrink-0 rounded-full border transition ${
                  dark
                    ? "border-lavender-deeper bg-lavender-deep"
                    : "border-espresso/25 bg-cream"
                }`}
              >
                <span
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-espresso shadow transition-all ${
                    dark ? "left-[22px]" : "left-1"
                  }`}
                />
              </button>
            </div>
            <p className="mt-2 text-[12px] leading-snug text-cocoa">
              {dark
                ? "soft night pages are on ✿"
                : "switch to a dimmer, evening palette."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
