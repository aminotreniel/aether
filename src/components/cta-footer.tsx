"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./magnetic";
import { MaskText } from "./reveal";
import Waitlist from "./waitlist";

function ManilaClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono tabular-nums">{time}</span>;
}

export default function CtaFooter() {
  const reduce = useReducedMotion();

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute inset-x-0 -bottom-40 h-[30rem] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(216,255,62,0.10),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-6 pt-28 md:px-10 md:pt-40">
        <div className="mb-16 flex items-center gap-4">
          <span className="mono-label">05 — Contact</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <h2 className="display max-w-4xl text-[clamp(2.6rem,9vw,8rem)]">
          <MaskText text="Let's build something" />{" "}
          <span className="italic text-lime">
            <MaskText text="worth using" delay={0.1} />
          </span>
        </h2>

        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.32}>
            <a
              href="mailto:hello@aether.studio"
              data-cursor="Email"
              className="group flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-sm font-medium text-ink"
            >
              hello@aether.studio
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </Magnetic>
          <Magnetic strength={0.32}>
            <a
              href="#top"
              className="rounded-full border border-line px-8 py-4 text-sm transition-colors hover:border-cream/40 hover:bg-white/[0.03]"
            >
              Back to top
            </a>
          </Magnetic>
        </div>

        <Waitlist />

        {/* giant wordmark */}
        <div className="relative mt-24 overflow-hidden">
          <motion.div
            initial={reduce ? undefined : { y: "26%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="display select-none text-center text-[clamp(4rem,22vw,17rem)] leading-[0.8] text-cream/[0.07]"
          >
            AETHER
          </motion.div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <span className="mono-label">© 2026 Aether Studio</span>
          <span className="mono-label flex items-center gap-2">
            Manila <ManilaClock /> PHT
          </span>
          <div className="flex gap-6">
            {["Twitter", "Dribbble", "GitHub", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#contact"
                className="mono-label transition-colors hover:text-cream"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
