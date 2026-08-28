import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import Nav from "@/components/nav";

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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="grain antialiased">
        <SmoothScroll />
        <Cursor />
        <ScrollProgress />
        <Nav />
        {children}
      </body>
    </html>
  );
}
