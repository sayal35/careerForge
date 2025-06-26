import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Contact from "../Dashboard/Contact.jsx";

function Pathway() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pathway;
