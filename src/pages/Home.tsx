import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/Home/HeroSection';
import ServiceHighlights from '../components/Home/ServiceHighlights';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('home.pageTitle')} - Al-Ameen Hospital</title>
        <meta name="description" content={t('home.metaDescription')} />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <ServiceHighlights />
        
        {/* Emergency Contact Section */}
        <section className="bg-red-600 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('home.emergency.title')}</h2>
            <p className="text-xl mb-4">{t('home.emergency.description')}</p>
            <div className="text-4xl font-bold">
              <a href="tel:+966123456789">+966 123 456 789</a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('home.whyChooseUs.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Add your reasons here */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
