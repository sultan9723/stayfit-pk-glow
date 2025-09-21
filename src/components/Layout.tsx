import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingElements from "./FloatingElements";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white text-foreground">
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