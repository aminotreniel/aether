import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Manifesto from "@/components/manifesto";
import Features from "@/components/features";
import Showcase from "@/components/showcase";
import Stats from "@/components/stats";
import Faq from "@/components/faq";
import CtaFooter from "@/components/cta-footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Marquee />
      <Manifesto />
      <Features />
      <Showcase />
      <Stats />
      <Faq />
      <CtaFooter />
    </main>
  );
}
