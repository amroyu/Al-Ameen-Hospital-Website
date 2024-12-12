import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FaCalendar, FaUser, FaPhone, FaEnvelope, FaNotesMedical, FaClock, FaHospital, FaClipboard, FaSpinner, FaCalendarCheck, FaInfoCircle, FaCalendarTimes } from 'react-icons/fa';
import Button from '../components/Common/Button';
import SectionTitle from '../components/Common/SectionTitle';

interface AppointmentForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

const Appointments: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<AppointmentForm>({
    fullName: '',
    phoneNumber: '',
    email: '',
    department: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  // Get departments from services section instead
  const departmentKeys = Object.keys(t('services.departments', { returnObjects: true }));
  const departments = departmentKeys.map(key => t(`services.departments.${key}`));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isSubmitting = false;

  return (
    <>
      <Helmet>
        <title>{t('appointments.title')} - {t('header.hospitalName')}</title>
        <meta name="description" content={t('appointments.metaDescription')} />
      </Helmet>

      <div className="pt-32 pb-12 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4 font-arabic">
              {t('appointments.title')}
            </h1>
            <p className="text-xl text-gray-600 font-arabic">
              {t('appointments.subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-8" dir={i18n.dir()}>
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="form-group">
                    <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                      <FaUser className="text-blue-600" />
                      {t('appointments.fullName')}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder={t('appointments.fullNamePlaceholder')}
                      className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-arabic ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="form-group">
                    <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                      <FaPhone className="text-blue-600" />
                      {t('appointments.phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      placeholder={t('appointments.phonePlaceholder')}
                      className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-arabic ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                      <FaEnvelope className="text-blue-600" />
                      {t('appointments.email')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t('appointments.emailPlaceholder')}
                      className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-arabic ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                      required
                    />
                  </div>

                  {/* Department */}
                  <div className="form-group">
                    <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                      <FaHospital className="text-blue-600" />
                      {t('appointments.department')}
                    </label>
                    <select
                      name="department"
                      value={form.department}
                      onChange={handleChange}
                      className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white font-arabic appearance-none ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                      required
                    >
                      <option value="" className="font-arabic">{t('appointments.selectDepartment')}</option>
                      {departments.map((dept, index) => (
                        <option key={index} value={dept} className="font-arabic">
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date and Time Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Preferred Date */}
                    <div className="form-group">
                      <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                        <FaCalendar className="text-blue-600" />
                        {t('appointments.preferredDate')}
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={form.preferredDate}
                        onChange={handleChange}
                        min={getCurrentDate()}
                        className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-arabic ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                        required
                      />
                    </div>

                    {/* Preferred Time */}
                    <div className="form-group">
                      <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                        <FaClock className="text-blue-600" />
                        {t('appointments.preferredTime')}
                      </label>
                      <input
                        type="time"
                        name="preferredTime"
                        value={form.preferredTime}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-arabic ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                        required
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="form-group">
                    <label className="flex items-center gap-3 text-gray-700 text-lg font-semibold mb-3 font-arabic rtl:justify-end rtl:flex-row-reverse">
                      <FaClipboard className="text-blue-600" />
                      {t('appointments.notes')}
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder={t('appointments.notesPlaceholder')}
                      className={`w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-arabic ${i18n.dir() === 'rtl' ? 'text-right' : 'text-left'}`}
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-blue-50 p-6 rounded-xl space-y-3 font-arabic">
                  <h3 className="text-lg font-bold text-blue-900 mb-4 rtl:text-right">
                    {t('appointments.importantNotes')}
                  </h3>
                  <ul className="space-y-4 text-gray-600">
                    <li className="flex items-start gap-3 rtl:justify-end rtl:flex-row-reverse">
                      <FaInfoCircle className="text-blue-500 mt-1" />
                      <span>{t('appointments.note1')}</span>
                    </li>
                    <li className="flex items-start gap-3 rtl:justify-end rtl:flex-row-reverse">
                      <FaClock className="text-blue-500 mt-1" />
                      <span>{t('appointments.note2')}</span>
                    </li>
                    <li className="flex items-start gap-3 rtl:justify-end rtl:flex-row-reverse">
                      <FaCalendarTimes className="text-blue-500 mt-1" />
                      <span>{t('appointments.note3')}</span>
                    </li>
                    <li className="flex items-start gap-3 rtl:justify-end rtl:flex-row-reverse">
                      <FaPhone className="text-blue-500 mt-1" />
                      <span>{t('appointments.note4')}</span>
                    </li>
                  </ul>
                </div>

                <div className="flex rtl:justify-start justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 flex items-center gap-3 rtl:flex-row-reverse font-arabic"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>{t('appointments.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <FaCalendarCheck />
                        <span>{t('appointments.submitButton')}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
