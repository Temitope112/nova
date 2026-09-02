import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface DirectoryItem {
  name: string;
  location: string;
  description: string;
  hours: string;
}

interface AirportDirectoryPageProps {
  eyebrow: string;
  title: string;
  description: string;
  items: DirectoryItem[];
}

export default function AirportDirectoryPage({
  eyebrow,
  title,
  description,
  items,
}: AirportDirectoryPageProps) {
  return (
    <main className="bg-[#faf9f6] text-[#111820]">
      <section className="bg-[#f5f2eb] pt-[var(--navbar-height)]">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
          <Link
            href="/airport"
            className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-[#111820]/40"
          >
            <ArrowLeft size={13} />
            At the Airport
          </Link>

          <p className="mt-16 text-[9px] uppercase tracking-[0.2em] text-[#315b78]">
            {eyebrow}
          </p>

          <h1 className="mt-5 max-w-5xl text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.82] tracking-[-0.075em]">
            {title}
          </h1>

          <p className="mt-8 max-w-xl text-sm leading-6 text-[#111820]/50">
            {description}
          </p>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28 xl:px-16">
        <div className="mx-auto max-w-[1600px] border-t border-[#111820]/15">
          {items.map((item, index) => (
            <article
              key={item.name}
              className="
                grid gap-6 border-b border-[#111820]/15 py-8
                lg:grid-cols-[80px_1fr_1fr_auto]
                lg:items-center
              "
            >
              <span className="font-mono text-[9px] text-[#111820]/30">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="text-2xl font-medium tracking-[-0.04em]">
                  {item.name}
                </h2>

                <p className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[#315b78]">
                  {item.location}
                </p>
              </div>

              <p className="max-w-md text-sm leading-6 text-[#111820]/45">
                {item.description}
              </p>

              <div className="flex items-center gap-5">
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#111820]/35">
                  {item.hours}
                </span>

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.4}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}