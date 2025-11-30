import BestLocation from "@/components/BestLocation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonial from "@/components/Testimonial";
import TouristDestination from "@/components/TouristDestination";
import TravelMemories from "@/components/TravelMemories";


export default function Home() {
  return (
    <>
      <HeroSection />
      <BestLocation />
      <HowItWorks />
      <TouristDestination />
      <Testimonial />
      <TravelMemories />
      <Footer />
    </>
  );
}
