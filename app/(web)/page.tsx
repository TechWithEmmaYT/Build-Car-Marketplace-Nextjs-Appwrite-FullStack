"use client";
import CarListing from "./_components/carlisting-section";
import CTASection from "./_components/cta-section";
import FeatureSection from "./_components/feature-section";
import HeroSection from "./_components/hero-section";

export default function Page() {
  return (
    <div className="w-full">
      <HeroSection />
      <CarListing />
      <CTASection />
    </div>
  );
}
