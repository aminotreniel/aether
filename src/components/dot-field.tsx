"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas grid of dots that lean toward the pointer and brighten with
 * proximity. Cheap: one rAF loop, no per-dot allocations after setup.
 */
export default function DotField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const GAP = 34;
    const RADIUS = 170;
    let dots: { x: number; y: number; ox: number; oy: number }[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const pointer = { x: -9999, y: -9999 };
    const eased = { x: -9999, y: -9999 };

    const build = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GAP;
          const y = j * GAP;
          dots.push({ x, y, ox: x, oy: y });
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    let frame = 0;
    const render = () => {
      eased.x += (pointer.x - eased.x) * 0.12;
      eased.y += (pointer.y - eased.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.ox - eased.x;
        const dy = d.oy - eased.y;
        const dist = Math.hypot(dx, dy);

        let alpha = 0.085;
        let size = 1;
        let tx = d.ox;
        let ty = d.oy;

        if (dist < RADIUS) {
          const f = 1 - dist / RADIUS;
          const pull = f * f * 16;
          const angle = Math.atan2(dy, dx);
          tx = d.ox - Math.cos(angle) * pull;
          ty = d.oy - Math.sin(angle) * pull;
          alpha = 0.085 + f * 0.66;
          size = 1 + f * 1.5;
        }

        d.x += (tx - d.x) * 0.16;
        d.y += (ty - d.y) * 0.16;

        ctx.beginPath();
        ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
        ctx.fillStyle =
          alpha > 0.35
            ? `rgba(216, 255, 62, ${alpha})`
            : `rgba(242, 240, 234, ${alpha})`;
        ctx.fill();
      }

      frame = requestAnimationFrame(render);
    };

    build();
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      frame = requestAnimationFrame(render);
    } else {
      // static pass
      ctx.clearRect(0, 0, width, height);
      dots.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(242,240,234,0.06)";
        ctx.fill();
      });
    }

    const ro = new ResizeObserver(build);
    ro.observe(canvas.parentElement!);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
