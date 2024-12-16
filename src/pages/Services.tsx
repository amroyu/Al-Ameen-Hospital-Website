import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, FaBrain, FaEye, FaTooth, FaBone, FaBaby,
  FaStethoscope, FaCut, FaLungs, FaVenus, FaHeadSideVirus,
  FaHospitalUser, FaXRay, FaSearch, FaArrowRight
} from 'react-icons/fa';
import { GiKidneys } from 'react-icons/gi';
import PatternStethoscope from '../assets/patterns/PatternStethoscope';
import PatternHeartbeat from '../assets/patterns/PatternHeartbeat';
import DepartmentPopup from '../components/Services/DepartmentPopup';

interface ServiceItem {
  key: string;
  icon: React.ElementType;
  subServices: string[];
  category: 'specialty' | 'diagnostic' | 'emergency' | 'support';
}

const services: ServiceItem[] = [
  {
    key: 'internal-medicine',
    icon: FaStethoscope,
    subServices: ['general-checkup', 'chronic-diseases', 'preventive-care'],
    category: 'specialty'
  },
  {
    key: 'pediatrics',
    icon: FaBaby,
    subServices: ['newborn-care', 'vaccinations', 'child-development'],
    category: 'specialty'
  },
  {
    key: 'orthopedics',
    icon: FaBone,
    subServices: ['joint-surgery', 'spine-treatment', 'sports-medicine'],
    category: 'specialty'
  },
  {
    key: 'general-surgery',
    icon: FaCut,
    subServices: ['laparoscopic-surgery', 'hernia-repair', 'appendectomy'],
    category: 'specialty'
  },
  {
    key: 'obstetrics-gynecology',
    icon: FaVenus,
    subServices: ['prenatal-care', 'delivery', 'gynecological-surgery'],
    category: 'specialty'
  },
  {
    key: 'dental',
    icon: FaTooth,
    subServices: ['dental-surgery', 'orthodontics', 'periodontics'],
    category: 'specialty'
  },
  {
    key: 'ent',
    icon: FaHeadSideVirus,
    subServices: ['ear-treatment', 'sinus-surgery', 'throat-disorders'],
    category: 'specialty'
  },
  {
    key: 'rheumatology',
    icon: FaBone,
    subServices: ['arthritis', 'autoimmune-diseases', 'joint-pain'],
    category: 'specialty'
  },
  {
    key: 'cardiology',
    icon: FaHeartbeat,
    subServices: ['heart-surgery', 'cardiac-catheterization', 'ecg'],
    category: 'specialty'
  },
  {
    key: 'neurology',
    icon: FaBrain,
    subServices: ['stroke-treatment', 'epilepsy', 'headache-clinic'],
    category: 'specialty'
  },
  {
    key: 'psychiatry',
    icon: FaBrain,
    subServices: ['mental-health', 'therapy', 'counseling'],
    category: 'specialty'
  },
  {
    key: 'ophthalmology',
    icon: FaEye,
    subServices: ['cataract-surgery', 'glaucoma', 'retina-treatment'],
    category: 'specialty'
  },
  {
    key: 'urology',
    icon: GiKidneys,
    subServices: ['kidney-stones', 'prostate-treatment', 'bladder-issues'],
    category: 'specialty'
  },
  {
    key: 'pulmonology',
    icon: FaLungs,
    subServices: ['asthma', 'copd', 'respiratory-infections'],
    category: 'specialty'
  },
  {
    key: 'nephrology',
    icon: GiKidneys,
    subServices: ['kidney-disease', 'dialysis', 'transplant-care'],
    category: 'specialty'
  },
  {
    key: 'anesthesiology',
    icon: FaHospitalUser,
    subServices: ['surgical-anesthesia', 'pain-management', 'critical-care'],
    category: 'support'
  },
  {
    key: 'radiology',
    icon: FaXRay,
    subServices: ['x-ray', 'ct-scan', 'mri'],
    category: 'diagnostic'
  }
];

const Services: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = services.filter(service => {
    const query = searchQuery.toLowerCase();
    return (
      t(`services.${service.key}.title`).toLowerCase().includes(query) ||
      t(`services.${service.key}.description`).toLowerCase().includes(query) ||
      service.subServices.some(sub => 
        t(`services.${service.key}.subServices.${sub}`).toLowerCase().includes(query)
      )
    );
  });

  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<ServiceItem['category'], ServiceItem[]>);

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <Helmet>
        <title>{t('services.title')} | Al-Ameen Hospital</title>
        <meta name="description" content={t('services.sectionDescription')} />
      </Helmet>

      <div className="container mx-auto px-4 py-24">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('services.sectionTitle')}
          </motion.h1>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('services.sectionDescription')}
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-16">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('services.searchPlaceholder')}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Services Grid */}
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <motion.div
            key={category}
            className="mb-20 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={`text-2xl font-bold mb-10 text-gray-800 capitalize font-poppins ${
              i18n.language === 'ar' ? 'border-r-4 pr-4' : 'border-l-4 pl-4'
            } border-green-500`}>
              {t(`services.categories.${category}`)}
            </h2>
            <div dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryServices.map((service) => (
                <motion.div
                  key={service.key}
                  className="group cursor-pointer"
                  onClick={() => setSelectedDepartment(service.key)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className={`relative h-32 ${
                      i18n.language === 'ar' 
                        ? 'bg-gradient-to-bl' 
                        : 'bg-gradient-to-br'
                      } from-green-500 to-green-600 p-6`}>
                      <div className="absolute inset-0 bg-white/10 transform scale-y-0 origin-bottom 
                                    transition-transform duration-300 group-hover:scale-y-100" />
                      <div className={`flex ${i18n.language === 'ar' ? 'justify-end' : 'justify-start'} w-full`}>
                        <service.icon className="w-16 h-16 text-white transform transition-transform duration-300 
                                            group-hover:scale-110 group-hover:rotate-12" />
                      </div>
                    </div>
                    <div className={`p-6 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {t(`services.${service.key}.title`)}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {t(`services.${service.key}.description`)}
                      </p>
                      <div className="space-y-2 mb-4">
                        {service.subServices.map((subService) => (
                          <div key={subService} className={`text-sm text-gray-500 ${
                            i18n.language === 'ar' ? 'mr-4' : 'ml-4'
                          }`}>
                            • {t(`services.${service.key}.subServices.${subService}`)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* No Results Message */}
        {Object.keys(servicesByCategory).length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {t('services.noResults')}
            </p>
          </div>
        )}
      </div>

      {/* Department Popup */}
      {selectedDepartment && (
        <DepartmentPopup
          departmentId={selectedDepartment}
          isOpen={true}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
};

export default Services;
