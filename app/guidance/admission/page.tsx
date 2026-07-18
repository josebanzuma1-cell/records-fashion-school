import type { Metadata } from "next";
import Link from "next/link";
import { school } from "@/lib/school";
import PillLink from "@/components/ui/PillLink";

export const metadata: Metadata = {
  title: "Admission",
  description: `Enrollment requirements for the ${school.program.name} programme at ${school.name}, Kampala.`,
};

export default function AdmissionPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12">
      <p className="eyebrow">— Guidance / Admission</p>
      <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]">
        Join the{" "}
        <em className="font-serif normal-case italic tracking-normal">
          atelier.
        </em>
      </h1>

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <p className="inline-flex items-center gap-3 border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
          {school.enrollmentBanner}
        </p>
      </div>

      <p className="mt-10 max-w-2xl font-mono text-sm leading-relaxed text-ink/70">
        Enrollment for the {school.program.duration} {school.program.name}{" "}
        programme is open. Bring the following to Tezira House — or write to us
        and we&rsquo;ll walk you through it.
      </p>

      {/* Requirements */}
      <div className="mt-[8vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">Enrollment requirements</p>
        <ol className="lg:col-span-8">
          {school.fees.requirements.map((requirement, i) => (
            <li
              key={requirement}
              className="flex items-baseline gap-6 border-b hairline py-5"
            >
              <span className="font-serif text-xl italic text-magenta">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-sm leading-relaxed text-ink/80">
                {requirement}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Application form + fees pointer */}
      <div className="mt-[8vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <p className="eyebrow lg:col-span-4">Apply</p>
        <div className="lg:col-span-8">
          <p className="max-w-xl font-mono text-sm leading-relaxed text-ink/70">
            Download the application form, fill it in, and hand it to the
            registrar at Tezira House with your requirements — or ask for a
            copy at the front desk. {school.fees.currencyNote}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PillLink
              href="/apply/records-fashion-school-application-form.pdf"
              variant="solid"
            >
              Download Application Form
            </PillLink>
            <PillLink href="/guidance/fees-and-contributions">
              Fees and Contributions
            </PillLink>
            <PillLink href="/contact">Talk to Us</PillLink>
          </div>
          <p className="mt-8 font-mono text-xs leading-relaxed text-smoke">
            {school.addressLines.join(" · ")} ·{" "}
            {school.phones.join(" · ")} ·{" "}
            <a
              href={`mailto:${school.email}`}
              className="transition-colors hover:text-magenta"
            >
              {school.email}
            </a>
          </p>
          <Link
            href="/educational-offer/fashion-design"
            className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-smoke transition-colors hover:text-magenta"
          >
            See the full programme →
          </Link>
        </div>
      </div>
    </div>
  );
}
