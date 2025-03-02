import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  X,
  Trash2,
  Moon,
  Sun,
  Calendar,
} from "lucide-react";

export default function HabitTracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newHabit, setNewHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get today's date for highlighting
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();
    const currentDay = today.getDate();

  // Load habits and theme preference from localStorage on component mount
  useEffect(() => {
    const savedHabits = localStorage.getItem("habits");
    const savedTheme = localStorage.getItem("darkMode");
    
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        console.error("Error parsing saved habits:", e);
        setHabits([]);
      }
    }

    if (savedTheme) {
      setDarkMode(savedTheme === "true");
    } else {
      // Check user's system preference for dark mode
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
    }

    setIsLoading(false);
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("habits", JSON.stringify(habits));
    }
  }, [habits, isLoading]);

  // Save theme preference
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("darkMode", darkMode.toString());

      if (darkMode) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    }
  }, [darkMode, isLoading]);

  const monthYear = currentDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  // Calculate days in current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: newHabit,
          checked: Array(31).fill(false),
        },
      ]);
      setNewHabit("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addHabit();
    }
  };

  const toggleDay = (habitIndex, dayIndex) => {
    const newHabits = [...habits];
    newHabits[habitIndex].checked[dayIndex] =
      !newHabits[habitIndex].checked[dayIndex];
    setHabits(newHabits);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Get theme-based classes and colors
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
    };
  };

  const theme = getThemeClasses();

  return (
    <div
      className={`${theme.bgMain} min-h-screen w-full flex flex-col items-center p-2 md:p-4 font-sans transition-colors duration-300`}
    >
      {/* Header */}
      <div className='w-full max-w-7xl'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center'>
            <Calendar className={`${theme.textPrimary} mr-2`} size={28} />
            <h1
              className={`text-3xl md:text-4xl font-bold ${theme.textPrimary}`}>
              Arch•a•Track
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme.bgButtonHover} transition-colors`}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }>
            {darkMode ? (
              <Sun className={theme.textPrimary} size={24} />
            ) : (
              <Moon className={theme.textPrimary} size={24} />
            )}
          </button>
        </div>
        {/* Month Navigation */}
        <div className='flex justify-between items-center w-full max-w-md mx-auto mb-6'>
          <button
            onClick={() => changeMonth(-1)}
            className={`p-2 ${theme.bgButtonHover} rounded-full transition-colors duration-200`}
            aria-label='Previous month'>
            <ChevronLeft size={28} className={theme.textPrimary} />
          </button>
          <h2
            className={`text-xl md:text-2xl font-medium italic font-mono ${theme.textPrimary}`}>
            {monthYear}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className={`p-2 ${theme.bgButtonHover} rounded-full transition-colors duration-200`}
            aria-label='Next month'>
            <ChevronRight size={28} className={theme.textPrimary} />
          </button>
        </div>

        {/* Add Habit Input */}
        <div className='flex gap-2 w-full max-w-xl mx-auto mb-6'>
          <div className='flex-1 relative'>
            <input
              type='text'
              placeholder='Add a new habit...'
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`w-full p-3 md:p-4 rounded-lg border ${theme.inputBg} text-base md:text-lg focus:outline-none focus:ring-2 ${theme.inputFocus} shadow-md transition-all ${theme.inputText}`}
            />
          </div>
          <button
            onClick={addHabit}
            className={`${theme.btnPrimary} text-white rounded-lg px-3 md:px-4 transition-colors shadow-md flex items-center justify-center`}
            aria-label='Add habit'>
            <Plus size={24} />
          </button>
        </div>

        <div className='overflow-x-auto'>
          <table>
            <thead>
              <tr>
                <th className='border  p-4 text-center font-bold text-lg '>
                  Habits
                </th>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <th key={i} className='border p-3 w-16 text-lg '>
                    {" "}
                    {i + 1}{" "}
                  </th>
                ))}
                <th className='border p-4 w-24 font-bold text-lg'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit, habitIndex) => (
                <tr key={habit.id}>
                  <td className='border p-2 font-medium text-center text-lg'>
                    {habit.name}
                  </td>
                  {habit.checked.map((checked, dayIndex) => (
                    <td
                      key={dayIndex}
                      onClick={() => toggleDay(habitIndex, dayIndex)}
                      className='border p-2 text-center cursor-pointer hover:bg-red-200 transition-colors'>
                      {checked ? (
                        <Check
                          className='text-green-800 mx-auto'
                          size={28}
                          strokeWidth={4}
                        />
                      ) : (
                        <X className='text-red-400 mx-auto' size={28} />
                      )}
                    </td>
                  ))}
                  <td className='p-2 border text-center'>
                    <button
                      onClick={() => {
                        setHabits(habits.filter((h) => h.id !== habit.id));
                      }}>
                      <Trash2 size={28} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
