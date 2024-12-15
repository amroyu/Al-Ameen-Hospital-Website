import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPhone } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto">
        {/* Top Bar */}
        <div className="bg-primary-500 text-white py-2 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>Emergency: +966 12 736 6500</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white hover:text-gray-200">English</button>
              <button className="text-white hover:text-gray-200">عربي</button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex justify-between items-center py-4 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt={t('common.hospitalName')}
              className="h-12"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'text-primary-600' : 'text-gray-600'}`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === '/about' ? 'text-primary-600' : 'text-gray-600'}`}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/services"
              className={`nav-link ${location.pathname === '/services' ? 'text-primary-600' : 'text-gray-600'}`}
            >
              {t('nav.services')}
            </Link>
            <Link
              to="/doctors"
              className={`nav-link ${location.pathname === '/doctors' ? 'text-primary-600' : 'text-gray-600'}`}
            >
              {t('nav.doctors')}
            </Link>
            <Link
              to="/appointments"
              className={`nav-link ${location.pathname === '/appointments' ? 'text-primary-600' : 'text-gray-600'}`}
            >
              {t('nav.appointments')}
            </Link>
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === '/contact' ? 'text-primary-600' : 'text-gray-600'}`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Book Appointment Button */}
          <Link
            to="/appointments"
            className="hidden md:inline-block px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {t('common.bookAppointment')}
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
