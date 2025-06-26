import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Contact from "../Dashboard/Contact.jsx";
import JobDetailPage from "../Pages/JobDetailPage.jsx";
import Navbar from "../components/Navbar.jsx";

function Pathway() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs/:jobId" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pathway;
