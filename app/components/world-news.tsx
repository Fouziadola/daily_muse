type NewsItem = {
  title: string;
  link: string;
  source: string;
  publishedAt: string;
};

const NEWS_FEED =
  "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en";

const entityMap: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&(\w+);/g, (match, name) => entityMap[name] ?? match);
}

function extract(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decodeEntities(match[1]).trim() : "";
}

function parseFeed(xml: string): NewsItem[] {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => {
      let source = extract(item, "source");
      let title = extract(item, "title");
      if (source && title.endsWith(` - ${source}`)) {
        title = title.slice(0, -(source.length + 3)).trim();
      } else if (!source) {
        const separator = title.lastIndexOf(" - ");
        const candidate = separator > 0 ? title.slice(separator + 3).trim() : "";
        if (candidate && candidate.length <= 40) {
          source = candidate;
          title = title.slice(0, separator).trim();
        }
      }
      return {
        title,
        link: extract(item, "link"),
        source,
        publishedAt: extract(item, "pubDate"),
      };
    })
    .filter((item) => item.title && item.link);
}

async function getWorldNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(NEWS_FEED, {
      next: { revalidate: 600 },
      headers: {
        "User-Agent": "DailyMuse/1.0 (+https://dailymuse.local) news reader",
      },
    });
    if (!res.ok) return [];
    return parseFeed(await res.text()).slice(0, 6);
  } catch {
    return [];
  }
}

function timeAgo(publishedAt: string) {
  const time = new Date(publishedAt).getTime();
  if (!Number.isFinite(time)) return "";
  const minutes = Math.max(1, Math.round((Date.now() - time) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function WorldNewsSkeleton() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-espresso/10 bg-cream/70 p-5"
        >
          <div className="h-3 w-24 rounded-full bg-espresso/10" />
          <div className="mt-3 h-4 w-full rounded-full bg-espresso/10" />
          <div className="mt-2 h-4 w-2/3 rounded-full bg-espresso/10" />
        </div>
      ))}
    </div>
  );
}

export default async function WorldNews() {
  const news = await getWorldNews();

  if (news.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-espresso/20 bg-cream/60 p-6 text-center">
        <p className="font-hand text-xl text-cocoa">
          the world desk is quiet right now ✿ try again in a little while
        </p>
        <a
          href="https://news.google.com"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block rounded-full border border-espresso/20 bg-cream px-5 py-2 text-sm font-bold text-espresso transition hover:bg-parchment"
        >
          Open world news →
        </a>
      </div>
    );
  }

  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2">
      {news.map((item) => (
        <li key={item.link}>
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col justify-between rounded-2xl border border-espresso/15 bg-cream/80 p-5 shadow-[4px_4px_0_rgba(95,115,85,0.1)] transition hover:-translate-y-0.5 hover:bg-cream"
          >
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-latte">
              <span className="rounded-full bg-lavender-soft px-2.5 py-1 text-lavender-deeper">
                {item.source || "world"}
              </span>
              {item.publishedAt && <span>{timeAgo(item.publishedAt)}</span>}
            </div>
            <p className="mt-3 font-serif text-[17px] leading-snug text-espresso transition group-hover:text-lavender-deeper">
              {item.title}
            </p>
            <span className="mt-3 font-hand text-lg text-cocoa">
              read the story →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
