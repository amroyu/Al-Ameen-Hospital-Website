import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/team.css';

interface Doctor {
  name: string;
  specialty: string;
  qualifications: string[];
  experience?: number;
  languages?: string[];
  image?: string;
}

const MedicalTeam: React.FC = () => {
  const { t } = useTranslation();

  const doctors: Doctor[] = [
    {
      name: t('doctors.team.0.name'),
      specialty: t('doctors.team.0.specialty'),
      qualifications: [
        t('doctors.team.0.qualifications.0'),
        t('doctors.team.0.qualifications.1')
      ],
      image: "/images/doctors/doctor1.jpg"
    },
    {
      name: t('doctors.team.1.name'),
      specialty: t('doctors.team.1.specialty'),
      qualifications: [
        t('doctors.team.1.qualifications.0'),
        t('doctors.team.1.qualifications.1')
      ],
      image: "/images/doctors/doctor2.jpg"
    },
    {
      name: t('doctors.team.2.name'),
      specialty: t('doctors.team.2.specialty'),
      qualifications: [
        t('doctors.team.2.qualifications.0'),
        t('doctors.team.2.qualifications.1')
      ],
      image: "/images/doctors/doctor3.jpg"
    },
    {
      name: t('doctors.team.3.name'),
      specialty: t('doctors.team.3.specialty'),
      qualifications: [
        t('doctors.team.3.qualifications.0'),
        t('doctors.team.3.qualifications.1')
      ],
      image: "/images/doctors/doctor4.jpg"
    },
    {
      name: t('doctors.team.4.name'),
      specialty: t('doctors.team.4.specialty'),
      qualifications: [
        t('doctors.team.4.qualifications.0'),
        t('doctors.team.4.qualifications.1')
      ],
      image: "/images/doctors/doctor5.jpg"
    }
  ];

  return (
    <section className="team-section">
      <h2 className="team-title">{t('doctors.title')}</h2>
      <p className="team-subtitle">{t('doctors.pageSubtitle')}</p>
      
      <div className="team-grid">
        {doctors.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <img
              src={doctor.image || '/images/doctors/default-doctor.jpg'}
              alt={doctor.name}
              className="doctor-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/doctors/default-doctor.jpg';
              }}
            />
            <div className="doctor-info">
              <h3 className="doctor-name">{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialty}</p>
              <div className="doctor-qualifications">
                {doctor.qualifications.map((qualification, idx) => (
                  <p key={idx} className="qualification">
                    {qualification}
                  </p>
                ))}
              </div>
              <button className="book-appointment-btn">
                {t('doctors.bookAppointment')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MedicalTeam;
