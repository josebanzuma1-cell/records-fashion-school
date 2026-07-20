import type { Metadata } from "next";
import { school } from "@/lib/school";
import PillLink from "@/components/ui/PillLink";

export const metadata: Metadata = {
  title: "Companies and Partners",
  description: `The design houses and ateliers ${school.name} works with — from Kampala to Paris.`,
};

export default function CompaniesAndPartnersPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12">
      <p className="eyebrow">— The School / Companies and Partners</p>
      <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]">
        In good{" "}
        <em className="font-serif normal-case italic tracking-normal">
          company.
        </em>
      </h1>
      <p className="mt-10 max-w-2xl font-mono text-sm leading-relaxed text-ink/70">
        Our students learn inside a working industry, not beside it. These are
        the design houses and studios we work with — places our people visit,
        learn from, and go on to work alongside.
      </p>

      <ul className="mt-[10vh] border-t hairline">
        {school.partners.map((partner, i) => (
          <li
            key={partner.name}
            className="grid gap-6 border-b hairline py-12 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <p className="flex items-baseline gap-4">
                <span className="font-serif text-2xl italic text-magenta">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl uppercase tracking-[0.02em] lg:text-3xl">
                  {partner.name}
                </span>
              </p>
              <p className="mt-3 pl-12 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                {partner.location}
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="max-w-2xl font-mono text-sm leading-relaxed text-ink/80">
                {partner.about}
              </p>
              <a
                href={partner.url}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-magenta"
              >
                Visit {partner.name}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-2"
                >
                  →
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-16 flex flex-wrap gap-4">
        <PillLink href="/the-school/about-us" variant="solid">
          About the School
        </PillLink>
        <PillLink href="/work-with-us">Partner with Us</PillLink>
      </div>
    </div>
  );
}
