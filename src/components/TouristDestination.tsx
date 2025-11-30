import TouristDestinationCard from "./TouristDestinationCard"
import { Button } from "./ui/button"

const TouristDestinationData = [
    {
        photo: "/muktinath.jpg",
        days: 7,
        rating: 4.9,
        from: "5 December",
        to: "10 December",
        package: "Pokhara Tour Package $285"
    },
    {
        photo: "/boudhanath.jpg",
        days: 5,
        rating: 4.8,
        from: "12 December",
        to: "17 December",
        package: "Kathmandu Tour $320"
    },
    {
        photo: "/patan.jpg",
        days: 6,
        rating: 4.7,
        from: "20 December",
        to: "26 December",
        package: "Patan Cultural Experience $290"
    }
]

const TouristDestination = () => {
  return (
    <div className='md:max-w-3xl lg:max-w-7xl mx-auto h-screen pt-32 flex flex-col gap-8'>
        <div>
            <p className="mb-2 text-gray-600/50">Tour packages</p>
            <div className="flex gap-4">
                <h1 className="text-5xl font-semibold w-1/2">Our tourist destination</h1>
                <p className="w-1/2 text-lg text-gray-600/50">Our tourist destination offer an unrivaled blend of natural beauty and cultural richness </p>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {TouristDestinationData.map((item, index) => (
                <TouristDestinationCard 
                    key={index}
                    photo={item.photo}
                    days={item.days}
                    rating={item.rating}
                    from={item.from}
                    to={item.to}
                    packages={item.package}
                />
            ))}
        </div>

        <div className="flex justify-center">
            <Button >View more</Button>
        </div>
    </div>
  )
}

export default TouristDestination