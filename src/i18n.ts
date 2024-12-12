import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

// Get stored language preference or use browser language
const getInitialLanguage = () => {
  const storedLang = localStorage.getItem('language');
  if (storedLang && ['en', 'ar'].includes(storedLang)) {
    return storedLang;
  }
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'ar' ? 'ar' : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(), // Set default language dynamically
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Store language preference when it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
