"use client";

import { useRef } from "react";
import Link from "next/link";
import { newsPosts } from "@/lib/news";
import { useSectionReveal } from "@/lib/useSectionReveal";
import NewsCard from "./NewsCard";

/**
 * Magazine — cream editorial panel, sticky intro left, news grid right
 * (structure from the reference capture; tinted with our cream token).
 */
export default function MagazineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} className="bg-cream text-ink">
      <div className="mx-auto grid max-w-content gap-14 px-6 py-[14vh] lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <p data-reveal className="eyebrow">
              — 03 / Magazine
            </p>
            <h2
              data-reveal
              className="mt-8 font-display text-[clamp(2rem,3.6vw,4.25rem)] uppercase leading-[0.95] tracking-[0.02em]"
            >
              Magazine
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-md font-mono text-sm leading-relaxed text-ink/70"
            >
              The space where the school tells its story — news, events,
              projects and insights from the atelier, our students and the
              designers they become.
            </p>
            <div data-reveal className="mt-10 border-t hairline pt-6">
              <Link
                href="/magazine/news-and-events"
                className="group inline-flex items-center gap-4 font-serif text-2xl italic transition-colors duration-300 hover:text-magenta"
              >
                Discover our Magazine
                <span
                  aria-hidden
                  className="font-mono text-lg not-italic transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid content-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:col-span-7">
          {newsPosts.map((post) => (
            <NewsCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
