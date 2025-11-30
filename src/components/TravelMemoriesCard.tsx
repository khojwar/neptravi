import Image from "next/image"

const TravelMemoriesCard = () => {
  return (
    <div>
      <div className='flex flex-col gap-4'>
          <div className="relative w-full h-80 rounded-md overflow-hidden">
            <Image
              src={'/boudhanath.jpg'}
              alt={'Boudhanath Stupa'}
              fill
              className="object-cover"
              priority
            />
          </div>
            <p className="text-gray-600/50">Dec 7, 2025</p>
            <h2 className='font-semibold text-2xl'>Exploring the Mountains</h2>
            <p className="text-gray-600/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, suscipit.</p>
        </div>
    </div>
  )
}

export default TravelMemoriesCard