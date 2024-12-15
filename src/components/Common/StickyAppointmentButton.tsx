import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const StickyAppointmentButton = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/20 to-transparent z-50 md:hidden">
      <Link
        to="/appointments"
        className="flex items-center justify-center w-full px-6 py-4 bg-primary-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <FaCalendarAlt className="mr-2 text-xl" />
        {t('hero.bookAppointment')}
      </Link>
    </div>
  );
};

export default StickyAppointmentButton;
