import { createApp } from "vue";

import App from "./App.vue";
import { appRouter } from "./routes/router";

const app = createApp(App);

app
  .use(appRouter(app))
  //.use(store)
  .mount("#appContainer");
