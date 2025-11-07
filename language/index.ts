import i18n from 'i18next'
import {initReactI18next} from "react-i18next"
import fr from '@/language/locales/fr.json'
import en from '@/language/locales/en.json'
import type { InitOptions } from 'i18next'
import * as Localization from 'expo-localization'

export const languageResources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  }
}

const initData = (): InitOptions => {
  const locales = Localization.getLocales()
  const userLanguage = (locales?.[0]?.languageCode ?? 'fr') as string

  return {
    lng: userLanguage,
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    resources: languageResources
  }
}

i18n.use(initReactI18next).init(initData())

export default i18n