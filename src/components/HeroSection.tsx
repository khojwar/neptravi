import FilterSearch from './FilterSearch'
import StatsSection from './StatsSection'

const HeroSection = () => {
  return (
    <div id='about' className='bg-cover bg-center rounded-2xl bg-no-repeat m-2 px-2 bg-[url("/eberhardgross.jpg")] '>
      <div className='flex flex-col'>
          <div className='flex flex-col justify-center items-center text-white gap-4 max-w-4xl mx-auto text-center h-screen '>
              <h1 className='text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight font-medium'>Extraordinary natural and cultural charm</h1>
              <p className='text-base sm:text-lg lg:text-md'>Exploring Nepal is an unforgatable adventure.</p>
              <FilterSearch />
          </div>
          
          <div className='relative w-full top-10 md:top-16 md:mx-auto md:max-w-3xl lg:max-w-7xl lg:top-10'><StatsSection /></div>
        </div>
    </div>
  )
}

export default HeroSection