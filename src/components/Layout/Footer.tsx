import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaArrowRight,
  FaWhatsapp
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://whatsapp.com', label: 'WhatsApp' }
  ];

  const quickLinks = [
    { href: '/doctors', label: t('footer.doctors') },
    { href: '/services', label: t('footer.services') },
    { href: '/about', label: t('footer.about') },
    { href: '/contact', label: t('footer.contact') },
    { href: '/appointments', label: t('footer.appointments') }
  ];

  const workingHours = [
    { day: t('footer.workingHours.weekdays'), hours: '8:00 AM - 10:00 PM' },
    { day: t('footer.workingHours.weekend'), hours: '9:00 AM - 8:00 PM' }
  ];

  return (
    <footer className="bg-[#1a4f7c] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact Information */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-blue-400 pb-2 inline-block">
              {t('footer.contact')}
            </h3>
            <div className="space-y-4">
              <a href="tel:+966127366100" 
                className="flex items-center text-blue-200 hover:text-white transition-colors group">
                <FaPhone className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'} text-blue-300 group-hover:text-white transition-colors`} />
                <span>{t('contact.phoneValue')}</span>
              </a>
              <a href="mailto:info@alameenhospital.com" 
                className="flex items-center text-blue-200 hover:text-white transition-colors group">
                <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-500 transition-all">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <span>info@alameenhospital.com</span>
              </a>
              <div className="flex items-start text-blue-200">
                <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <span>{t('footer.address')}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className={`text-2xl font-bold text-white mb-6 border-b border-blue-400 pb-2 inline-block ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} 
                    className={`flex items-center text-blue-200 hover:text-white transition-colors group ${isRTL ? 'flex-row-reverse justify-start' : ''}`}>
                    {!isRTL && (
                      <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-500 transition-all">
                        <FaArrowRight className="w-4 h-4" />
                      </div>
                    )}
                    <span className="flex-grow">{t(link.label)}</span>
                    {isRTL && (
                      <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-500 transition-all">
                        <FaArrowRight className="w-4 h-4 rotate-180" />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Working Hours */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-blue-400 pb-2 inline-block">
              {t('footer.workingHours.title')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start text-blue-200">
                <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <FaClock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-white">{t('footer.workingHours.weekdays')}</p>
                  <p className="text-blue-200">8:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-start text-blue-200">
                <div className="w-8 h-8 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <FaClock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-white">{t('footer.workingHours.weekend')}</p>
                  <p className="text-blue-200">9:00 AM - 8:00 PM</p>
                </div>
              </div>
              <div className="mt-4 bg-green-500 bg-opacity-20 p-3 rounded-lg">
                <p className="text-green-300 font-medium">
                  {t('footer.workingHours.emergency')}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl font-bold text-white mb-6 border-b border-blue-400 pb-2 inline-block">
              {t('footer.followUs')}
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-400 bg-opacity-20 rounded-full flex items-center justify-center 
                           text-blue-200 hover:bg-blue-500 hover:text-white transform hover:-translate-y-1 
                           transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-blue-400 border-opacity-30 text-center">
          <p className="text-blue-200">
            Al-Ameen Hospital 2024 - {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
