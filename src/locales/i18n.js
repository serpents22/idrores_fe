import en from '../locales/en.json'
import ita from '../locales/ita.json'
import sr from '../locales/sr.json'
import { createI18n } from 'vue-i18n'


const i18n = createI18n({
    locale: 'ita',
    legacy: false,
    messages: {
      en: en,
      ita: ita,
      sr: sr
    },
  })


export default i18n