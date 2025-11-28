import BestLocation from "@/components/BestLocation";
import HeroSection from "@/components/HeroSection";


export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="lg:mx-48 md:my-32 mx-6 my-12">
          <BestLocation />
      </div>
    </>
  );
}
