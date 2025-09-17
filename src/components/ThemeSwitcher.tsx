import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

type Theme = 'default' | 'blue-orange' | 'purple-pink' | 'dark-red' | 'forest-gold';

const themes: Record<Theme, { name: string; colors: { primary: string; secondary: string; accent: string } }> = {
  default: {
    name: 'Navy & Gold (Default)',
    colors: { primary: '#0F172A', secondary: '#FACC15', accent: '#16A34A' }
  },
  'blue-orange': {
    name: 'Blue & Orange',
    colors: { primary: '#003D82', secondary: '#FF6B35', accent: '#0077BE' }
  },
  'purple-pink': {
    name: 'Purple & Pink',
    colors: { primary: '#1A0B3D', secondary: '#E91E63', accent: '#8B5CF6' }
  },
  'dark-red': {
    name: 'Dark & Red',
    colors: { primary: '#1C1C1C', secondary: '#DC2626', accent: '#FB923C' }
  },
  'forest-gold': {
    name: 'Forest & Gold',
    colors: { primary: '#0D4F3C', secondary: '#E6B800', accent: '#7CB342' }
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