import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTimeout = useRef(null);

  const handleScroll = () => {
    clearTimeout(scrollTimeout.current);
    setIsScrolling(true);
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 150);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition duration-300 ${
        isScrolling
          ? "bg-blue-50/80 border-b border-blue-200 shadow-md backdrop-blur-md"
          : "bg-blue-50 border-b border-blue-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left - Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          careerforge
        </Link>

        {/* Right - Navigation for large screens */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#blog" className="hover:underline">
            Blog
          </a>
          <a href="#explore" className="hover:underline">
            Explore Your Future
          </a>
          <a href="#apply" className="hover:underline">
            Apply Now
          </a>
          <a href="#jobs" className="hover:underline">
            Available Jobs
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 font-medium text-gray-700">
          <a href="#blog" className="block">
            Blog
          </a>
          <a href="#explore" className="block">
            Explore Your Future
          </a>
          <a href="#apply" className="block">
            Apply Now
          </a>
          <a href="#jobs" className="block">
            Available Jobs
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
