import {useState} from 'react'
import { ChevronLeft, ChevronRight, Plus, Check , X, Trash2 } from "lucide-react";
export default function HabitTracker() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const[newHabit, setNewHabit] = useState("");
   const[habits, setHabits] = useState([]);

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
      setHabits([...habits, {
        id:Date.now(),
        name:newHabit,
        checked: Array(31).fill(false)
      }])
      setNewHabit("")
    }
   }
   const toggleDay = (habitIndex,dayIndex) => {
    const newHabits = [...habits];
    newHabits[habitIndex].checked[dayIndex] = !newHabits[habitIndex].checked[dayIndex];
    setHabits(newHabits);
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
        <div className='flex gap-4 max-w-3xl mb-16 w-screen '>
          <input type="text" placeholder='Add a new habit...' value={newHabit} onChange={(e) => setNewHabit(e.target.value)} className='p-6 rounded-lg border text-2xl flex-1 focus:outline-none shadow-lg focus:border-pink-400 transition ' />
          <button onClick={addHabit}><Plus size={60} color="#590d22" strokeWidth={3} /></button>
        </div>
        <div className='overflow-x-auto'>
          <table  >
            <thead>
              <tr>
                <th className="border  p-4 text-center font-bold text-lg ">Habits</th>
              {Array.from({length:31}, (_, i) =>(
                 <th key={i} className="border p-3 w-16 text-lg "> {i+1} </th>
              ))}
              <th className="border p-4 w-24 font-bold text-lg">Delete</th>
               </tr>  
             </thead>
             <tbody>  
              {habits.map((habit, habitIndex) => (
                <tr key={habit.id}>
                  <td className="border p-2 font-medium text-center text-lg">{habit.name}</td>
                  {habit.checked.map((checked, dayIndex) => (
                    <td key={dayIndex} onClick={() => toggleDay(habitIndex,dayIndex)} className='border p-2 text-center cursor-pointer hover:bg-red-200 transition-colors'>{checked ? (
                      <Check className="text-green-800 mx-auto" size={28}  strokeWidth={4} />
                    ) : (
                      <X className="text-red-400 mx-auto" size={28} />
                    )}</td>
                  ))}
                  <td className='p-2 border text-center'>
                  <button onClick={() => {setHabits(habits.filter(h=> h.id !== habit.id))}}>
                  <Trash2 size={28} />
                  </button>
                  </td>
                </tr>
              ))}
             </tbody>
              
             
          </table>
        </div>
    </div>
    
  
)};
