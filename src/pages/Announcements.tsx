import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import ImageModal from '../components/ImageModal/ImageModal';

interface Announcement {
  id: number;
  title: string;
  titleAr?: string;
  date: string;
  image: string;
  description: string;
  descriptionAr?: string;
}

const AnnouncementCard: React.FC<Announcement> = ({ title, titleAr, date, image, description, descriptionAr }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
        <div 
          className="relative aspect-[16/9] overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={`/images/announcements/${image}`}
            alt={isArabic ? titleAr || title : title}
            className="w-full h-full object-contain hover:opacity-90 transition-opacity"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center text-gray-500 mb-2">
            <FaCalendarAlt className={`${isArabic ? 'ml-2' : 'mr-2'}`} />
            <span>{date}</span>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            {isArabic ? titleAr || title : title}
          </h3>
          <p className="text-gray-600 mb-4">
            {isArabic ? descriptionAr || description : description}
          </p>
          <button 
            className={`flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200 ${
              isArabic ? 'flex-row-reverse' : ''
            }`}
          >
            <span>{isArabic ? 'اقرأ المزيد' : t('common.readMore')}</span>
            <FaArrowRight className={`${isArabic ? 'ml-0 mr-2 transform rotate-180' : 'ml-2'}`} />
          </button>
        </div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        imageUrl={`/images/announcements/${image}`}
        altText={isArabic ? titleAr || title : title}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

const Announcements: React.FC = () => {
  const { t } = useTranslation();
  
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "Early Detection Means Safety",
      titleAr: "فحصك الآن يعني الأمان",
      date: "December 12, 2023",
      image: "Screenshot 2024-12-12 at 20.37.43.png",
      description: "Breast Cancer Awareness Campaign - Early detection saves lives",
      descriptionAr: "حملة التوعية بسرطان الثدي - الكشف المبكر ينقذ الحياة"
    },
    {
      id: 2,
      title: "White Friday Offers",
      titleAr: "عروض الجمعة البيضاء",
      date: "December 13, 2023",
      image: "Screenshot 2024-12-12 at 20.38.03.png",
      description: "Special medical service discounts during White Friday",
      descriptionAr: "خصومات خاصة على الخدمات الطبية خلال الجمعة البيضاء"
    },
    {
      id: 3,
      title: "Saudi National Day 94",
      titleAr: "اليوم الوطني السعودي 94",
      date: "December 14, 2023",
      image: "Screenshot 2024-12-12 at 20.38.17.png",
      description: "Celebrating the 94th Saudi National Day with special healthcare initiatives",
      descriptionAr: "نحتفل باليوم الوطني السعودي 94 مع مبادرات صحية خاصة"
    },
    {
      id: 4,
      title: "New Medical Services",
      titleAr: "خدمات طبية جديدة",
      date: "December 15, 2023",
      image: "Screenshot 2024-12-12 at 20.38.25.png",
      description: "Introducing new specialized medical services for our community",
      descriptionAr: "نقدم خدمات طبية متخصصة جديدة لمجتمعنا"
    },
    {
      id: 5,
      title: "Specialized Clinics",
      titleAr: "عيادات متخصصة",
      date: "December 16, 2023",
      image: "Screenshot 2024-12-12 at 20.38.32.png",
      description: "Expert care in our specialized clinics with latest medical technologies",
      descriptionAr: "رعاية متخصصة في عياداتنا مع أحدث التقنيات الطبية"
    },
    {
      id: 6,
      title: "Medical Excellence",
      titleAr: "التميز الطبي",
      date: "December 17, 2023",
      image: "Screenshot 2024-12-12 at 20.38.49.png",
      description: "Committed to providing excellence in healthcare services",
      descriptionAr: "ملتزمون بتقديم التميز في الخدمات الصحية"
    }
  ];

  return (
    <div className="pt-28 min-h-screen bg-gray-50">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('announcements.pageTitle')}
            </h1>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t('announcements.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {announcements.map((announcement) => (
              <AnnouncementCard key={announcement.id} {...announcement} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Announcements;
