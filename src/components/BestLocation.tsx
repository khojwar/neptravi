import React from 'react'

const BestLocation = () => {
  return (
    <div className='max-w-6xl mx-auto my-32 px-4'>
        <p className='text-gray-600'>Best location</p>
        <div className='flex justify-between mt-4 mb-12'>
            <h1 className='text-3xl w-1/2 font-semibold'>Nepali Tourism</h1>
            <p className='text-gray-600 w-1/2'>Extraordinary natural beauty, enjoy the rich culture, and experience the friendlyness of the local people.</p>
        </div>
        <h2 className='text-4xl font-semibold text-center mb-8'>Best Locations to Visit in Nepal</h2>
        <div className='grid grid-cols-3 gap-6'>
            <div className='rounded-2xl overflow-hidden shadow-lg'>

                <img src="/location1.jpg" alt="Kathmandu" className='w-full h-48 object-cover' />
                <div className='p-4'>
                    <h3 className='text-2xl font-semibold mb-2'>Kathmandu</h3>
                    <p className='text-gray-600 text-sm'>The capital city, rich in history and culture.</p>
                </div>
            </div>
            <div className='rounded-2xl overflow-hidden shadow-lg'>
                <img src="/location2.jpg" alt="Pokhara" className='w-full h-48 object-cover' />
                <div className='p-4'>
                    <h3 className='text-2xl font-semibold mb-2'>Pokhara</h3>
                    <p className='text-gray-600 text-sm'>A beautiful city known for its lakes and mountain views.</p>
                </div>
            </div>
            <div className='rounded-2xl overflow-hidden shadow-lg'>
                <img src="/location3.jpg" alt="Chitwan" className='w-full h-48 object-cover' />
                <div className='p-4'>
                    <h3 className='text-2xl font-semibold mb-2'>Chitwan</h3>
                    <p className='text-gray-600 text-sm'>Famous for its national park and wildlife safaris.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BestLocation