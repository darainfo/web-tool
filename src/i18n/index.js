import { createI18n } from "vue-i18n";
import { messages, defaultLocale } from "./config";

// 언어 체크
function storeLanguage() {
  const userLang = navigator.language || navigator.userLanguage || ""; // 'en-US', 'ko-KR' 등의 값 반환
  const lang = window.localStorage.getItem("dara-web-tool-lang");
  return lang ? lang : userLang;
}

// 언어 변경.
export function changeLanguage(lang) {
  window.localStorage.setItem("dara-web-tool-lang", lang);
}

export const i18n = createI18n({
  messages,
  locale: storeLanguage(),
  fallbackLocale: defaultLocale,
});
