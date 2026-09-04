"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/content-provider";

type Project = {
  id: string;
  name: string;
  kind: string;
  year: string;
  accent: string;
  blurb: string;
};

/** Abstract CSS-only interface mock — no images, all layout. */
function Mock({ accent }: { accent: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink">
      <div
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-[70px]"
        style={{ background: accent }}
      />
      <div className="flex h-9 items-center gap-1.5 border-b border-white/[0.06] px-4">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
      </div>
      <div className="grid h-[calc(100%-2.25rem)] grid-cols-[76px_1fr]">
        <div className="space-y-2 border-r border-white/[0.06] p-3">
          {[70, 45, 58, 38, 52].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: `${w}%`,
                background: i === 1 ? accent : "rgba(255,255,255,0.10)",
              }}
            />
          ))}
        </div>
        <div className="space-y-3 p-4">
          <div className="flex gap-2">
            <div className="h-14 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="mb-2 h-1 w-8 rounded-full bg-white/15" />
              <div
                className="h-3 w-12 rounded-sm"
                style={{ background: accent, opacity: 0.85 }}
              />
            </div>
            <div className="h-14 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="mb-2 h-1 w-10 rounded-full bg-white/15" />
              <div className="h-3 w-9 rounded-sm bg-white/25" />
            </div>
            <div className="h-14 flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="mb-2 h-1 w-6 rounded-full bg-white/15" />
              <div className="h-3 w-10 rounded-sm bg-white/25" />
            </div>
          </div>
          <div className="flex h-24 items-end gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            {[38, 62, 45, 80, 55, 92, 48, 70, 60, 86, 41, 74].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex-1 rounded-sm"
                style={{
                  background: i % 4 === 3 ? accent : "rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>
          <div className="space-y-2">
            {[100, 82, 64].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-white/[0.08]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ project }: { project: Project }) {
  return (
    <a
      href="#work"
      data-cursor="Open"
      className="group relative flex h-[62vh] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-surface/70 p-6 md:h-[68vh] md:w-[46vw] md:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="mono-label">{project.id} — {project.kind}</span>
          <h3 className="display mt-2 text-4xl md:text-5xl">{project.name}</h3>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-transparent group-hover:bg-cream group-hover:text-ink">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="my-6 h-full min-h-0 flex-1">
        <div className="h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]">
          <Mock accent={project.accent} />
        </div>
      </div>

      <div className="flex items-end justify-between gap-6 border-t border-line pt-5">
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          {project.blurb}
        </p>
        <span className="mono-label shrink-0">{project.year}</span>
      </div>
    </a>
  );
}

export default function Showcase() {
  const { projects: PROJECTS } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section id="work" ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-[1400px] items-end justify-between gap-6 px-6 md:px-10">
          <div>
            <span className="mono-label">03 — Selected work</span>
            <h2 className="display mt-3 text-[clamp(2rem,5vw,3.6rem)]">
              Things we shipped
            </h2>
          </div>
          <span className="mono-label hidden md:block">Scroll sideways →</span>
        </div>

        <motion.div style={{ x }} className="flex gap-5 pl-6 md:gap-7 md:pl-10">
          {PROJECTS.map((p) => (
            <Card key={p.id} project={p} />
          ))}
          <div className="flex h-[62vh] w-[62vw] shrink-0 items-center justify-center rounded-[28px] border border-dashed border-line md:h-[68vh] md:w-[34vw]">
            <div className="text-center">
              <p className="display text-3xl">Your project</p>
              <p className="mono-label mt-3">Two slots open · Q4</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
