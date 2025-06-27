import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard.jsx"
import Contact from "../Dashboard/Contact.jsx"
import ApplyNow from "../Pages/ApplyNow.jsx"
import AvailableJobs from "../Pages/AvailableJobs.jsx"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import ExploreYourFuture from "../Pages/ExploreYourFuture.jsx"
import Blog from "../Pages/Blog.jsx"
import ScrollToTop from "../components/ScrollToTop.jsx"

function Pathway() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  )
}

export default Pathway
