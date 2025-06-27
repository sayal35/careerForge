"use client"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminAuthProvider } from "../contexts/AdminAuthContext"
import ProtectedAdminRoute from "../components/ProtectedAdminRoute"
import Dashboard from "../Dashboard/Dashboard.jsx"
import Contact from "../Dashboard/Contact.jsx"
import ApplyNow from "../Pages/ApplyNow.jsx"
import AvailableJobs from "../Pages/AvailableJobs.jsx"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import ExploreYourFuture from "../Pages/ExploreYourFuture.jsx"
import Blog from "../Pages/Blog.jsx"
import AdminLogin from "../Pages/AdminLogin.jsx"
import AdminDashboard from "../Pages/AdminDashboard.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx"

function Pathway() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Hidden Admin Routes - Only accessible via direct URL */}
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
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/apply" element={<ApplyNow />} />
                  <Route path="/jobs" element={<AvailableJobs />} />
                  <Route path="/explore" element={<ExploreYourFuture />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
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
