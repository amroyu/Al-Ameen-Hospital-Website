import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';
import SectionTitle from '../components/Common/SectionTitle';
import LoadingSpinner from '../components/Common/LoadingSpinner';

interface Doctor {
  name: string;
  specialty: string;
  qualifications: string[];
}

const Doctors = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    if (!i18n.isInitialized) return;

    const doctorsData: Doctor[] = Array.from({ length: 5 }).map((_, index) => ({
      name: t(`doctors.team.${index}.name`),
      specialty: t(`doctors.team.${index}.specialty`),
      qualifications: [
        t(`doctors.team.${index}.qualifications.0`),
        t(`doctors.team.${index}.qualifications.1`)
      ]
    }));

    setDoctors(doctorsData);
    setIsLoading(false);
  }, [t, i18n.isInitialized, i18n.language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{t('doctors.title')} - {t('header.hospitalName')}</title>
        <meta name="description" content={t('doctors.pageSubtitle')} />
      </Helmet>

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <SectionTitle
            title={t('doctors.title')}
            subtitle={t('doctors.pageSubtitle')}
          />

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {doctors.map((doctor, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 font-arabic">
                        {doctor.name}
                      </h3>
                      <p className="text-blue-600 mb-4 font-arabic">
                        {doctor.specialty}
                      </p>
                      <div className="space-y-2 mb-6">
                        {doctor.qualifications.map((qualification, idx) => (
                          <p key={idx} className="text-sm text-gray-600 font-arabic">
                            {qualification}
                          </p>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => navigate('/appointments')}
                      className="w-full"
                    >
                      {t('doctors.bookAppointment')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
