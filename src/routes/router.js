import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./menuRoutes";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
