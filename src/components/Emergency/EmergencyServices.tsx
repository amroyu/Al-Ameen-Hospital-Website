import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaPhone, FaAmbulance, FaClock, FaHeartbeat } from 'react-icons/fa';

const EmergencyServices: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 animate-gradient"></div>
      
      {/* Animated Pulse Ring */}
      <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse-ring"></div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Emergency Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <FaAmbulance className="w-20 h-20 text-white animate-bounce-gentle" />
              <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('emergency.title')}
          </h2>

          {/* 24/7 Badge */}
          <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <FaClock className="w-5 h-5 mr-2" />
            <span className="text-xl font-semibold">24/7</span>
          </div>

          {/* Description */}
          <p className="text-xl mb-12 text-white/90">
            {t('emergency.description')}
          </p>

          {/* Contact Number */}
          <div className="inline-flex items-center bg-white rounded-full px-8 py-4 
                         transform hover:scale-105 transition-transform duration-300 
                         shadow-lg hover:shadow-xl">
            <FaPhone className={`w-8 h-8 text-red-600 ${isRTL ? 'ml-4' : 'mr-4'}`} />
            <a href="tel:+966123456789" className="text-3xl font-bold text-red-600 
                                                  hover:text-red-700 transition-colors duration-300">
              {t('emergency.phone')}
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {['response', 'specialists', 'equipment'].map((feature) => (
              <div key={feature} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 
                                          transform hover:-translate-y-1 transition-transform duration-300">
                <FaHeartbeat className="w-10 h-10 mx-auto mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-2">
                  {t(`emergency.features.${feature}.title`)}
                </h3>
                <p className="text-white/80">
                  {t(`emergency.features.${feature}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyServices;
