import { MoveLeft, MoveRight } from 'lucide-react'
import { AvatarDemo } from './Avatar'

const Testimonial = () => {
  return (
    <div id='testimonial' className=' md:max-w-3xl lg:max-w-7xl mx-auto px-2 md:px-0 py-8 md:py-16 flex flex-col  md:flex-row gap-8'>
        <div className='flex flex-col justify-between items-start gap-8 md:w-1/3'>
            <div className='flex gap-4 md:gap-2'>
                <AvatarDemo />
                <div className='flex flex-col justify-center gap-2'>
                    <p className='font-semibold'>Sarah Johnson</p>
                    <p className='text-gray-500 text-sm'>Travel Enthusiast</p>
                </div>
            </div>
            <div className='gap-2 hidden md:flex'>
                <MoveLeft className='text-gray-600/50' /> <MoveRight />
            </div>
        </div>
        <div className='text-sm md:text-lg md:w-2/3'>
            Planning my trip became incredibly easy with this platform. The AI-created itinerary was detailed, accurate, and tailored to my interests. I loved how it suggested places to visit, weather updates, and food recommendations all in one place. It truly made my travel experience smoother and more enjoyable.
        </div>
        <div className='flex gap-2 md:hidden'>
            <MoveLeft className='text-gray-600/50' /> <MoveRight />
        </div>
    </div>
  )
}

export default Testimonial