"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

const THEME_KEY = "daily-muse-theme";
const THEME_EVENT = "daily-muse-theme-change";
const PROFILE_KEY = "daily-muse-profile";

type StoredProfile = {
  username: string;
  displayName: string;
  bio: string;
};

const DEFAULT_PROFILE: StoredProfile = {
  username: "dailymuse",
  displayName: "June Aurora",
  bio: "collecting small moments in soft ink ✿ morning pages, oat lattes, and letters to future-me.",
};

function readStoredProfile(): StoredProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...(JSON.parse(raw) as Partial<StoredProfile>) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

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

export default function AppActions({ showProfile = true }: { showProfile?: boolean }) {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<StoredProfile>(readStoredProfile);
  const [usernameDraft, setUsernameDraft] = useState(
    () => readStoredProfile().username
  );
  const [bioDraft, setBioDraft] = useState(() => readStoredProfile().bio);
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

  const toggleMenu = () => {
    if (!open) {
      setUsernameDraft(profile.username);
      setBioDraft(profile.bio);
    }
    setOpen((v) => !v);
  };

  const updateProfile = (patch: Partial<StoredProfile>) => {
    const next = { ...profile, ...patch };
    setProfile(next);
    try {
      window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      // storage may be unavailable; keep in-memory
    }
  };

  const onUsernameChange = (value: string) => {
    setUsernameDraft(value);
    updateProfile({ username: value.trim().replace(/^@+/, "") });
  };

  const onBioChange = (value: string) => {
    setBioDraft(value);
    updateProfile({ bio: value });
  };

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
      {showProfile && (
        <Link href="/profile" aria-label="Profile" className={iconButton}>
          <ProfileIcon />
        </Link>
      )}

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          aria-label="Settings"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={toggleMenu}
          className={iconButton}
        >
          <SettingsIcon />
        </button>

        <div
          role="menu"
          aria-label="Settings"
          aria-hidden={!open}
          inert={!open}
          className={`absolute right-0 top-full z-50 mt-2 w-72 origin-top-right rounded-2xl border border-espresso/15 bg-cream p-4 text-espresso shadow-[6px_6px_0_rgba(95,115,85,0.16)] transition-all ease-out ${open ? "duration-200" : "duration-700"} ${
            open
              ? "visible translate-y-0 scale-100 opacity-100 blur-0"
              : "invisible -translate-y-2 scale-95 opacity-0 blur-sm"
          }`}
        >
          <p className="font-hand text-lg leading-none text-lavender-deeper">
            ✿ settings
          </p>

          {/* profile */}
          <div className="mt-3 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-latte">
              Profile
            </p>
            <label className="block">
              <span className="text-xs font-bold text-cocoa">Username</span>
              <input
                type="text"
                value={usernameDraft}
                onChange={(e) => onUsernameChange(e.target.value)}
                placeholder="@dailymuse"
                className="mt-1 w-full rounded-xl border border-espresso/15 bg-parchment/60 px-3 py-2 text-sm text-espresso placeholder:text-latte/70 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-cocoa">Bio</span>
              <textarea
                value={bioDraft}
                onChange={(e) => onBioChange(e.target.value)}
                rows={2}
                placeholder="a little about you…"
                className="mt-1 w-full resize-none rounded-xl border border-espresso/15 bg-parchment/60 px-3 py-2 text-sm text-espresso placeholder:text-latte/70 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30"
              />
            </label>
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-full border border-espresso/20 px-3 py-2 text-center text-xs font-bold text-espresso transition hover:bg-parchment"
            >
              Edit profile →
            </Link>
          </div>

          {/* mode */}
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-espresso/10 bg-parchment/60 px-3 py-2.5">
            <span className="flex items-center gap-2 text-sm font-bold">
              <span aria-hidden>{dark ? "☾" : "☀"}</span>
              {dark ? "Dark mode" : "Light mode"}
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
        </div>
      </div>
    </div>
  );
}
