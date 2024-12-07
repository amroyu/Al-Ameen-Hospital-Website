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

  const mainDepartments = t('departments.list', { returnObjects: true }) as string[];
  const contactMethods = t('contact.appointment.methods', { returnObjects: true }) as string[];

  const medicalServices: ServiceItem[] = [
    {
      icon: <FaEye className="w-12 h-12 text-primary-600" />,
      title: t('services.ophthalmology.title'),
      services: t('services.ophthalmology.services', { returnObjects: true }) as string[]
    },
    {
      icon: <FaPaintBrush className="w-12 h-12 text-primary-600" />,
      title: t('services.plastic.title'),
      services: t('services.plastic.services', { returnObjects: true }) as string[]
    },
    {
      icon: <FaBaby className="w-12 h-12 text-primary-600" />,
      title: t('services.pediatricICU.title'),
      services: t('services.pediatricICU.services', { returnObjects: true }) as string[]
    },
    {
      icon: <FaHeadSideVirus className="w-12 h-12 text-primary-600" />,
      title: t('services.ent.title'),
      services: t('services.ent.services', { returnObjects: true }) as string[]
    },
    {
      icon: <FaStethoscope className="w-12 h-12 text-primary-600" />,
      title: t('services.urology.title'),
      services: t('services.urology.services', { returnObjects: true }) as string[]
    },
    {
      icon: <FaTooth className="w-12 h-12 text-primary-600" />,
      title: t('services.dental.title'),
      services: t('services.dental.services', { returnObjects: true }) as string[]
    },
    {
      icon: <FaHeartbeat className="w-12 h-12 text-primary-600" />,
      title: t('services.cardiology.title'),
      services: t('services.cardiology.services', { returnObjects: true }) as string[]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{t('services.title')} | {t('header.hospitalName')}</title>
        <meta name="description" content="الخدمات الطبية المتكاملة في مستشفى الأمين العام" />
      </Helmet>

      {/* Main Departments Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('departments.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainDepartments.map((department: string, index: number) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold">{department}</h3>
                </div>
              </div>
            ))}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {service.services.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('contact.title')}
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <p className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <span className="font-semibold">{t('contact.workingHours')}:</span>
                <span>{t('contact.phone')}</span>
              </p>
              <p className="text-center text-gray-600">
                {t('contact.nationality')}
              </p>
              <div className="pt-4">
                <h3 className="font-semibold text-lg mb-3">{t('contact.appointment.title')}:</h3>
                <ul className="space-y-2">
                  {contactMethods.map((method: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
