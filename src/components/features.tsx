"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Layers, Sparkles, Gauge, Palette } from "lucide-react";
import SpotlightCard from "./spotlight-card";
import { Rise, MaskText } from "./reveal";

const EASINGS: { name: string; value: [number, number, number, number] }[] = [
  { name: "expo", value: [0.16, 1, 0.3, 1] },
  { name: "spring", value: [0.34, 1.56, 0.64, 1] },
  { name: "smooth", value: [0.65, 0, 0.35, 1] },
];

function EasingLab() {
  const [index, setIndex] = useState(0);
  const [run, setRun] = useState(0);
  const easing = EASINGS[index];

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <div className="mb-4 flex items-center gap-2 text-lime">
          <Sparkles size={15} />
          <span className="mono-label text-lime">Motion system</span>
        </div>
        <h3 className="text-2xl tracking-[-0.02em]">
          Curves you can feel, not just read
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Every easing in the system is tuned against real content. Tap a curve
          and watch the difference.
        </p>
      </div>

      <div>
        {/* segmented control */}
        <div className="mb-6 inline-flex rounded-full border border-line bg-ink/60 p-1">
          {EASINGS.map((e, i) => (
            <button
              key={e.name}
              onClick={() => {
                setIndex(i);
                setRun((r) => r + 1);
              }}
              className="relative rounded-full px-4 py-1.5 text-xs transition-colors"
            >
              {i === index ? (
                <motion.span
                  layoutId="easing-pill"
                  className="absolute inset-0 rounded-full bg-cream"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              ) : null}
              <span
                className={`relative z-10 ${
                  i === index ? "text-ink" : "text-muted"
                }`}
              >
                {e.name}
              </span>
            </button>
          ))}
        </div>

        {/* track */}
        <button
          onClick={() => setRun((r) => r + 1)}
          className="group relative block w-full"
          aria-label="Replay animation"
        >
          <div className="relative h-14 overflow-hidden rounded-2xl border border-line bg-ink/60">
            <div className="absolute inset-y-0 left-0 flex w-full items-center px-2">
              <motion.div
                key={`${index}-${run}`}
                initial={{ x: 0 }}
                animate={{ x: "calc(100% - 2.5rem)" }}
                transition={{ duration: 1.1, ease: easing.value }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime text-ink"
              >
                <Layers size={16} />
              </motion.div>
            </div>
          </div>
          <span className="mono-label mt-3 block text-left opacity-60 transition-opacity group-hover:opacity-100">
            cubic-bezier({easing.value.join(", ")}) — click to replay
          </span>
        </button>
      </div>
    </div>
  );
}

function TokenCard() {
  const swatches = [
    { name: "ink", hex: "#050506" },
    { name: "surface", hex: "#0b0b0f" },
    { name: "cream", hex: "#f2f0ea" },
    { name: "lime", hex: "#d8ff3e" },
    { name: "iris", hex: "#7b5cff" },
    { name: "flame", hex: "#ff6b3d" },
  ];
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <div className="mb-4 flex items-center gap-2 text-muted">
          <Palette size={15} />
          <span className="mono-label">Tokens</span>
        </div>
        <h3 className="text-xl tracking-[-0.02em]">One source of truth</h3>
      </div>
      <div>
        <div className="flex gap-1.5">
          {swatches.map((s) => (
            <button
              key={s.name}
              onMouseEnter={() => setActive(s.name)}
              onMouseLeave={() => setActive(null)}
              className={`h-16 rounded-lg border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                active === s.name ? "flex-[2.4]" : "flex-1"
              }`}
              style={{ background: s.hex }}
              aria-label={s.name}
            />
          ))}
        </div>
        <div className="mono-label mt-3 h-4">
          {active
            ? `--color-${active} · ${
                swatches.find((s) => s.name === active)?.hex
              }`
            : "hover a swatch"}
        </div>
      </div>
    </div>
  );
}

function ControlsCard() {
  const [on, setOn] = useState(true);
  const [value, setValue] = useState(62);

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <div className="mb-4 flex items-center gap-2 text-muted">
          <Check size={15} />
          <span className="mono-label">Components</span>
        </div>
        <h3 className="text-xl tracking-[-0.02em]">Details that hold up</h3>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Reduced motion</span>
          <button
            onClick={() => setOn((v) => !v)}
            className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${
              on ? "bg-lime" : "bg-line"
            }`}
            aria-pressed={on}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 620, damping: 34 }}
              className={`absolute top-1 h-5 w-5 rounded-full bg-ink ${
                on ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-muted">Density</span>
            <span className="font-mono text-xs text-cream">{value}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-line accent-lime outline-none"
            style={{
              background: `linear-gradient(to right, #d8ff3e ${value}%, #1b1b22 ${value}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PerfCard() {
  const [hover, setHover] = useState(false);
  const score = 99;
  const circumference = 2 * Math.PI * 42;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex h-full flex-col justify-between gap-8"
    >
      <div>
        <div className="mb-4 flex items-center gap-2 text-muted">
          <Gauge size={15} />
          <span className="mono-label">Performance</span>
        </div>
        <h3 className="text-xl tracking-[-0.02em]">Fast is a feature</h3>
      </div>

      <div className="flex items-end justify-between">
        <div className="relative h-28 w-28">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#1b1b22" strokeWidth="4" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#d8ff3e"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{
                strokeDashoffset: circumference * (1 - score / 100),
              }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display text-3xl">{score}</span>
          </div>
        </div>
        <AnimatePresence>
          {hover ? (
            <motion.ul
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-1.5 text-right"
            >
              {["LCP 0.9s", "CLS 0.00", "INP 42ms"].map((m) => (
                <li key={m} className="font-mono text-[11px] text-muted">
                  {m}
                </li>
              ))}
            </motion.ul>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="studio" className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-40">
      <div className="mb-14 flex items-center gap-4">
        <span className="mono-label">02 — Capabilities</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <h2 className="display mb-16 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)]">
        <MaskText text="A studio built around" />{" "}
        <span className="italic text-lime">
          <MaskText text="the last 5%" delay={0.12} />
        </span>
      </h2>

      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <Rise className="md:col-span-2 md:row-span-2">
          <SpotlightCard className="h-full p-8 md:p-10">
            <EasingLab />
          </SpotlightCard>
        </Rise>
        <Rise delay={0.08}>
          <SpotlightCard className="h-full p-8" tilt>
            <TokenCard />
          </SpotlightCard>
        </Rise>
        <Rise delay={0.14}>
          <SpotlightCard className="h-full p-8" tilt>
            <ControlsCard />
          </SpotlightCard>
        </Rise>
        <Rise delay={0.2} className="md:col-span-3">
          <SpotlightCard className="h-full p-8">
            <PerfCard />
          </SpotlightCard>
        </Rise>
      </div>
    </section>
  );
}
