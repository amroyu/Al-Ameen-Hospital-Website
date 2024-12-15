import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FaEye, FaPaintBrush, FaBaby, 
  FaHeadSideVirus, FaStethoscope, FaTooth,
  FaHeartbeat
} from 'react-icons/fa';
import PatternStethoscope from '../assets/patterns/PatternStethoscope';
import PatternHeartbeat from '../assets/patterns/PatternHeartbeat';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  services: string[];
}

const Services: React.FC = () => {
  const { t } = useTranslation();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>{t('services.title')} | {t('header.hospitalName')}</title>
        <meta name="description" content={t('services.sectionDescription')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <PatternStethoscope className="absolute top-0 right-0 w-96 h-96 text-primary-200 transform rotate-90" />
          <PatternHeartbeat className="absolute bottom-0 left-0 w-96 h-96 text-primary-200 transform -rotate-90" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services.sectionDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Departments Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('departments.title')}
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {mainDepartments && mainDepartments.length > 0 ? (
              mainDepartments.map((department: string, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-3 h-3 bg-primary-600 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-gray-900">{department}</h3>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500">
                {t('departments.noData')}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Medical Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('services.medicalServices')}
            </h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {medicalServices.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-primary-50 rounded-full">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <ul className="space-y-2">
                    {service.services.map((item, idx) => (
                      <li key={idx} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
