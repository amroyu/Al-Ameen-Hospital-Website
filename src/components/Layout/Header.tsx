import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            {t('header.hospitalName')}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Navigation menu */}
          <nav className={`md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
            <ul className="md:flex md:items-center">
              <li className="md:mx-4">
                <Link to="/">{t('header.home')}</Link>
              </li>
              <li className="md:mx-4">
                <Link to="/about">{t('header.about')}</Link>
              </li>
              <li className="md:mx-4">
                <Link to="/services">{t('header.services')}</Link>
              </li>
              <li className="md:mx-4">
                <Link to="/doctors">{t('header.doctors')}</Link>
              </li>
            </ul>
          </nav>

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-white text-blue-600 rounded"
          >
            {i18n.language === 'en' ? 'عربي' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
