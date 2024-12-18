import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, FaBrain, FaEye, FaTooth, FaBone, FaBaby,
  FaStethoscope, FaCut, FaLungs, FaVenus, FaHeadSideVirus,
  FaHospitalUser, FaXRay, FaSearch
} from 'react-icons/fa';
import { GiKidneys } from 'react-icons/gi';
import DepartmentPopup from '../components/Services/DepartmentPopup';
import PageHero from '../components/Common/PageHero';

export interface ServiceItem {
  key: string;
  icon: React.ElementType;
  subServices: string[];
  category: 'specialty' | 'diagnostic' | 'emergency' | 'support';
}

export const services: ServiceItem[] = [
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
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{t('services.metaTitle')} | {t('header.hospitalName')}</title>
        <meta name="description" content={t('services.metaDescription')} />
      </Helmet>

      <PageHero
        title={t('services.title')}
        subtitle={t('services.subtitle')}
      />

      <div className="container mx-auto px-4 py-16">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-16">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('services.searchPlaceholder')}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Services Grid */}
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <motion.div
            key={category}
            className="mb-16 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-900 capitalize">
              {t(`services.categories.${category}`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryServices.map((service) => (
                <motion.div
                  key={service.key}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDepartment(service.key)}
                >
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center mb-4">
                      {React.createElement(service.icon, {
                        className: "w-6 h-6 text-primary-600"
                      })}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {t(`services.${service.key}.title`)}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {t(`services.${service.key}.description`)}
                    </p>
                    <div className="space-y-2">
                      {service.subServices.map((subService) => (
                        <div
                          key={subService}
                          className="text-sm text-gray-500 flex items-center"
                        >
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                          {t(`services.${service.key}.subServices.${subService}`)}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Department Popup */}
      {selectedDepartment && (
        <DepartmentPopup
          department={selectedDepartment}
          onClose={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
};

export default Services;
