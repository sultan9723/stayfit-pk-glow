import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold " +
      "transition-all duration-300 ease-out focus-visible:outline-none " +
      "focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-professional";

    const variants = {
      // 🔹 Main CTAs (Join Now, Book Trial, Success Stories)
      primary:
        "bg-gradient-bronze text-white rounded-md sm:rounded-lg shadow-bronze " +
        "hover:bg-green-secondary hover:text-white hover:shadow-green hover:scale-105",

      // 🔹 Supporting CTAs (Explore Programs, Send Email, Learn More)
      secondary:
        "bg-transparent border border-accent-primary text-accent-primary rounded-md sm:rounded-lg " +
        "hover:bg-accent-primary hover:text-deep-brown",

      // 🔹 Quick actions (WhatsApp, Chatbot, Small CTAs)
      accent:
        "bg-green-secondary text-white rounded-full shadow-green " +
        "hover:opacity-90 hover:scale-105",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
      lg: "px-4 py-2 text-sm sm:px-8 sm:py-4 sm:text-lg",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
