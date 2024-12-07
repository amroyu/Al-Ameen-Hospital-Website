import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="relative container mx-auto px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl mb-8">
            {t('hero.description')}
          </p>
          <div className="space-x-4">
            <Link
              to="/appointments"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition duration-300"
            >
              {t('hero.bookAppointment')}
            </Link>
            <Link
              to="/services"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition duration-300"
            >
              {t('hero.ourServices')}
            </Link>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-4 -mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Emergency Care */}
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-600">
              {t('hero.features.emergency.title')}
            </h3>
            <p>{t('hero.features.emergency.description')}</p>
          </div>

          {/* Qualified Doctors */}
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-600">
              {t('hero.features.doctors.title')}
            </h3>
            <p>{t('hero.features.doctors.description')}</p>
          </div>

          {/* Modern Technology */}
          <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-blue-600">
              {t('hero.features.technology.title')}
            </h3>
            <p>{t('hero.features.technology.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
