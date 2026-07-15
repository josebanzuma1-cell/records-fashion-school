import Hero from "@/components/hero/Hero";
import Intro from "@/components/home/Intro";
import OfferSection from "@/components/offer/OfferSection";
import MagazineSection from "@/components/magazine/MagazineSection";
import Marquee from "@/components/marquee/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <OfferSection />
      <MagazineSection />
      <Marquee />
    </>
  );
}
