import Navbar from './Navbar'
import FilterSearch from './FilterSearch'
import StatsSection from './StatsSection'

const HeroSection = () => {
  return (
    <div className='bg-cover bg-center rounded-2xl bg-no-repeat py-6 px-4 sm:px-6 lg:px-12 m-2 min-h-[70vh] bg-[url("/eberhardgross.jpg")]'>
      <div className='flex flex-col'>
          <Navbar />
          <div className='flex justify-center items-center min-h-[50vh] flex-col text-white gap-4 max-w-4xl mx-auto text-center font-semibold my-6 px-4'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight'>Extraordinary natural and cultural charm</h1>
              <p className='text-base sm:text-lg lg:text-xl'>Exploring Nepal is an unforgatable adventure.</p>
              <FilterSearch />
          </div>

          <div className='relative top-4 w-full px-4 sm:px-8 md:px-16 md:top-20 lg:px-32 lg:top-16'><StatsSection /></div>
        </div>
    </div>
  )
}

export default HeroSection