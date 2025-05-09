'use client';

import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function ThemeToggle() {
  const [darkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('theme');

    if (storedValue === 'dark') {
      return setIsDarkMode(true);
    }
    setIsDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div
      onClick={() => {
        darkMode ? setIsDarkMode(false) : setIsDarkMode(true);
      }}
      className={cn(
        'h-5  w-10 bg-black rounded-full hover:opacity-70 cursor-pointer transition-all flex items-center justify-between',
        [darkMode ? ' bg-white' : ' bg-black ']
      )}
    >
      <div
        className={cn('rounded-full  transition-all', [
          darkMode ? 'translate-x-[22px]  ' : ' translate-x-[1px]',
        ])}
      >
        <Moon
          width={15}
          height={15}
          className={cn('  text-white ', [darkMode ? ' hidden  ' : ' block '])}
        />
        <Sun
          width={15}
          height={15}
          className={cn(' text-black ', [darkMode ? '  block' : ' hidden '])}
        />
      </div>
    </div>
  );
}

export default ThemeToggle;
