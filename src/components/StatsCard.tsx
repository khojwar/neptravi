import React from 'react'

const StatsCard = ({ number, label }: { number: string | number; label: string }) => {
  return (
    <div>
        <div className='shadow-2xl bg-white text-center px-8 py-4 rounded-2xl text-black w-full'>
            <div className='text-3xl font-semibold'>{number}</div>
            <p className='text-gray-600 text-sm'>{label}</p>
        </div>
    </div>
  )
}

export default StatsCard