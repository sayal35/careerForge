import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
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

// Debug component to log current location
function LocationLogger() {
  const location = useLocation()
  console.log("Current location:", location.pathname)
  return null
}

function Pathway() {
  console.log("Pathway component rendered")

  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <LocationLogger />
        <ScrollToTop />
        <Routes>
          {/* Debug route to test routing */}
          <Route
            path="/test"
            element={
              <div style={{ padding: "20px", background: "lightgreen" }}>
                <h1>Test Route Works!</h1>
                <p>If you can see this, routing is working.</p>
                <a href="/admin/login">Try Admin Login</a>
              </div>
            }
          />

          {/* Admin Routes - MUST be exact matches */}
          <Route
            path="/admin/login"
            element={
              <div>
                <h1>Admin Login Route Matched!</h1>
                <AdminLogin />
              </div>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* Public Routes */}
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

          {/* Catch-all route */}
          <Route
            path="*"
            element={
              <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-4">Current path: {window.location.pathname}</p>
                    <p className="text-gray-600 mb-8">The requested page could not be found.</p>
                    <div className="space-y-2">
                      <a
                        href="/"
                        className="block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Go Home
                      </a>
                      <a
                        href="/test"
                        className="block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        Test Route
                      </a>
                    </div>
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
