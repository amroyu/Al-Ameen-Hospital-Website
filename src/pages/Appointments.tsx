import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { 
  FaCalendar, FaUser, FaPhone, FaEnvelope, FaNotesMedical, 
  FaClock, FaHospital, FaClipboard, FaSpinner, 
  FaCalendarCheck, FaInfoCircle, FaCalendarTimes 
} from 'react-icons/fa';
import PageHero from '../components/Common/PageHero';

interface AppointmentForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

interface FormErrors {
  fullName?: boolean;
  phoneNumber?: boolean;
  email?: boolean;
  department?: boolean;
  preferredDate?: boolean;
  preferredTime?: boolean;
}

const Appointments: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const departments = [
    'internal-medicine',
    'pediatrics',
    'orthopedics',
    'general-surgery',
    'obstetrics-gynecology',
    'dental',
    'ent',
    'rheumatology',
    'cardiology',
    'neurology',
    'psychiatry',
    'ophthalmology',
    'urology',
    'pulmonology',
    'nephrology',
    'anesthesiology',
    'radiology'
  ].map(key => ({
    value: key,
    label: t(`services.${key}.name`)
  }));

  const [form, setForm] = useState<AppointmentForm>({
    fullName: '',
    phoneNumber: '',
    email: '',
    department: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!form.fullName) newErrors.fullName = true;
    if (!form.phoneNumber) newErrors.phoneNumber = true;
    if (!form.email) newErrors.email = true;
    if (!form.department) newErrors.department = true;
    if (!form.preferredDate) newErrors.preferredDate = true;
    if (!form.preferredTime) newErrors.preferredTime = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', form);
      setForm({
        fullName: '',
        phoneNumber: '',
        email: '',
        department: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
      });
      setErrors({});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('appointments.title')} - {t('header.hospitalName')}</title>
        <meta name="description" content={t('appointments.metaDescription')} />
      </Helmet>
      <PageHero
        title={t('appointments.title')}
        subtitle={t('appointments.subtitle')}
      />
      <div className="container mx-auto px-4">
        {/* Appointment Form Card */}
        <div className="max-w-4xl mx-auto -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 relative" dir={i18n.dir()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="form-group">
                  <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                    <FaUser className="text-green-600" />
                    {t('appointments.fullName')}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder={t('appointments.fullNamePlaceholder')}
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    required
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{t('appointments.validation.required')}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                    <FaPhone className="text-green-600" />
                    {t('appointments.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder={t('appointments.phonePlaceholder')}
                    className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                    required
                    dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1 rtl:text-right">{t('appointments.validation.required')}</p>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                    <FaEnvelope className="text-green-600" />
                    {t('appointments.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('appointments.emailPlaceholder')}
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{t('appointments.validation.required')}</p>
                  )}
                </div>

                {/* Department */}
                <div className="form-group">
                  <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                    <FaHospital className="text-green-600" />
                    {t('appointments.department')}
                  </label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 bg-white appearance-none"
                    required
                  >
                    <option value="">{t('appointments.departmentPlaceholder')}</option>
                    {departments.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">{t('appointments.validation.required')}</p>
                  )}
                </div>

                {/* Preferred Date */}
                <div className="form-group">
                  <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                    <FaCalendar className="text-green-600" />
                    {t('appointments.preferredDate')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      placeholder={t('appointments.datePlaceholder')}
                      className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}
                      required
                      dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
                      min={getCurrentDate()}
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => {
                        if (!e.target.value) e.target.type = 'text';
                      }}
                    />
                    <FaCalendar className="absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none rtl:left-4 ltr:right-4" />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-red-500 text-sm mt-1 rtl:text-right">{t('appointments.validation.required')}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div className="form-group">
                  <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                    <FaClock className="text-green-600" />
                    {t('appointments.preferredTime')}
                  </label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                    required
                  />
                  {errors.preferredTime && (
                    <p className="text-red-500 text-sm mt-1">{t('appointments.validation.required')}</p>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 rtl:justify-end rtl:flex-row-reverse">
                  <FaClipboard className="text-green-600" />
                  {t('appointments.notes')}
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder={t('appointments.notesPlaceholder')}
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300 min-h-[120px]"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rtl:flex-row-reverse"
                >
                  <FaCalendarCheck className="rtl:ml-2 ltr:mr-2" />
                  {t('appointments.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
