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
  category: 'specialty' | 'diagnostic' | 'emergency' | 'support';
}

const services: Service[] = [
  { key: 'internal-medicine', icon: FaStethoscope, category: 'specialty' },
  { key: 'pediatrics', icon: FaBaby, category: 'specialty' },
  { key: 'orthopedics', icon: FaBone, category: 'specialty' },
  { key: 'general-surgery', icon: FaCut, category: 'specialty' },
  { key: 'obstetrics-gynecology', icon: FaVenus, category: 'specialty' },
  { key: 'dental', icon: FaTooth, category: 'specialty' },
  { key: 'ent', icon: FaHeadSideVirus, category: 'specialty' },
  { key: 'rheumatology', icon: FaBone, category: 'specialty' },
  { key: 'cardiology', icon: FaHeartbeat, category: 'specialty' },
  { key: 'neurology', icon: FaBrain, category: 'specialty' },
  { key: 'psychiatry', icon: FaBrain, category: 'specialty' },
  { key: 'ophthalmology', icon: FaEye, category: 'specialty' },
  { key: 'urology', icon: GiKidneys, category: 'specialty' }
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const { t } = useTranslation();
  const Icon = service.icon;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <Icon className="text-2xl text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {t(`services.${service.key}.name`)}
        </h3>
        <p className="text-gray-600 mb-4">
          {t(`services.${service.key}.description`)}
        </p>
        <div className="space-y-2 mb-4">
          {Object.entries(t(`services.${service.key}.subServices`, { returnObjects: true })).map(([key, value]) => (
            <div key={key} className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <Link
          to={`/appointments?department=${service.key}`}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
        >
          {t('services.viewDepartmentDoctors')} <FaArrowRight className="ml-2" />
        </Link>
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
      t(`services.${service.key}.name`).toLowerCase().includes(query) ||
      t(`services.${service.key}.description`).toLowerCase().includes(query)
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-transparent rounded-full transform -rotate-45" />
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-gradient-to-tl from-green-500/20 to-transparent rounded-full" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-poppins">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            {t('services.subtitle')}
          </p>

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
