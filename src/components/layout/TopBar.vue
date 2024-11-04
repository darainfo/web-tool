<script>
export default {
  props: {
    logo_name: {
      type: String,
      default: "logo",
    },
  },
};
</script>

<template>
  <div class="top-leftbar">
    <div class="d-flex">
      <div>
        <a href="javascript:;" class="sidebar-toggle">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </div>
      <div class="logo">
        <a href="index.html">
          {{ logo_name }}
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
              <input
                class="form-check-input ms-0"
                type="checkbox"
                id="headerThemeToggle"
                style="cursor: pointer"
              />
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
