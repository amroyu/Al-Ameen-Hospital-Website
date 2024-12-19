import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { 
  FaCalendar, FaUser, FaPhone, FaEnvelope, FaNotesMedical, 
  FaClock, FaHospital, FaClipboard, FaSpinner, 
  FaCalendarCheck, FaInfoCircle, FaCalendarTimes, FaChevronDown
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
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
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  department?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}

const Appointments: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
    label: t(`services.${key}.title`)
  }));

  // Generate time slots from 8 AM to 10 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 22; hour++) {
      const period = hour < 12 ? 'AM' : 'PM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      
      // Add :00 slot
      slots.push({
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${displayHour}:00 ${period}`
      });
      
      // Add :30 slot
      slots.push({
        value: `${hour.toString().padStart(2, '0')}:30`,
        label: `${displayHour}:30 ${period}`
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const errors: FormErrors = {};
    if (!form.fullName) errors.fullName = t('appointments.validation.required');
    if (!form.phoneNumber) errors.phoneNumber = t('appointments.validation.required');
    if (!form.department) errors.department = t('appointments.validation.required');
    if (!form.preferredDate) errors.preferredDate = t('appointments.validation.required');
    if (!form.preferredTime) errors.preferredTime = t('appointments.validation.required');
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = t('appointments.validation.invalidEmail');
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Initialize EmailJS with public key
      emailjs.init("paUI5ouyC9vOezif2");

      const templateParams = {
        to_name: "Admin",
        from_name: form.fullName,
        from_email: form.email || 'Not provided',
        phone_number: form.phoneNumber,
        department: departments.find(d => d.value === form.department)?.label || form.department,
        preferred_date: form.preferredDate,
        preferred_time: form.preferredTime,
        notes: form.notes || 'No additional notes provided',
        message: `
Appointment Details:
- Name: ${form.fullName}
- Phone: ${form.phoneNumber}
- Email: ${form.email || 'Not provided'}
- Department: ${departments.find(d => d.value === form.department)?.label || form.department}
- Date: ${form.preferredDate}
- Time: ${form.preferredTime}

Additional Notes:
${form.notes || 'No additional notes provided'}`,
        reply_to: form.email || 'no-reply@example.com',
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        'service_pkgrbuv',    // Your Service ID
        'template_buv7qtp',   // Your Template ID
        templateParams
      );

      console.log('EmailJS Response:', response);

      setSubmitStatus('success');
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
    } catch (error: any) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
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

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right">
                    <FaUser className="inline-block mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                    {t('appointments.fullName')}
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder={t('appointments.fullNamePlaceholder')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    } ${isRTL ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'}`}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right">
                    <FaPhone className="inline-block mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                    {t('appointments.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder={t('appointments.phoneNumberPlaceholder')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    } ${isRTL ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'}`}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.phoneNumber}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right">
                    <FaEnvelope className="inline-block mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                    {t('appointments.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('appointments.emailPlaceholder')}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } ${isRTL ? 'text-right placeholder:text-right' : 'text-left placeholder:text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.email}</p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right">
                    <FaHospital className="inline-block mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                    {t('appointments.department')}
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                      errors.department ? 'border-red-500' : 'border-gray-300'
                    } ${isRTL ? 'text-right' : 'text-left'}`}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{t('appointments.departmentPlaceholder')}</option>
                    {departments.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.department}</p>
                  )}
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferredDate" className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                    <div className="bg-primary-50 rounded-full p-1.5">
                      <FaCalendar className="text-primary-600 w-4 h-4" />
                    </div>
                    {t('appointments.preferredDate')}
                  </label>
                  <div 
                    className="relative cursor-pointer" 
                    onClick={() => {
                      const input = document.getElementById('preferredDate') as HTMLInputElement;
                      if (input) input.showPicker();
                    }}
                  >
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                        ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'}
                        ${isRTL ? 'text-right pr-12' : 'text-left pl-12'} 
                        bg-white appearance-none text-gray-500 cursor-pointer
                        [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:left-0`}
                      min={getCurrentDate()}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                      placeholder={isRTL ? "يوم.شهر.سنة" : "dd.mm.yyyy"}
                    />
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} pointer-events-none`}>
                      <div className="bg-gray-100 rounded-full p-1.5">
                        <FaCalendar className="text-gray-500 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  {errors.preferredDate && (
                    <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="preferredTime" className="flex items-center gap-2 text-gray-700 text-sm font-medium mb-2">
                    <div className="bg-primary-50 rounded-full p-1.5">
                      <FaClock className="text-primary-600 w-4 h-4" />
                    </div>
                    {t('appointments.preferredTime')}
                  </label>
                  <div className="relative">
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                        ${errors.preferredTime ? 'border-red-500' : 'border-gray-300'}
                        ${isRTL ? 'text-right pr-12' : 'text-left pl-12'} 
                        bg-white appearance-none cursor-pointer text-gray-500`}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <option value="" className="text-gray-500">
                        {t('appointments.timePlaceholder')}
                      </option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value} className="text-gray-700">
                          {slot.label}
                        </option>
                      ))}
                    </select>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'}`}>
                      <div className="bg-gray-100 rounded-full p-1.5">
                        <FaClock className="text-gray-500 w-4 h-4" />
                      </div>
                    </div>
                    <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'} pointer-events-none`}>
                      <FaChevronDown className="text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  {errors.preferredTime && (
                    <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Notes - Full Width */}
              <div className="mt-6">
                <label htmlFor="notes" className="block text-gray-700 text-sm font-medium mb-2 rtl:text-right">
                  <FaNotesMedical className="inline-block mr-2 rtl:ml-2 rtl:mr-0 text-primary-600" />
                  {t('appointments.notes')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder={t('appointments.notesPlaceholder')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[100px] ${
                    errors.notes ? 'border-red-500' : 'border-gray-300'
                  } ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.notes && (
                  <p className="mt-1 text-red-500 text-sm rtl:text-right">{errors.notes}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 text-white font-semibold rounded-xl transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transform hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <FaSpinner className="animate-spin" />
                      <span>{t('appointments.submitting')}</span>
                    </div>
                  ) : (
                    t('appointments.submit')
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                    <p className="flex items-center">
                      <FaCalendarCheck className="mr-2" />
                      {t('appointments.submitSuccess')}
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                    <p className="flex items-center">
                      <FaCalendarTimes className="mr-2" />
                      {errorMessage || t('appointments.submitError')}
                    </p>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
