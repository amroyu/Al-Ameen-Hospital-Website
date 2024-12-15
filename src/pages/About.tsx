import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FaHospital, FaUserMd, FaAward } from 'react-icons/fa';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      icon: <FaHospital className="w-12 h-12 text-blue-600" />,
      number: "1399",
      label: t('about.stats.established.label'),
      suffix: t('about.stats.established.suffix')
    },
    {
      icon: <FaUserMd className="w-12 h-12 text-blue-600" />,
      number: t('about.stats.doctors.number'),
      label: t('about.stats.doctors.label')
    },
    {
      icon: <FaAward className="w-12 h-12 text-blue-600" />,
      number: t('about.stats.departments.number'),
      label: t('about.stats.departments.label')
    }
  ];

  // Using type assertion to handle the array return type
  const departmentsList = (t('about.departments.list', { returnObjects: true }) as string[]);

  return (
    <>
      <Helmet>
        <title>{t('about.pageTitle')}</title>
        <meta name="description" content={t('about.metaDescription')} />
      </Helmet>

      <div className="pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">{t('about.title')}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                {stat.icon}
                <div className="text-3xl font-bold mt-4">
                  {stat.number}
                  {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Departments Section */}
          <div className="bg-white rounded-lg shadow-lg p-8" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-2xl font-bold mb-6 text-center">{t('about.departments.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.isArray(departmentsList) && departmentsList.map((dept: string, index: number) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mx-3"></div>
                  <span className="flex-1">{dept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
