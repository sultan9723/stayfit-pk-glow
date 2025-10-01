import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);

  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActivePath(item.path)
                    ? "text-[#FF3131]" // fiery red active
                    : "text-dark-brown dark:text-white hover:text-[#FF3131]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
            variant="primary"
            size="lg"
           className="btn-premium w-full md:w-auto px-8 py-3 bg-gradient-accent hover:bg-gradient-accent/90 text-white transition-all duration-300"
          >
          Join Now
         </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-brown dark:text-white hover:text-[#FF3131] transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Fullscreen Overlay */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#111315] text-[#FFF5EE] animate-slideIn">
            <div className="flex flex-col h-full px-6 py-8 space-y-6">
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-3xl text-[#FFF5EE] hover:text-[#FF3131]"
              >
                ×
              </button>

              {/* Nav Items */}
              <div className="flex flex-col space-y-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-2xl font-semibold transition ${
                      isActivePath(item.path)
                        ? "text-[#FF3131]"
                        : "hover:text-[#FF3131]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full px-6 py-3 bg-[#FF3131] hover:bg-red-600 text-white text-lg shadow-lg"
                  onClick={() => setIsRegOpen(true)}
                >
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
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