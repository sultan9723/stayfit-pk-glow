import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);

  const location = useLocation();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-warm-beige/95 shadow-md backdrop-blur-xl"
          : "bg-warm-beige/60 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/stayfit.png"
              alt="StayFit Logo"
              className="h-14 w-auto transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-[16px] font-medium transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "text-[#FF3131]"
                    : "text-dark-brown hover:text-[#FF3131] opacity-90 hover:opacity-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="primary"
              size="lg"
              className="bg-[#FF3131] hover:brightness-110 text-white font-semibold px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              onClick={() => setIsRegOpen(true)}
            >
              Join Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-brown hover:text-[#FF3131] transition-colors duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#f5f2ed]/95 backdrop-blur-xl text-dark-brown animate-slideIn">
            <div className="flex flex-col h-full px-6 py-8 space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-3xl text-dark-brown hover:text-[#FF3131]"
              >
                ×
              </button>

              {/* Nav Items */}
              <div className="flex flex-col space-y-5 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block text-2xl font-semibold px-2 py-1 rounded-lg transition ${
                      isActivePath(item.path)
                        ? "text-[#FF3131]"
                        : "text-dark-brown hover:text-[#FF3131]"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Join Now Button */}
              <div className="mt-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full bg-[#FF3131] hover:brightness-110 text-white font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
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