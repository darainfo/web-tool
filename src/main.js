import { createApp } from "vue";
import { createHead, VueHeadMixin } from "@unhead/vue";

import App from "./App.vue";
import { appRouter } from "./routes/router";
import { i18n as vueI18n } from "./i18n";

import "bootstrap";
const app = createApp(App);

const head = createHead();

app.use(vueI18n);
app.mixin(VueHeadMixin);

app
  .use(appRouter(app))
  //.use(store)
  .mount("#appContainer");

app.use(head);
