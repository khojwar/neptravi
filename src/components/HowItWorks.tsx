import HowItWorksCard from "./HowItWorksCard"
import { MapPin, Ticket, CreditCard, Globe } from "lucide-react";
import Image from "next/image";
import FilterSearch from "./FilterSearch";

const howitworkdata = [
  {
    id: 1,
    icon: MapPin,
    title: "Find your destination",
    description: "Choose from a wide range of exciting destinations tailored to your interests."
  },
  {
    id: 2,
    icon: Ticket,
    title: "Book your ticket",
    description: "Secure your journey by booking tickets easily through our platform."
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Make payment",
    description: "Complete your booking with our fast and secure payment options."
  },
  {
    id: 4,
    icon: Globe,
    title: "Explore the destination",
    description: "Immerse yourself in the culture, nature, and beauty of your chosen place."
  }
];

const HowItWorks = () => {
  return (
    <div className='flex flex-col mx-2 md:flex-row gap-8 md:h-[44rem] md:max-w-3xl lg:max-w-7xl md:mx-auto my-16 md:my-4 lg:mt-32 lg:mb-16 '>
      <div className='w-full md:w-3/5 lg:w-1/2 rounded-xl overflow-hidden shadow-xl relative h-[32rem] md:h-[44rem] '>
          <Image
            src={'/narayani%20beach.jpg'}
            alt="narayani beach"
            fill
            className='object-cover '
            priority
          />
          <div className="absolute bottom-8 left-4 right-4  md:left-2 md:right-2 lg:bottom-8 lg:left-8 lg:right-8 z-50">
            <div className="max-w-full">
              <FilterSearch textInfo="text-sm rounded-3xl pl-4" />
            </div>
            <p className="text-white pt-4 text-sm">Embark on the journey to find your dream destination. where adventure and relaxtation await, creating unforgattable memories along the way. </p>
          </div>
        </div>
        <div className='md:w-2/5 lg:w-1/2 lg:px-4 flex flex-col justify-start items-start lg:gap-6'>
            <p className='text-gray-600/50'>How It Works</p>
            <h1 className="text-3xl font-semibold">One click for you</h1>
            {howitworkdata.map((item) => (
                <HowItWorksCard 
                    key={item.id}
                    icon={<item.icon size={32}/>}
                    title={item.title}
                    description={item.description}
                    isActive={item.id === 1}
                />
            ))}
        </div>
    </div>
  )
}

export default HowItWorks