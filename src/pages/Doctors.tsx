import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaClock, FaCalendar, FaSearch, FaFilter, FaStethoscope, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navigation/Navbar';

// Temporary placeholder image URL
const placeholderImage = 'https://via.placeholder.com/300x400?text=Doctor+Image';

interface LocalizedString {
  en: string;
  ar: string;
  [key: string]: string;
}

interface Schedule {
  from: string;
  to: string;
  days?: string[];
}

interface Doctor {
  id: number;
  name: LocalizedString;
  title: LocalizedString;
  schedules: Schedule[];
  image: string;
  about?: LocalizedString;
  achievements?: LocalizedString[];
}

interface Department {
  id: string;
  name: LocalizedString;
  doctors: Doctor[];
}

const departments: Department[] = [
  {
    id: "internal-medicine",
    name: {
      en: "Internal Medicine",
      ar: "الباطنة"
    },
    doctors: [
      {
        id: 1,
        name: { en: "Dr. Mohammed Youssef", ar: "د. محمد يوسف" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:30", to: "12:30" },
          { from: "16:00", to: "20:00" }
        ],
        image: placeholderImage
      },
      {
        id: 2,
        name: { en: "Dr. Mustafa Abdulsalam", ar: "د. مصطفى عبدالسلام" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 3,
        name: { en: "Dr. Mona Motawe", ar: "د. مني مطاوع" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 4,
        name: { en: "Dr. Wesal Ibrahim", ar: "د. وصال ابراهيم" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [],
        image: placeholderImage
      },
      {
        id: 5,
        name: { en: "Dr. Samer Al-Naasan", ar: "د. سامر النعسان" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 6,
        name: { en: "Dr. Ali Asiri", ar: "د. علي عسيري" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { 
            from: "17:00",
            to: "22:00",
            days: ["Saturday", "Sunday", "Tuesday", "Wednesday"]
          }
        ],
        image: placeholderImage
      },
      {
        id: 7,
        name: { en: "Dr. Mohammed Imam", ar: "د. محمد إمام" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 8,
        name: { en: "Dr. Heba Othman", ar: "د. هبة عثمان" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "pediatrics",
    name: {
      en: "Pediatrics",
      ar: "الأطفال"
    },
    doctors: [
      {
        id: 9,
        name: { en: "Dr. Mai Abdullatif", ar: "د. مي عبداللطيف" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 10,
        name: { en: "Dr. Mohammed Abdulsalam", ar: "د. محمد عبدالسلام" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "13:00", to: "21:00" }
        ],
        image: placeholderImage
      },
      {
        id: 11,
        name: { en: "Dr. Atef Zidan", ar: "د. عاطف زيدان" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "orthopedics",
    name: {
      en: "Orthopedics",
      ar: "العظام"
    },
    doctors: [
      {
        id: 12,
        name: { en: "Dr. Mohammed Al-Baqri", ar: "د. محمد البقري" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 13,
        name: { en: "Dr. Abdullah Al-Zahrani", ar: "د. عبدالله الزهراني" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          {
            from: "17:00",
            to: "19:00",
            days: ["Monday", "Tuesday"]
          }
        ],
        image: placeholderImage
      },
      {
        id: 14,
        name: { en: "Dr. Hamed Al-Nufaie", ar: "د. حامد النفيعي" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          {
            from: "17:00",
            to: "21:00",
            days: ["Sunday", "Wednesday"]
          }
        ],
        image: placeholderImage
      },
      {
        id: 15,
        name: { en: "Dr. Ahmed Al-Buhairi", ar: "د. أحمد البحيري" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 16,
        name: { en: "Dr. Hayel Al-Harthi", ar: "د. هايل الحارثي" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "general-surgery",
    name: {
      en: "General Surgery",
      ar: "الجراحة العامة"
    },
    doctors: [
      {
        id: 17,
        name: { en: "Dr. Khadem Sial", ar: "د. خادم سيال" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 18,
        name: { en: "Dr. Mohammed Abu Halawa", ar: "د. محمد أبو حلاوة" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 19,
        name: { en: "Dr. Atiyah Al-Zahrani", ar: "د. عطيه الزهراني" },
        title: { en: "Consultant Endocrine and Breast Surgery", ar: "استشاري جراحة غدد صماء وثدي" },
        schedules: [
          {
            from: "17:00",
            to: "21:00",
            days: ["Sunday", "Tuesday"]
          }
        ],
        image: placeholderImage
      },
      {
        id: 20,
        name: { en: "Dr. Rabab Wagdy", ar: "د. رباب وجدي" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "10:00", to: "14:00" },
          { from: "17:00", to: "21:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "obstetrics-gynecology",
    name: {
      en: "Obstetrics and Gynecology",
      ar: "النساء والولادة"
    },
    doctors: [
      {
        id: 21,
        name: { en: "Dr. Doaa Afifi", ar: "د. دعاء عفيفي" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "09:00", to: "13:00" },
          { from: "17:00", to: "21:00" }
        ],
        image: placeholderImage
      },
      {
        id: 22,
        name: { en: "Dr. Rania El-Sayed", ar: "د. رانيا السيد" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 23,
        name: { en: "Dr. Khaled Tawalba", ar: "د. خالد طوالبه" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 24,
        name: { en: "Dr. Malaz Ibrahim", ar: "د. ملاذ إبراهيم" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 25,
        name: { en: "Dr. Manar Weld Ali", ar: "د. منار ولد علي" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "dental",
    name: {
      en: "Dental",
      ar: "الأسنان"
    },
    doctors: [
      {
        id: 26,
        name: { en: "Dr. Zuhair Imam Allah", ar: "د. زهير إمام الله" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 27,
        name: { en: "Dr. Ahmed Abdulsattar", ar: "د. أحمد عبدالستار" },
        title: { en: "Deputy Oral and Maxillofacial Surgery", ar: "نائب جراحة الوجه والفكين" },
        schedules: [
          { from: "10:00", to: "18:00" }
        ],
        image: placeholderImage
      },
      {
        id: 28,
        name: { en: "Dr. Amira Kamal", ar: "د. أميرة كمال" },
        title: { en: "General Dentist", ar: "طبيب أسنان عام" },
        schedules: [],
        image: placeholderImage
      },
      {
        id: 29,
        name: { en: "Dr. Ghadeer Akram", ar: "د. غدير اكرم" },
        title: { en: "General Dentist", ar: "طبيب أسنان عام" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 30,
        name: { en: "Dr. Mohammed Abed", ar: "د. محمد عابد" },
        title: { en: "General Dentist", ar: "طبيب أسنان عام" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "ent",
    name: {
      en: "Ear, Nose and Throat",
      ar: "الأنف والأذن والحنجرة"
    },
    doctors: [
      {
        id: 31,
        name: { en: "Dr. Kamal El-Din Hassan", ar: "د. كمال الدين حسن" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 32,
        name: { en: "Dr. Kamal Abdulhamid", ar: "د. كمال عبدالحميد" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 33,
        name: { en: "Dr. Ru'a Abdulrahman", ar: "د. رؤى عبدالرحمن" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [],
        image: placeholderImage
      }
    ]
  },
  {
    id: "rheumatology",
    name: {
      en: "Rheumatology and Immunology",
      ar: "الروماتيزم والمناعة"
    },
    doctors: [
      {
        id: 34,
        name: { en: "Dr. Maryam Al-Batool Mahmoud", ar: "د. مريم البتول محمود" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [
          { from: "09:00", to: "13:00" },
          { from: "17:00", to: "21:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "cardiology",
    name: {
      en: "Cardiology",
      ar: "القلب"
    },
    doctors: [
      {
        id: 35,
        name: { en: "Dr. Mohammed Saeed", ar: "د. محمد سعيد" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 36,
        name: { en: "Dr. Mohammed Abdulkhaleq", ar: "د. محمد عبدالخالق" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "neurology",
    name: {
      en: "Neurology",
      ar: "المخ والأعصاب"
    },
    doctors: [
      {
        id: 37,
        name: { en: "Dr. Hossam Azmi", ar: "د. حسام عزمي" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 38,
        name: { en: "Dr. Amani Attia", ar: "د. أماني عطية" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "psychiatry",
    name: {
      en: "Psychiatry",
      ar: "الأمراض النفسية"
    },
    doctors: [
      {
        id: 39,
        name: { en: "Dr. Sami Al-Khouri", ar: "د. سامي الخوري" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          {
            from: "19:00",
            to: "22:00",
            days: ["Sunday", "Wednesday"]
          }
        ],
        image: placeholderImage
      },
      {
        id: 40,
        name: { en: "Dr. Adel Awad", ar: "د. عادل عواد" },
        title: { en: "Psychiatrist", ar: "طبيب أمراض نفسية" },
        schedules: [
          { from: "09:00", to: "13:00" },
          { from: "17:00", to: "21:00" }
        ],
        image: placeholderImage
      },
      {
        id: 41,
        name: { en: "Shahad Al-Salmi", ar: "شهد السالمي" },
        title: { en: "Psychologist", ar: "اخصائية نفسية" },
        schedules: [
          { from: "09:00", to: "13:00" },
          { from: "17:00", to: "21:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "ophthalmology",
    name: {
      en: "Ophthalmology",
      ar: "العيون"
    },
    doctors: [
      {
        id: 42,
        name: { en: "Dr. Mustafa Farid", ar: "د. مصطفى فريد" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 43,
        name: { en: "Dr. Samia Hassan", ar: "د. سامية حسن" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "urology",
    name: {
      en: "Urology",
      ar: "المسالك البولية"
    },
    doctors: [
      {
        id: 44,
        name: { en: "Dr. Atef Abdullatif", ar: "د. عاطف عبداللطيف" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 45,
        name: { en: "Dr. Shehab Mohammed", ar: "د. شهاب محمد" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "pulmonology",
    name: {
      en: "Pulmonology",
      ar: "الصدرية"
    },
    doctors: [
      {
        id: 46,
        name: { en: "Dr. Salim Jamaluddin", ar: "د. سليم جمال الدين" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 47,
        name: { en: "Dr. Ahmed Ibrahim Hassan", ar: "د. احمد ابراهيم حسن" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "nephrology",
    name: {
      en: "Nephrology",
      ar: "الكلى"
    },
    doctors: [
      {
        id: 48,
        name: { en: "Dr. Alaa Abdulrahman", ar: "د. علاء عبدالرحمن" },
        title: { en: "Resident Doctor", ar: "طبيب مقيم" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      }
    ]
  },
  {
    id: "anesthesiology",
    name: {
      en: "Anesthesiology",
      ar: "التخدير"
    },
    doctors: [
      {
        id: 49,
        name: { en: "Dr. Ahmed Yahya", ar: "د. أحمد يحيى" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "10:00", to: "18:00" }
        ],
        image: placeholderImage
      },
      {
        id: 50,
        name: { en: "Dr. Tariq Shawar", ar: "د. طارق شاور" },
        title: { en: "Consultant", ar: "استشاري" },
        schedules: [
          { from: "00:00", to: "00:00" }
        ],
        image: placeholderImage
      },
      {
        id: 51,
        name: { en: "Dr. Khaled Lutfi", ar: "د. خالد لطفي" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [],
        image: placeholderImage
      }
    ]
  },
  {
    id: "radiology",
    name: {
      en: "Radiology",
      ar: "الأشعة"
    },
    doctors: [
      {
        id: 52,
        name: { en: "Dr. Hussam Al-Sir", ar: "د. حسام السر" },
        title: { en: "Deputy", ar: "نائب" },
        schedules: [
          { from: "09:00", to: "13:00" },
          { from: "17:00", to: "21:00" }
        ],
        image: placeholderImage
      },
      {
        id: 53,
        name: { en: "Dr. Zina Joubi", ar: "د. زينه جوبي" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "08:00", to: "16:00" }
        ],
        image: placeholderImage
      },
      {
        id: 54,
        name: { en: "Dr. Maali Abdulazim", ar: "د. معالي عبدالعظيم" },
        title: { en: "First Deputy", ar: "نائب أول" },
        schedules: [
          { from: "16:00", to: "00:00" }
        ],
        image: placeholderImage
      }
    ]
  }
];

const DoctorCard: React.FC<{
  doctor: Doctor;
  currentLanguage: keyof LocalizedString;
}> = ({ doctor, currentLanguage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Add dummy data if not present
  const doctorWithDummyData = {
    ...doctor,
    about: doctor.about || {
      en: `${doctor.name.en} is a highly qualified medical professional with extensive experience in their field. They are committed to providing exceptional patient care and staying current with the latest medical advancements.`,
      ar: `${doctor.name.ar} طبيب مؤهل تأهيلاً عالياً مع خبرة واسعة في مجاله. ملتزم بتقديم رعاية استثنائية للمرضى ومواكبة أحدث التطورات الطبية.`
    },
    achievements: doctor.achievements || [
      {
        en: "Board Certified Specialist",
        ar: "حاصل على شهادة البورد التخصصي"
      },
      {
        en: "Member of multiple international medical associations",
        ar: "عضو في العديد من الجمعيات الطبية الدولية"
      },
      {
        en: "Participated in numerous medical conferences and workshops",
        ar: "شارك في العديد من المؤتمرات وورش العمل الطبية"
      }
    ]
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
      >
        <div className="p-6 flex flex-col flex-1">
          <div className="aspect-w-4 aspect-h-3 mb-6 overflow-hidden rounded-lg">
            <img
              src={doctorWithDummyData.image}
              alt={doctorWithDummyData.name[currentLanguage]}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex items-center mb-2">
              <FaStethoscope 
                className={`text-primary-600 dark:text-primary-400 ${
                  currentLanguage === 'ar' ? 'ml-2' : 'mr-2'
                } text-xl`} 
              />
              <h3 className={`text-xl font-semibold text-gray-900 dark:text-white ${
                currentLanguage === 'ar' ? 'ml-1' : 'mr-1'
              }`}>
                {doctorWithDummyData.name[currentLanguage]}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {doctorWithDummyData.title[currentLanguage]}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className={`text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium mb-4 hover:underline focus:outline-none ${
                currentLanguage === 'ar' ? 'text-right w-full' : 'text-left'
              }`}
            >
              {t('doctors.moreInformation')}
            </button>
            <div className="flex-1">
              {doctorWithDummyData.schedules.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <FaClock className={`${currentLanguage === 'ar' ? 'ml-1.5' : 'mr-2'}`} />
                    <span className={currentLanguage === 'ar' ? 'mr-0.5' : ''}>{t('doctors.workingHours')}</span>
                  </div>
                  {doctorWithDummyData.schedules.map((schedule, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-500 dark:text-gray-400 ml-6 mb-1"
                    >
                      {schedule.from} - {schedule.to}
                      {schedule.days && (
                        <div className="flex items-center mt-1">
                          <FaCalendar className="mr-2" />
                          <span>{schedule.days.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => navigate(`/book-appointment/${doctorWithDummyData.id}`)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 mt-auto"
            >
              {t('common.bookAppointment')}
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full p-6 relative my-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className={`absolute top-4 ${currentLanguage === 'ar' ? 'left-4' : 'right-4'} text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200`}
            >
              <FaTimes size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="sticky top-6">
                  <img
                    src={doctorWithDummyData.image}
                    alt={doctorWithDummyData.name[currentLanguage]}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">
                    {doctorWithDummyData.name[currentLanguage]}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                    {doctorWithDummyData.title[currentLanguage]}
                  </p>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 border-b pb-2">
                      {t('doctors.about')}
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                      {doctorWithDummyData.about[currentLanguage]}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 border-b pb-2">
                      {t('doctors.achievements')}
                    </h3>
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      {doctorWithDummyData.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary-600 mr-2">•</span>
                          <span>{achievement[currentLanguage]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const Doctors: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLanguage = i18n.language as keyof LocalizedString;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  
  // Filter doctors based on search query and selected department
  const filteredDepartments = useMemo(() => {
    return departments.map(dept => ({
      ...dept,
      doctors: dept.doctors.filter(doctor => {
        const matchesSearch = 
          doctor.name[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase()) ||
          doctor.title[currentLanguage].toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = selectedDepartment === 'all' || dept.id === selectedDepartment;
        return matchesSearch && matchesDepartment;
      })
    })).filter(dept => dept.doctors.length > 0);
  }, [departments, searchQuery, selectedDepartment, currentLanguage]);

  return (
    <>
      <Helmet>
        <title>{t('doctors.pageTitle')} | {t('common.hospitalName')}</title>
        <meta name="description" content={t('doctors.metaDescription')} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-400 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="rounded-full bg-white/10 p-4">
                  <FaUserMd className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                {t('doctors.pageTitle')}
              </h1>
              <p className="mt-4 text-lg leading-8 text-white/80">
                {t('doctors.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="container mx-auto px-4 -mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex items-center gap-4">
              {/* Department Filter */}
              <div className="w-[260px]">
                <div className="relative">
                  <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className={`w-full h-11 pl-10 pr-8 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm 
                      appearance-none focus:outline-none focus:ring-1 focus:ring-primary-500 
                      focus:border-primary-500 ${currentLanguage === 'ar' ? 'text-right' : 'text-left'}`}
                    dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
                  >
                    <option value="all">{t('doctors.allDepartments')}</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name[currentLanguage]}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('doctors.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 text-sm 
                      placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 
                      focus:border-primary-500 ${currentLanguage === 'ar' ? 'text-right' : 'text-left'}`}
                    dir={currentLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Departments List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <AnimatePresence>
              {filteredDepartments.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <p className="text-xl text-gray-600">{t('doctors.noResults')}</p>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-16"
                >
                  {filteredDepartments.map((department) => (
                    <motion.div
                      key={department.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
                    >
                      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-4">
                        {department.name[currentLanguage]}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto w-[90%] sm:w-full mt-8">
                        {department.doctors.map((doctor) => (
                          <DoctorCard key={doctor.id} doctor={doctor} currentLanguage={currentLanguage} />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
};

export default Doctors;
