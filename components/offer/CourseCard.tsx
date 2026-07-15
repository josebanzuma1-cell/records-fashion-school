import Link from "next/link";
import type { Course } from "@/lib/offer";

type CourseCardProps = {
  course: Course;
  index: number;
};

/**
 * Educational Offer card — image zooms on hover, custom cursor shows "View".
 * Reference: the B/W card grid on the right of the capture.
 */
export default function CourseCard({ course, index }: CourseCardProps) {
  return (
    <Link
      href={course.href}
      data-cursor="view"
      data-reveal
      className="group relative block overflow-hidden bg-navy"
    >
      {/* TODO: replace with real course photography */}
      <img
        src={course.image}
        alt=""
        width={640}
        height={800}
        className="aspect-[4/5] w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
      />
      <span className="absolute inset-x-5 bottom-5 flex items-baseline justify-between gap-4">
        <span className="font-mono text-sm uppercase tracking-[0.12em] text-paper">
          {course.label}
        </span>
        <span className="font-serif text-lg italic text-paper/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>
    </Link>
  );
}
