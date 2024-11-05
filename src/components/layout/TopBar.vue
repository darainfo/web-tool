<template>
  <div class="top-leftbar">
    <div class="d-flex">
      <div>
        <a @click="toggleMenu()" href="javascript:;" class="sidebar-toggle">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </div>
      <div class="logo">
        <a href="index.html">
          {{ logoTitle }}
        </a>
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
    </ul>
  </div>
</template>
<script>
import { isDesktop } from "@/utils/utils";

const THEME_KEY = "theme";
export default {
  data() {
    return {
      isMenuOpen: false,
      isThemeChecked: false,
    };
  },
  props: {
    logoTitle: {
      type: String,
      default: "logo",
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
  methods: {
    // 메뉴 토글
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;

      const appContainerEl = document.getElementById("appContainer");

      const classList = appContainerEl.classList;

      if (isDesktop(window)) {
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
