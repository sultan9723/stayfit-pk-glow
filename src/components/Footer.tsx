import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Dumbbell,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Programs", path: "/programs" },
    { name: "Trainers", path: "/trainers" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/stayfitpk" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/stayfitpk" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@stayfitpakistan1" },
  ];

  return (
    <footer className="bg-gradient-to-r from-very-dark-brown to-dark-brown border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Dumbbell className="w-8 h-8 text-accent-primary" />
              <span className="text-gradient-accent font-bold text-xl">StayFit.pk</span>
            </Link>
            <p className="text-warm-beige text-sm leading-relaxed">
              Transform your fitness journey with StayFit — Pakistan's premier fitness center. 
              Expert trainers, state-of-the-art equipment, and personalized programs in Rawalpindi.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-beige hover:text-accent-primary transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-warm-beige hover:text-accent-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <span className="text-warm-beige">Rawalpindi, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <a
                  href="tel:+923330711555"
                  className="text-warm-beige hover:text-accent-primary transition-colors"
                >
                  +92 333 0711555
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-primary flex-shrink-0" />
                <a
                  href="mailto:info@stayfit.com"
                  className="text-warm-beige hover:text-accent-primary transition-colors"
                >
                  info@stayfit.com
                </a>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-warm-beige">Mon - Fri</span>
                <span className="text-white font-medium">6:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-warm-beige">Saturday</span>
                <span className="text-white font-medium">7:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-warm-beige">Sunday</span>
                <span className="text-white font-medium">7:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-warm-beige text-sm">
            © {new Date().getFullYear()} StayFit.pk. All rights reserved. | 
            <Link
              to="/privacy"
              className="hover:text-accent-primary transition-colors duration-300 ml-1"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
