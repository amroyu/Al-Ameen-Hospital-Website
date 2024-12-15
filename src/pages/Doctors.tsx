import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaGraduationCap } from 'react-icons/fa';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualifications: string[];
  image: string;
}

const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Khalid Al-Harbi",
    specialty: "doctors.specialties.cardiology",
    qualifications: [
      "doctors.qualifications.md cardiology",
      "doctors.qualifications.fellowship interventional_cardiology"
    ],
    image: "/images/doctors/Dr. Khalid Al-Harbi.jpg"
  },
  {
    id: 2,
    name: "Dr. Nora Al-Rashid",
    specialty: "doctors.specialties.pediatrics",
    qualifications: [
      "doctors.qualifications.md pediatrics",
      "doctors.qualifications.specialization neonatal_care"
    ],
    image: "/images/doctors/Dr. Nora Al-Rashid.jpg"
  },
  {
    id: 3,
    name: "Dr. Faisal Al-Ghamdi",
    specialty: "doctors.specialties.orthopedics",
    qualifications: [
      "doctors.qualifications.md orthopedic_surgery",
      "doctors.qualifications.fellowship joint_replacement"
    ],
    image: "/images/doctors/Dr. Faisal Al-Ghamdi.jpg"
  },
  {
    id: 4,
    name: "Dr. Layla Al-Qahtani",
    specialty: "doctors.specialties.ophthalmology",
    qualifications: [
      "doctors.qualifications.md ophthalmology",
      "doctors.qualifications.fellowship retinal_surgery"
    ],
    image: "/images/doctors/Dr. Layla Al-Qahtani.jpg"
  },
  {
    id: 5,
    name: "Dr. Abdulrahman Al-Shehri",
    specialty: "doctors.specialties.neurology",
    qualifications: [
      "doctors.qualifications.md neurology",
      "doctors.qualifications.specialization neurophysiology"
    ],
    image: "/images/doctors/Dr. Abdulrahman Al-Shehri.jpg"
  }
];

const Doctors = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoctors(doctorsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('doctors.pageTitle')} - {t('header.hospitalName')}</title>
        <meta name="description" content={t('doctors.pageSubtitle')} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-block p-3 mb-4">
                <FaUserMd className="text-green-500 text-3xl" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('doctors.title')}
              </h1>
              <p className="text-gray-600 text-lg">
                {t('doctors.pageSubtitle')}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Doctor Image */}
                    <div className="relative h-[350px] bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="h-full w-auto object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/doctor-placeholder.jpg';
                        }}
                      />
                    </div>

                    {/* Doctor Info */}
                    <div className="p-6 flex-1 flex flex-col items-center text-center">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {doctor.name}
                      </h3>
                      <div className="text-green-600 mb-4">
                        <span className="font-medium">
                          {t(doctor.specialty)}
                        </span>
                      </div>
                      <div className="space-y-2 mb-6 w-full">
                        {doctor.qualifications.map((qualification, idx) => (
                          <div key={idx} className="flex items-center justify-center gap-2">
                            <FaGraduationCap className="text-gray-400 flex-shrink-0" />
                            <p className="text-sm text-gray-600">
                              {t(qualification)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => navigate('/appointments')}
                        className="w-full mt-auto px-6 py-3 bg-green-500 text-white rounded-lg font-medium transition-colors duration-300 hover:bg-green-600"
                      >
                        {t('doctors.bookAppointment')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Doctors;
