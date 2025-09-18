import React from 'react';
import { cn } from '@/lib/utils';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  
  const variants = {
    primary: "bg-gradient-golden text-white-text rounded-lg shadow-golden hover:bg-green-secondary hover:text-white hover:shadow-green hover:scale-105",
    secondary: "bg-transparent border border-golden-accent text-golden-accent rounded-lg hover:bg-golden-accent hover:text-deep-brown",
    accent: "bg-green-secondary text-white-text rounded-full shadow-green hover:opacity-90"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
