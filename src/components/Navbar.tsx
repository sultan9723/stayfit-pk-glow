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

  // ✅ Scroll transition effect (Apple-style)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Home",
      path: "/",
      subItems: [
        { label: "Why Choose StayFit?", path: "/#why-choose" },
        { label: "Success Stories", path: "/#success-stories" },
        { label: "Gallery Highlights", path: "/#gallery" },
      ],
    },
    {
      name: "Programs",
      path: "/programs",
      subItems: [
        { label: "Strength & Bodybuilding", path: "/programs#strength" },
        { label: "Cardio & Endurance", path: "/programs#cardio" },
        { label: "Mixed Martial Arts", path: "/programs#mma" },
        { label: "Diet & Nutrition", path: "/programs#nutrition" },
        { label: "CrossFit", path: "/programs#crossfit" },
        { label: "Training Services", path: "/programs#training" },
      ],
    },
    { name: "Trainers", path: "/trainers" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  // ✅ Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query)}`);
    setShowSearch(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md ${
        isScrolled
          ? "bg-[hsl(var(--charcoal)/0.8)] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ✅ Logo */}
          <Link to="/" className="flex items-center z-50">
            <img
              src="/stayfit.png"
              alt="StayFit Logo"
              className="h-10 md:h-12 w-auto object-contain drop-shadow-md"
            />
          </Link>

          {/* ✅ Search (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {showSearch ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-b border-gray-400 text-white px-2 py-1 focus:outline-none placeholder:text-gray-muted"
                />
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-white hover:text-[#FF3131] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* ✅ Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-all ${
                    isActivePath(item.path)
                      ? "text-[#FF3131]"
                      : "text-white hover:text-[#FF3131]"
                  }`}
                >
                  {item.name}
                </Link>

                {/* Dropdown (Nike-style hover) */}
                {item.subItems && (
                  <div className="absolute left-0 top-full hidden group-hover:block bg-[hsl(var(--charcoal))] rounded-md shadow-lg mt-2 w-56 border border-border-lines/40">
                    <ul className="py-2">
                      {item.subItems.map((sub, i) => (
                        <li key={i}>
                          <Link
                            to={sub.path}
                            className="block px-4 py-2 text-sm text-white hover:bg-[#FF3131]/10 hover:text-[#FF3131] transition"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="primary"
              size="lg"
              className="bg-[#FF3131] text-white hover:bg-[#e12b2b]"
              onClick={() => setIsRegOpen(true)}
            >
              Join Now
            </Button>
          </div>

          {/* ✅ Mobile menu button */}
          <div className="md:hidden flex items-center z-50 space-x-4">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:text-[#FF3131]"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#FF3131]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ✅ Search (Mobile expand) */}
        {showSearch && (
          <form onSubmit={handleSearch} className="md:hidden mt-2 mb-4 flex">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow bg-transparent border-b border-gray-400 text-white px-3 py-2 focus:outline-none placeholder:text-gray-muted"
            />
          </form>
        )}

        {/* ✅ Mobile Drawer (Nike-style) */}
        {isOpen && (
          <div className="fixed inset-0 z-40 bg-[hsl(var(--charcoal)/0.95)] text-white overflow-y-auto animate-slideIn">
            <div className="flex flex-col h-full px-6 py-10 space-y-6">
              {/* Nav Items */}
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block text-2xl font-semibold mb-3 hover:text-[#FF3131]"
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <ul className="pl-4 space-y-2 text-gray-muted text-sm">
                      {item.subItems.map((sub, i) => (
                        <li key={i}>
                          <Link
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-[#FF3131]"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* ✅ Bottom Description (Nike-style “Join Us” block) */}
              <div className="mt-auto pt-6 border-t border-border-lines/30">
                <p className="text-lg font-semibold mb-2">
                  Become a StayFit Member
                </p>
                <p className="text-sm text-gray-muted leading-relaxed mb-4">
                  Unlock access to personalized programs, elite trainers, and
                  exclusive community challenges.
                </p>

                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1 bg-[#FF3131] hover:bg-[#e12b2b] text-white"
                    onClick={() => setIsRegOpen(true)}
                  >
                    Join Now
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    className="flex-1 border border-[#FF3131] text-[#FF3131] hover:bg-[#FF3131]/10"
                    onClick={() => {
                      navigate("/programs");
                      setIsOpen(false);
                    }}
                  >
                    View Programs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Registration Modal */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        selectedPlan="Membership"
      />
    </nav>
  );
};

export default Navbar;