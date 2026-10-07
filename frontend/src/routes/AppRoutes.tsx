import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/user/Home";
import AboutPage from "../pages/user/AboutPage";
import ProjectsPage from "../pages/user/ProjectsPage";
import ProjectDetailPage from "../pages/user/ProjectDetailPage";
import BlogPage from "../pages/user/BlogPage";
import BlogDetailsPage from "../pages/user/BlogDetailsPage";
import ContactPage from "../pages/user/ContactPage";

import AdminLoginPage from "../pages/admin/AdminLoginPage";
import AdminSignupPage from "../pages/AdminSignupPage";
import AdminRoutes from "./AdminRoutes";
import Gallery from "@/pages/user/Gallery";

export const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartProjectClick = () => {
    if (location.pathname === "/") {
      document
        .getElementById("contact-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToId: "contact-section" } });
    }
  };

  const handleExploreProjectsClick = () => {
    if (location.pathname === "/") {
      document
        .getElementById("projects-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToId: "projects-section" } });
    }
  };

  const handleBookConsultationClick = () => {
    if (location.pathname === "/") {
      document
        .getElementById("contact-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollToId: "contact-section" } });
    }
  };

  return (
    <Routes>
      {/* Public User Routes */}
      <Route element={<UserLayout />}>
        <Route
          path="/"
          element={
            <Home
              onExploreProjects={handleExploreProjectsClick}
              onBookConsultation={handleBookConsultationClick}
            />
          }
        />

        <Route
          path="/Home"
          element={
            <Home
              onExploreProjects={handleExploreProjectsClick}
              onBookConsultation={handleBookConsultationClick}
            />
          }
        />
        <Route path="Home/About" element={<AboutPage />} />
        <Route path="Home/projects" element={<ProjectsPage />} />
        <Route path="project/:id" element={<ProjectDetailPage />} />
        <Route path="Home/blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogDetailsPage />} />
        <Route path="Home/contact" element={<ContactPage />} />
        <Route path="Home/Gallery" element={<Gallery />} />
      </Route>

      {/* Public Admin Auth Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/signup" element={<AdminSignupPage />} />

      {/* Protected Admin Nested Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
