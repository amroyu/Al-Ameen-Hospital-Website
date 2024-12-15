import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaClock, FaCalendar } from 'react-icons/fa';

interface DoctorCardProps {
  name: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  rank: {
    en: string;
    ar: string;
  };
  schedules: {
    from: string;
    to: string;
    days?: string[];
  }[];
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, title, rank, schedules }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const currentLanguage = i18n.language as keyof typeof name;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {name[currentLanguage]}
        </h3>
        <p className="text-primary-600 font-medium mb-4">
          {title[currentLanguage]}
        </p>
        
        {schedules.length > 0 && (
          <div className="space-y-3">
            {schedules.map((schedule, index) => (
              <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse text-gray-600">
                <FaClock className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">
                    {schedule.days ? (
                      <>
                        <span className="flex items-center mb-1">
                          <FaCalendar className="mr-2 rtl:ml-2" />
                          {schedule.days.join(', ')}
                        </span>
                      </>
                    ) : null}
                    {schedule.from} - {schedule.to}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
