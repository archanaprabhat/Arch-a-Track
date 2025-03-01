import {useState, useEffect} from 'react'
import { ChevronLeft, ChevronRight, Plus, Check , X, Trash2 } from "lucide-react";
export default function HabitTracker() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const[newHabit, setNewHabit] = useState("");
   const[habits, setHabits] = useState([]);
   const[isLoading, setIsLoading] = useState(true)
   const [darkMode, setDarkMode] = useState(false)

   
   useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode')
    const savedHabits = localStorage.getItem('habits');
    if(savedHabits) {
      try{
        setHabits(JSON.parse(savedHabits))
      }
      catch(e){
        console.error("Error while parsing the Habits", e)
      }
    }

    if (savedTheme) {
      setDarkMode(savedTheme === 'true')
    }else{
      const prefersTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches;
      setDarkMode(prefersTheme)
    }
    setIsLoading(false)
   }, [])
   useEffect(() => {
    if(!isLoading){
      localStorage.setItem('habits', JSON.stringify(habits))
    }
   }, [habits, isLoading])
   
   useEffect(() => {
    if(!isLoading){
      localStorage.setItem('darkMode', darkMode.toString())

      if(darkMode){
        document.body.classList.add('dark-mode')
      }else{
        document.body.classList.remove('dark-mode')
      }
    }
      },[isLoading, darkMode]);
    
    
   

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

   const toggleTheme = () => {
    setDarkMode(!darkMode);
   }

   const getThemeClasses = () => {
    return {
       // Main backgrounds
       bgMain: darkMode
       ? "bg-gray-900"
       : "bg-gradient-to-br from-rose-200 to-pink-200",
     bgCard: darkMode ? "bg-gray-800/90" : "bg-white/80",
     bgHeader: darkMode ? "bg-gray-800" : "bg-rose-100",
     bgHover: darkMode ? "hover:bg-gray-700/70" : "hover:bg-rose-50/70",
     bgButtonHover: darkMode ? "hover:bg-gray-700" : "hover:bg-rose-100",
     bgCellHover: darkMode ? "hover:bg-gray-700/50" : "hover:bg-rose-100/50",
     bgSticky: darkMode ? "bg-gray-800" : "bg-white/90",
     bgHeaderSticky: darkMode ? "bg-gray-800" : "bg-rose-100",

     // Text colors
     textPrimary: darkMode ? "text-pink-300" : "text-pink-800",
     textHeader: darkMode ? "text-pink-300" : "text-pink-900",
     textBody: darkMode ? "text-gray-200" : "text-pink-900",
     textMuted: darkMode ? "text-pink-400" : "text-pink-500",

     // Borders
     borderMain: darkMode ? "border-gray-700" : "border-pink-200",
     borderRow: darkMode ? "border-gray-700" : "border-pink-100",

     // Button colors
     btnPrimary: darkMode
       ? "bg-pink-700 hover:bg-pink-800"
       : "bg-pink-600 hover:bg-pink-700",

     // Check/X colors
     checkBg: darkMode ? "bg-green-900/40" : "bg-green-100",
     checkColor: darkMode ? "text-green-400" : "text-green-600",
     xColor: darkMode ? "text-red-400" : "text-red-300",

     // Input styles
     inputBg: darkMode
       ? "bg-gray-800 border-gray-600"
       : "bg-white/90 border-pink-300",
     inputFocus: darkMode
       ? "focus:ring-pink-700 focus:border-pink-700"
       : "focus:ring-pink-400 focus:border-pink-400",
     inputText: darkMode ? "text-gray-200" : "text-gray-900",

     // Current day highlight
     currentDayBg: darkMode ? "bg-pink-900/30" : "bg-pink-200/70",
     currentDayBorder: darkMode ? "border-pink-700" : "border-pink-400",
    }
   }

   const theme = getThemeClasses();
  
   
  return (
    <div className={`${theme.bgMain} min-h-screen w-full flex flex-col items-center p-2 md:p-4 font-sans transition-colors duration-300`}>
        <h1 className="text-4xl font-bold text-center text-pink-800 mb-4 my-6 ">Arch•a•Track</h1>
        <div className='flex justify-between items-center w-1/2 mb-6'>
        <button onClick={() => changeMonth(-1)} className='p-2 hover:bg-rose-100 rounded-full transition-colors'>
        <ChevronLeft size={48} color="#590d22" strokeWidth={3} />
        </button>
        <h2 className='italic font-mono text-3xl'>{monthYear}</h2>
        <button onClick={() => changeMonth(1)} className='p-2 hover:bg-rose-100 rounded-full transition-colors'>
        <ChevronRight size={48} color="#590d22" strokeWidth={3} />
        </button>
        <button onClick={toggleTheme}>Theme</button>
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
