import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gray-800 text-gray-200">
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Branding */}
      <div>
        <h2 className="text-2xl font-bold text-blue-500">Careerforge</h2>
        <p className="mt-2">
          Empowering your career path with expert advice & opportunities.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-semibold mb-2 text-blue-500">Explore</h3>
        <ul className="space-y-1">
          <li>
            <a href="#blog" className="hover:underline">
              Blog
            </a>
          </li>
          <li>
            <a href="#explore" className="hover:underline">
              Explore Your Future
            </a>
          </li>
          <li>
            <a href="#apply" className="hover:underline">
              Apply Now
            </a>
          </li>
          <li>
            <a href="#jobs" className="hover:underline">
              Available Jobs
            </a>
          </li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="font-semibold mb-2 text-blue-500">Resources</h3>
        <ul className="space-y-1">
          <li>
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:underline">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="#sitemap.xml" className="hover:underline">
              Sitemap
            </a>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="font-semibold mb-2 text-blue-500">Stay in Touch</h3>
        <p className="mb-3 text-sm">Subscribe to our newsletter:</p>
        <form className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="px-3 py-2 rounded bg-gray-700 focus:outline-none text-gray-100 flex-grow"
          />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white">
            Subscribe
          </button>
        </form>
        <div className="mt-4 flex space-x-4 text-gray-400">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:text-black"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-blue-500"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-900"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </div>

    <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
      &copy; {new Date().getFullYear()} Careerforge. All rights reserved.
    </div>
  </footer>
);

export default Footer;
