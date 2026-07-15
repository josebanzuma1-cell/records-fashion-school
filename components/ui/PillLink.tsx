import Link from "next/link";
import type { ReactNode } from "react";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  /** outline inherits currentColor (works on dark + light); solid is the magenta CTA. */
  variant?: "outline" | "solid";
  className?: string;
};

export default function PillLink({
  href,
  children,
  variant = "outline",
  className = "",
}: PillLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300";
  const variants = {
    outline: "border border-current hover:text-magenta",
    solid: "bg-magenta text-paper hover:bg-ink hover:text-paper",
  };

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
