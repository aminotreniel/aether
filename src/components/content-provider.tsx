"use client";

import { createContext, useContext, useEffect } from "react";
import type { SiteContent } from "@/data/content";
import { initAnalytics } from "@/lib/analytics";

const ContentContext = createContext<SiteContent | null>(null);

/**
 * Page content is fetched once per request in the root layout (a server
 * component) and handed to the tree here, so each section component reads from
 * one Firestore round-trip instead of querying on its own.
 */
export default function ContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  useEffect(() => {
    void initAnalytics();
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside <ContentProvider>");
  return ctx;
}
