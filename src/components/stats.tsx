"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useContent } from "@/components/content-provider";

function Counter({ to, run }: { to: number; run: boolean }) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (reduce) {
      setN(to);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, to, reduce]);

  return <span className="tabular-nums">{n}</span>;
}

export default function Stats() {
  const { stats: STATS } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="border-y border-line">
      <div
        ref={ref}
        className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`group px-6 py-12 transition-colors duration-500 hover:bg-white/[0.02] md:px-10 md:py-16 ${
              i % 2 === 0 ? "border-r border-line" : ""
            } ${i < 2 ? "border-b border-line md:border-b-0" : ""} ${
              i === 1 || i === 2 ? "md:border-r md:border-line" : ""
            }`}
          >
            <div className="display text-[clamp(2.6rem,6vw,4.6rem)] leading-none">
              <Counter to={s.value} run={inView} />
            </div>
            <div className="mono-label mt-4 transition-colors group-hover:text-cream">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
