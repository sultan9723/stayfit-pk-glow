import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HomePage from "./pages/HomePage";
import ProgramsPage from "./pages/ProgramsPage";
import TrainersPage from "./pages/TrainersPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProgramBookingForm from "./pages/ProgramBookingForm";
import TrainerBookingForm from "./pages/TrainerBookingForm";
import JoinNowForm from "./pages/JoinNowForm";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/trainers" element={<TrainersPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/book-program" element={<ProgramBookingForm />} />
              <Route path="/book-trainer" element={<TrainerBookingForm />} />
              <Route path="/join-now" element={<JoinNowForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;