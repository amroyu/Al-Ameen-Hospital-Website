import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaUser, FaPen, FaPaperPlane } from 'react-icons/fa';
import Button from '../components/Common/Button';
import SectionTitle from '../components/Common/SectionTitle';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', form);
      setSubmitSuccess(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: <FaPhone className="text-blue-600 text-xl" />,
      title: t('contact.callUs'),
      value: '+966 12 736 6500',
      dirClass: 'dir-ltr'
    },
    {
      icon: <FaWhatsapp className="text-blue-600 text-xl" />,
      title: t('contact.whatsapp'),
      value: '+966 55 555 5555',
      dirClass: 'dir-ltr'
    },
    {
      icon: <FaEnvelope className="text-blue-600 text-xl" />,
      title: t('contact.email'),
      value: 'info@alameenhospital.com'
    },
    {
      icon: <FaMapMarkerAlt className="text-blue-600 text-xl" />,
      title: t('contact.address'),
      value: t('contact.addressValue')
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} - {t('header.hospitalName')}</title>
        <meta name="description" content={t('contact.metaDescription')} />
      </Helmet>

      <div className="pt-32 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title={t('contact.pageTitle')}
            subtitle={t('contact.pageSubtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
              <h2 className="text-3xl font-bold text-blue-900 mb-12">{t('contact.contactInfo')}</h2>
              
              <div className="space-y-10">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center group"
                  >
                    <div className="bg-blue-50 p-5 rounded-2xl shadow-sm flex items-center justify-center w-16 h-16 transition-all duration-300 group-hover:bg-blue-100">
                      <span className="text-blue-600 text-2xl">{info.icon}</span>
                    </div>
                    <div className="flex-1 ml-6 rtl:ml-0 rtl:mr-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <p className={`text-gray-600 text-lg ${info.dirClass || ''}`}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="mt-10 rounded-xl overflow-hidden h-72 w-full shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3713.7273006859386!2d40.4166!3d21.4379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e98f6559e5c8e9%3A0x56aa572aa30dc885!2sAl-Ameen%20Hospital!5e0!3m2!1sen!2ssa!4v1702402528276!5m2!1sen!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={t('contact.mapTitle')}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-blue-900 border-b pb-4">
                {t('contact.sendMessage')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-gray-700 mb-3 font-semibold transition-colors group-focus-within:text-blue-600">
                    <span className="inline-flex items-center">
                      <FaUser className="text-lg mr-3 rtl:ml-3 rtl:mr-0 text-gray-500 transition-colors group-focus-within:text-blue-600" />
                      {t('contact.fullName')}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                    placeholder={t('contact.fullNamePlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 mb-3 font-semibold transition-colors group-focus-within:text-blue-600">
                    <span className="inline-flex items-center">
                      <FaEnvelope className="text-lg mr-3 rtl:ml-3 rtl:mr-0 text-gray-500 transition-colors group-focus-within:text-blue-600" />
                      {t('contact.email')}
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                    placeholder={t('contact.emailPlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 mb-3 font-semibold transition-colors group-focus-within:text-blue-600">
                    <span className="inline-flex items-center">
                      <FaPhone className="text-lg mr-3 rtl:ml-3 rtl:mr-0 text-gray-500 transition-colors group-focus-within:text-blue-600" />
                      {t('contact.phone')}
                    </span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-right"
                    required
                    placeholder={t('contact.phonePlaceholder')}
                    dir="rtl"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 mb-3 font-semibold transition-colors group-focus-within:text-blue-600">
                    <span className="inline-flex items-center">
                      <FaPen className="text-lg mr-3 rtl:ml-3 rtl:mr-0 text-gray-500 transition-colors group-focus-within:text-blue-600" />
                      {t('contact.subject')}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                    placeholder={t('contact.subjectPlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="group">
                  <label className="block text-gray-700 mb-3 font-semibold transition-colors group-focus-within:text-blue-600">
                    <span className="inline-flex items-center">
                      <FaPaperPlane className="text-lg mr-3 rtl:ml-3 rtl:mr-0 text-gray-500 transition-colors group-focus-within:text-blue-600" />
                      {t('contact.message')}
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                    rows={4}
                    required
                    placeholder={t('contact.messagePlaceholder')}
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : submitSuccess
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : submitSuccess ? (
                    <>
                      <span>✓</span>
                      <span>{t('contact.messageSent')}</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="transform -rotate-45" />
                      <span>{t('contact.sendButton')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
