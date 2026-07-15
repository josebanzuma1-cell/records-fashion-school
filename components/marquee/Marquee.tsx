import { school } from "@/lib/school";

const PHRASES = [
  school.name,
  school.tagline,
  "Craft · Culture · Couture",
];

/**
 * Infinite text band. The track holds the phrase set twice; CSS translates
 * -50% on loop (paused under prefers-reduced-motion via globals.css).
 */
export default function Marquee() {
  const run = (key: string) => (
    <span key={key} aria-hidden className="flex shrink-0 items-baseline gap-10 pr-10">
      {PHRASES.map((phrase, i) =>
        phrase === school.tagline ? (
          <em
            key={i}
            className="font-serif text-[clamp(1.75rem,3.5vw,3.25rem)] italic text-magenta"
          >
            {phrase}
          </em>
        ) : (
          <span
            key={i}
            className="font-display text-[clamp(1.5rem,3vw,2.75rem)] uppercase tracking-[0.02em]"
          >
            {phrase}
            <span className="ml-10 align-middle font-mono text-xl text-smoke">
              —
            </span>
          </span>
        ),
      )}
    </span>
  );

  return (
    <section className="overflow-hidden border-y hairline py-8">
      <p className="sr-only">
        {school.name} — {school.tagline}
      </p>
      <div className="marquee-track flex w-max">
        {run("a")}
        {run("b")}
      </div>
    </section>
  );
}
