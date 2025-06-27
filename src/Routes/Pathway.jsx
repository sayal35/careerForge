import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard.jsx"
import Contact from "../Dashboard/Contact.jsx"
import ApplyNow from "../Pages/ApplyNow.jsx"
import AvailableJobs from "../Pages/AvailableJobs.jsx"
import JobDetailPage from "../Pages/JobDetailPage.jsx"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import ExploreYourFuture from "../Pages/ExploreYourFuture.jsx"
import Blog from "../Pages/Blog.jsx"
import AdminWrapper from "../components/AdminWrapper.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx"

function Pathway() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminWrapper />} />
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
          path="/jobs/:jobId"
          element={
            <>
              <Navbar />
              <JobDetailPage />
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
  )
}

export default Pathway
