import Link from "next/link";
import { formatPostDate, type NewsPost } from "@/lib/news";

/**
 * Magazine card — chip on the image, mono date, bold title.
 * Structure from the reference capture's news grid.
 */
export default function NewsCard({ post }: { post: NewsPost }) {
  return (
    <Link
      href={post.href}
      data-cursor="view"
      data-reveal
      className="group block"
    >
      <span className="relative block overflow-hidden">
        {/* TODO: replace with real editorial photography */}
        <img
          src={post.image}
          alt=""
          width={640}
          height={480}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-paper px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink">
          {post.category}
        </span>
      </span>
      <span className="mt-5 block font-mono text-[11px] tracking-[0.25em] text-smoke">
        {formatPostDate(post.date)}
      </span>
      <span className="mt-2 block max-w-md font-mono text-base font-bold leading-snug transition-colors duration-300 group-hover:text-magenta">
        {post.title}
      </span>
    </Link>
  );
}
