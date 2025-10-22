import React, { useState, useEffect } from 'react';

type Theme = 'default' | 'coffee-walnut' | 'mahogany-sandstone' | 'espresso-wood' | 'dark-chocolate' | 'seashell-white';

const themes: Record<Theme, { name: string; colors: { primary: string; secondary: string; accent: string } }> = {
  default: {
    name: 'Warm Earthy (Default)',
    colors: { primary: '#000000', secondary: '#e3d34a', accent: '#8c6a44' }
  },
  'coffee-walnut': {
    name: 'Coffee & Walnut',
    colors: { primary: '#140b06', secondary: '#e3d34a', accent: '#22180e' }
  },
  'mahogany-sandstone': {
    name: 'Mahogany & Sandstone',
    colors: { primary: '#251b11', secondary: '#e4d44b', accent: '#947654' }
  },
  'espresso-wood': {
    name: 'Espresso & Wood',
    colors: { primary: '#1d130a', secondary: '#e3d34b', accent: '#977957' }
  },
  'dark-chocolate': {
    name: 'Dark Chocolate',
    colors: { primary: '#271b0f', secondary: '#e3d34a', accent: '#281c10' }
  },
  'seashell-white': {
    name: 'Seashell White',
    colors: { primary: '#f5f2ed', secondary: '#9a8b7a', accent: '#8c6a44' }
  }
};

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('stayfit-theme') as Theme) || 'default';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    if (theme === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('stayfit-theme', theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  // 🔥 Hide the entire switcher (nothing will render)
  return null;
}