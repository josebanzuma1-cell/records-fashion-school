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

const STATS = [
  { value: "2008", label: "Established, 7 July" },
  { value: "921", label: `Graduates since ${school.firstGraduationYear}` },
  { value: "91%", label: "Go on to start their own design houses" },
  { value: "3,660", label: "Contact hours per full course" },
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
            Records Fashion School is a community-based vocational institute,
            established on {school.founded} — nurturing passionate people into
            professional fashion designers with an artistic mind-set that meets
            the evolving design market demands.
          </p>
          <p className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
            From our first graduation in {school.firstGraduationYear} to date,
            we have passed out {school.graduates} fashion professionals — and{" "}
            {school.alumniStartupRate}% of them have gone straight on to start
            design houses of their own. Our intense, hands-on system builds
            each student a reasonable clientele base a full year before
            releasing them into the world of work.
          </p>
        </div>
      </div>

      {/* Stats band */}
      <div className="mt-[8vh] grid grid-cols-2 gap-x-8 border-t hairline lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="border-b hairline py-8">
            <p className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] italic leading-none text-magenta">
              {stat.value}
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Campus photo — from the school's own profile deck */}
      <figure className="mt-[8vh]">
        <img
          src="/about/campus-library.jpg"
          alt="Students at Records Fashion School researching pattern and design books together"
          width={2930}
          height={1676}
          className="aspect-[21/9] w-full object-cover"
        />
        <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
          — Inside the atelier: research hour at Tezira House
        </figcaption>
      </figure>

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

      {/* 4 — Our Values */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">Our values</p>
        <div className="grid gap-10 lg:col-span-8">
          {school.values.map((value) => (
            <div key={value.name} className="max-w-2xl">
              <p className="font-serif text-2xl italic">{value.name}</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-ink/70">
                {value.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5 — Alumni design houses */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Where our graduates went</p>
          <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-ink/70">
            {school.alumniStartupRate}% of our {school.graduates} graduates
            run design houses of their own — among them:
          </p>
        </div>
        <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
          {school.alumniHouses.map((house) => (
            <li
              key={house}
              className="border hairline px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink/80"
            >
              {house}
            </li>
          ))}
        </ul>
      </div>

      {/* 6 — What we offer */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">What we offer</p>
        <div className="lg:col-span-8">
          <p className="inline-flex items-center gap-3 border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
            {school.enrollmentBanner}
          </p>
          <p className="mt-6 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
            Our {school.program.name} programme runs {school.program.duration}{" "}
            on a {school.program.practicalShare}% practical basis, in two
            stages — {school.program.contactHoursTotal.toLocaleString()}{" "}
            contact hours and {school.program.itemsProduced} garments made by
            every student before they graduate.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PillLink href="/educational-offer/fashion-design" variant="solid">
              The Fashion Design Programme
            </PillLink>
            <PillLink href="/apply">Apply Now</PillLink>
          </div>
        </div>
      </div>

      {/* 7 — Visit us */}
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
          <div className="font-mono text-sm leading-relaxed text-ink/80">
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
            <ul className="mt-6 space-y-1">
              {school.socials.map((social) =>
                social.url ? (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-smoke transition-colors hover:text-magenta"
                    >
                      {social.name} — {social.handle}
                    </a>
                  </li>
                ) : (
                  <li key={social.name} className="text-smoke">
                    {social.name}
                    {social.handle ? ` — ${social.handle}` : ""}
                  </li>
                ),
              )}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
            >
              Contact page →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
