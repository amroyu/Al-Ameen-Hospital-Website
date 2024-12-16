import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaUser, FaPhone, FaEnvelope, 
  FaClock, FaCalendar, FaClipboard, 
  FaTimes 
} from 'react-icons/fa';

interface AppointmentForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

interface FormErrors {
  fullName?: boolean;
  phoneNumber?: boolean;
  email?: boolean;
  preferredDate?: boolean;
  preferredTime?: boolean;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department?: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, department }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [form, setForm] = useState<AppointmentForm>({
    fullName: '',
    phoneNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.fullName) newErrors.fullName = true;
    if (!form.phoneNumber) newErrors.phoneNumber = true;
    if (!form.email) newErrors.email = true;
    if (!form.preferredDate) newErrors.preferredDate = true;
    if (!form.preferredTime) newErrors.preferredTime = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {t('appointments.title')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('appointments.fullName')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={t('appointments.fullNamePlaceholder')}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {t('appointments.validation.required')}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('appointments.phoneNumber')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={form.phoneNumber}
                  onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={t('appointments.phonePlaceholder')}
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {t('appointments.validation.required')}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('appointments.email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  placeholder={t('appointments.emailPlaceholder')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {t('appointments.validation.required')}
                </p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('appointments.preferredDate')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.preferredDate && (
                <p className="mt-1 text-sm text-red-500">
                  {t('appointments.validation.required')}
                </p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('appointments.preferredTime')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  value={form.preferredTime}
                  onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.preferredTime ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.preferredTime && (
                <p className="mt-1 text-sm text-red-500">
                  {t('appointments.validation.required')}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('appointments.notes')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                  <FaClipboard className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={4}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('appointments.notesPlaceholder')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 ${
                  isRTL ? 'font-arabic' : 'font-primary'
                } text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? t('common.submitting') : t('appointments.submit')}
              </button>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 text-green-700 rounded-md">
                {t('appointments.successMessage')}
              </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 text-red-700 rounded-md">
                {t('appointments.errorMessage')}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
