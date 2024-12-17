import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaStethoscope, FaUserMd, FaMicroscope, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Modal from '../Common/Modal';
import AppointmentForm from '../Appointments/AppointmentForm';
import StickyAppointmentButton from '../Common/StickyAppointmentButton';

const ServiceCard = ({ icon: Icon, title, description, delay, link }: { icon: React.ElementType, title: string, description: string, delay: string, link: string }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Link to={link} className={`group relative overflow-hidden bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl transition-all duration-500 hover:scale-102 hover:bg-white/15 cursor-pointer animate-fade-in ${delay} border border-white/10 hover:border-white/20`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative flex flex-col items-center text-center z-10">
        <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg">
          <Icon className="w-10 h-10 text-white group-hover:rotate-12 transition-transform duration-500" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white/90 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-base text-white/80 mb-6 transition-colors duration-300 group-hover:text-white/90 leading-relaxed">
          {description}
        </p>
        <div className={`flex items-center text-white/70 group-hover:text-white transition-all duration-300 ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}>
          {isRTL && (
            <FaArrowLeft className={`w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300 ml-2`} />
          )}
          <span className={`text-base font-medium ${isRTL ? 'ml-2' : 'mr-2'}`}>{t('hero.learnMore')}</span>
          {!isRTL && (
            <FaArrowRight className={`w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300`} />
          )}
        </div>
      </div>
    </Link>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleOpenAppointmentModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAppointmentModalOpen(true);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 -mt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-48 -right-24 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute w-[400px] h-[400px] -bottom-32 -left-20 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative container mx-auto px-6 pt-32">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-fade-in leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-white/90 mb-12 animate-fade-in delay-200 leading-relaxed max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in delay-400">
            <Link
              to="/appointments"
              onClick={handleOpenAppointmentModal}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-white to-white/90 text-primary-600 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              <FaCalendarAlt className="mr-2 group-hover:scale-110 transition-transform duration-300" />
              {t('hero.bookAppointment')}
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300 flex items-center justify-center group backdrop-blur-sm"
            >
              <FaStethoscope className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
              {t('hero.exploreServices')}
            </Link>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 pb-20">
          <ServiceCard
            icon={FaUserMd}
            title={t('hero.services.doctors.title')}
            description={t('hero.services.doctors.description')}
            delay="delay-500"
            link="/doctors"
          />
          <ServiceCard
            icon={FaStethoscope}
            title={t('hero.services.departments.title')}
            description={t('hero.services.departments.description')}
            delay="delay-700"
            link="/services"
          />
          <ServiceCard
            icon={FaMicroscope}
            title={t('hero.services.technology.title')}
            description={t('hero.services.technology.description')}
            delay="delay-900"
            link="/about"
          />
        </div>
      </div>

      {/* Appointment Modal */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title={t('appointments.bookAppointment')}
      >
        <AppointmentForm onClose={() => setIsAppointmentModalOpen(false)} />
      </Modal>

      <StickyAppointmentButton />
    </section>
  );
};

export default HeroSection;
