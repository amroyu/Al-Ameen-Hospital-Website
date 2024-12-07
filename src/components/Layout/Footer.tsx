import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <FaPhone className="mr-2" />
                <span>+966 123 456 789</span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>info@alameenhospital.com</span>
              </p>
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>{t('footer.address')}</span>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>{t('footer.appointments')}</li>
              <li>{t('footer.emergency')}</li>
              <li>{t('footer.careers')}</li>
              <li>{t('footer.privacy')}</li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.workingHours')}</h3>
            <ul className="space-y-2">
              <li>{t('footer.weekdays')}: 8:00 AM - 10:00 PM</li>
              <li>{t('footer.weekends')}: 9:00 AM - 8:00 PM</li>
              <li className="text-red-400">{t('footer.emergency24')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
          <p>© 2024 Al-Ameen Hospital. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
