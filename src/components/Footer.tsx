import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              About
            </h3>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              FreemiumTools.com provides free online tools for everyday tasks. Our mission is to make useful tools accessible to everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  About
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/suggest" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  Suggest a Tool
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Connect
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a 
                  href="mailto:contact@freemiumtools.com"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/freemiumtools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/freemiumtools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-[#E55B4D] dark:hover:text-[#E55B4D]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} FreemiumTools.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 