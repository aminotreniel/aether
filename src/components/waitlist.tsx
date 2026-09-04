"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { getSignups, joinWaitlist, type Signup } from "@/data/remote";

/**
 * Working waitlist form. Writes go to `apps/aether/signups`, which is seeded
 * with sample entries so the "recently joined" list is never empty in front of
 * a client, and is kept separate from the seeded page content so a junk signup
 * cannot affect anything else on the page.
 */
export default function Waitlist() {
  const [recent, setRecent] = useState<Signup[]>([]);
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    void getSignups(5).then(setRecent);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@")) return;
    setState("sending");
    const ok = await joinWaitlist(form);
    if (!ok) {
      setState("error");
      return;
    }
    setState("done");
    setRecent((current) => [{ ...form }, ...current].slice(0, 5));
    setForm({ name: "", email: "", note: "" });
  }

  const field =
    "w-full rounded-full border border-line bg-transparent px-6 py-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-cream/40";

  return (
    <div className="mt-20 grid gap-10 border-t border-line pt-14 md:grid-cols-12">
      <div className="md:col-span-5">
        <span className="mono-label">Start a project</span>
        <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
          Tell us what you are building. We reply to everything, usually within a day.
        </p>

        {recent.length > 0 && (
          <div className="mt-8">
            <span className="mono-label">Recently joined</span>
            <ul className="mt-4 space-y-2">
              {recent.map((s, i) => (
                <li key={`${s.email}-${i}`} className="text-[13px] text-muted">
                  <span className="text-cream">{s.name}</span>
                  {s.note ? ` — ${s.note}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="grid gap-3 md:col-span-7">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            className={field}
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
          <input
            className={field}
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
        <input
          className={field}
          placeholder="What are you working on?"
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
        />

        <div className="mt-1 flex items-center gap-4">
          <button
            type="submit"
            disabled={state === "sending" || state === "done"}
            className="group flex items-center gap-3 rounded-full bg-lime px-8 py-4 text-sm font-medium text-ink transition-opacity disabled:opacity-60"
          >
            {state === "done" ? (
              <>
                Thanks — we&rsquo;ll be in touch <Check size={16} />
              </>
            ) : (
              <>
                {state === "sending" ? "Sending…" : "Send it over"}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </>
            )}
          </button>
          {state === "error" && (
            <span className="text-[13px] text-muted">
              Could not save that just now — try again in a moment.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
