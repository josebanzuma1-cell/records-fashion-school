import type { Metadata } from "next";
import Link from "next/link";
import { school } from "@/lib/school";
import PillLink from "@/components/ui/PillLink";

export const metadata: Metadata = {
  title: "Fashion Design",
  description: `The flagship ${school.program.duration} programme at ${school.name}: ${school.program.practicalShare}% practical, ${school.program.contactHoursTotal.toLocaleString()} contact hours, ${school.program.itemsProduced} garments made by every student.`,
};

const PROGRAM_STATS = [
  { value: `${school.program.practicalShare}%`, label: "Practical basis" },
  {
    value: `${school.program.semesters} × ${school.program.semesterMonths}`,
    label: "Semesters × months each",
  },
  {
    value: school.program.contactHoursTotal.toLocaleString(),
    label: "Contact hours, full course",
  },
  {
    value: String(school.program.itemsProduced),
    label: "Garments made per student",
  },
];

export default function FashionDesignPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12">
      <p className="eyebrow">— Educational Offer / Fashion Design</p>
      <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]">
        Fashion{" "}
        <em className="font-serif normal-case italic tracking-normal">
          Design.
        </em>
      </h1>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <p className="inline-flex items-center gap-3 border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
          {school.enrollmentBanner}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
          {school.program.duration} · Two stages · Tezira House, Kampala
        </p>
      </div>

      <p className="mt-10 max-w-3xl font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1.4]">
        Offered on a {school.program.practicalShare}% practical basis for{" "}
        {school.program.duration} — an intense, hands-on system that instils
        up-to-date entrepreneurial skills and attitude to meet the ever-evolving
        design market demands.
      </p>

      {/* Stats band */}
      <div className="mt-[8vh] grid grid-cols-2 gap-x-8 border-t hairline lg:grid-cols-4">
        {PROGRAM_STATS.map((stat) => (
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

      {/* The two stages */}
      <div className="mt-[10vh] grid gap-x-10 border-t hairline sm:grid-cols-2">
        <div className="border-b hairline py-10 sm:pr-10">
          <p className="flex items-baseline gap-4">
            <span className="font-serif text-2xl italic text-magenta">01</span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
              Stage One — 1½ years
            </span>
          </p>
          <p className="mt-5 font-mono text-sm leading-relaxed text-ink/80">
            {school.program.stageOne}
          </p>
        </div>
        <div className="border-b hairline py-10 sm:pr-10">
          <p className="flex items-baseline gap-4">
            <span className="font-serif text-2xl italic text-magenta">02</span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
              Stage Two — Creation
            </span>
          </p>
          <p className="mt-5 font-mono text-sm leading-relaxed text-ink/80">
            {school.program.stageTwo}
          </p>
        </div>
      </div>

      {/* Course units */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Course units</p>
          <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-ink/70">
            {school.program.codeNote}
          </p>
        </div>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-ink/[0.12] border-y hairline">
            {school.program.units.map((unit) => (
              <li
                key={unit.code}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <span className="font-mono text-sm uppercase tracking-[0.08em]">
                  {unit.name}
                </span>
                <span className="flex items-baseline gap-6 font-mono text-xs text-smoke">
                  <span>{unit.abbreviation}</span>
                  <span className="text-magenta">{unit.code}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-smoke">
            {school.program.contactHoursPerSemester} contact hours per semester
            · {school.program.contactHoursTotal.toLocaleString()} for the full
            course
          </p>
        </div>
      </div>

      {/* What you'll make */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">What you&rsquo;ll make</p>
          <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-ink/70">
            {school.program.itemsProduced} garments over{" "}
            {school.program.duration}, module by module — finished, fitted and
            worn.
          </p>
        </div>
        <ul className="flex flex-wrap content-start gap-3 lg:col-span-8">
          {school.program.modules.map((module) => (
            <li
              key={module}
              className="border hairline px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-ink/80"
            >
              {module}
            </li>
          ))}
        </ul>
      </div>

      {/* Fees + requirements summary */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">Fees &amp; enrollment</p>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-ink/[0.12] border-y hairline">
            <li className="flex items-baseline justify-between gap-6 py-4">
              <span className="font-mono text-sm">Full course tuition</span>
              <span className="font-serif text-xl italic">
                UGX {school.fees.tuitionFullCourse}
              </span>
            </li>
            <li className="flex items-baseline justify-between gap-6 py-4">
              <span className="font-mono text-sm">
                Tuition per semester ({school.program.semesterMonths} months)
              </span>
              <span className="font-serif text-xl italic">
                UGX {school.fees.tuitionPerSemester}
              </span>
            </li>
          </ul>
          <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-smoke">
            Plus registration and annual national examination fees — see the
            full breakdown on{" "}
            <Link
              href="/guidance/fees-and-contributions"
              className="text-ink/70 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-magenta"
            >
              Fees and Contributions
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PillLink href="/guidance/admission" variant="solid">
              Enroll Now
            </PillLink>
            <PillLink href="/guidance/open-day">Book an Open Day</PillLink>
          </div>
        </div>
      </div>
    </div>
  );
}
