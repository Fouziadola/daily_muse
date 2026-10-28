import { Suspense } from "react";
import WriteClient from "./write-client";

export default function WritePage() {
  return (
    <Suspense
      fallback={
        <section className="min-h-full">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              disabled
              className="rounded-full border border-espresso/15 bg-cream px-4 py-1.5 font-hand text-lg text-espresso"
            >
              ← back
            </button>
          </div>
          <h1 className="font-serif text-3xl font-medium tracking-tight">
            Loading...
          </h1>
        </section>
      }
    >
      <WriteClient />
    </Suspense>
  );
}
