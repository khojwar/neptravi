import { MoveLeft, MoveRight } from 'lucide-react'

const Testimonial = () => {
  return (
    <div className='flex gap-4 md:max-w-3xl lg:max-w-7xl md:mx-auto mt-32 h-screen '>
        <div>
            <div></div>
            <div className='flex gap-2'>
                <MoveLeft /> <MoveRight />
            </div>
        </div>
        <div>
            Planning my trip became incredibly easy with this platform. The AI-created itinerary was detailed, accurate, and tailored to my interests. I loved how it suggested places to visit, weather updates, and food recommendations all in one place. It truly made my travel experience smoother and more enjoyable.
        </div>
    </div>
  )
}

export default Testimonial