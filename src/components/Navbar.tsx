import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Trainers", path: "/trainers" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/stayfit.png"
              alt="StayFit Logo"
              className="h-12 md:h-16 w-auto dark:invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "text-accent-primary"
                    : "text-dark-brown dark:text-white hover:text-accent-primary"
                }`}
              >
                {item.name}
                {isActivePath(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-golden-accent rounded-full" />
                )}
              </Link>
            ))}
            <Button 
              variant="primary" 
              size="sm"
              className="btn-premium px-6 py-2 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
            >
              Join Now
            </Button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-lg bg-warm-beige dark:bg-dark-brown hover:bg-wood-brown dark:hover:bg-coffee-brown transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-accent-primary" />
              ) : (
                <Moon className="w-5 h-5 text-very-dark-brown" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Dark Mode Toggle (mobile) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mr-3 p-2 rounded-lg bg-warm-beige dark:bg-dark-brown"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-accent-primary" />
              ) : (
                <Moon className="w-5 h-5 text-very-dark-brown" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-brown dark:text-white hover:text-accent-primary transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-very-dark-brown border-t border-warm-beige dark:border-white/10 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "text-accent-primary"
                      : "text-dark-brown dark:text-white hover:text-accent-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                variant="primary" 
                size="md"
                className="btn-premium w-full mt-4 px-6 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white shadow-accent hover:shadow-lg transition-all duration-300"
              >
                Join Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;