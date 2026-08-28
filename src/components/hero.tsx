"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import DotField from "./dot-field";
import Magnetic from "./magnetic";

const HEAD_A = ["Interfaces"];
const HEAD_B = ["that", "feel"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);

  // pointer parallax for the ambient orbs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ox = useSpring(mx, { stiffness: 60, damping: 22 });
  const oy = useSpring(my, { stiffness: 60, damping: 22 });

  const orb1X = useTransform(ox, (v) => v * 40);
  const orb1Y = useTransform(oy, (v) => v * 40);
  const orb2X = useTransform(ox, (v) => v * -60);
  const orb2Y = useTransform(oy, (v) => v * -30);

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const line = (words: string[], delay: number) => (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? undefined : { y: "108%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.25, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {words.join(" ")}
      </motion.span>
    </span>
  );

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10"
    >
      {/* ambient field */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-lines" />
        <DotField className="absolute inset-0 h-full w-full opacity-90" />
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute -left-40 top-[8%] h-[38rem] w-[38rem] rounded-full opacity-[0.16] blur-[120px]"
        >
          <div className="h-full w-full rounded-full bg-iris" />
        </motion.div>
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute -right-32 bottom-[2%] h-[32rem] w-[32rem] rounded-full opacity-[0.13] blur-[120px]"
        >
          <div className="h-full w-full rounded-full bg-lime" />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <motion.div
        style={{ y, opacity, scale, filter: reduce ? undefined : blur }}
        className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            <span className="mono-label text-cream/80">
              Two slots open · Q4 2026
            </span>
          </span>
          <span className="mono-label hidden sm:block">
            Design engineering · Manila / Remote
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="display text-[clamp(3rem,11.5vw,10.5rem)]">
          {line(HEAD_A, 0.35)}
          <span className="block overflow-hidden">
            <motion.span
              className="flex flex-wrap items-baseline gap-x-[0.22em]"
              initial={reduce ? undefined : { y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.25, delay: 0.47, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>{HEAD_B.join(" ")}</span>
              <span className="italic text-lime">alive</span>
              <motion.span
                aria-hidden
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block h-[0.16em] w-[0.16em] translate-y-[-0.1em] rounded-full bg-lime"
              />
            </motion.span>
          </span>
        </h1>

        {/* sub + CTA */}
        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12 md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-[15px] leading-relaxed text-muted md:col-span-5"
          >
            We are a small design engineering studio. We build product
            interfaces where motion carries meaning — every transition earns its
            place, every millisecond is deliberate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-3 md:col-span-4"
          >
            <Magnetic strength={0.3}>
              <a
                href="#work"
                data-cursor="View"
                className="group flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[13px] font-medium text-ink transition-colors hover:bg-lime"
              >
                See selected work
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#approach"
                className="rounded-full border border-line px-6 py-3.5 text-[13px] text-cream transition-colors hover:border-cream/40 hover:bg-white/[0.03]"
              >
                How we work
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex items-center gap-3 text-muted md:col-span-3 md:justify-end"
          >
            <motion.span
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={14} />
            </motion.span>
            <span className="mono-label">Scroll to explore</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
