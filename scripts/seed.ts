/**
 * Seeds Aether page content and sample waitlist signups into the shared
 * Firestore project.
 *
 *   npm run seed
 *
 * Idempotent: content sections are written at deterministic paths with `set`,
 * so rerunning restores them to a known-good state. Because the demo runs with
 * open write rules, this is the repair tool if a visitor writes junk.
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { defaultContent } from "../src/data/content";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyCxucNZL7FHZO7fS2pzshnB5veACKZaJ1I",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "alldb-a1804.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "alldb-a1804",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "alldb-a1804.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "397138423193",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:397138423193:web:88a338e16f85761112b708",
};

const APP_ID = "aether";
const db = getFirestore(initializeApp(firebaseConfig));

/** Dated so they sort correctly alongside live signups written with serverTimestamp. */
const signups = [
  { id: "seed-1", name: "Dana Whitfield", email: "dana@northwind.example", note: "Logistics dashboard rebuild", joinedAt: new Date("2026-08-28T09:12:00Z") },
  { id: "seed-2", name: "Ravi Chandra", email: "ravi@halcyon.example", note: "Design system from scratch", joinedAt: new Date("2026-08-26T15:40:00Z") },
  { id: "seed-3", name: "Elise Fontaine", email: "elise@fieldnote.example", note: "Motion pass on an existing app", joinedAt: new Date("2026-08-24T11:05:00Z") },
  { id: "seed-4", name: "Marcus Bell", email: "marcus@ember.example", note: "Patient-facing portal", joinedAt: new Date("2026-08-21T08:31:00Z") },
  { id: "seed-5", name: "Yuki Sato", email: "yuki@studio.example", note: "Brand and marketing site", joinedAt: new Date("2026-08-19T17:22:00Z") },
];

async function main() {
  const batch = writeBatch(db);

  batch.set(doc(db, `apps/${APP_ID}`), {
    name: "Aether",
    description: "Design engineering studio landing page. UI demo backed by Firestore.",
    repo: "aminotreniel/aether",
    seededAt: new Date().toISOString(),
    lastSeedAt: serverTimestamp(),
  });

  batch.set(doc(db, `apps/${APP_ID}/content/stats`), { items: defaultContent.stats });
  batch.set(doc(db, `apps/${APP_ID}/content/faq`), { items: defaultContent.faq });
  batch.set(doc(db, `apps/${APP_ID}/content/projects`), { items: defaultContent.projects });
  batch.set(doc(db, `apps/${APP_ID}/content/marquee`), { items: defaultContent.marquee });
  batch.set(doc(db, `apps/${APP_ID}/content/manifesto`), { text: defaultContent.manifesto });

  for (const { id, ...signup } of signups) {
    batch.set(doc(db, `apps/${APP_ID}/signups/${id}`), { ...signup, seeded: true });
  }

  await batch.commit();
  console.log(`Done. 5 content sections and ${signups.length} sample signups into apps/${APP_ID}.`);
}

main().then(() => process.exit(0)).catch((err) => { console.error("Seed failed:", err); process.exit(1); });
