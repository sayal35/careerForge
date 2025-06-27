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
          {/* Admin Routes - These MUST come first and be exact */}
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

          {/* Catch-all route for 404 - This should be LAST */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-8">Page not found</p>
                    <a
                      href="/"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      Go Home
                    </a>
                  </div>
                </div>
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
