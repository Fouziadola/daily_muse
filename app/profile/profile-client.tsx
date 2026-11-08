"use client";

import { useState } from "react";
import Link from "next/link";

type Tab = "posts" | "saved" | "journal";

type JournalEntry = {
  id: string;
  text: string;
  date: string;
};

const JOURNAL_STORAGE_KEY = "daily-muse-journal";

const highlights = [
  { label: "morning", emoji: "☀️" },
  { label: "moods", emoji: "🎨" },
  { label: "letters", emoji: "✉️" },
  { label: "places", emoji: "🗺️" },
  { label: "tiny joys", emoji: "✿" },
  { label: "night", emoji: "☾" },
];

const posts = [
  {
    id: 1,
    emoji: "☕",
    date: "Oct 01",
    title: "Oat latte, still warm",
    likes: 24,
    comments: 3,
    saved: false,
    gradient: "from-rose-soft to-linen",
  },
  {
    id: 2,
    emoji: "🌷",
    date: "Sep 30",
    title: "Tulips on the kitchen sill",
    likes: 41,
    comments: 7,
    saved: true,
    gradient: "from-lavender-soft to-lavender",
  },
  {
    id: 3,
    emoji: "☾",
    date: "Sep 29",
    title: "Night walk, moon timer",
    likes: 18,
    comments: 2,
    saved: false,
    gradient: "from-blue-soft to-blue",
  },
  {
    id: 4,
    emoji: "📖",
    date: "Sep 27",
    title: "Morning pages, page 12",
    likes: 33,
    comments: 5,
    saved: false,
    gradient: "from-parchment to-sand",
  },
  {
    id: 5,
    emoji: "🌧️",
    date: "Sep 25",
    title: "Rainy café, good cry",
    likes: 56,
    comments: 11,
    saved: true,
    gradient: "from-blush to-linen",
  },
  {
    id: 6,
    emoji: "🍓",
    date: "Sep 23",
    title: "Strawberries at the market",
    likes: 29,
    comments: 4,
    saved: false,
    gradient: "from-sage-soft to-sage",
  },
  {
    id: 7,
    emoji: "✉️",
    date: "Sep 21",
    title: "A letter for future-you",
    likes: 47,
    comments: 8,
    saved: true,
    gradient: "from-blue-soft to-lavender",
  },
  {
    id: 8,
    emoji: "🕯️",
    date: "Sep 19",
    title: "Candlelit wind-down",
    likes: 22,
    comments: 1,
    saved: false,
    gradient: "from-lavender-soft to-blush",
  },
  {
    id: 9,
    emoji: "🌿",
    date: "Sep 17",
    title: "Pressed a fern from the park",
    likes: 38,
    comments: 6,
    saved: false,
    gradient: "from-linen to-rose",
  },
];

const tabs: { id: Tab; label: string }[] = [
  { id: "posts", label: "Posts" },
  { id: "saved", label: "Saved" },
  { id: "journal", label: "Journal" },
];

function GridIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4.5L5 20V5a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function HeartIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 21s-7.5-4.6-9.4-9A5.4 5.4 0 0 1 12 6.5 5.4 5.4 0 0 1 21.4 12C19.5 16.4 12 21 12 21Z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
    >
      <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9H4l1.8-3.3A9 9 0 0 1 3 12a9 9 0 0 1 9-9Z" />
    </svg>
  );
}

export default function ProfileClient() {
  const [tab, setTab] = useState<Tab>("posts");
  const [editing, setEditing] = useState(false);
  const [displayName, setDisplayName] = useState("June Aurora");
  const [bio, setBio] = useState(
    "collecting small moments in soft ink ✿ morning pages, oat lattes, and letters to future-me."
  );
  const [draftName, setDraftName] = useState(displayName);
  const [draftBio, setDraftBio] = useState(bio);
  const [journalText, setJournalText] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [saveStatus, setSaveStatus] = useState<"idle" | "saved">("idle");

  const persistEntries = (next: JournalEntry[]) => {
    setEntries(next);
    try {
      window.localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage may be unavailable (private mode); keep in-memory
    }
  };

  const saveEntry = () => {
    const text = journalText.trim();
    if (!text) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      text,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }),
    };
    persistEntries([entry, ...entries]);
    setJournalText("");
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const deleteEntry = (id: string) => {
    persistEntries(entries.filter((entry) => entry.id !== id));
  };

  const visiblePosts =
    tab === "saved" ? posts.filter((p) => p.saved) : posts;

  const startEditing = () => {
    setDraftName(displayName);
    setDraftBio(bio);
    setEditing(true);
  };

  const saveProfile = () => {
    setDisplayName(draftName.trim() || displayName);
    setBio(draftBio.trim() || bio);
    setEditing(false);
  };

  return (
    <>
      {/* profile header */}
      <section className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="relative shrink-0">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose via-lavender to-blue-deep p-[3px] shadow-[4px_4px_0_rgba(138,120,160,0.14)] sm:h-28 sm:w-28">
            <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-cream bg-[#fffefd] font-serif text-4xl italic text-lavender-deeper">
              J
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-lavender-deep text-lg leading-none text-espresso">
            ✿
          </span>
        </div>

        <div className="w-full flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
            <h1 className="font-serif text-2xl font-semibold tracking-tight">
              @dailymuse
            </h1>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-full border border-espresso/20 bg-cream px-4 py-1.5 text-sm font-bold text-espresso transition hover:bg-parchment"
            >
              Edit profile
            </button>
            <button
              type="button"
              className="rounded-full border border-espresso/20 bg-cream px-4 py-1.5 text-sm font-bold text-espresso transition hover:bg-parchment"
            >
              Share profile
            </button>
          </div>

          <dl className="mt-5 flex items-center justify-center gap-8 sm:justify-start">
            {[
              ["posts", String(posts.length + entries.length)],
              ["followers", "2.4k"],
              ["following", "180"],
            ].map(([label, value]) => (
              <div key={label} className="text-center sm:text-left">
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-lg font-semibold leading-none">
                  {value}
                </dd>
                <dd className="mt-1 text-[13px] text-cocoa">{label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 space-y-1">
            <p className="text-[15px] font-bold">{displayName}</p>
            <p className="mx-auto max-w-sm whitespace-pre-line text-[14.5px] leading-relaxed text-cocoa sm:mx-0">
              {bio}
            </p>
            <p className="font-hand text-lg text-lavender-deeper">
              ✿ made slowly, with tea
            </p>
          </div>
        </div>
      </section>

      {editing && (
        <section className="mt-6 rounded-[24px] border border-espresso/15 bg-[#fffefd] p-5 shadow-[5px_5px_0_rgba(138,120,160,0.12)]">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-1.5 block text-sm font-bold text-espresso"
              >
                Display name
              </label>
              <input
                id="profile-name"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                className="w-full rounded-2xl border border-espresso/20 bg-cream px-4 py-2.5 text-[15px] text-espresso focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30"
              />
            </div>
            <div>
              <label
                htmlFor="profile-bio"
                className="mb-1.5 block text-sm font-bold text-espresso"
              >
                Bio
              </label>
              <textarea
                id="profile-bio"
                rows={3}
                value={draftBio}
                onChange={(e) => setDraftBio(e.target.value)}
                className="w-full resize-none rounded-2xl border border-espresso/20 bg-cream px-4 py-2.5 text-[15px] text-espresso focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-full border border-espresso/20 px-5 py-2 text-sm font-bold text-espresso transition hover:bg-parchment"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveProfile}
              className="rounded-full bg-lavender-deep px-5 py-2 text-sm font-bold text-espresso shadow-[2px_2px_0_rgba(168,152,208,0.9)] transition hover:bg-lavender-deeper"
            >
              Save
            </button>
          </div>
        </section>
      )}

      {/* highlights */}
      <section aria-label="Journal highlights" className="mt-8">
        <ul className="flex gap-5 overflow-x-auto pb-2 sm:justify-center">
          {highlights.map((h) => (
            <li key={h.label} className="shrink-0">
              <button
                type="button"
                className="group flex flex-col items-center gap-1.5"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-espresso/15 bg-cream text-2xl shadow-[3px_3px_0_rgba(138,120,160,0.12)] transition group-hover:-translate-y-0.5 group-hover:border-lavender-deeper">
                  {h.emoji}
                </span>
                <span className="text-xs font-bold text-cocoa">
                  {h.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* tabs */}
      <div className="mt-8 border-t border-espresso/15">
        <div
          role="tablist"
          aria-label="Profile sections"
          className="flex items-center justify-center gap-10"
        >
          {tabs.map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 border-t-2 px-1 py-4 text-xs font-bold uppercase tracking-[0.16em] transition ${
                  active
                    ? "-mt-px border-espresso text-espresso"
                    : "border-transparent text-latte hover:text-cocoa"
                }`}
              >
                {t.id === "posts" && <GridIcon />}
                {t.id === "saved" && <BookmarkIcon />}
                {t.id === "journal" && <PenIcon />}
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* journal or grid */}
      {tab === "journal" ? (
        <section className="mt-6">
          <div className="relative rounded-[24px] border border-espresso/15 bg-[#fffefd] p-6 shadow-[6px_6px_0_rgba(138,120,160,0.12)]">
            <div
              aria-hidden
              className="washi pointer-events-none absolute left-1/2 top-[-14px] h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-lavender-soft opacity-90 shadow-sm"
              style={{
                clipPath:
                  "polygon(2% 0, 98% 4%, 100% 90%, 97% 100%, 3% 96%, 0 88%)",
              }}
            />
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
              ✿ new journal page
            </p>
            <p className="mt-2 font-hand text-[24px] leading-tight text-espresso">
              “What small moment do you want to keep today?”
            </p>
            <textarea
              value={journalText}
              onChange={(e) => {
                setJournalText(e.target.value);
                setSaveStatus("idle");
              }}
              rows={6}
              placeholder="Write softly… this page is only yours."
              aria-label="Write a journal entry"
              className="paper-lines mt-3 w-full resize-none rounded-xl border border-espresso/10 bg-parchment/60 p-4 font-serif text-[16px] leading-[32px] text-espresso/90 placeholder:text-latte/70 focus:border-clay focus:outline-none"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <p className="font-hand text-lg text-cocoa">
                {saveStatus === "saved"
                  ? "saved to your pages ✓"
                  : journalText.trim()
                    ? "unsaved page ○"
                    : "a blank page, just for you ✿"}
              </p>
              <button
                type="button"
                onClick={saveEntry}
                disabled={!journalText.trim()}
                className="rounded-full bg-lavender-deep px-6 py-2.5 text-sm font-bold text-espresso shadow-[2px_2px_0_rgba(168,152,208,0.9)] transition hover:bg-lavender-deeper disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save entry
              </button>
            </div>
          </div>

          {entries.length > 0 ? (
            <div className="mt-7">
              <p className="font-hand text-xl text-lavender-deeper">
                ✿ your saved pages
              </p>
              <ul className="mt-3 space-y-3">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-2xl border border-espresso/10 bg-[#fffefd] p-5 shadow-[4px_4px_0_rgba(138,120,160,0.1)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                        {entry.date}
                      </p>
                      <button
                        type="button"
                        onClick={() => deleteEntry(entry.id)}
                        aria-label="Delete entry"
                        className="rounded-full px-2 py-0.5 text-sm font-bold text-latte transition hover:bg-parchment hover:text-rose-deep"
                      >
                        ×
                      </button>
                    </div>
                    <p className="mt-2 whitespace-pre-line font-serif text-[15.5px] italic leading-relaxed text-espresso/90">
                      {entry.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="mt-6 text-center font-hand text-xl text-cocoa">
              your saved pages will gather here ✿
            </p>
          )}
        </section>
      ) : (
        <ul className="mt-2 grid grid-cols-3 gap-1 sm:gap-1.5">
          {visiblePosts.map((p) => (
            <li key={p.id}>
              <Link
                href="/home/list"
                aria-label={`${p.title} — ${p.date}`}
                className={`group relative flex aspect-square flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${p.gradient} p-2 text-center transition hover:brightness-[1.02]`}
              >
                <span aria-hidden className="text-3xl drop-shadow-sm">
                  {p.emoji}
                </span>
                <span className="mt-2 line-clamp-2 font-serif text-[12px] italic leading-snug text-espresso/80 sm:text-[13px]">
                  {p.title}
                </span>
                <span className="absolute left-2 top-2 text-[10px] font-bold uppercase tracking-wide text-espresso/50">
                  {p.date}
                </span>
                <span className="absolute inset-0 flex items-center justify-center gap-3 bg-espresso/45 text-sm font-bold text-cream opacity-0 backdrop-blur-[1px] transition group-hover:opacity-100">
                  <span className="flex items-center gap-1">
                    <HeartIcon /> {p.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <CommentIcon /> {p.comments}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {tab === "saved" && visiblePosts.length === 0 && (
        <p className="mt-6 text-center font-hand text-xl text-cocoa">
          nothing tucked away yet ✿
        </p>
      )}
    </>
  );
}
