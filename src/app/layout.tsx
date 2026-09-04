import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";
import ContentProvider from "@/components/content-provider";
import { getContent } from "@/data/remote";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aether — Interfaces that feel alive",
  description:
    "Aether is a design engineering studio building interfaces with motion, craft and restraint.",
};

/** Re-read content from Firestore at most once a minute, so console edits show
 *  up without a redeploy. */
export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="grain antialiased">
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <ContentProvider content={content}>
          <Nav />
          {children}
        </ContentProvider>
      </body>
    </html>
  );
}
