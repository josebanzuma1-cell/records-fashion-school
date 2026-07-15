import type { Metadata } from "next";
import Link from "next/link";
import { school } from "@/lib/school";
import PillLink from "@/components/ui/PillLink";

export const metadata: Metadata = {
  title: "About Us",
  description: school.mission,
};

/** The four brand statements, in the school's own words. */
const STATEMENTS = [
  { label: "Our Mission", copy: school.mission },
  { label: "Our Vision", copy: school.vision },
  { label: "Our Promise", copy: school.promise },
  { label: "Our Positioning", copy: school.positioning },
];

export default function AboutUsPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12">
      {/* 1 — Intro */}
      <p className="eyebrow">— The School / About Us</p>
      <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]">
        Skills for{" "}
        <em className="font-serif normal-case italic tracking-normal">Life.</em>
      </h1>
      <p className="mt-10 max-w-2xl font-serif text-2xl italic leading-snug text-ink/80">
        {school.flyerHeadline}
      </p>

      {/* 2 — Who we are */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">Who we are</p>
        <div className="lg:col-span-8">
          <p className="max-w-3xl font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.4]">
            Records Fashion School nurtures passionate people into professional
            fashion designers — with an artistic perspective that meets the
            evolving demands of the design market.
          </p>
          <p className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
            {/* TODO: confirm founding year, number of students/alumni, and any
                accreditations — none appeared on the brochures. */}
            From our atelier at Tezira House in Kampala, we teach fashion as a
            discipline of the hands — pattern, cut, drape and finish — and as a
            business of the mind.
          </p>
        </div>
      </div>

      {/* 3 — Mission / Vision / Promise / Positioning */}
      <div className="mt-[10vh] grid gap-x-10 border-t hairline sm:grid-cols-2">
        {STATEMENTS.map((statement, i) => (
          <div key={statement.label} className="border-b hairline py-10 sm:pr-10">
            <p className="flex items-baseline gap-4">
              <span className="font-serif text-2xl italic text-magenta">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
                {statement.label}
              </span>
            </p>
            <p className="mt-5 font-mono text-sm leading-relaxed text-ink/80">
              {statement.copy}
            </p>
          </div>
        ))}
      </div>

      {/* 4 — What we offer */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">What we offer</p>
        <div className="lg:col-span-8">
          <p className="inline-flex items-center gap-3 border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
            {school.enrollmentBanner}
          </p>
          <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
            Foundation, undergraduate and postgraduate paths, professional
            courses, a startup incubator, and short and summer programmes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PillLink href="/guidance/admission" variant="solid">
              Enroll Now
            </PillLink>
            <PillLink href="/educational-offer/foundation-course">
              Explore the Offer
            </PillLink>
          </div>
        </div>
      </div>

      {/* 5 — Visit us */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">Visit us</p>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8">
          <address className="font-mono text-sm not-italic leading-relaxed text-ink/80">
            {school.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <p className="font-mono text-sm leading-relaxed text-ink/80">
            {school.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="block transition-colors hover:text-magenta"
              >
                {phone}
              </a>
            ))}
            <a
              href={`mailto:${school.email}`}
              className="mt-2 block transition-colors hover:text-magenta"
            >
              {school.email}
            </a>
            <Link
              href="/contact"
              className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
            >
              Contact page →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
