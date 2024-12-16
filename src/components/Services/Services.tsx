import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FaHeartbeat, FaBrain, FaEye, FaTooth, FaBone, FaBaby,
  FaStethoscope, FaCut, FaLungs, FaVenus, FaHeadSideVirus,
  FaHospitalUser, FaXRay, FaSearch, FaArrowRight
} from 'react-icons/fa';
import { GiKidneys } from 'react-icons/gi';

interface Service {
  key: string;
  icon: React.ElementType;
  subServices: string[];
  category: 'specialty' | 'diagnostic' | 'emergency' | 'support';
}

const services: Service[] = [
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

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const Icon = service.icon;

  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Card Header with Icon */}
        <div className="relative h-32 bg-gradient-to-br from-green-500 to-green-600 p-6 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 transform scale-y-0 origin-bottom 
                          transition-transform duration-300 group-hover:scale-y-100" />
          {/* Decorative Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)]" />
          </div>
          <Icon className="relative w-16 h-16 text-white transform transition-transform duration-300 
                         group-hover:scale-110 group-hover:rotate-12" />
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(`services.${service.key}.title`)}</h3>
          <p className="text-gray-600 mb-4">{t(`services.${service.key}.description`)}</p>
          <div className="space-y-2 mb-4">
            {service.subServices.map((subService) => (
              <div key={subService} className="text-sm text-gray-500">
                • {t(`services.${service.key}.subServices.${subService}`)}
              </div>
            ))}
          </div>
          <Link
            to={`/doctors?department=${service.key}`}
            className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200"
          >
            {t('departments.viewDoctors')} <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!searchQuery) return services;
    const query = searchQuery.toLowerCase();
    return services.filter(service => 
      t(`services.${service.key}.title`).toLowerCase().includes(query) ||
      t(`services.${service.key}.description`).toLowerCase().includes(query) ||
      service.subServices.some(sub => 
        t(`services.${service.key}.subServices.${sub}`).toLowerCase().includes(query)
      )
    );
  }, [searchQuery, t]);

  const servicesByCategory = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<Service['category'], Service[]>);
  }, [filteredServices]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative">
      {/* Background Medical Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left pattern */}
        <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-transparent rounded-full transform -rotate-45" />
        </div>
        {/* Bottom right pattern */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-gradient-to-tl from-green-500/20 to-transparent rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-poppins">
            {t('services.sectionTitle')}
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            {t('services.sectionDescription')}
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mb-12">
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
          <div key={category} className="mb-20 last:mb-0">
            <h3 className="text-2xl font-bold mb-10 text-gray-800 capitalize font-poppins 
                         border-l-4 border-green-500 pl-4">
              {t(`services.categories.${category}`)}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryServices.map((service) => (
                <ServiceCard key={service.key} service={service} />
              ))}
            </div>
          </div>
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
    </section>
  );
};

export default Services;
