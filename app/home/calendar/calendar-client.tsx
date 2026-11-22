"use client";

import { useEffect, useRef, useState } from "react";

type DayEntry = {
  note: string;
  image?: string;
};

type CalendarData = Record<string, DayEntry>;

const STORAGE_KEY = "daily-muse-calendar";
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const MAX_IMAGE_BYTES = 1024 * 1024;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function dayKey(year: number, month: number, day: number) {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function keyForDate(date: Date) {
  return dayKey(date.getFullYear(), date.getMonth(), date.getDate());
}

export default function CalendarClient() {
  const today = new Date();
  const todayKey = keyForDate(today);

  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));
  const [data, setData] = useState<CalendarData>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return {};
      const parsed = JSON.parse(stored);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
      return {};
    }
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState("");
  const [draftImage, setDraftImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState("");
  const [storageError, setStorageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const startOffset = (new Date(view.year, view.month, 1).getDay() + 6) % 7;
  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );

  const changeMonth = (delta: number) => {
    setView((prev) => {
      const next = new Date(prev.year, prev.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const openDay = (key: string) => {
    setSelected(key);
    setDraftNote(data[key]?.note ?? "");
    setDraftImage(data[key]?.image ?? null);
    setImageError("");
    setStorageError("");
  };

  const closeDay = () => {
    setSelected(null);
    setDraftImage(null);
    setImageError("");
  };

  const persist = (next: CalendarData) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setData(next);
      return true;
    } catch {
      setStorageError(
        "Your browser storage is full. Remove a photo or use a smaller one."
      );
      return false;
    }
  };

  const saveDay = () => {
    if (!selected) return;
    const next = { ...data };
    const note = draftNote.trim();
    if (!note && !draftImage) {
      delete next[selected];
    } else {
      next[selected] = { note, image: draftImage ?? undefined };
    }
    if (persist(next)) closeDay();
  };

  const clearDay = () => {
    if (!selected) return;
    const next = { ...data };
    delete next[selected];
    if (persist(next)) closeDay();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("Keep pictures under 1 MB so your calendar stays light.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDraftImage(typeof reader.result === "string" ? reader.result : null);
      setImageError("");
    };
    reader.onerror = () => setImageError("Could not read that picture.");
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDay();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected]);

  const selectedLabel = selected
    ? new Date(
        Number(selected.slice(0, 4)),
        Number(selected.slice(5, 7)) - 1,
        Number(selected.slice(8, 10))
      ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <section className="-mx-5 sm:-mx-10 lg:-mx-16 xl:-mx-40 2xl:-mx-56">
      <h1 className="mt-1 font-serif text-4xl font-medium tracking-tight">
        Calendar
      </h1>

      <div className="mt-6 rounded-[22px] border border-espresso/15 bg-sage p-6 shadow-[8px_8px_0_rgba(138,120,160,0.12)] sm:p-8 lg:p-10">
        <div className="flex items-center justify-between">
          <h2
            className="font-serif text-xl font-semibold sm:text-2xl"
            suppressHydrationWarning
          >
            {monthLabel}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 bg-cream transition hover:bg-parchment sm:h-10 sm:w-10"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 bg-cream transition hover:bg-parchment sm:h-10 sm:w-10"
            >
              →
            </button>
          </div>
        </div>

        {storageError && (
          <p className="mt-3 rounded-xl border border-tomato/30 bg-rose-soft px-3 py-2 text-sm font-semibold text-tomato-deep">
            {storageError}
          </p>
        )}

        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs font-bold uppercase tracking-widest text-latte sm:gap-3 sm:text-sm lg:gap-4 lg:text-base">
          {WEEKDAYS.map((w, i) => (
            <span key={i} className="py-1">
              {w}
            </span>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-3 lg:gap-4">
          {Array.from({ length: startOffset }).map((_, i) => (
            <span key={`b-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
            const key = dayKey(view.year, view.month, d);
            const entry = data[key];
            const isToday = key === todayKey;
            return (
              <button
                key={key}
                type="button"
                onClick={() => openDay(key)}
                aria-label={`${monthLabel} ${d}${
                  entry?.note ? `, note: ${entry.note}` : ""
                }${entry?.image ? ", has a picture" : ""}`}
                className={`group relative flex aspect-[4/5] flex-col items-center justify-end overflow-hidden rounded-t-[999px] rounded-b-2xl border text-sm font-bold transition hover:-translate-y-0.5 sm:text-base lg:text-lg ${
                  isToday
                    ? "border-tomato-deep/30 bg-tomato text-white shadow-[3px_3px_0_rgba(95,115,85,0.25)]"
                    : "border-espresso/15 bg-cream text-espresso shadow-[3px_3px_0_rgba(138,120,160,0.12)] hover:bg-parchment"
                }`}
              >
                {entry?.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={entry.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-1.5 rounded-t-[999px] rounded-b-xl border border-espresso/10"
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute bottom-1.5 left-1/2 top-1.5 w-px -translate-x-1/2 ${
                        isToday ? "bg-white/30" : "bg-espresso/10"
                      }`}
                    />
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute inset-x-1.5 top-1/2 h-px ${
                        isToday ? "bg-white/30" : "bg-espresso/10"
                      }`}
                    />
                  </>
                )}

                <span
                  className={`relative z-10 mb-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold sm:mb-1.5 sm:h-7 sm:w-7 sm:text-sm lg:h-9 lg:w-9 lg:text-base ${
                    entry?.image
                      ? "bg-cream/90 text-espresso"
                      : isToday
                        ? "bg-white/20 text-white"
                        : "bg-cream/70 text-espresso"
                  }`}
                >
                  {d}
                </span>

                {entry?.note && (
                  <span
                    aria-hidden
                    className={`absolute left-1/2 top-1.5 z-10 -translate-x-1/2 text-xs ${
                      isToday ? "text-white" : "text-lavender-deeper"
                    }`}
                  >
                    ✿
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-espresso/40 p-4 backdrop-blur-sm sm:items-center"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDay();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Edit ${selectedLabel}`}
            className="w-full max-w-md rounded-[24px] border border-espresso/15 bg-cream p-6 shadow-[8px_8px_0_rgba(138,120,160,0.2)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-hand text-xl leading-none text-lavender-deeper">
                  ✿ a little window
                </p>
                <h3 className="mt-1 font-serif text-2xl font-semibold">
                  {selectedLabel}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeDay}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-espresso/15 bg-parchment text-lg leading-none text-espresso transition hover:bg-sage"
              >
                ×
              </button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
              aria-label="Upload a picture for this day"
            />

            {draftImage ? (
              <div className="relative mt-4 overflow-hidden rounded-2xl border border-espresso/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={draftImage}
                  alt="Picture for this day"
                  className="max-h-56 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setDraftImage(null)}
                  aria-label="Remove picture"
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-espresso/15 bg-cream/90 text-lg leading-none text-espresso transition hover:bg-parchment"
                >
                  ×
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 w-full rounded-2xl border border-dashed border-espresso/25 bg-parchment/60 px-4 py-5 text-sm font-bold text-cocoa transition hover:bg-parchment hover:text-espresso"
              >
                + add a picture
              </button>
            )}

            {draftImage && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-sm font-bold text-lavender-deeper underline-offset-2 hover:underline"
              >
                change picture
              </button>
            )}

            {imageError && (
              <p className="mt-2 rounded-xl border border-tomato/30 bg-rose-soft px-3 py-1.5 text-[12px] font-semibold text-tomato-deep">
                {imageError}
              </p>
            )}

            <label
              htmlFor="calendar-note"
              className="mt-4 block text-sm font-bold text-espresso"
            >
              Note
            </label>
            <textarea
              id="calendar-note"
              value={draftNote}
              onChange={(e) => setDraftNote(e.target.value)}
              rows={4}
              placeholder="What small moment do you want to keep?"
              className="paper-lines [--paper-line-height:30px] mt-1.5 w-full resize-none rounded-xl border border-espresso/15 bg-parchment/60 p-3 font-serif text-[15px] leading-[30px] text-espresso/90 placeholder:text-latte/70 focus:border-clay focus:outline-none"
            />

            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={clearDay}
                className="text-sm font-bold text-cocoa transition hover:text-tomato-deep"
              >
                clear day
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeDay}
                  className="rounded-full border border-espresso/20 px-5 py-2 text-sm font-bold text-espresso transition hover:bg-parchment"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveDay}
                  className="rounded-full bg-tomato px-5 py-2 text-sm font-bold text-white shadow-[2px_2px_0_rgba(95,115,85,0.35)] transition hover:bg-tomato-deep"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
