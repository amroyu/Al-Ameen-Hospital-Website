import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/Home/HeroSection';
import ServiceHighlights from '../components/Home/ServiceHighlights';
import WhyChooseUs from '../components/Home/WhyChooseUs';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('home.pageTitle')}</title>
        <meta name="description" content={t('home.metaDescription')} />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <WhyChooseUs />
        <ServiceHighlights />
        
        {/* Emergency Contact Section */}
        <section className="bg-red-600 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('home.emergency.title')}</h2>
            <p className="text-xl mb-4">{t('home.emergency.description')}</p>
            <div className="text-4xl font-bold">
              <a href="tel:+966127366100" dir="ltr">+966 127 366 100</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
