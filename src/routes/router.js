import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";
import { routes } from "./menuRoutes";

export function appRouter(app) {
  const router = createRouter({
    //history: createWebHashHistory(), //createWebHistory(),
    history: createWebHistory("/"),
    routes: routes,
  });

  // 글로벌 네비게이션 가드
  router.beforeEach((to, from, next) => {
    // 라우트의 meta.title을 읽어 <title>을 업데이트

    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
  });

  return router;
}
