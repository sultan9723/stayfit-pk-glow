import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/Button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll transparency
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      sub: [
        { name: "Why Choose StayFit", href: "/#why" },
        { name: "Success Stories", href: "/#stories" },
        { name: "Gallery Highlights", href: "/#gallery" },
      ],
    },
    {
      name: "Programs",
      path: "/programs",
      sub: [
        { name: "Strength & Bodybuilding", href: "/programs#strength" },
        { name: "Cardio & Endurance", href: "/programs#cardio" },
        { name: "Mixed Martial Arts", href: "/programs#mma" },
        { name: "Diet & Nutrition", href: "/programs#nutrition" },
        { name: "CrossFit", href: "/programs#crossfit" },
        { name: "Training Services", href: "/programs#services" },
      ],
    },
    {
      name: "Trainers",
      path: "/trainers",
      sub: [
        { name: "Strength & Bodybuilding", href: "/trainers#strength" },
        { name: "Cardio & Nutrition", href: "/trainers#cardio" },
        { name: "MMA & Combat", href: "/trainers#mma" },
        { name: "Yoga & Wellness", href: "/trainers#yoga" },
        { name: "Group Classes / HIIT", href: "/trainers#hiit" },
      ],
    },
    {
      name: "Pricing",
      path: "/pricing",
      sub: [
        { name: "Strength Training", href: "/pricing#strength" },
        { name: "Cardio Only", href: "/pricing#cardio" },
        { name: "Cardio + Strength", href: "/pricing#combo" },
        { name: "Group Class (Strength)", href: "/pricing#group-strength" },
        { name: "Group Class (Cardio + Strength)", href: "/pricing#group-cardio" },
        { name: "Personal Training", href: "/pricing#personal" },
      ],
    },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-charcoal/85 backdrop-blur-md shadow-md"
          : "bg-seashell-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/stayfit.png"
              alt="StayFit Logo"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Search Button */}
          <div className="hidden md:flex items-center space-x-6">
            {showSearch ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="bg-white/10 text-dark-brown dark:text-white border border-border rounded-lg px-3 py-2 w-52 focus:w-64 focus:outline-none transition-all duration-300"
                />
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-dark-brown dark:text-white hover:text-[#FF3131]"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Desktop Navigation */}
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.path)
                      ? "text-[#FF3131]"
                      : "text-dark-brown dark:text-white hover:text-[#FF3131]"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Submenu */}
                {item.sub && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-lg bg-seashell-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {item.sub.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-dark-brown hover:bg-warm-beige hover:text-[#FF3131]"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="primary"
              size="lg"
              className="bg-gradient-accent hover:bg-gradient-accent/90 text-white"
              onClick={() => setIsRegOpen(true)}
            >
              Join Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-dark-brown dark:text-white hover:text-[#FF3131]"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-brown dark:text-white hover:text-[#FF3131]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showSearch && (
          <form
            onSubmit={handleSearch}
            className="md:hidden flex items-center mt-2 mb-3 bg-seashell-white border rounded-lg px-3 py-2"
          >
            <Search className="w-5 h-5 text-dark-brown mr-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent outline-none text-dark-brown"
            />
          </form>
        )}

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-seashell-white text-dark-brown overflow-y-auto">
            <div className="flex flex-col px-6 py-8 space-y-6">
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="self-end text-3xl text-dark-brown hover:text-[#FF3131]"
              >
                ×
              </button>

              {/* Menu Items */}
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-xl font-semibold mb-2 hover:text-[#FF3131]"
                  >
                    {item.name}
                  </Link>
                  {item.sub && (
                    <div className="ml-4 border-l border-border pl-3 space-y-1">
                      {item.sub.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-sm text-gray-muted hover:text-[#FF3131]"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* CTA */}
              <div className="mt-8 text-center border-t border-border pt-6">
                <p className="text-sm text-gray-muted mb-3">
                  Become a StayFit member today and unlock personalized plans,
                  expert trainers, and exclusive offers.
                </p>
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="primary"
                    className="bg-gradient-accent text-white w-full"
                    onClick={() => setIsRegOpen(true)}
                  >
                    Join Us
                  </Button>
                  <a
                    href="tel:+923105648566"
                    className="block w-full text-center py-2 rounded-lg border border-[#FF3131] text-[#FF3131] hover:bg-[#FF3131] hover:text-white transition"
                  >
                    Call Us Now
                  </a>
                </div>
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