"use client";

import { useRef, useState } from "react";
import { school } from "@/lib/school";

/**
 * Online application — mirrors the official Application Form 2022 field for
 * field (Sections A/B/C), plus an email/phone pair so admissions can reply
 * to an online submission.
 *
 * No backend: the form POSTs directly to Web3Forms, which emails the
 * submission (and any attachments) to the school's inbox. The access key
 * comes from NEXT_PUBLIC_WEB3FORMS_KEY (see .env.example + README); the
 * destination inbox is configured in the Web3Forms dashboard, not in code.
 */

// Strip BOM/whitespace — Windows shell pipes can smuggle a U+FEFF into the
// stored env value, and Web3Forms rejects the key as an invalid UUID.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.replace(/^\uFEFF/, "").trim();
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const MAX_FILE_BYTES = 5 * 1024 * 1024; // ~5MB per attachment
const ACCEPT = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
const ACCEPT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const AFFIRMATION =
  "I affirm that the information on this application form and any other information I submit to Records Fashion School is complete and accurate, and I authorise each academic institute I have attended to release my academic and personal information to Records Fashion School in connection with the admission process.";

/** The paper form's checklist, shown as guidance beside the uploads. */
const DOCUMENT_CHECKLIST = [
  "Certificate showing achievement of at least secondary school or the equivalent.",
  "Two or three personal/self-taught projects to assess your passion and competence (optional).",
  "Six (6) full-colour passport-size photos.",
  "Admission processing fees of Ug. Shs. 122,000/=.",
];

const UPLOADS = [
  { id: "certificate_scan", label: "Certificate scan", optional: false },
  { id: "portfolio_projects", label: "Portfolio / projects", optional: true },
  { id: "passport_photo", label: "Passport photo", optional: false },
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border-b border-ink/30 bg-transparent py-3 font-mono text-sm text-ink outline-none transition-colors placeholder:text-smoke/70 focus:border-magenta aria-[invalid=true]:border-magenta";

const labelClass =
  "block font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-mono text-xs text-magenta">
      {message}
    </p>
  );
}

export default function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedName, setSubmittedName] = useState("");

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const data = new FormData(form);
    const next: Record<string, string> = {};
    const text = (name: string) => String(data.get(name) ?? "").trim();

    if (!text("full_name")) next.full_name = "Please enter your full name.";
    if (!text("date_of_birth"))
      next.date_of_birth = "Please enter your date of birth.";
    if (!data.get("semester_of_entry"))
      next.semester_of_entry = "Please choose a semester of entry.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text("email")))
      next.email = "Please enter a valid email address.";
    if (!/^\+?[\d\s()-]{9,}$/.test(text("phone")))
      next.phone = "Please enter a valid phone number.";
    if (!text("last_school_attended"))
      next.last_school_attended = "Please enter the last school you attended.";
    if (!text("certificate_obtained"))
      next.certificate_obtained = "Please enter the certificate you obtained.";
    if (!data.get("affirmation"))
      next.affirmation = "Please read and confirm the affirmation.";
    if (!text("signature_full_name"))
      next.signature_full_name =
        "Please type your full name as your signature.";

    for (const upload of UPLOADS) {
      const file = data.get(upload.id);
      if (file instanceof File && file.size > 0) {
        if (file.size > MAX_FILE_BYTES) {
          next[upload.id] = "File is larger than 5MB — please attach a smaller copy.";
        } else if (file.type && !ACCEPT_TYPES.includes(file.type)) {
          next[upload.id] = "Please attach a PDF, Word document, JPG or PNG.";
        }
      }
    }

    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // POST only, handled here — applicant data never touches the URL.
    event.preventDefault();
    const form = event.currentTarget;

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = form.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      first?.focus();
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const data = new FormData(form);
    const name = String(data.get("full_name") ?? "").trim();
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `New application — ${name}`);
    data.append("from_name", "Records Fashion School website");
    data.append("signature_date", today);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSubmittedName(name.split(" ")[0] || name);
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="border hairline p-8 lg:p-12">
        <p className="eyebrow">— Application received</p>
        <p className="mt-6 font-serif text-3xl italic">
          Thank you, {submittedName}.
        </p>
        <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-ink/70">
          Your application has been sent to our admissions inbox. We will
          contact you with the next steps for your original documents, the six
          passport photos and the {school.fees.registration} processing fee —
          each completed at the office or as arranged with admissions.
        </p>
        <p className="mt-6 font-mono text-xs leading-relaxed text-smoke">
          {school.addressLines.join(" · ")}
          <br />
          {school.phones.join(" · ")} ·{" "}
          <a
            href={`mailto:${school.email}`}
            className="transition-colors hover:text-magenta"
          >
            {school.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      method="POST"
      noValidate
      aria-describedby="privacy-note"
    >
      {!WEB3FORMS_KEY && (
        <p className="mb-10 border hairline bg-cream px-5 py-4 font-mono text-xs leading-relaxed text-ink/80">
          Online submission is not activated yet on this deployment (the
          Web3Forms key is missing — see the project README). You can still
          review the form below; to apply today, use the downloadable form
          above or email{" "}
          <a
            href={`mailto:${school.email}`}
            className="underline decoration-ink/30 underline-offset-4 transition-colors hover:text-magenta"
          >
            {school.email}
          </a>
          .
        </p>
      )}

      {/* Honeypot — humans never see or fill this; Web3Forms drops entries where it's checked. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px"
      />

      {/* ——— Section A */}
      <fieldset>
        <legend className="flex items-baseline gap-4">
          <span className="font-serif text-2xl italic text-magenta">A</span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            Personal Information
          </span>
        </legend>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="full_name" className={labelClass}>
              Full Name *
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={!!errors.full_name}
              aria-describedby={errors.full_name ? "full_name-error" : undefined}
              className={inputClass}
            />
            <FieldError id="full_name-error" message={errors.full_name} />
          </div>

          <div>
            <label htmlFor="date_of_birth" className={labelClass}>
              Date of Birth *
            </label>
            <input
              id="date_of_birth"
              name="date_of_birth"
              type="date"
              autoComplete="bday"
              required
              max={new Date().toISOString().slice(0, 10)}
              aria-invalid={!!errors.date_of_birth}
              aria-describedby={
                errors.date_of_birth ? "date_of_birth-error" : undefined
              }
              className={inputClass}
            />
            <FieldError
              id="date_of_birth-error"
              message={errors.date_of_birth}
            />
          </div>
        </div>

        <fieldset
          className="mt-8"
          aria-invalid={!!errors.semester_of_entry}
          aria-describedby={
            errors.semester_of_entry ? "semester_of_entry-error" : undefined
          }
        >
          <legend className={labelClass}>Semester of Entry *</legend>
          <div className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
            {["January to May", "July to November"].map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 font-mono text-sm"
              >
                <input
                  type="radio"
                  name="semester_of_entry"
                  value={option}
                  className="h-4 w-4 accent-[#C01D63]"
                />
                {option}
              </label>
            ))}
          </div>
          <FieldError
            id="semester_of_entry-error"
            message={errors.semester_of_entry}
          />
        </fieldset>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email * <span className="normal-case text-smoke">(so admissions can reply)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass}
            />
            <FieldError id="email-error" message={errors.email} />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+256 …"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={inputClass}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
        </div>

        <div className="mt-8">
          <label htmlFor="heard_about_us" className={labelClass}>
            How did you hear about Records Fashion School?
          </label>
          <input
            id="heard_about_us"
            name="heard_about_us"
            type="text"
            className={inputClass}
          />
        </div>
      </fieldset>

      {/* ——— Section B */}
      <fieldset className="mt-16 border-t hairline pt-12">
        <legend className="float-left flex items-baseline gap-4">
          <span className="font-serif text-2xl italic text-magenta">B</span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            Education Information
          </span>
        </legend>

        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="last_school_attended" className={labelClass}>
              Last School Attended *
            </label>
            <input
              id="last_school_attended"
              name="last_school_attended"
              type="text"
              required
              aria-invalid={!!errors.last_school_attended}
              aria-describedby={
                errors.last_school_attended
                  ? "last_school_attended-error"
                  : undefined
              }
              className={inputClass}
            />
            <FieldError
              id="last_school_attended-error"
              message={errors.last_school_attended}
            />
          </div>

          <div>
            <label htmlFor="certificate_obtained" className={labelClass}>
              Certificate Obtained *
            </label>
            <input
              id="certificate_obtained"
              name="certificate_obtained"
              type="text"
              required
              aria-invalid={!!errors.certificate_obtained}
              aria-describedby={
                errors.certificate_obtained
                  ? "certificate_obtained-error"
                  : undefined
              }
              className={inputClass}
            />
            <FieldError
              id="certificate_obtained-error"
              message={errors.certificate_obtained}
            />
          </div>
        </div>

        <div className="mt-10 border hairline p-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
            To complete your application, the Office of Admissions requires:
          </p>
          <ol className="mt-4 space-y-2">
            {DOCUMENT_CHECKLIST.map((item, i) => (
              <li
                key={item}
                className="flex gap-4 font-mono text-xs leading-relaxed text-ink/70"
              >
                <span className="text-magenta">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-4 font-mono text-xs leading-relaxed text-smoke">
            You may attach digital copies below where possible — originals,
            the passport photos and the processing fee are completed at the
            office or as arranged with admissions.
          </p>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-8 lg:grid-cols-3">
          {UPLOADS.map((upload) => (
            <div key={upload.id}>
              <label htmlFor={upload.id} className={labelClass}>
                {upload.label}
              </label>
              <input
                id={upload.id}
                name={upload.id}
                type="file"
                accept={ACCEPT}
                aria-invalid={!!errors[upload.id]}
                aria-describedby={
                  errors[upload.id] ? `${upload.id}-error` : undefined
                }
                className="mt-3 block w-full font-mono text-xs text-ink/70 file:mr-4 file:cursor-pointer file:border file:border-ink/30 file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-[11px] file:uppercase file:tracking-[0.15em] file:text-ink file:transition-colors hover:file:border-magenta hover:file:text-magenta"
              />
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-smoke">
                PDF, Word, JPG or PNG · up to 5MB
                {upload.optional ? " (Optional)" : ""}
              </p>
              <FieldError
                id={`${upload.id}-error`}
                message={errors[upload.id]}
              />
            </div>
          ))}
        </div>
      </fieldset>

      {/* ——— Section C */}
      <fieldset className="mt-16 border-t hairline pt-12">
        <legend className="float-left flex items-baseline gap-4">
          <span className="font-serif text-2xl italic text-magenta">C</span>
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
            Certification of Truth
          </span>
        </legend>

        <div className="mt-16">
          <label className="flex cursor-pointer gap-4">
            <input
              type="checkbox"
              name="affirmation"
              value="Affirmed"
              required
              aria-invalid={!!errors.affirmation}
              aria-describedby={
                errors.affirmation ? "affirmation-error" : undefined
              }
              className="mt-1 h-4 w-4 shrink-0 accent-[#C01D63]"
            />
            <span className="max-w-2xl font-mono text-sm leading-relaxed text-ink/80">
              {AFFIRMATION} *
            </span>
          </label>
          <FieldError id="affirmation-error" message={errors.affirmation} />
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          <div>
            <label htmlFor="signature_full_name" className={labelClass}>
              Full Name — typed, acts as your signature *
            </label>
            <input
              id="signature_full_name"
              name="signature_full_name"
              type="text"
              autoComplete="name"
              required
              aria-invalid={!!errors.signature_full_name}
              aria-describedby={
                errors.signature_full_name
                  ? "signature_full_name-error"
                  : undefined
              }
              className={`${inputClass} font-serif text-xl italic`}
            />
            <FieldError
              id="signature_full_name-error"
              message={errors.signature_full_name}
            />
          </div>

          <div>
            <span className={labelClass}>Date</span>
            <p className="border-b border-ink/30 py-3 font-mono text-sm text-ink/70">
              {today} — filled automatically on submission
            </p>
          </div>
        </div>
      </fieldset>

      {/* Submit */}
      <div className="mt-14 border-t hairline pt-10">
        {status === "error" && (
          <p
            role="alert"
            className="mb-8 border border-magenta/40 px-5 py-4 font-mono text-xs leading-relaxed text-ink/80"
          >
            Your application could not be sent online just now. Please email
            it to{" "}
            <a
              href={`mailto:${school.email}?subject=Fashion%20Design%20application`}
              className="text-magenta underline decoration-magenta/40 underline-offset-4"
            >
              {school.email}
            </a>{" "}
            or call {school.phones[0]} — your answers above are still here.
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-magenta px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <span
                aria-hidden
                className="h-3 w-3 animate-spin rounded-full border border-paper border-t-transparent"
              />
              Sending…
            </>
          ) : (
            "Submit Application"
          )}
        </button>

        <p
          id="privacy-note"
          className="mt-6 max-w-xl font-mono text-[11px] leading-relaxed text-smoke"
        >
          Sent by secure POST to our admissions inbox — your details never
          appear in the page address and are used only for the admission
          process.
        </p>
      </div>
    </form>
  );
}
