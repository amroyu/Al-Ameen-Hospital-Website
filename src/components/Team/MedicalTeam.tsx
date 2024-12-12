import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/team.css';

interface Doctor {
  name: string;
  specialty: string;
  education: string;
  experience: number;
  image: string;
}

const MedicalTeam: React.FC = () => {
  const { t } = useTranslation();

  const doctors: Doctor[] = [
    {
      name: "د. أحمد العالمي",
      specialty: "جراحة العظام",
      education: "دكتوراه في جراحة العظام - جامعة السوربون",
      experience: 18,
      image: "/images/doctors/doctor1.jpg"
    },
    {
      name: "د. سارة الأحمد",
      specialty: "طب العيون",
      education: "زمالة في طب العيون - جامعة هارفارد",
      experience: 12,
      image: "/images/doctors/doctor2.jpg"
    },
    {
      name: "د. محمد العبدالله",
      specialty: "جراحة القلب والأوعية الدموية",
      education: "دكتوراه في جراحة القلب - جامعة الملك سعود",
      experience: 15,
      image: "/images/doctors/doctor3.jpg"
    },
    {
      name: "د. فاطمة الزهراني",
      specialty: "طب الأطفال",
      education: "زمالة في طب الأطفال - جامعة تورنتو",
      experience: 10,
      image: "/images/doctors/doctor4.jpg"
    }
  ];

  return (
    <div className="team-section">
      <h1 className="team-title">{t('ourMedicalTeam')}</h1>
      <p className="team-subtitle">
        {t('teamDescription')}
      </p>

      <div className="team-grid">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="doctor-image"
            />
            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialty}</p>
              <p className="doctor-education">{doctor.education}</p>
              <p className="doctor-experience">
                {t('yearsOfExperience', { years: doctor.experience })}
              </p>
              <button className="book-appointment-btn">
                {t('bookAppointment')}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="join-section">
        <h2 className="join-title">{t('joinOurTeam')}</h2>
        <p className="join-description">
          {t('joinTeamDescription')}
        </p>
        <button className="join-btn">
          {t('applyNow')}
        </button>
      </div>

      <div className="working-hours">
        <div className="hours-container">
          <div className="hours-grid">
            <div className="hours-card">
              <h3 className="hours-title">{t('workingHours')}</h3>
              <div className="hours-list">
                <p>{t('weekdays')}: 8:00 - 22:00</p>
                <p>{t('weekends')}: 9:00 - 20:00</p>
              </div>
            </div>
            <div className="hours-card">
              <h3 className="hours-title">{t('emergencyService')}</h3>
              <div className="hours-list">
                <p>{t('emergencyAvailable')}</p>
                <p>{t('24_7_service')}</p>
              </div>
            </div>
            <div className="hours-card">
              <h3 className="hours-title">{t('contactInfo')}</h3>
              <div className="hours-list">
                <p>{t('phone')}: +966 127 365 100</p>
                <p>{t('email')}: info@alameenhospital.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalTeam;
