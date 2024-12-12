import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white min-h-screen pt-20">
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl mb-8">
            {t('hero.description')}
          </p>
          <div className="space-x-4 rtl:space-x-reverse">
            <Link
              to="/appointments"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-full font-bold hover:bg-primary-50 transition duration-300"
            >
              {t('hero.bookAppointment')}
            </Link>
            <Link
              to="/services"
              className="inline-block bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primary-600 transition duration-300"
            >
              {t('hero.ourServices')}
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Emergency Care */}
          <div className="bg-white text-gray-800 p-6 md:p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-bold mb-4 text-primary-600">
              {t('hero.features.emergency.title')}
            </h3>
            <p className="text-gray-600">{t('hero.features.emergency.description')}</p>
          </div>

          {/* Qualified Doctors */}
          <div className="bg-white text-gray-800 p-6 md:p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-bold mb-4 text-primary-600">
              {t('hero.features.doctors.title')}
            </h3>
            <p className="text-gray-600">{t('hero.features.doctors.description')}</p>
          </div>

          {/* Modern Technology */}
          <div className="bg-white text-gray-800 p-6 md:p-8 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-bold mb-4 text-primary-600">
              {t('hero.features.technology.title')}
            </h3>
            <p className="text-gray-600">{t('hero.features.technology.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
