import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { 
  FaEye, FaPaintBrush, FaBaby, 
  FaHeadSideVirus, FaStethoscope, FaTooth,
  FaHeartbeat
} from 'react-icons/fa';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  services: string[];
}

const Services: React.FC = () => {
  const { t } = useTranslation();

  // Add error handling and type checking for translations
  const getTranslatedList = (key: string): string[] => {
    try {
      const list = t(key, { returnObjects: true });
      return Array.isArray(list) ? list : [];
    } catch (error) {
      console.error(`Error getting translation for ${key}:`, error);
      return [];
    }
  };

  const mainDepartments = getTranslatedList('departments.list');

  const medicalServices: ServiceItem[] = [
    {
      icon: <FaEye className="w-12 h-12 text-primary-600" />,
      title: t('services.ophthalmology.title'),
      services: getTranslatedList('services.ophthalmology.services')
    },
    {
      icon: <FaPaintBrush className="w-12 h-12 text-primary-600" />,
      title: t('services.plastic.title'),
      services: getTranslatedList('services.plastic.services')
    },
    {
      icon: <FaBaby className="w-12 h-12 text-primary-600" />,
      title: t('services.pediatricICU.title'),
      services: getTranslatedList('services.pediatricICU.services')
    },
    {
      icon: <FaHeadSideVirus className="w-12 h-12 text-primary-600" />,
      title: t('services.ent.title'),
      services: getTranslatedList('services.ent.services')
    },
    {
      icon: <FaStethoscope className="w-12 h-12 text-primary-600" />,
      title: t('services.urology.title'),
      services: getTranslatedList('services.urology.services')
    },
    {
      icon: <FaTooth className="w-12 h-12 text-primary-600" />,
      title: t('services.dental.title'),
      services: getTranslatedList('services.dental.services')
    },
    {
      icon: <FaHeartbeat className="w-12 h-12 text-primary-600" />,
      title: t('services.cardiology.title'),
      services: getTranslatedList('services.cardiology.services')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{t('services.title')} | {t('header.hospitalName')}</title>
        <meta name="description" content={t('services.sectionDescription')} />
      </Helmet>

      {/* Main Departments Section */}
      <section className="pt-32 pb-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('departments.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainDepartments && mainDepartments.length > 0 ? (
              mainDepartments.map((department: string, index: number) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <h3 className="text-lg font-semibold">{department}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                {t('departments.noData')}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Medical Services Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t('services.title')}
          </h2>
          
          <div className="space-y-12">
            {medicalServices.map((service: ServiceItem, index: number) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                  {service.icon}
                  <h3 className="text-2xl font-bold">{service.title}</h3>
                </div>
                {service.services && service.services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.services.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">{t('services.noData')}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
