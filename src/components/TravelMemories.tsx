import TravelMemoriesCard from './TravelMemoriesCard'
import { Button } from './ui/button'

const TravelMemories = () => {
  return (
    <div className='flex flex-col gap-8 py-8 md:py-16 md:max-w-3xl lg:max-w-7xl mx-auto px-2'>
        <div className='text-center'>
            <p className="mb-2 text-gray-600/50">Our blog</p>
            <h1 className='text-3xl font-semibold'>Our travel memories</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TravelMemoriesCard imageLink="/patan.jpg" />
            <TravelMemoriesCard imageLink="/boudhanath.jpg" />
        </div>
        <div className="flex justify-center">
            <Button >View more</Button>
        </div>
    </div>
  )
}

export default TravelMemories