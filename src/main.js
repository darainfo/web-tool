import { createApp } from "vue";

import App from "./App.vue";
import { appRouter } from "./routes/router";
import { i18n as vueI18n } from "./i18n";

const app = createApp(App);

app.use(vueI18n);

app
  .use(appRouter(app))
  //.use(store)
  .mount("#appContainer");
