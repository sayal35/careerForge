"use client"

import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const scrollTimeout = useRef(null)
  const location = useLocation()

  // Detect scrolling for shadow effect
  const handleScroll = () => {
    clearTimeout(scrollTimeout.current)
    setIsScrolling(true)
    scrollTimeout.current = setTimeout(() => setIsScrolling(false), 150)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu and scroll to top on route change
  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [location])

  const navLinks = [
    { name: "Blog", to: "/blog" },
    { name: "Explore Your Future", to: "/explore" },
    { name: "Apply Now", to: "/apply" },
    { name: "Available Jobs", to: "/jobs" },
  ]

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

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.to} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle Menu">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="block"
              onClick={() => setMenuOpen(false)} // extra close safety
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Navbar
