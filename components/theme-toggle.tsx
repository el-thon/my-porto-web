'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const stored = window.localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const nextTheme = stored === 'dark' || stored === 'light' ? stored : preferred;

    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('theme', nextTheme);
  }

  return (
    <button className="icon-button" type="button" onClick={toggleTheme} aria-label="Toggle dark mode">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

