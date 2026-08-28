"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "motion/react";
import Magnetic from "./magnetic";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "Studio", href: "#studio" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 40));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
            solid ? "py-4" : "py-7"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-lime transition-transform duration-500 group-hover:scale-125" />
              <span className="absolute inset-[6px] rounded-full bg-ink" />
            </span>
            <span className="text-[15px] font-medium tracking-[-0.01em]">
              Aether
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-[13px] text-muted transition-colors hover:text-cream"
              >
                {link.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25} className="hidden md:block">
              <a
                href="#contact"
                data-cursor="Say hi"
                className="rounded-full bg-cream px-5 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-lime"
              >
                Start a project
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line md:hidden"
            >
              <span
                className={`h-px w-4 bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        <div
          className={`h-px w-full bg-gradient-to-r from-transparent via-line to-transparent transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 -z-10 backdrop-blur-xl transition-opacity duration-500 ${
            solid ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "rgba(5,5,6,0.72)" }}
        />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-line bg-surface/95 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-2xl last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-5 rounded-full bg-lime py-3 text-center text-sm font-medium text-ink"
              >
                Start a project
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
