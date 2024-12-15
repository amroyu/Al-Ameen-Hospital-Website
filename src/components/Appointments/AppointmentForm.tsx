import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUser, FaPhone, FaCalendar, FaStethoscope, FaCheck } from 'react-icons/fa';

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  department: string;
  notes: string;
}

interface AppointmentFormProps {
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    department: '',
    notes: '',
  });

  const steps = [
    { id: 1, title: t('appointment.steps.personal'), icon: FaUser },
    { id: 2, title: t('appointment.steps.contact'), icon: FaPhone },
    { id: 3, title: t('appointment.steps.datetime'), icon: FaCalendar },
    { id: 4, title: t('appointment.steps.department'), icon: FaStethoscope },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setStep(5); // Show success message
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('appointment.form.name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('appointment.form.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('appointment.form.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('appointment.form.preferredDate')}
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-right"
                required
                dir="rtl"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('appointment.form.department')}
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">{t('appointment.form.selectDepartment')}</option>
                <option value="cardiology">{t('departments.cardiology')}</option>
                <option value="orthopedics">{t('departments.orthopedics')}</option>
                <option value="pediatrics">{t('departments.pediatrics')}</option>
                <option value="neurology">{t('departments.neurology')}</option>
                <option value="dermatology">{t('departments.dermatology')}</option>
                <option value="ophthalmology">{t('departments.ophthalmology')}</option>
                <option value="dentistry">{t('departments.dentistry')}</option>
                <option value="gynecology">{t('departments.gynecology')}</option>
                <option value="urology">{t('departments.urology')}</option>
                <option value="ent">{t('departments.ent')}</option>
                <option value="psychiatry">{t('departments.psychiatry')}</option>
                <option value="physiotherapy">{t('departments.physiotherapy')}</option>
                <option value="radiology">{t('departments.radiology')}</option>
                <option value="laboratory">{t('departments.laboratory')}</option>
                <option value="emergency">{t('departments.emergency')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('appointment.form.notes')}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('appointment.success.title')}
            </h3>
            <p className="text-gray-600">
              {t('appointment.success.message')}
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t('common.close')}
            </button>
          </div>
        );
    }
  };

  return (
    <div>
      {step < 5 && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className={`flex flex-col items-center ${
                    s.id === step ? 'text-primary-600' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      s.id === step
                        ? 'bg-primary-100 text-primary-600'
                        : s.id < step
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{s.title}</span>
                </div>
              );
            })}
          </div>
          <div className="relative mt-4 mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2">
              <div
                className="absolute top-0 left-0 h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {renderStepContent()}
        
        {step < 5 && (
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => setStep(prev => prev - 1)}
              className={`px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${
                step === 1 ? 'invisible' : ''
              }`}
            >
              {t('common.previous')}
            </button>
            <button
              type={step === steps.length ? 'submit' : 'button'}
              onClick={() => {
                if (step < steps.length) {
                  setStep(prev => prev + 1);
                }
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {step === steps.length ? t('common.submit') : t('common.next')}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AppointmentForm;
