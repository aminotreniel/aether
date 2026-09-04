"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useContent } from "@/components/content-provider";

export default function Faq() {
  const { faq: ITEMS } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <div className="mb-14 flex items-center gap-4">
        <span className="mono-label">04 — Questions</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid gap-12 md:grid-cols-12">
        <h2 className="display text-[clamp(2rem,5vw,3.4rem)] md:col-span-4">
          The usual <span className="italic text-lime">questions</span>
        </h2>

        <div className="md:col-span-8">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-line first:border-t">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span
                    className={`text-lg transition-colors md:text-xl ${
                      isOpen ? "text-cream" : "text-muted group-hover:text-cream"
                    }`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? "border-lime text-lime" : "border-line text-muted"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-[15px] leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
