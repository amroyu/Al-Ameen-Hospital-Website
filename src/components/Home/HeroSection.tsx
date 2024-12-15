import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaStethoscope, FaUserMd, FaMicroscope, FaArrowRight } from 'react-icons/fa';
import Modal from '../Common/Modal';
import AppointmentForm from '../Appointments/AppointmentForm';
import StickyAppointmentButton from '../Common/StickyAppointmentButton';

const ServiceCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: string }) => (
  <div className={`group bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg transition-all duration-500 hover:scale-105 hover:bg-white/20 cursor-pointer animate-fade-in ${delay}`}>
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white group-hover:rotate-12 transition-transform duration-300" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-white/90 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 transition-colors duration-300 group-hover:text-white/90">
        {description}
      </p>
      <div className="flex items-center text-white/70 group-hover:text-white transition-colors duration-300">
        <span className="mr-2 text-sm sm:text-base">Learn More</span>
        <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  const { t } = useTranslation();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleOpenAppointmentModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAppointmentModalOpen(true);
  };

  return (
    <section className="relative min-h-screen pt-16 sm:pt-20 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 animate-gradient-x"></div>
      
      {/* Animated wave overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-56 animate-wave">
          <svg viewBox="0 0 1440 320" className="absolute">
            <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-12 sm:py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 text-white tracking-tight leading-tight animate-fade-in">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 text-white/90 animate-fade-in-delayed px-4">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
            <button
              onClick={handleOpenAppointmentModal}
              className="group flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary-600 rounded-full font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              <FaCalendarAlt className="mr-2 sm:mr-3 text-lg sm:text-xl group-hover:rotate-12 transition-transform duration-300" />
              {t('hero.bookAppointment')}
            </button>
            <Link
              to="/services"
              className="group flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-primary-600 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              {t('hero.ourServices')}
              <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service Cards Section */}
      <div className="container mx-auto px-4 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          <ServiceCard
            icon={FaStethoscope}
            title={t('hero.features.emergency.title')}
            description={t('hero.features.emergency.description')}
            delay="animate-delay-100"
          />
          <ServiceCard
            icon={FaUserMd}
            title={t('hero.features.doctors.title')}
            description={t('hero.features.doctors.description')}
            delay="animate-delay-200"
          />
          <ServiceCard
            icon={FaMicroscope}
            title={t('hero.features.technology.title')}
            description={t('hero.features.technology.description')}
            delay="animate-delay-300"
          />
        </div>
      </div>

      {/* Appointment Modal */}
      <Modal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        title={t('hero.bookAppointment')}
      >
        <AppointmentForm onClose={() => setIsAppointmentModalOpen(false)} />
      </Modal>

      {/* Sticky Appointment Button */}
      <button
        onClick={handleOpenAppointmentModal}
        className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/20 to-transparent z-50 md:hidden"
      >
        <div className="flex items-center justify-center w-full px-6 py-4 bg-primary-600 text-white rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          <FaCalendarAlt className="mr-2 text-xl" />
          {t('hero.bookAppointment')}
        </div>
      </button>
    </section>
  );
};

export default HeroSection;
