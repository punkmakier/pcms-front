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
	],
});

export default router;
