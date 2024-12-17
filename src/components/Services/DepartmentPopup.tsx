import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaTimes } from 'react-icons/fa';
import { services, ServiceItem } from '../../pages/Services';

interface DepartmentPopupProps {
  department: string;
  onClose: () => void;
}

const DepartmentPopup: React.FC<DepartmentPopupProps> = ({ department, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  const selectedDepartment = services.find((s: ServiceItem) => s.key === department);

  const handleDoctorsClick = () => {
    navigate(`/doctors?department=${department}`);
    onClose();
  };

  if (!selectedDepartment) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors`}
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          {t(`services.${department}.title`)}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {t(`services.${department}.description`)}
        </p>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">
            {t('services.availableServices')}:
          </h4>
          <ul className="space-y-2">
            {selectedDepartment.subServices.map((service: string) => (
              <li key={service} className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                {t(`services.${department}.subServices.${service}`)}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleDoctorsClick}
          className="mt-8 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaUserMd className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('services.viewDepartmentDoctors')}
        </button>
      </div>
    </div>
  );
};

export default DepartmentPopup;
