import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "Trainers", path: "/trainers" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const actionItems = [
    { name: "Book Program", path: "/book-program" },
    { name: "Book Trainer", path: "/book-trainer" },
    { name: "Join Now", path: "/join-now" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-warm-beige dark:bg-very-dark-brown shadow-md"
          : "bg-warm-beige dark:bg-transparent"
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
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "text-accent-primary"
                    : "text-dark-brown dark:text-white hover:text-accent-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Action Items */}
            <div className="flex items-center space-x-2 ml-4">
              {actionItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.name === "Join Now"
                      ? "bg-yellow-400 hover:bg-yellow-500 text-black transform hover:scale-105"
                      : "bg-slate-600 hover:bg-slate-700 text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <Link
                to="/signup"
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-warm-beige dark:focus:ring-offset-very-dark-brown"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-warm-beige dark:focus:ring-offset-very-dark-brown"
              >
                Login
              </Link>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 p-2 rounded-lg bg-light-wood dark:bg-dark-brown hover:bg-wood-brown dark:hover:bg-coffee-brown transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-accent-primary" />
              ) : (
                <Moon className="w-5 h-5 text-dark-brown" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Dark Mode Toggle (mobile) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mr-3 p-2 rounded-lg bg-light-wood dark:bg-dark-brown"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-accent-primary" />
              ) : (
                <Moon className="w-5 h-5 text-dark-brown" />
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
          <div className="md:hidden absolute top-16 left-0 right-0 bg-warm-beige dark:bg-very-dark-brown border-t border-light-wood dark:border-white/10">
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
              
              {/* Mobile Action Items */}
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-light-wood dark:border-white/10">
                <h4 className="text-sm font-semibold text-dark-brown dark:text-white mb-2">Quick Actions</h4>
                {actionItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`w-full px-4 py-3 rounded-lg text-center font-medium transition-all duration-200 ${
                      item.name === "Join Now"
                        ? "bg-yellow-400 hover:bg-yellow-500 text-black transform hover:scale-105"
                        : "bg-slate-600 hover:bg-slate-700 text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-light-wood dark:border-white/10">
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-all duration-200 text-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 text-center transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;