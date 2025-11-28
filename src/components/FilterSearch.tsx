import { CalendarDays, ChevronDown, UserRound, Wallet } from 'lucide-react';
import { Button } from './ui/button';


const FilterSearch = () => {
  return (
    <div className="flex justify-between items-center gap-2 px-1 py-1 text-white text-8 bg-gray-600/50 bg-opacity-50 md:gap-4 lg:gap-6 md:text-xl md:max-w-2xl md:mx-auto rounded-4xl md:py-2 md:pl-6 md:pr-2 shadow-sm  border-t-2 border-white mt-8">
        <div className="flex items-center md:gap-2"> <CalendarDays className='hidden md:block' /> Date </div> <ChevronDown />
        <div className="border-r-2 h-9 border-gray-50/50"></div>
        <div className='flex items-center md:gap-2'> <Wallet className='hidden md:block' /> Budget</div> <ChevronDown />
        <div className="border-r-2 h-9 border-gray-50/50"></div>
        <div className='flex items-center md:gap-2'> <UserRound className='hidden md:block' /> Guest</div> <ChevronDown />
        <Button variant={'custom'}>Search</Button>
    </div>
  )
}

export default FilterSearch