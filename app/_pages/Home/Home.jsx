import React from "react";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import FeaturedSection from "./components/FeaturedSection";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import PublicPagesLayout from "@/components/common/PublicPagesLayout";

const Home = () => {
  return (
    <PublicPagesLayout>
      <main className="min-h-screen">
        <HeroSection />
        <StatsSection />
        <FeaturedSection />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
    </PublicPagesLayout>
  );
};

export default Home;
