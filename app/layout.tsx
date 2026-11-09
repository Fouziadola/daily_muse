import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Muse — a soft place for your thoughts",
  description:
    "Daily Muse is an aesthetic digital journal with gentle prompts, mood rituals, and paper-soft pages. Slow down, romanticize the small moments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-mint text-espresso font-sans">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("daily-muse-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
