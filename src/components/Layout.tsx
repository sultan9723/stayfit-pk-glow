import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingElements from "./FloatingElements";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-navy-primary text-white-text">
      <Navbar />
      <main className="relative">
        {children}
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
};

export default Layout;