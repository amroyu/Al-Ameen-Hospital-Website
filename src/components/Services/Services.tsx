import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaHospital, FaStethoscope, FaTooth, FaBrain, FaHeartbeat, FaEye, 
         FaBaby, FaUserMd, FaLungs, FaBone, FaCut } from 'react-icons/fa';
import { GiKidneys } from 'react-icons/gi';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    { key: 'orthopedics', icon: FaBone },
    { key: 'generalSurgery', icon: FaCut },
    { key: 'ent', icon: FaStethoscope },
    { key: 'obgyn', icon: FaBaby },
    { key: 'digestive', icon: FaUserMd },
    { key: 'urology', icon: GiKidneys },
    { key: 'respiratory', icon: FaLungs },
    { key: 'neurology', icon: FaBrain },
    { key: 'ophthalmology', icon: FaEye },
    { key: 'pediatrics', icon: FaBaby },
    { key: 'cardiology', icon: FaHeartbeat },
    { key: 'dental', icon: FaTooth },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary-600">
            {t('services.sectionTitle')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('services.sectionDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.key}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 
                         transform hover:-translate-y-1 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full 
                                bg-primary-50 text-primary-600 group-hover:bg-primary-100 
                                transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 ml-4 group-hover:text-primary-600 
                               transition-colors duration-300">
                      {t(`services.departments.${service.key}`)}
                    </h3>
                  </div>
                  {t(`services.noServices`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
