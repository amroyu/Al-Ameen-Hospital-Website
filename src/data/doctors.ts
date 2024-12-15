interface DoctorSchedule {
  from: string;
  to: string;
  days?: string[];
}

interface Doctor {
  name: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  rank: {
    en: string;
    ar: string;
  };
  schedules: DoctorSchedule[];
}

interface Department {
  name: {
    en: string;
    ar: string;
  };
  doctors: Doctor[];
}

export const departments: Department[] = [
  {
    name: {
      en: "Internal Medicine",
      ar: "الباطنة"
    },
    doctors: [
      {
        name: {
          en: "Dr. Mohammed Youssef",
          ar: "د. محمد يوسف"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { from: "8:30", to: "12:30" },
          { from: "16:00", to: "20:00" }
        ]
      },
      {
        name: {
          en: "Dr. Mustafa Abdulsalam",
          ar: "د. مصطفى عبدالسلام"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { from: "8:00", to: "16:00" }
        ]
      },
      {
        name: {
          en: "Dr. Mona Motawea",
          ar: "د. مني مطاوع"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { from: "16:00", to: "24:00" }
        ]
      },
      {
        name: {
          en: "Dr. Wesal Ibrahim",
          ar: "د. وصال ابراهيم"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: []
      },
      {
        name: {
          en: "Dr. Samer Al-Naasan",
          ar: "د. سامر النعسان"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { from: "16:00", to: "24:00" }
        ]
      },
      {
        name: {
          en: "Dr. Ali Asiri",
          ar: "د. علي عسيري"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { 
            from: "17:00",
            to: "22:00",
            days: ["Saturday", "Sunday", "Tuesday", "Wednesday"]
          }
        ]
      },
      {
        name: {
          en: "Dr. Mohammed Imam",
          ar: "د. محمد إمام"
        },
        title: {
          en: "First Deputy",
          ar: "نائب أول"
        },
        rank: {
          en: "First Deputy",
          ar: "نائب أول"
        },
        schedules: [
          { from: "16:00", to: "24:00" }
        ]
      },
      {
        name: {
          en: "Dr. Heba Othman",
          ar: "د. هبة عثمان"
        },
        title: {
          en: "First Deputy",
          ar: "نائب أول"
        },
        rank: {
          en: "First Deputy",
          ar: "نائب أول"
        },
        schedules: [
          { from: "8:00", to: "16:00" }
        ]
      }
    ]
  },
  {
    name: {
      en: "Pediatrics",
      ar: "الأطفال"
    },
    doctors: [
      {
        name: {
          en: "Dr. Mai Abdullatif",
          ar: "د. مي عبداللطيف"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { from: "8:00", to: "16:00" }
        ]
      },
      {
        name: {
          en: "Dr. Mohammed Abdulsalam",
          ar: "د. محمد عبدالسلام"
        },
        title: {
          en: "Consultant",
          ar: "استشاري"
        },
        rank: {
          en: "Consultant",
          ar: "استشاري"
        },
        schedules: [
          { from: "13:00", to: "21:00" }
        ]
      },
      {
        name: {
          en: "Dr. Atef Zidan",
          ar: "د. عاطف زيدان"
        },
        title: {
          en: "Deputy",
          ar: "نائب"
        },
        rank: {
          en: "Deputy",
          ar: "نائب"
        },
        schedules: [
          { from: "16:00", to: "24:00" }
        ]
      }
    ]
  }
];

// Continue with other departments...
