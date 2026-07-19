"use client";

import { useRef } from "react";
import { school } from "@/lib/school";
import { useSectionReveal } from "@/lib/useSectionReveal";
import ApplicationForm from "./ApplicationForm";

/** The official form, both formats, with real file sizes. */
const DOWNLOADS = [
  {
    href: "/forms/records-fashion-school-application-form.pdf",
    format: "PDF",
    size: "550 KB",
    note: "Print or fill digitally",
  },
  {
    href: "/forms/records-fashion-school-application-form.docx",
    format: "Word",
    size: "187 KB",
    note: "Fill in Microsoft Word",
  },
];

export default function ApplyContent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useSectionReveal(sectionRef);

  return (
    <div
      ref={sectionRef}
      className="mx-auto max-w-content px-6 pb-[14vh] pt-48 lg:px-12"
    >
      <p data-reveal className="eyebrow">
        — Admissions / Apply
      </p>
      <h1
        data-reveal
        className="mt-8 max-w-5xl font-display text-[clamp(2.5rem,6.5vw,6rem)] uppercase leading-[0.95] tracking-[0.02em]"
      >
        Two ways to{" "}
        <em className="font-serif normal-case italic tracking-normal">
          apply.
        </em>
      </h1>

      <div data-reveal className="mt-10 flex flex-wrap items-center gap-6">
        <p className="inline-flex items-center gap-3 border hairline px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
          {school.enrollmentBanner}
        </p>
      </div>

      <p
        data-reveal
        className="mt-10 max-w-2xl font-mono text-sm leading-relaxed text-ink/70"
      >
        Download the official application form and return it to the school —
        or fill it in online below and it lands straight in our admissions
        inbox. Either way, the {school.program.name} programme is waiting.
      </p>

      {/* ——— Part A: downloads */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-4">
          <p className="eyebrow">— 01 / Download the form</p>
          <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-ink/70">
            Fill it in, then email it to{" "}
            <a
              href={`mailto:${school.email}?subject=Fashion%20Design%20application`}
              className="text-ink/80 underline decoration-ink/30 underline-offset-4 transition-colors hover:text-magenta"
            >
              {school.email}
            </a>{" "}
            — or hand-deliver it to Lower Katwe along Muteesa I Road, Tezira
            House, 2nd Floor.
          </p>
        </div>
        <div data-reveal className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {DOWNLOADS.map((file) => (
            <a
              key={file.format}
              href={file.href}
              download
              className="group border hairline p-6 transition-colors duration-300 hover:border-magenta"
            >
              <p className="font-serif text-3xl italic transition-colors duration-300 group-hover:text-magenta">
                {file.format}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                Application Form 2022 · {file.size}
              </p>
              <p className="mt-5 font-mono text-xs text-ink/70">{file.note}</p>
              <p className="mt-6 inline-block border border-current px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-magenta">
                Download ↓
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* ——— Part B: online form */}
      <div className="mt-[10vh] grid gap-10 border-t hairline pt-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <p className="eyebrow">— 02 / Apply online</p>
            <p className="mt-5 max-w-xs font-mono text-sm leading-relaxed text-ink/70">
              The same form, sent straight to admissions. We reply on the
              email or phone you give us.
            </p>
            <div className="mt-8 border hairline bg-cream p-5">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                Not completed online
              </p>
              <p className="mt-3 font-mono text-xs leading-relaxed text-ink/70">
                The six physical passport photos, your original certificates
                and the {school.fees.registration} processing fee are
                completed at the office or as arranged with admissions —
                we&rsquo;ll contact you with next steps after you submit.
              </p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-smoke">
                {school.addressLines.join(" · ")}
                <br />
                {school.phones.join(" · ")}
                <br />
                {school.email}
              </p>
            </div>
          </div>
        </div>
        <div data-reveal className="lg:col-span-8">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
