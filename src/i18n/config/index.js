import { Locales } from "./locales";

import ko from "../ko.json";
import en from "../en.json";
import zh from "../zh.json";
import ja from "../ja.json";

export const messages = {
  [Locales.ko]: ko,
  [Locales.en]: en,
  [Locales.zh]: zh,
  [Locales.ja]: ja,
};

export const defaultLocale = Locales.en;
