import type { Metadata } from "next";
import { school } from "@/lib/school";
import PillLink from "@/components/ui/PillLink";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Visit ${school.name} at Tezira House, Kampala — or write to ${school.email}.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12">
      <p className="eyebrow">— Contact</p>
      <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]">
        Come for a{" "}
        <em className="font-serif normal-case italic tracking-normal">
          fitting.
        </em>
      </h1>

      <div className="mt-[10vh] grid gap-12 border-t hairline pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            The Atelier
          </p>
          <address className="mt-5 font-mono text-sm not-italic leading-relaxed text-ink/80">
            {school.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            Write / Call
          </p>
          <p className="mt-5 font-mono text-sm leading-relaxed text-ink/80">
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
            <a
              href={school.website}
              className="mt-2 block transition-colors hover:text-magenta"
            >
              www.recordsfashionschool.com
            </a>
          </p>
        </div>

        <div className="lg:col-span-4">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            Follow
          </p>
          {/* TODO: TikTok + YouTube handles, Facebook page URL. */}
          <ul className="mt-5 space-y-2">
            {school.socials.map((social) => (
              <li key={social.name} className="font-mono text-sm text-ink/70">
                {social.url ? (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-magenta"
                  >
                    {social.name} — {social.handle}
                  </a>
                ) : (
                  <>
                    {social.name}
                    {social.handle ? ` — ${social.handle}` : ""}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-wrap gap-4 border-t hairline pt-10">
        <PillLink href="/guidance/open-day" variant="solid">
          Book an Open Day
        </PillLink>
        <PillLink href="/guidance/admission">Admission</PillLink>
      </div>
    </div>
  );
}
