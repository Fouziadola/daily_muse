const WORLD_FEED = "https://feeds.bbci.co.uk/news/world/rss.xml";
const MAX_ITEMS = 5;

type NewsItem = {
  title: string;
  link: string;
  description: string;
  date: string;
};

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

function tag(block: string, name: string) {
  const match = block.match(
    new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i")
  );
  return match ? decode(match[1]) : "";
}

async function getWorldNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(WORLD_FEED, { next: { revalidate: 900 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items: NewsItem[] = [];
    for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
      const block = match[1];
      const title = tag(block, "title");
      const link = tag(block, "link");
      if (!title || !link) continue;
      const rawDate = tag(block, "pubDate");
      const parsed = rawDate ? new Date(rawDate) : null;
      items.push({
        title,
        link,
        description: tag(block, "description"),
        date:
          parsed && !Number.isNaN(parsed.getTime())
            ? parsed.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "",
      });
      if (items.length >= MAX_ITEMS) break;
    }
    return items;
  } catch {
    return [];
  }
}

export default async function WorldNews() {
  const items = await getWorldNews();

  return (
    <section className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="font-hand text-2xl text-lavender-deeper">
            🌍 out in the world
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            What happened lately
          </h2>
        </div>
        <a
          href="https://www.bbc.com/news/world"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-espresso/15 bg-cream px-4 py-1.5 font-hand text-lg leading-none text-cocoa shadow-[2px_2px_0_rgba(95,115,85,0.12)] transition hover:bg-parchment hover:text-espresso"
        >
          more from BBC World →
        </a>
      </div>

      {items.length > 0 ? (
        <ul className="mt-4 space-y-2.5">
          {items.map((item) => (
            <li key={item.link}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-2xl border border-espresso/10 bg-sage p-4 shadow-[3px_3px_0_rgba(95,115,85,0.1)] transition hover:-translate-y-0.5 hover:border-espresso/20"
              >
                <span
                  aria-hidden
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-tomato"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-latte">
                    {item.date ? `${item.date} · ` : ""}BBC World
                  </p>
                  <h3 className="mt-1 font-serif text-lg font-semibold leading-snug tracking-tight text-espresso">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-cocoa">
                      {item.description}
                    </p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="ml-auto hidden shrink-0 text-sm font-bold text-lavender-deeper transition group-hover:text-espresso sm:block"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-espresso/20 bg-cream/60 px-5 py-6 text-center font-hand text-lg text-cocoa">
          The world feed is quiet right now — try again in a little while ✿
        </p>
      )}
    </section>
  );
}
