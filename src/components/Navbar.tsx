import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      subItems: [
        { name: "Why Choose StayFit", path: "/#why-choose" },
        { name: "Success Stories", path: "/#success-stories" },
        { name: "Gallery Highlights", path: "/#gallery" },
      ],
    },
    {
      name: "Programs",
      path: "/programs",
      subItems: [
        { name: "Strength & Bodybuilding", path: "/programs#strength" },
        { name: "Cardio & Endurance", path: "/programs#cardio" },
        { name: "Mixed Martial Arts", path: "/programs#mma" },
        { name: "Diet & Nutrition", path: "/programs#nutrition" },
        { name: "CrossFit", path: "/programs#crossfit" },
      ],
    },
    {
      name: "Trainers",
      path: "/trainers",
      subItems: [
        { name: "Strength & Bodybuilding", path: "/trainers#strength" },
        { name: "Cardio & Nutrition", path: "/trainers#cardio" },
        { name: "Mixed Martial Arts", path: "/trainers#mma" },
        { name: "Yoga & Wellness", path: "/trainers#yoga" },
        { name: "Group Classes & HIIT", path: "/trainers#hiit" },
      ],
    },
    {
      name: "Pricing",
      path: "/pricing",
      subItems: [
        { name: "Strength Training", path: "/pricing#strength" },
        { name: "Cardio Only", path: "/pricing#cardio" },
        { name: "Cardio + Strength", path: "/pricing#combo" },
        { name: "Group Strength", path: "/pricing#groupstrength" },
        { name: "Group Combo", path: "/pricing#groupcombo" },
        { name: "Personal Training", path: "/pricing#personal" },
      ],
    },
    {
      name: "Blog",
      path: "/blog",
      subItems: [
        { name: "Latest News", path: "/blog#latest-news" },
        { name: "Community", path: "/blog#community" },
      ],
    },
    {
      name: "Contact",
      path: "/contact",
      subItems: [
        { name: "Find Us", path: "/contact#find-us" },
        { name: "Send a Message", path: "/contact#message" },
      ],
    },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    aria-label={item.name}
                    className={`px-3 py-2 transition-all duration-300 flex items-center gap-1 ${
                      isActivePath(item.path)
                        ? "text-[#FF3131]"
                        : "text-white hover:text-[#FF3131]"
                    }`}
                  >
                    {item.name}
                    {item.subItems && <ChevronRight className="w-4 h-4" />}
                  </Link>
                  {item.subItems && (
                    <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-md mt-2 w-56 border border-gray-100">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="flex justify-between items-center px-4 py-2 text-sm text-gray-800 hover:bg-[#FF3131]/10 hover:text-[#FF3131]"
                          aria-label={sub.name}
                        >
                          {sub.name}
                          <ChevronRight className="w-4 h-4 text-[#FF3131]" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Quick actions */}
              <a
                href="https://wa.me/923330711555"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#16A34A]"
              >
                💬
              </a>
              <a
                href="tel:+923330711555"
                className="text-white hover:text-[#FF3131]"
              >
                📞
              </a>
              <Button
                variant="heroPrimary"
                size="lg"
                className="btn-premium px-6 py-3 shadow-accent hover:shadow-lg transition-all duration-300"
                onClick={() => setIsRegOpen(true)}
              >
                Join Now
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-[#FF3131]"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-[#FF3131]"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <form
              onSubmit={handleSearch}
              className="flex mt-2 mb-3 items-center bg-[#FFF5EE]/80 rounded-lg overflow-hidden shadow-inner"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-sm outline-none bg-transparent text-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF3131] text-white text-sm font-medium hover:bg-[#e02b2b]"
              >
                Go
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#FF3131] hover:bg-[#FF3131]/10"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </nav>

      {/* Floating Hamburger (mobile only) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 bg-[#FF3131] text-white p-3 rounded-full shadow-lg md:hidden z-[200] hover:bg-[#e02b2b] transition-all duration-300 focus:ring-4 focus:ring-[#FF3131]/40"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[150] bg-[#FFF5EE] text-[#FF3131] overflow-y-auto transition-transform duration-500 md:hidden">
          <div className="flex flex-col h-full px-6 py-8 space-y-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-[#FF3131] text-3xl font-bold"
            >
              ×
            </button>

            <div className="mt-12 space-y-6">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.subItems ? (
                    <button
                      className="flex justify-between items-center w-full text-2xl font-semibold text-[#FF3131]"
                      onClick={() => setIsSubOpen(item.name)}
                    >
                      {item.name}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="flex justify-between items-center text-2xl font-semibold hover:opacity-80"
                    >
                      {item.name}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 border-t border-[#FF3131]/20 space-y-4">
              <Button
                variant="heroPrimary"
                size="md"
                className="w-full shadow-accent hover:shadow-lg transition-all duration-300"
                onClick={() => setIsRegOpen(true)}
              >
                Join Now
              </Button>
              <Button variant="heroSecondary" size="md" className="w-full" asChild>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        selectedPlan="Membership"
      />
    </>
  );
};

export default Navbar;
