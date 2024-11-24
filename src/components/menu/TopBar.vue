<template>
  <div class="top-leftbar">
    <div class="d-flex">
      <div>
        <a @click="toggleMenu()" href="javascript:;" class="sidebar-toggle">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </div>
      <div class="logo">
        <RouterLink to="/">
          {{ logoTitle }}
        </RouterLink>
      </div>
    </div>
  </div>
  <div class="top-rightbar">
    <ul class="navbar-nav ms-auto">
      <li>
        <div class="theme-toggle d-flex gap-2 align-items-center mt-2">
          <div class="form-switch">
            <span class="me-2"><i class="bi bi-brightness-high"></i></span>
            <span>
              <input class="form-check-input ms-0" type="checkbox" @click="themeToggole()" :checked="isThemeChecked" style="cursor: pointer" />
            </span>
            <span class="ms-2">
              <i class="bi bi-moon-stars"></i>
            </span>
          </div>
        </div>
      </li>
      <li>
        <button class="btn btn-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ selectItem.title }}</button>
        <ul class="dropdown-menu">
          <li v-for="(item, key) in language" :key="key">
            <a href="javascript:;" class="dropdown-item" @click="selectLanguage(item)">{{ item.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { isMinimumSize } from "@/utils/utils";
import { LocaleLanguages } from "@/i18n/config/locales";
import { i18n, changeLanguage, currentLocaleLanguage } from "@/i18n";

const THEME_KEY = "theme";
export default {
  data() {
    const currentLang = currentLocaleLanguage();

    const selectItem = LocaleLanguages.find((langItem) => langItem.param == currentLang);

    return {
      isMenuOpen: false,
      isThemeChecked: false,
      language: LocaleLanguages,
      enableLanguage: false,

      selectItem,
    };
  },
  props: {
    logoTitle: {
      type: String,
      default: "WebUtils",
    },
  },
  created() {
    const theme = localStorage.getItem(THEME_KEY);

    if (theme) {
      this.setTheme(theme);
      this.isThemeChecked = theme == "dark";
      return;
    }

    if (!window.matchMedia) {
      return;
    }

    //Media query to detect dark preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    //Register change listener
    mediaQuery.addEventListener("change", (e) => this.setTheme(e.matches ? "dark" : "light"));
    return this.setTheme(mediaQuery.matches ? "dark" : "light");
  },

  mounted() {
    this.initSidemenubar();
  },
  methods: {
    initSidemenubar() {
      // header menu 처
      const sidebarContainer = document.getElementById("sidebarContainer");
      const appContainerEl = document.getElementById("appContainer");

      const sidebarElement = document.querySelector(".sidebar-toggle");

      const classList = appContainerEl.classList;

      document.addEventListener("click", (event) => {
        if (!isMinimumSize(window) && !sidebarContainer.contains(event.target) && !sidebarElement.contains(event.target)) {
          classList.toggle("menu-inactive");
          classList.remove("menu-active");
        }
      });
    },
    selectLanguage(lang) {
      this.selectItem = lang;
      i18n.global.locale = lang.param;
      changeLanguage(lang.param);
      this.enableLanguage = false;
    },
    // 메뉴 토글
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      const appContainerEl = document.getElementById("appContainer");

      const classList = appContainerEl.classList;

      if (isMinimumSize(window)) {
        classList.toggle("menu-inactive");
        classList.remove("menu-active");
      } else {
        classList.toggle("menu-active");
      }
    },
    // theme 변경
    setTheme(theme) {
      const docBody = document.body;
      if (docBody) {
        const classList = docBody.classList;

        classList.remove("light", "dark");

        classList.add(theme);
      }

      localStorage.setItem(THEME_KEY, theme);
    },
    // theme toggole
    themeToggole() {
      this.isThemeChecked = !this.isThemeChecked;

      this.setTheme(this.isThemeChecked ? "dark" : "light");
    },
  },
};
</script>
