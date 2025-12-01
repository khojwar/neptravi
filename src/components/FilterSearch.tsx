import { CalendarDays, ChevronDown, UserRound, Wallet } from 'lucide-react';
import { Button } from './ui/button';


const FilterSearch = ({textInfo}: {textInfo?: string}) => {
  return (
    <div className={`flex justify-between items-center gap-2 pl-2 pr-1 py-1 text-white text-8 bg-gray-600/50 bg-opacity-50 shadow-sm border-t-2 border-white mt-8  ${textInfo ? textInfo : ' md:gap-4 lg:gap-6 md:text-xl md:max-w-2xl md:mx-auto rounded-4xl md:py-2 md:pl-6 md:pr-2'}`}>
        <div className="flex items-center md:gap-2"> <CalendarDays /> <div className='hidden md:block' >Date</div></div> <ChevronDown />
        <div className="border-r-2 h-9 border-gray-50/50"></div>
        <div className='flex items-center md:gap-2'> <Wallet /> <div className='hidden md:block' >Budget</div></div> <ChevronDown />
        <div className="border-r-2 h-9 border-gray-50/50"></div>
        <div className='flex items-center md:gap-2'> <UserRound /> <div className='hidden md:block' >Guest</div></div> <ChevronDown />
        <Button variant={'custom'}>Search</Button>
    </div>
  )
}

export default FilterSearch