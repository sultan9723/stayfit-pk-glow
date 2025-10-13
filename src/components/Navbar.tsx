import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/Button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-border/40 ${
        isScrolled
          ? "bg-[rgba(17,19,21,0.95)] shadow-md backdrop-blur-xl"
          : "bg-[rgba(17,19,21,0.85)] backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/stayfit.png"
              alt="StayFit Logo"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "text-[#FF3131]"
                    : "text-warm-beige hover:text-[#FF3131]"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Search Icon */}
            <button
              onClick={() => setShowSearch(true)}
              className="text-warm-beige hover:text-[#FF3131] transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Join Now Button */}
            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-accent hover:bg-gradient-accent/90 text-white"
              onClick={() => setIsRegOpen(true)}
            >
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setShowSearch(true)}
              className="text-warm-beige hover:text-[#FF3131] transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-warm-beige hover:text-[#FF3131] transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fullscreen Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#f5f2ed] text-dark-brown animate-slideIn">
          <div className="flex flex-col h-full px-6 py-8 space-y-6">
            <button
              onClick={() => setIsOpen(false)}
              className="self-end text-3xl text-dark-brown hover:text-[#FF3131]"
            >
              ×
            </button>

            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-2xl font-semibold px-2 py-1 rounded-lg transition ${
                    isActivePath(item.path)
                      ? "text-[#FF3131]"
                      : "text-[#FF3131] hover:text-white hover:bg-[#FF3131]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full bg-gradient-accent hover:bg-gradient-accent/90 text-white"
                onClick={() => setIsRegOpen(true)}
              >
                Join Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-50 bg-[rgba(17,19,21,0.95)] backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search programs, trainers, or topics..."
              className="w-full py-3 px-5 rounded-lg bg-[#1a1d21] text-warm-beige border border-border focus:ring-2 focus:ring-[#FF3131] outline-none"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="absolute right-4 top-3 text-warm-beige hover:text-[#FF3131]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        selectedPlan="Membership"
      />
    </nav>
  );
};

export default Navbar;