import React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold " +
      "transition-all duration-300 ease-out focus-visible:outline-none " +
      "focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 btn-professional shadow-none";

    const variants = {
      // 🔹 Default Main CTAs
      primary:
        "bg-gradient-accent text-white rounded-md sm:rounded-lg " +
        "hover:bg-accent-primary hover:text-white active:bg-accent-primary/90",

      // 🔹 Default Secondary CTAs
      secondary:
        "bg-transparent border border-accent-primary text-accent-primary rounded-md sm:rounded-lg " +
        "hover:bg-accent-primary hover:text-white active:bg-accent-primary active:text-white",

      // 🔹 Quick actions (WhatsApp, Chatbot, etc.)
      accent:
        "bg-green-secondary text-white rounded-full " +
        "hover:opacity-90",

      // 🌟 Hero Primary (Join Now)
      heroPrimary:
        "btn-premium px-8 py-4 bg-gradient-accent hover:bg-gradient-accent/90 " +
        "text-white shadow-accent hover:shadow-lg transition-all duration-300 " +
        "rounded-md sm:rounded-lg",

      // 🌟 Hero Secondary (Explore Programs)
      heroSecondary:
        "btn-premium border border-accent-primary text-accent-primary " +
        "hover:bg-accent-primary hover:text-very-dark-brown " +
        "active:bg-white active:text-very-dark-brown " +
        "transition-all duration-300 rounded-md sm:rounded-lg",
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