import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaBars, FaTimes } from 'react-icons/fa';
import headerImage from '../../assets/images/Hospital Header.png';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('header.home') },
    { to: '/about', label: t('header.about') },
    { to: '/services', label: t('header.services') },
    { to: '/doctors', label: t('header.doctors') },
    { to: '/appointments', label: t('header.appointments') },
    { to: '/contact', label: t('header.contact') },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src={headerImage}
              alt="Al-Ameen Hospital"
              className="h-20 w-auto transform transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group hover:text-primary-600 text-gray-800 ${
                  location.pathname === link.to
                    ? 'text-primary-600 font-semibold'
                    : ''
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100 ${
                  location.pathname === link.to ? 'scale-x-100' : ''
                }`} />
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 text-gray-800 hover:bg-gray-100"
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>

            {/* Book Appointment Button */}
            <Link
              to="/appointments"
              className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center space-x-2"
            >
              <FaCalendarAlt className="w-4 h-4" />
              <span>{t('header.bookAppointment')}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-300 text-gray-800 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        <div className="container mx-auto px-4 py-4 bg-white shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  location.pathname === link.to
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-800 rounded-lg hover:bg-gray-100 transition-colors duration-300 text-left"
            >
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              to="/appointments"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 flex items-center justify-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaCalendarAlt className="w-4 h-4" />
              <span>{t('header.bookAppointment')}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
