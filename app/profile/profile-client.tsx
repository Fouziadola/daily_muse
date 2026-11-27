"use client";

import { useRef, useState } from "react";

type JournalEntry = {
  id: string;
  text: string;
  date: string;
  image?: string;
  color?: string;
};

const JOURNAL_STORAGE_KEY = "daily-muse-journal";
const JOURNAL_PAGE_COLOR_KEY = "daily-muse-journal-page-color";
const PROFILE_IMAGE_KEY = "daily-muse-profile-image";

export default function ProfileClient() {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("dailymuse");
  const [displayName, setDisplayName] = useState("June Aurora");
  const [bio, setBio] = useState(
    "collecting small moments in soft ink ✿ morning pages, oat lattes, and letters to future-me."
  );
  const [draftUsername, setDraftUsername] = useState(username);
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
  const [pageColor, setPageColor] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.localStorage.getItem(JOURNAL_PAGE_COLOR_KEY) ?? "";
    } catch {
      return "";
    }
  });
  const pageColorInputRef = useRef<HTMLInputElement>(null);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [sharedIds, setSharedIds] = useState<Record<string, boolean>>({});
  const [journalImage, setJournalImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(PROFILE_IMAGE_KEY);
    } catch {
      return null;
    }
  });
  const [profileImageError, setProfileImageError] = useState("");
  const profileInputRef = useRef<HTMLInputElement>(null);

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const choosePageColor = (color: string) => {
    setPageColor(color);
    try {
      window.localStorage.setItem(JOURNAL_PAGE_COLOR_KEY, color);
    } catch {
      // storage may be unavailable; keep in-memory
    }
  };

  const resetPageColor = () => {
    setPageColor("");
    try {
      window.localStorage.removeItem(JOURNAL_PAGE_COLOR_KEY);
    } catch {
      // storage may be unavailable; keep in-memory
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError("Keep pictures under 2 MB so your journal stays light.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setJournalImage(typeof reader.result === "string" ? reader.result : null);
      setImageError("");
    };
    reader.onerror = () => setImageError("Could not read that picture.");
    reader.readAsDataURL(file);
  };

  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setProfileImageError("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setProfileImageError("Keep pictures under 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : null;
      if (result) {
        setProfileImage(result);
        try {
          window.localStorage.setItem(PROFILE_IMAGE_KEY, result);
        } catch {
          // storage may be unavailable; keep in-memory
        }
      }
      setProfileImageError("");
    };
    reader.onerror = () => setProfileImageError("Could not read that picture.");
    reader.readAsDataURL(file);
  };

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
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      image: journalImage ?? undefined,
      color: pageColor || undefined,
    };
    persistEntries([entry, ...entries]);
    setJournalText("");
    setJournalImage(null);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2500);
  };

  const deleteEntry = (id: string) => {
    persistEntries(entries.filter((entry) => entry.id !== id));
  };

  const shareEntry = async (entry: JournalEntry) => {
    if (sharedIds[entry.id] || sharingId) return;
    setSharingId(entry.id);
    try {
      const res = await fetch("/api/shared", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorName: displayName,
          authorHandle: username,
          text: entry.text,
          color: entry.color,
        }),
      });
      if (res.ok) {
        setSharedIds((prev) => ({ ...prev, [entry.id]: true }));
      }
    } catch {
      // sharing is best-effort; the entry stays safe in the journal
    } finally {
      setSharingId(null);
    }
  };

  const entriesByDate = entries.reduce<
    { date: string; items: JournalEntry[] }[]
  >((groups, entry) => {
    const group = groups.find((g) => g.date === entry.date);
    if (group) {
      group.items.push(entry);
    } else {
      groups.push({ date: entry.date, items: [entry] });
    }
    return groups;
  }, []);

  const startEditing = () => {
    setDraftUsername(username);
    setDraftName(displayName);
    setDraftBio(bio);
    setEditing(true);
  };

  const saveProfile = () => {
    const nextUsername = draftUsername.trim().replace(/^@+/, "");
    setUsername(nextUsername || username);
    setDisplayName(draftName.trim() || displayName);
    setBio(draftBio.trim() || bio);
    setEditing(false);
  };

  return (
    <>
      {/* profile header */}
      <section className="flex items-start gap-6 sm:gap-10">
        <div className="relative shrink-0">
          <input
            ref={profileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="sr-only"
            aria-label="Upload profile picture"
          />
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-rose via-lavender to-blue-deep p-[3px] shadow-[4px_4px_0_rgba(95,115,85,0.14)] sm:h-28 sm:w-28">
            {profileImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profileImage}
                alt="Profile picture"
                className="h-full w-full rounded-full border-2 border-cream object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-cream bg-sage font-serif text-4xl italic text-lavender-deeper">
                J
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => profileInputRef.current?.click()}
            aria-label={
              profileImage ? "Change profile picture" : "Add profile picture"
            }
            title={profileImage ? "Change profile picture" : "Add profile picture"}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-cream bg-tomato text-white shadow-[2px_2px_0_rgba(95,115,85,0.35)] transition hover:bg-tomato-deep"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="h-4 w-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          {profileImageError && (
            <p className="absolute left-1/2 top-full mt-2 w-40 -translate-x-1/2 rounded-xl border border-lavender-deeper/30 bg-lavender-soft px-3 py-1.5 text-center text-[11px] font-semibold text-lavender-deeper">
              {profileImageError}
            </p>
          )}
        </div>

        <div className="w-full flex-1 text-left">
          <div className="flex flex-wrap items-center justify-start gap-2.5">
            <h1 className="font-serif text-2xl font-semibold tracking-tight">
              @{username}
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

          <dl className="mt-5 flex items-center justify-start gap-8">
            {[
              ["entries", String(entries.length)],
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
            <p className="max-w-sm whitespace-pre-line text-[14.5px] leading-relaxed text-cocoa">
              {bio}
            </p>
            <p className="font-hand text-lg text-lavender-deeper">
              ✿ made slowly, with tea
            </p>
          </div>
        </div>
      </section>

      {editing && (
        <section className="mt-6 rounded-[24px] border border-espresso/15 bg-sage p-5 shadow-[5px_5px_0_rgba(95,115,85,0.12)]">
          <div className="space-y-3">
            <div>
              <label
                htmlFor="profile-username"
                className="mb-1.5 block text-sm font-bold text-espresso"
              >
                Username
              </label>
              <input
                id="profile-username"
                value={draftUsername}
                onChange={(e) => setDraftUsername(e.target.value)}
                placeholder="dailymuse"
                className="w-full rounded-2xl border border-espresso/20 bg-cream px-4 py-2.5 text-[15px] text-espresso focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30"
              />
            </div>
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
              className="rounded-full bg-tomato px-5 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(95,115,85,0.35)] transition hover:bg-tomato-deep"
            >
              Save
            </button>
          </div>
        </section>
      )}

      {/* journal */}
      <section className="mt-8 border-t border-espresso/15 pt-6">
          <div className="relative rounded-[24px] border border-espresso/15 bg-sage p-6 shadow-[6px_6px_0_rgba(95,115,85,0.12)]">
            <p
              className="font-hand text-[24px] leading-tight text-espresso"
              suppressHydrationWarning
            >
              ✿ {todayLabel}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-latte">
                page color
              </span>
              <input
                ref={pageColorInputRef}
                type="color"
                value={pageColor || "#fbf8f1"}
                onChange={(e) => choosePageColor(e.target.value)}
                className="sr-only"
                aria-label="Choose page color"
                tabIndex={-1}
              />
              <button
                type="button"
                onClick={() => pageColorInputRef.current?.click()}
                aria-label={pageColor ? "Change page color" : "Add a page color"}
                title={pageColor ? "Change page color" : "Add a page color"}
                className="flex items-center gap-2 rounded-full border border-espresso/20 bg-cream px-2.5 py-1 text-xs font-bold text-espresso transition hover:border-espresso/40 hover:bg-parchment"
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full border border-espresso/25"
                  style={{ backgroundColor: pageColor || "#fbf8f1" }}
                />
                {pageColor ? pageColor.toUpperCase() : "Add color"}
              </button>
              {pageColor && (
                <button
                  type="button"
                  onClick={resetPageColor}
                  className="font-hand text-sm text-cocoa underline-offset-2 transition hover:text-espresso hover:underline"
                >
                  reset
                </button>
              )}
            </div>

            <textarea
              value={journalText}
              onChange={(e) => {
                setJournalText(e.target.value);
                setSaveStatus("idle");
              }}
              rows={6}
              placeholder="Write softly… this page is only yours."
              aria-label="Write a journal entry"
              style={{ backgroundColor: pageColor || undefined }}
              className="paper-lines mt-3 w-full resize-none rounded-xl border border-espresso/10 bg-cream p-4 font-serif text-[16px] leading-[32px] text-espresso/90 placeholder:text-latte/70 focus:border-clay focus:outline-none"
            />

            {journalImage && (
              <div className="relative mt-3 overflow-hidden rounded-xl border border-espresso/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={journalImage}
                  alt="Attached journal picture"
                  className="max-h-64 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setJournalImage(null)}
                  aria-label="Remove picture"
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-espresso/15 bg-cream/90 text-lg leading-none text-espresso transition hover:bg-parchment"
                >
                  ×
                </button>
              </div>
            )}

            {imageError && (
              <p className="mt-2 rounded-2xl border border-lavender-deeper/30 bg-lavender-soft px-4 py-2 text-sm font-semibold text-lavender-deeper">
                {imageError}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                  aria-label="Add picture"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full border border-espresso/20 bg-cream px-4 py-2 text-sm font-bold text-espresso transition hover:bg-parchment"
                >
                  🖼 Add picture
                </button>
              </div>
              <div className="flex items-center gap-3">
                {(saveStatus === "saved" || journalText.trim()) && (
                  <p className="font-hand text-lg text-cocoa">
                    {saveStatus === "saved"
                      ? "saved to your pages ✓"
                      : "unsaved page ○"}
                  </p>
                )}
                <button
                  type="button"
                  onClick={saveEntry}
                  disabled={!journalText.trim()}
                  className="rounded-full bg-tomato px-6 py-2.5 text-sm font-bold text-white shadow-[2px_2px_0_rgba(95,115,85,0.35)] transition hover:bg-tomato-deep disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {entries.length > 0 ? (
            <div className="mt-7">
              <p className="font-hand text-xl text-lavender-deeper">
                ✿ saved by date
              </p>
              <div className="mt-3 space-y-6">
                {entriesByDate.map((group) => (
                  <div key={group.date}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                      {group.date}
                    </p>
                    <ul className="mt-2 space-y-3">
                      {group.items.map((entry) => (
                        <li
                          key={entry.id}
                          style={{ backgroundColor: entry.color ?? undefined }}
                          className="rounded-2xl border border-espresso/10 bg-cream p-5 shadow-[4px_4px_0_rgba(95,115,85,0.1)]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="rounded-full bg-lavender-soft px-3 py-1 text-xs font-bold text-lavender-deeper">
                              ✿ journal page
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => shareEntry(entry)}
                                disabled={
                                  sharingId === entry.id || sharedIds[entry.id]
                                }
                                className="rounded-full border border-espresso/15 bg-cream/70 px-2.5 py-0.5 text-[11px] font-bold text-cocoa transition hover:bg-parchment hover:text-espresso disabled:cursor-default disabled:opacity-70"
                              >
                                {sharedIds[entry.id]
                                  ? "shared ✓"
                                  : sharingId === entry.id
                                    ? "sharing…"
                                    : "share"}
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteEntry(entry.id)}
                                aria-label="Delete entry"
                                className="rounded-full px-2 py-0.5 text-sm font-bold text-latte transition hover:bg-parchment hover:text-rose-deep"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          <p className="mt-2 whitespace-pre-line font-serif text-[15.5px] italic leading-relaxed text-espresso/90">
                            {entry.text}
                          </p>
                          {entry.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={entry.image}
                              alt="Journal attachment"
                              className="mt-3 max-h-72 w-full rounded-xl border border-espresso/10 object-cover"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-center font-hand text-xl text-cocoa">
              your saved pages will gather here ✿
            </p>
          )}
        </section>
    </>
  );
}
