"use client"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminAuthProvider } from "../contexts/AdminAuthContext"
import ProtectedAdminRoute from "../components/ProtectedAdminRoute"
import Dashboard from "../Dashboard/Dashboard.jsx"
import Contact from "../Dashboard/Contact.jsx"
import ApplyNow from "../pages/ApplyNow.jsx"
import AvailableJobs from "../pages/AvailableJobs.jsx"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import ExploreYourFuture from "../pages/ExploreYourFuture.jsx"
import Blog from "../pages/Blog.jsx"
import AdminLogin from "../pages/AdminLogin.jsx"
import AdminDashboard from "../pages/AdminDashboard.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx"

function Pathway() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes MUST come FIRST - before the wildcard */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* Public Routes with Layout */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Dashboard />
                <Footer />
              </>
            }
          />

          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />

          <Route
            path="/apply"
            element={
              <>
                <Navbar />
                <ApplyNow />
                <Footer />
              </>
            }
          />

          <Route
            path="/jobs"
            element={
              <>
                <Navbar />
                <AvailableJobs />
                <Footer />
              </>
            }
          />

          <Route
            path="/explore"
            element={
              <>
                <Navbar />
                <ExploreYourFuture />
                <Footer />
              </>
            }
          />

          <Route
            path="/blog"
            element={
              <>
                <Navbar />
                <Blog />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  )
}

export default Pathway
