import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit } from "firebase/firestore";
import { db, appPath } from "@/lib/firebase";
import { defaultContent, type SiteContent } from "@/data/content";

/**
 * Content reads fall back to the committed defaults, section by section.
 *
 * A partial failure degrades gracefully: if the `stats` document is missing but
 * `faq` is present, the page renders live FAQs and default stats rather than
 * nothing. An empty collection, a cold network, or someone having emptied the
 * shared database must never produce a blank page in front of a client.
 */
export async function getContent(): Promise<SiteContent> {
  try {
    const snap = await getDocs(collection(db, appPath("content")));
    if (snap.empty) return defaultContent;

    const sections = new Map(snap.docs.map((d) => [d.id, d.data() as Record<string, unknown>]));
    const list = <T,>(id: string, fallback: T[]): T[] => {
      const items = sections.get(id)?.items;
      return Array.isArray(items) && items.length ? (items as T[]) : fallback;
    };

    return {
      stats: list("stats", defaultContent.stats),
      faq: list("faq", defaultContent.faq),
      projects: list("projects", defaultContent.projects),
      marquee: list("marquee", defaultContent.marquee),
      manifesto:
        (typeof sections.get("manifesto")?.text === "string" && (sections.get("manifesto")!.text as string)) ||
        defaultContent.manifesto,
    };
  } catch (err) {
    console.warn("[aether] content read failed, serving committed defaults:", err);
    return defaultContent;
  }
}

export type Signup = { name: string; email: string; note?: string; joinedAt?: unknown };

/** Recent waitlist signups, shown as social proof. Seeded so it is never empty. */
export async function getSignups(max = 6): Promise<Signup[]> {
  try {
    const snap = await getDocs(
      query(collection(db, appPath("signups")), orderBy("joinedAt", "desc"), limit(max))
    );
    return snap.docs.map((d) => d.data() as Signup);
  } catch (err) {
    console.warn("[aether] signup read failed:", err);
    return [];
  }
}

export async function joinWaitlist(input: { name: string; email: string; note?: string }): Promise<boolean> {
  try {
    await addDoc(collection(db, appPath("signups")), { ...input, joinedAt: serverTimestamp() });
    return true;
  } catch (err) {
    console.warn("[aether] signup write failed:", err);
    return false;
  }
}
