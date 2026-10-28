import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Muse — a soft place for your thoughts",
  description:
    "Daily Muse is an aesthetic digital journal with gentle prompts, mood rituals, and paper-soft pages. Slow down, romanticize the small moments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream text-espresso font-sans">
        {children}
      </body>
    </html>
  );
}
