import { Locales } from "./locales";

import ko from "../ko.json";
import en from "../en.json";
import zh from "../zh.json";
import jp from "../jp.json";

export const messages = {
  [Locales.ko]: ko,
  [Locales.en]: en,
  [Locales.zh]: zh,
  [Locales.jp]: jp,
};

export const defaultLocale = Locales.en;
