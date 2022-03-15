import { createI18n } from "vue-i18n"
import ch from "./ch"
import en from "./en"
import jp from "./jp"
import kor from "./kor"

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages: {
    ch,
    en,
    jp,
    kor
  }
})

export default i18n