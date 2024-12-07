import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { FaHospital, FaUserMd, FaAward } from 'react-icons/fa';

const About = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <FaHospital className="w-12 h-12 text-blue-600" />,
      number: "1399",
      label: "تأسست عام",
      suffix: "هـ"
    },
    {
      icon: <FaUserMd className="w-12 h-12 text-blue-600" />,
      number: "100+",
      label: "طبيب متخصص"
    },
    {
      icon: <FaAward className="w-12 h-12 text-blue-600" />,
      number: "24",
      label: "قسم طبي"
    }
  ];

  const departments = [
    "قسم العظام ومعالجة الكسور",
    "قسم الجراحة العامة",
    "قسم المختبر",
    "قسم أمراض الأذن والأنف والحنجرة",
    "قسم عمليات الجراحة القلبية",
    "قسم أمراض الأوعية الدموية",
    "قسم النسائية والتوليد",
    "قسم أمراض الدم",
    "قسم أمراض الغدد الصماء",
    "قسم الهضمية",
    "قسم العناية بالأطفال حديثي الولادة",
    "قسم طب الأطفال"
  ];

  return (
    <>
      <Helmet>
        <title>عن المستشفى - مستشفى الأمين العام</title>
        <meta name="description" content="نبذة عن مستشفى الأمين العام وأقسامه وخدماته" />
      </Helmet>

      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">عن مستشفى الأمين العام</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              تم تأسيس مستشفى الأمين العام سنة 1399 للهجرة تحت إشراف آل الأمين في المملكة العربية السعودية،
              حيث يقدم كافة الخدمات الصحية والطبية بإشراف أفضل الكوادر الطبية المؤهلة.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                {stat.icon}
                <div className="text-3xl font-bold mt-4">
                  {stat.number}
                  {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                </div>
                <div className="text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Departments Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">الأقسام الرئيسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                  <span>{dept}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
