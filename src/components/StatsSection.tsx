import StatsCard from './StatsCard'

const StatsSection = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
        <StatsCard number="10M+" label="Total Customers" />
        <StatsCard number="09+" label="Years Of Experience" />
        <StatsCard number="12K" label="Total Destinations" />
        <StatsCard number="5.0" label="Average Rating" />
    </div>
  )
}

export default StatsSection