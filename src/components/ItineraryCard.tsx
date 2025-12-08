
interface iteneraryProps {
    days: String
    date?: String
    temp?: number
    feels_like?: number
    description?: String
    morning: String 
    afternoon: String 
    evening: String 
    name?: String 
    address?: String 
    price_per_night_usd?: number 
    contact?: String
}

const ItineraryCard = ({ days, date, temp, feels_like, description, morning, afternoon, evening, name, address, price_per_night_usd, contact}: iteneraryProps) => {
  return (
        <div className="bg-white mt-4 grid grid-cols-1 md:grid-cols-6 md:gap-4 rounded-lg">
        {/* inner col 1st */}
        <div className="bg-gray-100 col-span-1 p-2 md:rounded-lg">
            <h1 className="font-semibold text-lg lg:text-2xl">Day {days}</h1>
            <p>{date}</p>
        </div>

        {/* inner col 2nd */}
        <div className=" col-span-5">
            <div className="bg-gray-100 p-2 md:rounded-lg flex flex-col gap-4">
                {temp &&  <p className="text-red-600 font-bold">Temp: {temp}°C (Feels like: {feels_like}°C) - {description}</p>}
                <p> <span className="font-bold">Morning:</span> {morning}</p>
                <p> <span className="font-bold">Afternoon:</span> {afternoon}</p>
                <p> <span className="font-bold">Evening:</span> {evening}</p>
                {name && <p> <span className="font-bold">Hotel:</span> {name} ({address}) - ${price_per_night_usd}/night - {contact}</p>}
            </div>
        </div>
    </div>
  )
}

export default ItineraryCard