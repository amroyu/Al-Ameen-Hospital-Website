import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import PageHero from '../components/Common/PageHero';
import { 
  FaHospital, 
  FaUserMd, 
  FaAward,
  FaStethoscope, // Internal Medicine
  FaBaby, // Pediatrics
  FaBone, // Orthopedics
  FaCut, // Surgery
  FaFemale, // OB/GYN
  FaTooth, // Dental
  FaHeadSideMask, // ENT
  FaHandHoldingMedical, // Rheumatology
  FaHeartbeat, // Cardiology
  FaBrain, // Neurology
  FaComments, // Psychiatry
  FaEye, // Ophthalmology
  FaProcedures, // Urology
  FaLungs, // Pulmonology
  FaFlask, // Nephrology
  FaSyringe, // Anesthesiology
  FaXRay  // Radiology
} from 'react-icons/fa';
import HospitalImage from '../assets/images/Hospital Image.png';

const departmentIcons = [
  { icon: FaStethoscope, color: 'text-blue-600' },
  { icon: FaBaby, color: 'text-pink-500' },
  { icon: FaBone, color: 'text-gray-600' },
  { icon: FaCut, color: 'text-red-500' },
  { icon: FaFemale, color: 'text-purple-500' },
  { icon: FaTooth, color: 'text-cyan-500' },
  { icon: FaHeadSideMask, color: 'text-yellow-500' },
  { icon: FaHandHoldingMedical, color: 'text-green-500' },
  { icon: FaHeartbeat, color: 'text-red-600' },
  { icon: FaBrain, color: 'text-indigo-500' },
  { icon: FaComments, color: 'text-blue-400' },
  { icon: FaEye, color: 'text-teal-500' },
  { icon: FaProcedures, color: 'text-orange-500' },
  { icon: FaLungs, color: 'text-blue-500' },
  { icon: FaFlask, color: 'text-purple-600' },
  { icon: FaSyringe, color: 'text-gray-500' },
  { icon: FaXRay, color: 'text-blue-700' }
];

const About = () => {
  const { t } = useTranslation();

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
    <div className="min-h-screen">
      <PageHero
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />
      <Helmet>
        <title>{t('about.pageTitle')}</title>
        <meta name="description" content={t('about.metaDescription')} />
      </Helmet>
      <div className="container mx-auto px-4 py-20">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 px-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-10 rounded-2xl shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 rounded-full">
                  <div className="w-12 h-12 text-blue-600">
                    {stat.icon}
                  </div>
                </div>
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center">
                {stat.number}
                {stat.suffix && <span className="text-2xl ml-1 text-gray-600">{stat.suffix}</span>}
              </div>
              <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Hospital Image Section */}
        <div className="mb-16">
          <img 
            src={HospitalImage} 
            alt="Al-Ameen Hospital Building" 
            className="w-full rounded-lg shadow-lg object-contain h-[600px] mx-auto"
          />
        </div>

        {/* Departments Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">{t('about.mainDepartments.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(t('about.mainDepartments.departments', { returnObjects: true }) as string[]).map((department, index) => {
              const IconComponent = departmentIcons[index].icon;
              const iconColor = departmentIcons[index].color;
              
              return (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center ${iconColor} transition-colors duration-300`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 flex-1">{department}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
