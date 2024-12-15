import React from 'react';
import { useTranslation } from 'react-i18next';
import { departments } from '../../data/doctors';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualifications: string[];
  image: string;
  description: string;
}

interface DoctorsListProps {
  doctors: Doctor[];
}

const DoctorsList: React.FC<DoctorsListProps> = ({ doctors }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'ar';

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
            >
              <div className="p-6">
                <div className="aspect-w-4 aspect-h-3 mb-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/doctor-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-primary-600 font-medium">{t(doctor.specialty)}</p>
                  <p className="text-gray-600 text-sm line-clamp-2">{doctor.description}</p>
                  <div className="pt-4 border-t border-gray-100">
                    <Link
                      to={`/appointments?doctor=${doctor.id}`}
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors duration-300"
                    >
                      {t('common.bookAppointment')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
