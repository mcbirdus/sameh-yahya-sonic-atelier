
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      ((!localStorage.getItem("theme")) && 
       window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-colors hover:bg-accent flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative z-10 transition-transform duration-500">
        {isDarkMode ? 
          <Moon className="h-5 w-5 text-gold-300" /> : 
          <Sun className="h-5 w-5 text-gold-500" />
        }
      </div>
      <div className={`absolute inset-0 bg-gradient-to-tr from-transparent via-gold-300/10 to-azure-300/10 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
};

export default ThemeToggle;
