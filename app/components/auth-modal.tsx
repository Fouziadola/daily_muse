"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Mode = "signup" | "login";

export default function AuthButtons() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = (next: Mode) => {
    setMode(next);
    setError("");
    setStatus("idle");
    setOpen(true);
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError("");
    setStatus("idle");
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, mode]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!isLogin && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!trimmedEmail) {
      setError("Please enter your email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStatus("loading");
    // UI-only for now — no auth backend yet
    setTimeout(() => setStatus("done"), 900);
  };

  const isLogin = mode === "login";

  const inputClass =
    "w-full rounded-2xl border border-espresso/20 bg-cream px-4 py-3 text-[15px] text-espresso placeholder:text-latte/70 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/30";

  return (
    <>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => openModal("signup")}
          className="rounded-full border border-espresso/20 bg-cream px-5 py-2.5 text-[15px] font-semibold text-espresso transition hover:border-espresso hover:bg-parchment"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => openModal("login")}
          className="rounded-full border border-espresso bg-espresso px-5 py-2.5 text-[15px] font-semibold text-cream shadow-[3px_3px_0_rgba(198,139,89,0.9)] transition hover:-translate-y-0.5 hover:shadow-[4px_5px_0_rgba(198,139,89,0.9)]"
        >
          Log in
        </button>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={isLogin ? "Log in to Daily Muse" : "Sign up for Daily Muse"}
          >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-cream/60 backdrop-blur-xl"
          />
          {/* card */}
          <div className="relative max-h-[90vh] w-full max-w-[400px] -rotate-1 overflow-y-auto rounded-[22px] border border-espresso/15 bg-[#fffdf7] p-7 pt-9 shadow-[8px_8px_0_rgba(63,46,37,0.25)]">
            <div
              aria-hidden
              className="washi pointer-events-none absolute left-1/2 top-[-14px] h-7 w-24 -translate-x-1/2 rotate-[-3deg] bg-rose-soft opacity-90 shadow-sm"
              style={{
                clipPath:
                  "polygon(2% 0, 98% 4%, 100% 90%, 97% 100%, 3% 96%, 0 88%)",
              }}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-espresso/15 bg-cream text-lg leading-none transition hover:bg-parchment"
            >
              ×
            </button>

            {status === "done" ? (
              <div className="py-6 text-center">
                <p className="text-4xl">✿</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight">
                  {isLogin ? "Welcome back!" : "You’re in!"}
                </h2>
                <p className="mt-2 font-hand text-xl text-cocoa">
                  the kettle’s on — happy writing
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 w-full rounded-full bg-espresso py-3 font-semibold text-cream transition hover:-translate-y-0.5"
                >
                  Open my journal →
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-latte">
                  ✿ {isLogin ? "welcome back" : "join the soft club"}
                </p>
                <h2 className="mt-1 font-serif text-3xl font-semibold tracking-tight">
                  {isLogin ? "Log in" : "Sign Up"}
                </h2>
                <p className="mt-1 font-hand text-xl leading-none text-cocoa">
                  {isLogin
                    ? "your pages missed you —"
                    : "a soft place for thoughts —"}
                </p>

                <form onSubmit={submit} className="mt-5 space-y-4">
                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="auth-name"
                        className="mb-1.5 block text-sm font-bold text-espresso"
                      >
                        Name
                      </label>
                      <input
                        ref={inputRef}
                        id="auth-name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. June"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="auth-email"
                      className="mb-1.5 block text-sm font-bold text-espresso"
                    >
                      Email
                    </label>
                    <input
                      ref={isLogin ? inputRef : undefined}
                      id="auth-email"
                      type="email"
                      autoComplete="email"
                      placeholder="e.g. june@muse.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="auth-password"
                      className="mb-1.5 block text-sm font-bold text-espresso"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="auth-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputClass} pr-16`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-[13px] font-bold text-cocoa transition hover:text-espresso"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="auth-confirm-password"
                        className="mb-1.5 block text-sm font-bold text-espresso"
                      >
                        Re-enter Password
                      </label>
                      <input
                        id="auth-confirm-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  )}

                  {error && (
                    <p className="rounded-2xl border border-rose-deep/30 bg-blush px-4 py-2.5 text-sm font-semibold text-rose-deep">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-espresso py-3.5 font-semibold text-cream shadow-[3px_3px_0_rgba(198,139,89,0.9)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "loading"
                      ? "Opening…"
                      : isLogin
                        ? "Log in ✎"
                        : "Sign Up ✎"}
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-cocoa">
                  {isLogin ? "New here? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => switchMode(isLogin ? "signup" : "login")}
                    className="font-bold text-clay-deep underline-offset-2 hover:underline"
                  >
                    {isLogin ? "Sign Up" : "Log in"}
                  </button>
                </p>
              </>
            )}
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
