import type { Metadata } from "next";
import Link from "next/link";
import { school } from "@/lib/school";
import PillLink from "@/components/ui/PillLink";

export const metadata: Metadata = {
  title: "Fees and Contributions",
  description: `Tuition and fees for the ${school.program.name} programme at ${school.name} — in Ugandan Shillings.`,
};

const FEE_ROWS = [
  { label: "Registration fee (one-off)", amount: school.fees.registration },
  {
    label: `Tuition per semester (${school.program.semesterMonths} months)`,
    amount: school.fees.tuitionPerSemester,
  },
  {
    label: "Full course tuition (all semesters)",
    amount: school.fees.tuitionFullCourse,
  },
  {
    label: "National examinations registration (annual)",
    amount: school.fees.nationalExamsAnnual,
  },
];

export default function FeesPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12">
      <p className="eyebrow">— Guidance / Fees and Contributions</p>
      <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]">
        Fees &amp;{" "}
        <em className="font-serif normal-case italic tracking-normal">
          contributions.
        </em>
      </h1>

      <p className="mt-10 max-w-2xl font-mono text-sm leading-relaxed text-ink/70">
        The {school.program.name} programme runs {school.program.semesters}{" "}
        semesters of {school.program.semesterMonths} months each, over{" "}
        {school.program.duration}. {school.fees.currencyNote}
      </p>

      <div className="mt-[8vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">The numbers</p>
        <div className="lg:col-span-8">
          <ul className="divide-y divide-ink/[0.12] border-y hairline">
            {FEE_ROWS.map((row) => (
              <li
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5"
              >
                <span className="font-mono text-sm text-ink/80">
                  {row.label}
                </span>
                <span className="font-serif text-2xl italic">
                  UGX {row.amount}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-smoke">
            Figures from the school&rsquo;s official course breakdown. For
            payment plans and anything unclear, talk to the registrar — we
            would rather explain than surprise.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PillLink href="/guidance/admission" variant="solid">
              Enrollment Requirements
            </PillLink>
            <PillLink href="/contact">Talk to Us</PillLink>
          </div>
          <Link
            href="/educational-offer/fashion-design"
            className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
          >
            See what the tuition buys — the full programme →
          </Link>
        </div>
      </div>
    </div>
  );
}
