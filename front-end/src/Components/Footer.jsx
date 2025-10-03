import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Media */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white text-2xl font-bold mb-4"
            >
              <img className="h-15 w-auto mr-4" src="/trace.svg" alt="logo" />
            </Link>
            <p className="text-sm">
              An affordable logistics solution for students.
            </p>
            <div className="flex space-x-4 mt-4">
              {/* Social media links (use <a> for external links) */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.37a8.557 8.557 0 01-5.71-2.11 8.535 8.535 0 01-2.11-5.71v-4.14a8.535 8.535 0 012.11-5.71 8.557 8.557 0 015.71-2.11h7.42a8.557 8.557 0 015.71 2.11 8.535 8.535 0 012.11 5.71v4.14a8.535 8.535 0 01-2.11 5.71 8.557 8.557 0 01-5.71 2.11H8.29zm-5.46-9.92a.75.75 0 00-.75.75v4.14a.75.75 0 00.75.75.75.75 0 00.75-.75v-4.14a.75.75 0 00-.75-.75z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22.46 6.17a6.22 6.22 0 01-1.76.48 3.12 3.12 0 001.37-1.68 6.25 6.25 0 01-1.95.74 3.12 3.12 0 00-5.33 2.85 8.84 8.84 0 01-6.4-3.23 3.13 3.13 0 001 4.18 3.1 3.1 0 01-1.4-.38v.04a3.12 3.12 0 002.5 3.06 3.13 3.13 0 01-1.4.05 3.13 3.13 0 002.9 2.17 6.26 6.26 0 01-3.87 1.34c-.25 0-.5 0-.74-.04a8.87 8.87 0 004.79 1.4 8.84 8.84 0 009.28-9.28v-.15a6.23 6.23 0 001.54-1.6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links (converted to Link) */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors duration-300"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-white transition-colors duration-300"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/delivery"
                  className="hover:text-white transition-colors duration-300"
                >
                  Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/tracking"
                  className="hover:text-white transition-colors duration-300"
                >
                  Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information with University */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h4>
            <p className="text-sm">
              <span className="font-bold">Ahmadu Bello University</span>
              <br />
              Zaria, Nigeria
            </p>
            <p className="text-sm mt-2">Email: support@yourcompany.com</p>
            <p className="text-sm">Phone: +234 800 123 4567</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
