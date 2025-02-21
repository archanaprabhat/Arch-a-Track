import {useState} from 'react'
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
export default function HabitTracker() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const[newHabit, setNewHabit] = useState("")

   const monthYear = currentDate.toLocaleDateString("default", {
    month:"long",
    year:"numeric"
   })


   const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset)
    setCurrentDate(newDate)
   };

   const addHabit = () => {
    if(newHabit.trim()){
      console.log("Added new Habit:", newHabit);
      setNewHabit("")
    }
   }


    
  return (
    <div className="bg-rose-300 h-screen w-screen flex flex-col items-center p-6 ">
        <h1 className="text-4xl font-bold text-center text-pink-800 mb-4 my-6 ">Arch•a•Track</h1>
        <div className='flex justify-between items-center w-1/2 mb-6'>
        <button onClick={() => changeMonth(-1)} className='p-2 hover:bg-rose-100 rounded-full transition-colors'>
        <ChevronLeft size={48} color="#590d22" strokeWidth={3} />
        </button>
        <h2 className='italic font-mono text-3xl'>{monthYear}</h2>
        <button onClick={() => changeMonth(1)} className='p-2 hover:bg-rose-100 rounded-full transition-colors'>
        <ChevronRight size={48} color="#590d22" strokeWidth={3} />
        </button>
        </div>
        <div className='flex gap-4 max-w-3xl mb-8 w-screen '>
          <input type="text" placeholder='Add a new habit...' value={newHabit} onChange={(e) => setNewHabit(e.target.value)} className='p-6 rounded-lg border text-2xl flex-1 focus:outline-none shadow-lg focus:border-pink-400 transition ' />
          <button onClick={addHabit}><Plus size={60} color="#590d22" strokeWidth={3} /></button>
        </div>
    </div>
  )
}
