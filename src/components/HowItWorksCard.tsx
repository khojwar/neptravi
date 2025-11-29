import React from 'react'

interface HowItWorksCardProps {
    key: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    isActive: boolean;
}

const HowItWorksCard = ({key, icon, title, description, isActive}: HowItWorksCardProps) => {
  return (
    <div key={key} className={`flex gap-4 mt-8 p-4 rounded-2xl w-full ${isActive ? "shadow-[0_3px_10px_rgb(0,0,0,0.2)]" : ""} `} >
        <div>{icon}</div>
        <div className="flex flex-col ">
        <h2 className="font-semibold pb-2">{title}</h2>
        <p className='text-gray-600/50 text-sm'>{description}</p>
        </div>
    </div>
  )
}

export default HowItWorksCard