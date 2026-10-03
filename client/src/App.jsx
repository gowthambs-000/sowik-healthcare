import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Packages from './pages/Packages';
import BookNurse from './pages/BookNurse';
import Team from './pages/Team';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Rentals from './pages/Rentals';
import AdminRentals from './pages/Admin/AdminRentals';
import ForgotPassword from './pages/admin/ForgotPassword';
import Referral from './pages/Referral';
import JoinUs from './pages/JoinUs';
import Referrals from './pages/Admin/Referrals';

export default function App() {
  return (
    <div className="font-sans text-slate-700 min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/book-a-nurse" element={<BookNurse />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<Refund />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/admin/rentals" element={<ProtectedRoute><AdminRentals /></ProtectedRoute>} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/admin/referrals" element={<Referrals />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}