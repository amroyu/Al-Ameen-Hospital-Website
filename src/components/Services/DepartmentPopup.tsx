import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaTimes } from 'react-icons/fa';

interface DepartmentPopupProps {
  departmentId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DepartmentPopup: React.FC<DepartmentPopupProps> = ({ departmentId, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';

  if (!isOpen) return null;

  const handleDoctorsClick = () => {
    navigate(`/doctors?department=${departmentId}`);
    onClose();
  };

  // Get the button text based on language
  const getButtonText = () => {
    if (isRTL) {
      return `${t('common.view')} ${t('common.doctors')} ${t(`departments.${departmentId}.name`)}`;
    }
    return `${t('common.view')} ${t(`departments.${departmentId}.name`)} ${t('common.doctors')}`;
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative dark:bg-gray-800 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
        <button
          onClick={onClose}
          className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors`}
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {t(`departments.${departmentId}.name`)}
        </h3>
        
        <p className="text-gray-600 mb-8 dark:text-gray-300 text-lg">
          {t(`departments.${departmentId}.description`)}
        </p>
        
        <button
          onClick={handleDoctorsClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 text-lg font-medium shadow-md hover:shadow-lg active:transform active:scale-[0.98]"
        >
          <FaUserMd className="w-5 h-5" />
          <span className="text-white">{getButtonText()}</span>
        </button>
      </div>
    </div>
  );
};

export default DepartmentPopup;
