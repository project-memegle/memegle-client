import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ko from '../lang/ko.json';
import en from '../lang/en.json';

const resources = {
    ko: {
        translation: ko,
    },
    en: {
        translation: en,
    },
};

const userLanguage = window.navigator.language;

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || userLanguage || 'ko',
    fallbackLng: 'ko',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

export const languages = ['ko', 'en'] as const;
export type Languages = (typeof languages)[number];



















