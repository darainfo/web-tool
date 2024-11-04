<script>
export default {
  props: {
    copy: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div class="sidebar-wrapper">
    <div class="sidebar-menu-wrapper">
      <div class="sidebar-search">
        <input
          type="text"
          id="sideMenuSearch"
          class="form-control"
          placeholder="Menu search."
        />
      </div>
      <div class="sidebar-menu">
        <div class="wrapper">
          <nav>
            <ul>
              <li>
                <RouterLink to="/imageToDataUrl">Image Base64</RouterLink>
              </li>
              <li>
                <RouterLink to="/textDiff">Text Diff</RouterLink>
              </li>
              <li>
                <RouterLink to="/qrGenerator">QR Generator</RouterLink>
              </li>

              <li>
                <RouterLink to="/text/caseChange">Case Change</RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
