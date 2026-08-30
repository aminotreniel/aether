"use client";

const ITEMS = [
  "Product design",
  "Design systems",
  "Motion",
  "Prototyping",
  "Front-end",
  "Brand",
  "Accessibility",
  "Design engineering",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];

  return (
    <section className="marquee relative overflow-hidden border-y border-line py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="marquee-track" style={{ "--duration": "38s" } as React.CSSProperties}>
        {row.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 px-8 text-[13px] tracking-tight text-muted"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-lime/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
