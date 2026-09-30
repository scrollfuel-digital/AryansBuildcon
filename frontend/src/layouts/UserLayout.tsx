import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';
import InquiryModal from '../components/ui/InquiryModal';

export const UserLayout: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartProjectClick = () => {
    if (location.pathname === '/') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToId: 'contact-section' } });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F4] overflow-x-hidden selection:bg-accent-gold/20 selection:text-charcoal text-charcoal flex flex-col justify-between">
      <ScrollToTop />

      <div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent-gold to-accent-dark-gold z-[100] transition-all duration-75 ease-out shadow-[0_1px_4px_rgba(201,165,106,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar onStartProjectClick={handleStartProjectClick} />

      <main className="flex-grow pt-[86px] md:pt-[100px]">
        <Outlet />
      </main>

      <Footer />
      <InquiryModal />
    </div>
  );
};

export default UserLayout;
