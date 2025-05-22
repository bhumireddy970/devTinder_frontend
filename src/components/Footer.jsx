import React from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white">DevTender</h2>
          <p className="mt-3 text-sm text-gray-400">
            Connecting developers with opportunities. Code. Build. Grow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-indigo-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-indigo-400 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-indigo-400 transition">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-indigo-400 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/docs" className="hover:text-indigo-400 transition">
                Docs
              </a>
            </li>
            <li>
              <a href="/api" className="hover:text-indigo-400 transition">
                API
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-indigo-400 transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-indigo-400 transition">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400 text-xl">
            <a
              href="https://github.com"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://discord.com"
              className="hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaDiscord />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} DevTender. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
