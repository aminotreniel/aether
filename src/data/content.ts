/**
 * Every piece of editable page copy, in one place.
 *
 * These values are the committed defaults. At runtime the same shapes are read
 * from Firestore (`apps/aether/content/*`) so the studio can reword a stat or
 * add an FAQ entry from the Firebase console without a redeploy — and if that
 * read fails or the collection is empty, these are what render.
 */

export type Stat = { value: number; label: string };
export type FaqItem = { q: string; a: string };
export type Project = {
  id: string;
  name: string;
  kind: string;
  year: string;
  accent: string;
  blurb: string;
};

export type SiteContent = {
  stats: Stat[];
  faq: FaqItem[];
  projects: Project[];
  marquee: string[];
  manifesto: string;
};

export const defaultContent: SiteContent = {
  stats: [
    { value: 47, label: "Products shipped" },
    { value: 12, label: "Years of practice" },
    { value: 99, label: "Median Lighthouse" },
    { value: 4, label: "People, on purpose" },
  ],
  faq: [
    {
      q: "How do you actually work?",
      a: "One team, one thread. We embed with your product people for a fixed window — usually six to ten weeks — and ship real interfaces, not slide decks. You get the Figma file and the front-end code.",
    },
    {
      q: "Design or engineering?",
      a: "Both, by the same hands. The person choosing the easing curve is the person writing it. That is the whole reason the studio exists.",
    },
    {
      q: "What does an engagement cost?",
      a: "Projects start at a fixed fee for a defined scope. We will give you a number in the first call, not after three rounds of discovery.",
    },
    {
      q: "Can you work with our design system?",
      a: "Yes — and we will leave it in better shape than we found it. If you don't have one, we can build the first version alongside the product work.",
    },
  ],
  projects: [
    { id: "01", name: "Halcyon", kind: "Fintech dashboard", year: "2026", accent: "#d8ff3e", blurb: "A trading console that stays calm when the market doesn't." },
    { id: "02", name: "Fieldnote", kind: "Research tool", year: "2025", accent: "#7b5cff", blurb: "Notes, transcripts and tags in one continuous canvas." },
    { id: "03", name: "Ember", kind: "Health platform", year: "2025", accent: "#ff6b3d", blurb: "Clinical data made legible for the people who aren't clinicians." },
    { id: "04", name: "Northwind", kind: "Logistics OS", year: "2024", accent: "#5ad1c4", blurb: "Fleet telemetry at a glance, down to the pallet." },
  ],
  marquee: [
    "Product design",
    "Design systems",
    "Motion",
    "Prototyping",
    "Front-end",
    "Brand",
    "Accessibility",
    "Design engineering",
  ],
  manifesto:
    "Most software is functional and forgettable. We are after the other thing — the moment a product answers you so smoothly that you stop noticing the interface at all. That takes taste, restraint, and an unreasonable amount of attention to the last five percent.",
};
