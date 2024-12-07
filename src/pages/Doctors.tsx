import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FaPhone, FaEnvelope, FaCalendar } from 'react-icons/fa';
import Button from '../components/Common/Button';
import SectionTitle from '../components/Common/SectionTitle';

const Doctors = () => {
  const { t } = useTranslation();

  const doctors = [
    {
      name: "د. محمد العبدالله",
      specialty: "جراحة القلب والأوعية الدموية",
      image: "/images/doctors/doctor1.jpg",
      education: "دكتوراه في جراحة القلب - جامعة الملك سعود",
      experience: "15 عاماً من الخبرة"
    },
    {
      name: "د. سارة الأحمد",
      specialty: "طب العيون",
      image: "/images/doctors/doctor2.jpg",
      education: "زمالة في طب العيون - جامعة هارفارد",
      experience: "12 عاماً من الخبرة"
    },
    {
      name: "د. أحمد المالكي",
      specialty: "جراحة العظام",
      image: "/images/doctors/doctor3.jpg",
      education: "دكتوراه في جراحة العظام - جامعة أكسفورد",
      experience: "18 عاماً من الخبرة"
    },
    {
      name: "د. فاطمة الزهراني",
      specialty: "طب الأطفال",
      image: "/images/doctors/doctor4.jpg",
      education: "زمالة في طب الأطفال - جامعة تورنتو",
      experience: "10 أعوام من الخبرة"
    }
  ];

  return (
    <>
      <Helmet>
        <title>الأطباء - مستشفى الأمين العام</title>
        <meta name="description" content="تعرف على فريقنا الطبي المتميز في مستشفى الأمين العام" />
      </Helmet>

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="فريقنا الطبي"
            subtitle="نخبة من الأطباء المتخصصين ذوي الخبرة العالية"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-3 aspect-h-4 bg-gray-200">
                  {/* Image placeholder */}
                  <div className="w-full h-64 bg-gray-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{doctor.specialty}</p>
                  <div className="space-y-2 text-gray-600 mb-6">
                    <p>{doctor.education}</p>
                    <p>{doctor.experience}</p>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {}}
                  >
                    <FaCalendar className="mr-2" />
                    حجز موعد
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Join Our Team Section */}
          <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">انضم إلى فريقنا الطبي</h3>
            <p className="mb-6">
              نحن دائماً نبحث عن المواهب الطبية المتميزة للانضمام إلى فريقنا
            </p>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => {}}
            >
              تقدم للوظائف
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctors;
