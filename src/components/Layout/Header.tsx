import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt } from 'react-icons/fa';
import logo from '../../assets/images/hospital-logo.png';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setIsScrolled(isScrolled);
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'header.home' },
    { path: '/about', label: 'header.about' },
    { path: '/services', label: 'header.services' },
    { path: '/announcements', label: 'header.announcements' },
    { path: '/doctors', label: 'header.doctors' },
    { path: '/appointments', label: 'header.appointments' },
    { path: '/contact', label: 'header.contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className="fixed w-full z-50 transition-all duration-300 bg-gradient-to-r from-green-50 via-white to-green-50 shadow-sm"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-28">
          {/* Logo - Moved to the right for Arabic */}
          <div className="flex items-center order-2 md:order-3">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Al-Ameen Hospital"
                className="h-24 w-auto transition-transform duration-300 hover:scale-105"
              />
            </Link>
          </div>

          {/* Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse order-1 md:order-2 flex-grow justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(link.path)
                    ? 'text-green-700'
                    : 'text-gray-700 hover:text-green-700'
                }`}
              >
                {t(link.label)}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform origin-left transition-transform duration-300 ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Language Toggle and Appointment Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse order-3 md:order-1">
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-all duration-300"
            >
              {i18n.language === 'ar' ? 'English' : 'العربية'}
            </button>
            <Link
              to="/appointments"
              className="flex items-center px-6 py-2.5 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transition-all duration-300 group"
            >
              <FaCalendarAlt className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 group-hover:scale-110 transition-transform duration-300" />
              {t('header.bookAppointment')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none order-1"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } absolute top-full left-0 right-0 bg-white shadow-lg`}
      >
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 ${
                isActive(link.path)
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-green-700'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t(link.label)}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300"
            >
              {i18n.language === 'ar' ? 'English' : 'العربية'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
