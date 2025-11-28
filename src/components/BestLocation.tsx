

const BestLocation = () => {
  return (
    <div>
        <p className='text-gray-600 text-xl'>Best location</p>
        <div className='flex justify-between mt-4 mb-12'>
            <h1 className='text-4xl md:w-1/3 lg:w-2/5 font-semibold '>Nepali tourism</h1>
            <p className='text-gray-600 md:w-2/3 md:pl-4 lg:w-3/5 text-xl'>Extraordinary natural beauty, enjoy the rich culture, and experience the friendlyness of the local people.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Left Image */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl">
                <img src="/kathmandu.jpg" className="w-full h-80 md:h-96 object-cover " />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm opacity-80">Lalitpur, Nepal</p>
                    <h2 className="text-2xl font-semibold">Paten Durbar Square</h2>
                </div>
            </div>

            {/* Right Top Small Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src="/muktinath.jpg" className="w-full h-80 md:h-96 object-cover" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm opacity-80">Muktinath, Nepal</p>
                    <h2 className="text-xl font-semibold">Muktinath Temple</h2>
                </div>
            </div>

            {/* Left Bottom Small Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <img src="/pokhara.jpg" className="w-full h-80 md:h-96 object-cover" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm opacity-80">Pokhara, Nepal</p>
                    <h2 className="text-xl font-semibold">Phewa Lake</h2>
                </div>
            </div>

            {/* Large Right Image */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl">
                <img src="/rhino.jpg" className="w-full h-80 md:h-96 object-cover" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                    <p className="text-sm opacity-80">Chitwan, Nepal</p>
                    <h2 className="text-2xl font-semibold">Chitwan National Park</h2>
                </div>
            </div>

        </div>




    </div>
  )
}

export default BestLocation