import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/Button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState<string | null>(null);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();

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
        { name: "Latest News", path: "/blog#latest" },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between h-16">
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
                      ? "text-[#FF3131] font-semibold"
                      : "text-[#111827] hover:text-[#FF3131]"
                  }`}
                >
                  {item.name}
                  {item.subItems && (
                    <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                  )}
                </Link>

                {item.subItems && (
                  <div className="absolute hidden group-hover:block bg-[#FFF5EE] shadow-xl rounded-md mt-2 w-56 border border-gray-100">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="flex items-center justify-between px-4 py-2 text-sm text-gray-800 hover:bg-[#FF3131]/10 hover:text-[#FF3131]"
                        aria-label={sub.name}
                      >
                        <span>{sub.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-70" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Actions */}
            <a
              href="https://wa.me/923330711555"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-[#16A34A] hover:opacity-80 transition"
            >
              💬
            </a>
            <a
              href="tel:+923330711555"
              aria-label="Call StayFit"
              className="text-[#FF3131] hover:text-[#e02b2b] transition"
            >
              📞
            </a>

            {/* ✅ Fixed: Fully colored Join Now */}
            <Button
              variant="heroPrimary"
              size="lg"
              className="btn-premium px-6 py-3 shadow-accent hover:shadow-lg transition-all duration-300 bg-[#FF3131] hover:bg-[#e02b2b] text-white"
              asChild
            >
              <Link to="/programs" className="text-white font-semibold">
                Join Now
              </Link>
            </Button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-[#111827] hover:text-[#FF3131]"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="https://wa.me/923330711555"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="text-[#16A34A] hover:opacity-80"
            >
              💬
            </a>
            <a
              href="tel:+923330711555"
              aria-label="Call StayFit"
              className="text-[#FF3131] hover:text-[#e02b2b]"
            >
              📞
            </a>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setIsSubOpen(null);
              }}
              className="text-[#111827] hover:text-[#FF3131]"
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
            role="search"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-[#FFF5EE] text-[#FF3131]"
            role="dialog"
            aria-modal="true"
          >
            <div
              className={`absolute inset-0 transform transition-transform duration-500 ${
                isSubOpen ? "-translate-x-full" : "translate-x-0"
              }`}
            >
              <div className="flex flex-col h-full px-6 py-8 space-y-6">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsSubOpen(null);
                  }}
                  className="self-end text-3xl text-[#FF3131]"
                >
                  ×
                </button>

                {/* Main Mobile Nav */}
                <div className="flex flex-col space-y-5 mt-6">
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
                          className="block text-2xl font-semibold hover:opacity-80"
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-auto border-t border-[#FF3131]/20 pt-6 space-y-4">
                  <p className="text-sm leading-relaxed">
                    Become a <span className="font-semibold">StayFit Member</span> — Join the movement that transforms your health & strength.
                  </p>
                  <div className="flex space-x-3">
                    {/* ✅ Fixed Mobile Button */}
                    <Button
                      variant="heroPrimary"
                      size="md"
                      className="flex-1 btn-premium shadow-accent hover:shadow-lg transition-all duration-300 bg-[#FF3131] hover:bg-[#e02b2b] text-white"
                      asChild
                    >
                      <Link to="/programs" onClick={() => setIsOpen(false)} className="text-white font-semibold">
                        Join Now
                      </Link>
                    </Button>
                    <Button
                      variant="heroSecondary"
                      size="md"
                      className="flex-1 btn-premium"
                      asChild
                    >
                      <Link to="/contact" onClick={() => setIsOpen(false)}>
                        Get in Touch
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submenu Panel */}
            {isSubOpen && (
              <div className="absolute inset-0 transition-transform duration-500 translate-x-0 bg-[#FFF5EE]">
                <div className="flex flex-col h-full px-6 py-8 space-y-6">
                  <button
                    onClick={() => setIsSubOpen(null)}
                    className="text-[#FF3131] text-lg font-semibold flex items-center"
                  >
                    ← Back
                  </button>

                  <div className="flex flex-col space-y-3 mt-6">
                    {navItems
                      .find((item) => item.name === isSubOpen)
                      ?.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => {
                            setIsSubOpen(null);
                            setIsOpen(false);
                          }}
                          className="flex items-center justify-between text-xl text-[#FF3131] font-medium hover:opacity-80"
                        >
                          <span>{sub.name}</span>
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Registration Modal kept for potential future use */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        selectedPlan="Membership"
      />
    </nav>
  );
};

export default Navbar;
