"use client";

import { useRef } from "react";
import { courses } from "@/lib/offer";
import { school } from "@/lib/school";
import { useSectionReveal } from "@/lib/useSectionReveal";
import CourseCard from "./CourseCard";
import PillLink from "@/components/ui/PillLink";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Educational Offer — dark editorial section, sticky intro column left,
 * course card grid right (structure lifted from the reference capture).
 */
export default function OfferSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section ref={sectionRef} data-cursor-theme="dark" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-content gap-14 px-6 py-[14vh] lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-36">
            <p data-reveal className="eyebrow">
              — 02 / Educational Offer
            </p>
            <h2
              data-reveal
              className="mt-8 font-display text-[clamp(2rem,3.6vw,4.25rem)] uppercase leading-[0.95] tracking-[0.02em]"
            >
              Educational{" "}
              <em className="font-serif normal-case italic tracking-normal">
                Offer
              </em>
            </h2>
            <p
              data-reveal
              className="mt-8 max-w-md font-mono text-sm leading-relaxed text-paper/70"
            >
              From Foundation to Postgraduate — with professional, short and
              summer courses between — Records Fashion School trains designers
              in pattern, cut, drape and finish, and the entrepreneurial skill
              to make craft a career.
            </p>
            <p
              data-reveal
              className="mt-6 inline-flex items-center gap-3 border border-paper/20 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em]"
            >
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-magenta" />
              {school.enrollmentBanner}
            </p>
            <div data-reveal className="mt-10">
              <Magnetic>
                <PillLink href="/apply" variant="solid">
                  Enroll Now
                </PillLink>
              </Magnetic>
            </div>
          </div>
        </div>

        <div className="grid content-start gap-6 sm:grid-cols-2 lg:col-span-7">
          {courses.map((course, i) => (
            <CourseCard key={course.href} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
