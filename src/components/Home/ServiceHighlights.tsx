import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaHeart, FaBrain, FaBone, FaUserMd, FaTeeth, FaEye } from 'react-icons/fa';

const ServiceHighlights = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <FaHeart className="w-12 h-12" />,
      title: t('services.cardiology.title'),
      description: t('services.cardiology.description'),
    },
    {
      icon: <FaBrain className="w-12 h-12" />,
      title: t('services.neurology.title'),
      description: t('services.neurology.description'),
    },
    {
      icon: <FaBone className="w-12 h-12" />,
      title: t('services.orthopedics.title'),
      description: t('services.orthopedics.description'),
    },
    {
      icon: <FaUserMd className="w-12 h-12" />,
      title: t('services.pediatrics.title'),
      description: t('services.pediatrics.description'),
    },
    {
      icon: <FaTeeth className="w-12 h-12" />,
      title: t('services.dental.title'),
      description: t('services.dental.description'),
    },
    {
      icon: <FaEye className="w-12 h-12" />,
      title: t('services.ophthalmology.title'),
      description: t('services.ophthalmology.description'),
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('services.sectionTitle')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('services.sectionDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
