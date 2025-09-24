import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

type Theme = 'default' | 'coffee-walnut' | 'mahogany-sandstone' | 'espresso-wood' | 'dark-chocolate';

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
  }
};

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');

  useEffect(() => {
    // Get saved theme from localStorage or default
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {Object.entries(themes).map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleThemeChange(key as Theme)}
            className="flex items-center justify-between"
          >
            <span>{theme.name}</span>
            <div className="flex gap-1">
              {Object.values(theme.colors).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {currentTheme === key && (
              <div className="w-2 h-2 bg-primary rounded-full ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}