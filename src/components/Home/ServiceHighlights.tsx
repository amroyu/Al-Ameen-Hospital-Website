import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, FaAmbulance, FaUserMd, FaHospital,
  FaPhoneAlt, FaCalendarCheck 
} from 'react-icons/fa';

const ServiceHighlights = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const features = [
    {
      icon: <FaHeartbeat className="w-8 h-8" />,
      title: t('home.features.emergency.title'),
      description: t('home.features.emergency.description'),
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <FaUserMd className="w-8 h-8" />,
      title: t('home.features.doctors.title'),
      description: t('home.features.doctors.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaHospital className="w-8 h-8" />,
      title: t('home.features.technology.title'),
      description: t('home.features.technology.description'),
      color: 'from-green-500 to-green-600'
    }
  ];

  const quickActions = [
    {
      icon: <FaCalendarCheck className="w-6 h-6" />,
      label: t('header.bookAppointment'),
      link: '/appointments'
    },
    {
      icon: <FaPhoneAlt className="w-6 h-6" />,
      label: t('header.hotline'),
      link: 'tel:+966127366100'
    },
    {
      icon: <FaAmbulance className="w-6 h-6" />,
      label: t('home.emergency.title'),
      link: '#emergency'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {quickActions.map((action, index) => (
            <motion.a
              href={action.link}
              key={index}
              className={`flex items-center justify-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`rounded-full p-3 ${
                index === 0 ? 'bg-green-100 text-green-600' :
                index === 1 ? 'bg-blue-100 text-blue-600' :
                'bg-red-100 text-red-600'
              }`}>
                {action.icon}
              </div>
              <span className={`text-lg font-semibold mx-3 ${
                index === 0 ? 'text-green-700' :
                index === 1 ? 'text-blue-700' :
                'text-red-700'
              }`}>
                {action.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`h-full bg-gradient-to-br ${feature.color} rounded-2xl p-6 text-white transform transition-transform hover:scale-105`}>
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/90">{feature.description}</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
