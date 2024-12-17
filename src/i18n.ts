import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      ar: {
        translation: translationAR
      }
    },
    lng: 'ar', // Default language
    fallbackLng: 'en',
    keySeparator: '.',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // Disable suspense to ensure translations are available immediately
    }
  });

export default i18n;
