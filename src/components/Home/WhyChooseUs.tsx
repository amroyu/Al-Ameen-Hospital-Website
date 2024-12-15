import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserMd, FaHospital, FaMicroscope } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface BenefitItem {
  icon: IconType;
  key: string;
  color: string;
}

const WhyChooseUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const benefits: BenefitItem[] = [
    {
      icon: FaUserMd,
      key: 'experts',
      color: 'bg-gradient-to-r from-blue-500 to-blue-600'
    },
    {
      icon: FaHospital,
      key: 'trusted',
      color: 'bg-gradient-to-r from-green-500 to-green-600'
    },
    {
      icon: FaMicroscope,
      key: 'equipment',
      color: 'bg-gradient-to-r from-purple-500 to-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('home.whyChooseUs.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.whyChooseUs.subtitle')}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.key}
                className="relative group transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full ${benefit.color} 
                                flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                    {t(`home.whyChooseUs.benefits.${benefit.key}.title`)}
                  </h3>
                  <p className={`text-gray-600 text-center ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t(`home.whyChooseUs.benefits.${benefit.key}.description`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
