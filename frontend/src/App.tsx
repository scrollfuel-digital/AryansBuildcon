
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import VideoIntro from './components/ui/VideoIntro';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignupPage from './pages/AdminSignupPage';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import InquiryModal from './components/ui/InquiryModal';

function AppContent() {

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

  const handleExploreProjectsClick = () => {
    if (location.pathname === '/') {
      document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToId: 'projects-section' } });
    }
  };

  const handleBookConsultationClick = () => {
    if (location.pathname === '/') {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollToId: 'contact-section' } });
    }
  };

  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/signup" element={<AdminSignupPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#FAF8F4] overflow-x-hidden selection:bg-accent-gold/20 selection:text-charcoal text-charcoal">
      {/* {!introFinished && (
        <VideoIntro onComplete={() => setIntroFinished(true)} />
      )} */}

        <ScrollToTop />

        <div
          id="scroll-progress-bar"
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent-gold to-accent-dark-gold z-[100] transition-all duration-75 ease-out shadow-[0_1px_4px_rgba(201,165,106,0.4)]"
          style={{ width: `${scrollProgress}%` }}
        />

        <Navbar onStartProjectClick={handleStartProjectClick} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                onExploreProjects={handleExploreProjectsClick}
                onBookConsultation={handleBookConsultationClick}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          
        </Routes>

        <Footer />
        <InquiryModal />
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
