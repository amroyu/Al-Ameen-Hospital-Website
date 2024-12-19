import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaUser, FaPen, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Button from '../components/Common/Button';
import SectionTitle from '../components/Common/SectionTitle';
import PageHero from '../components/Common/PageHero';

interface ContactForm {
  name: string;
  phoneNumber: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phoneNumber?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [form, setForm] = useState<ContactForm>({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const contactInfo = [
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: t('contact.phone'),
      value: '+966 12 736 6100',
      href: 'tel:+966127366100'
    },
    {
      icon: <FaWhatsapp className="w-6 h-6" />,
      title: t('contact.whatsapp'),
      value: '+966 50 161 5005',
      href: 'https://wa.me/966501615005'
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: t('contact.email'),
      value: 'info@alameenhospital.com',
      href: 'mailto:info@alameenhospital.com'
    },
    {
      icon: <FaMapMarkerAlt className="w-6 h-6" />,
      title: t('contact.addressTitle'),
      value: isRTL ? t('contact.addressAr') : t('contact.address'),
      href: 'https://maps.google.com/?q=Al+Ameen+Hospital+Taif'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    const errors: FormErrors = {};
    if (!form.name) errors.name = t('contact.validation.required');
    if (!form.phoneNumber) errors.phoneNumber = t('contact.validation.required');
    if (!form.message) errors.message = t('contact.validation.required');
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = t('contact.validation.invalidEmail');
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
        from_name: form.name,
        contact_number: form.phoneNumber,
        contact_email: form.email || 'Not provided',
        contact_message: form.message,
        contact_type: 'General Inquiry',
        submission_date: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Riyadh'
        }),
        language: i18n.language === 'ar' ? 'Arabic' : 'English'
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(
        'service_pkgrbuv',    // Your Service ID
        'template_2izymgs',   // Contact Form Template ID
        templateParams
      );

      console.log('EmailJS Response:', response);

      setSubmitStatus('success');
      setForm({
        name: '',
        phoneNumber: '',
        email: '',
        message: ''
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{t('contact.title')} - {t('header.hospitalName')}</title>
        <meta name="description" content={t('contact.metaDescription')} />
      </Helmet>

      <PageHero
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('contact.getInTouch')}</h2>
              {/* Contact Info */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 rtl:space-x-reverse"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{info.title}</h3>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Google Maps */}
              <div className="mt-auto rounded-xl overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.223913123322!2d39.7425275!3d21.4334361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c21b4ced818d21%3A0x98ab266f0c0dd16b!2z2YXYs9iq2LTZgdmJINin2YTYo9mF2YrZhiDYp9mE2LnYp9mF!5e0!3m2!1sen!2ssa!4v1703099234567!5m2!1sen!2ssa"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Al-Ameen Hospital Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('contact.sendMessage')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.name')}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                      <FaUser className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`block w-full py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                        isRTL ? 'text-right pl-10 pr-4' : 'text-left pl-10 pr-4'
                      } ${isRTL ? 'placeholder:text-right' : 'placeholder:text-left'} ${errors.name ? 'border-red-500' : ''}`}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.phoneNumber')}
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                      <FaPhone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={form.phoneNumber}
                      onChange={handleChange}
                      className={`block w-full py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                        isRTL ? 'text-right pl-10 pr-4' : 'text-left pl-10 pr-4'
                      } ${isRTL ? 'placeholder:text-right' : 'placeholder:text-left'} ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      placeholder={t('contact.form.phoneNumberPlaceholder')}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.email')} ({t('common.optional')})
                  </label>
                  <div className="relative">
                    <div className={`absolute inset-y-0 ${isRTL ? 'left-0 pl-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                      <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`block w-full py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                        isRTL ? 'text-right pl-10 pr-4' : 'text-left pl-10 pr-4'
                      } ${isRTL ? 'placeholder:text-right' : 'placeholder:text-left'} ${errors.email ? 'border-red-500' : ''}`}
                      placeholder={t('contact.form.emailPlaceholder')}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <div className="relative">
                    <div className={`absolute top-3 ${isRTL ? 'left-0 pl-3' : 'left-0 pl-3'} pointer-events-none`}>
                      <FaPen className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className={`block w-full py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 ${
                        isRTL ? 'text-right pl-10 pr-4' : 'text-left pl-10 pr-4'
                      } ${isRTL ? 'placeholder:text-right' : 'placeholder:text-left'} ${errors.message ? 'border-red-500' : ''}`}
                      placeholder={t('contact.form.messagePlaceholder')}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 text-center">{t('contact.form.successMessage')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-800 text-center">{errorMessage || t('contact.form.errorMessage')}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
