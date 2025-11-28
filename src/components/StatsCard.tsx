

const StatsCard = ({ number, label }: { number: string | number; label: string }) => {
  return (
    <div>
        <div className='shadow-2xl bg-white text-center py-2 rounded-md md:px-8 md:py-4 md:rounded-2xl text-black w-full'>
            <div className=' md:text-3xl font-semibold'>{number}</div>
            <p className='text-gray-600 text-sm  md:text-lg'>{label}</p>
        </div>
    </div>
  )
}

export default StatsCard