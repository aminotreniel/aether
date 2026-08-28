"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 1200, damping: 50 });
  const dotY = useSpring(y, { stiffness: 1200, damping: 50 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("no-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement).closest?.(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      setHovering(Boolean(el));
      setLabel(el?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("no-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-cream/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 84 : hovering ? 52 : 30,
          height: label ? 84 : hovering ? 52 : 30,
          opacity: hovering ? 1 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {label ? (
          <span className="text-[9px] uppercase tracking-[0.18em] text-cream">
            {label}
          </span>
        ) : null}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-lime mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
}
