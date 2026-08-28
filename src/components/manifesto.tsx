"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";

const COPY =
  "Most software is functional and forgettable. We are after the other thing — the moment a product answers you so smoothly that you stop noticing the interface at all. That takes taste, restraint, and an unreasonable amount of attention to the last five percent.";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.2"],
  });

  const words = COPY.split(" ");

  return (
    <section id="approach" className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-44">
      <div className="mb-14 flex items-center gap-4">
        <span className="mono-label">01 — Manifesto</span>
        <span className="h-px flex-1 bg-line" />
      </div>
      <div
        ref={ref}
        className="max-w-5xl text-[clamp(1.6rem,4.2vw,3.1rem)] font-light leading-[1.22] tracking-[-0.02em]"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1.6) / words.length;
          return (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[start, Math.min(end, 1)]}
            />
          );
        })}
      </div>
    </section>
  );
}
