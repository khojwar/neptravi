import React from 'react'

const HowItWorks = () => {
  return (
    <div className='flex gap-4 h-screen'>
        <div className='w-1/2 rounded-3xl overflow-hidden shadow-xl'>
            <img src="narayani beach.jpg" alt="narayani beach" />
        </div>
        <div className='w-1/2 px-4 flex flex-col justify-start items-start'>
            <h2 className='text-3xl font-semibold mb-4'>How It Works</h2>
        </div>
    </div>
  )
}

export default HowItWorks