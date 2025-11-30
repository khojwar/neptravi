import { Star } from "lucide-react";
import Image from "next/image";

interface TouristDestinationCardProps {
  photo: string;
  days: number;
  rating: number;
  from: string;
  to: string;
  packages: string;
}

const TouristDestinationCard = ({photo, days, rating, from, to, packages}: TouristDestinationCardProps) => {
  return (
    <div>
      <div className="relative h-[70vh] rounded-xl overflow-hidden shadow-xl mt-8">
        <Image
          src={photo}
          alt="boudhanath stupa"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 left-2 right-2 z-50">
          <div className="flex flex-col justify-between min-h-full h-[65vh] text-white">
            <div className="flex justify-between ">
              <div className="bg-gray-600/50 px-4 py-1 rounded-2xl">{days} days</div>
              <div className="bg-gray-600/50 px-4 py-1 rounded-2xl flex gap-2"> <span className="text-yellow-400"><Star /></span> {rating}</div>
            </div>
            <div className="flex flex-col gap-2 bg-gray-600/90 bg-opacity-50 text-white p-2 rounded-lg">
              <div> {from.toUpperCase()} - {to.toUpperCase()}</div>
              <div className="text-2xl">{packages}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDestinationCard;
