import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/AdminLogin.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/views/Dashboard.vue"),
    },
    {
      path: "/gmap",
      name: "gmap",
      component: () => import("@/views/GoogleMap.vue"),
    },
  ],
});

export default router;
