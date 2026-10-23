import Link from "next/link";
import { FREE_TOOLS } from "@/lib/freeTools";

/** Links to the other free tools, for internal linking and discovery. */
export default function MoreTools({ current }: { current: string }) {
  const others = FREE_TOOLS.filter((t) => t.href !== current);
  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">More free tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {others.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="block bg-white rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-sky-300 hover:shadow-md transition-all"
          >
            <p className="font-semibold text-gray-900">{t.name}</p>
            <p className="mt-1 text-sm text-gray-600 leading-relaxed">{t.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
