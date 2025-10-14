import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronLeft } from "lucide-react";
import { Button } from "@/components/Button";
import RegistrationModal from "@/components/RegistrationModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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
        { name: "Training Services", path: "/programs#training" },
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
        { name: "Group Class Strength", path: "/pricing#groupstrength" },
        { name: "Group Class Cardio + Strength", path: "/pricing#groupcombo" },
        { name: "Personal Training", path: "/pricing#personal" },
      ],
    },
    { name: "Blog", path: "/blog" },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent backdrop-blur-sm"
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
                  className={`relative px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActivePath(item.path)
                      ? "text-[#FF3131]"
                      : "text-black hover:text-[#FF3131]"
                  }`}
                >
                  {item.name}
                </Link>
                {item.subItems && (
                  <div className="absolute hidden group-hover:block bg-white shadow-xl rounded-md mt-2 w-56 border border-gray-100">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#FF3131]/10 hover:text-[#FF3131]"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button
              variant="primary"
              size="lg"
              className="bg-[#FF3131] hover:bg-[#e02b2b] text-white"
              onClick={() => setIsRegOpen(true)}
            >
              Join Now
            </Button>
          </div>

          {/* Search + Mobile Menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-black hover:text-[#FF3131]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setIsOpen(!isOpen);
                setActiveMenu(null);
              }}
              className="text-black hover:text-[#FF3131]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            className="flex mt-2 mb-3 items-center bg-gray-100 rounded-lg overflow-hidden shadow-inner"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-sm outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#FF3131] text-white text-sm font-medium hover:bg-[#e02b2b]"
            >
              Go
            </button>
          </form>
        )}
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white text-black overflow-y-auto animate-slideIn">
            {/* Main Menu */}
            {!activeMenu && (
              <div className="flex flex-col h-full px-6 py-8 space-y-6 transition-all duration-500">
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="self-end text-3xl text-gray-800 hover:text-[#FF3131]"
                >
                  ×
                </button>

                {/* Nav Items */}
                <div className="flex flex-col space-y-4 mt-6">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <button
                        onClick={() =>
                          item.subItems
                            ? setActiveMenu(item.name)
                            : setIsOpen(false)
                        }
                        className={`flex justify-between items-center w-full text-2xl font-semibold px-2 py-1 rounded-lg transition ${
                          isActivePath(item.path)
                            ? "text-[#FF3131]"
                            : "hover:text-[#FF3131]"
                        }`}
                      >
                        {item.name}
                        {item.subItems && (
                          <span className="text-lg text-gray-600">›</span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-auto border-t border-gray-200 pt-6 space-y-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Become a <span className="font-semibold">StayFit Member</span>{" "}
                    — Join the movement that transforms your health & strength.
                  </p>
                  <div className="flex space-x-3">
                    <Button
                      variant="primary"
                      size="md"
                      className="flex-1 bg-[#FF3131] text-white hover:bg-[#e02b2b]"
                      onClick={() => setIsRegOpen(true)}
                    >
                      Join Now
                    </Button>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 border border-[#FF3131] text-[#FF3131] text-center font-semibold rounded-lg py-2 hover:bg-[#FF3131]/10"
                    >
                      Get in Touch
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Submenu View */}
            {activeMenu && (
              <div className="flex flex-col h-full px-6 py-8 space-y-6 animate-slideLeft">
                {/* Back button */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="text-gray-700 hover:text-[#FF3131] flex items-center"
                  >
                    <ChevronLeft className="w-6 h-6 mr-1" />
                    Back
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {activeMenu}
                  </h2>
                </div>

                <div className="flex flex-col space-y-3 mt-6">
                  {navItems
                    .find((item) => item.name === activeMenu)
                    ?.subItems?.map((sub) => (
                      <Link
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setIsOpen(false)}
                        className="block text-lg font-medium text-gray-800 hover:text-[#FF3131] transition"
                      >
                        {sub.name}
                      </Link>
                    ))}
                </div>
              </div>
            )}
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