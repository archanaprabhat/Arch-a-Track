import {useState} from 'react'
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function HabitTracker() {
   const [currentDate, setCurrentDate] = useState(new Date());

   const monthYear = currentDate.toLocaleDateString("default", {
    month:"long",
    year:"numeric"
   })


   const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset)
    setCurrentDate(newDate)
   };


    
  return (
    <div className="bg-rose-300 h-screen w-screen flex flex-col items-center p-6 ">
        <h1 className="text-4xl font-bold text-center text-pink-800 mb-4 my-6 ">Arch•a•Track</h1>
        <div className='flex justify-between items-center w-1/2'>
        <button onClick={() => changeMonth(-1)} className='p-2 hover:bg-rose-100 rounded-full transition-colors'>
        <ChevronLeft size={48} color="#590d22" strokeWidth={3} />
        </button>
        <h2 className='italic font-mono text-3xl'>{monthYear}</h2>
        <button onClick={() => changeMonth(1)} className='p-2 hover:bg-rose-100 rounded-full transition-colors'>
        <ChevronRight size={48} color="#590d22" strokeWidth={3} />
        </button>

        </div>
    </div>
  )
}
