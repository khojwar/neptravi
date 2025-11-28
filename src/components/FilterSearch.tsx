import { CalendarDays, ChevronDown, UserRound, Wallet } from 'lucide-react';
import { Button } from './ui/button';


const FilterSearch = () => {
  return (
    <div className="flex justify-between items-center gap-2 text-white bg-gray-600/50 bg-opacity-50 md:max-w-2xl md:mx-auto rounded-4xl py-2 pl-6 pr-2 shadow-sm  border-t-2 border-white mt-8">
        <div className="flex items-center gap-2"> <CalendarDays /> Date </div> <ChevronDown />
        <div className="border-r-2 h-9 border-gray-50/50"></div>
        <div className='flex items-center gap-2'> <Wallet /> Budget</div> <ChevronDown />
        <div className="border-r-2 h-9 border-gray-50/50"></div>
        <div className='flex items-center gap-2'> <UserRound /> Guest</div> <ChevronDown />
        <Button variant={'custom'}>Search</Button>
    </div>
  )
}

export default FilterSearch