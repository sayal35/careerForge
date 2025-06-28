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

const Pathway = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/admin" element={<AdminWrapper />} />
      {[
        { path: "/", element: <Dashboard /> },
        { path: "/contact", element: <Contact /> },
        { path: "/apply", element: <ApplyNow /> },
        { path: "/jobs", element: <AvailableJobs /> },
        { path: "/jobs/:jobId", element: <JobDetailPage /> },
        { path: "/explore", element: <ExploreYourFuture /> },
        { path: "/blog", element: <Blog /> },
      ].map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <>
              <Navbar />
              {element}
              <Footer />
            </>
          }
        />
      ))}
    </Routes>
  </BrowserRouter>
)

export default Pathway
