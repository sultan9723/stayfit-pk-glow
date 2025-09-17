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
<<<<<<< HEAD
<<<<<<< HEAD
          ? "bg-white/95 dark:bg-very-dark-brown shadow-md backdrop-blur-sm"
          : "bg-white/80 dark:bg-transparent backdrop-blur-sm"
=======
          ? "bg-white dark:bg-navy-primary shadow-md"
          : "bg-white dark:bg-transparent"
>>>>>>> parent of ac5510b (theme changed)
=======
          ? "bg-white dark:bg-navy-primary shadow-md"
          : "bg-white dark:bg-transparent"
>>>>>>> parent of ac5510b (theme changed)
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/stayfit.png" 
              alt="StayFit.pk Logo" 
              className="h-10 w-auto"
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
<<<<<<< HEAD
<<<<<<< HEAD
                    ? "text-golden-accent"
                    : "text-very-dark-brown dark:text-white hover:text-golden-accent"
=======
                    ? "text-yellow-500"
                    : "text-gray-800 dark:text-white hover:text-yellow-500"
>>>>>>> parent of ac5510b (theme changed)
=======
                    ? "text-yellow-500"
                    : "text-gray-800 dark:text-white hover:text-yellow-500"
>>>>>>> parent of ac5510b (theme changed)
                }`}
              >
                {item.name}
                {isActivePath(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-golden-accent rounded-full" />
                )}
              </Link>
            ))}
            
            <Button className="btn-hero-primary text-sm">
              Join Now
            </Button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
<<<<<<< HEAD
<<<<<<< HEAD
              className="ml-4 p-2 rounded-lg bg-warm-beige dark:bg-dark-brown hover:bg-wood-brown dark:hover:bg-coffee-brown transition"
=======
              className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
>>>>>>> parent of ac5510b (theme changed)
=======
              className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
>>>>>>> parent of ac5510b (theme changed)
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
<<<<<<< HEAD
<<<<<<< HEAD
                <Moon className="w-5 h-5 text-very-dark-brown" />
=======
                <Moon className="w-5 h-5 text-gray-800" />
>>>>>>> parent of ac5510b (theme changed)
=======
                <Moon className="w-5 h-5 text-gray-800" />
>>>>>>> parent of ac5510b (theme changed)
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Dark Mode Toggle (mobile) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
<<<<<<< HEAD
<<<<<<< HEAD
              className="mr-3 p-2 rounded-lg bg-warm-beige dark:bg-dark-brown"
=======
              className="mr-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
>>>>>>> parent of ac5510b (theme changed)
=======
              className="mr-3 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
>>>>>>> parent of ac5510b (theme changed)
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
<<<<<<< HEAD
<<<<<<< HEAD
                <Moon className="w-5 h-5 text-very-dark-brown" />
=======
                <Moon className="w-5 h-5 text-gray-800" />
>>>>>>> parent of ac5510b (theme changed)
=======
                <Moon className="w-5 h-5 text-gray-800" />
>>>>>>> parent of ac5510b (theme changed)
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
<<<<<<< HEAD
<<<<<<< HEAD
              className="text-very-dark-brown dark:text-white hover:text-golden-accent transition-colors duration-200"
=======
              className="text-gray-800 dark:text-white hover:text-yellow-500 transition-colors duration-200"
>>>>>>> parent of ac5510b (theme changed)
=======
              className="text-gray-800 dark:text-white hover:text-yellow-500 transition-colors duration-200"
>>>>>>> parent of ac5510b (theme changed)
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
<<<<<<< HEAD
<<<<<<< HEAD
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-very-dark-brown border-t border-warm-beige dark:border-white/10 backdrop-blur-sm">
=======
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-navy-primary border-t border-gray-200 dark:border-white/10">
>>>>>>> parent of ac5510b (theme changed)
=======
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-navy-primary border-t border-gray-200 dark:border-white/10">
>>>>>>> parent of ac5510b (theme changed)
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActivePath(item.path)
<<<<<<< HEAD
<<<<<<< HEAD
                      ? "text-golden-accent"
                      : "text-very-dark-brown dark:text-white hover:text-golden-accent"
=======
                      ? "text-yellow-500"
                      : "text-gray-800 dark:text-white hover:text-yellow-500"
>>>>>>> parent of ac5510b (theme changed)
=======
                      ? "text-yellow-500"
                      : "text-gray-800 dark:text-white hover:text-yellow-500"
>>>>>>> parent of ac5510b (theme changed)
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="w-full mt-4 btn-hero-primary">
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