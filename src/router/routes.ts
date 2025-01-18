import * as vR from "vue-router";

export const routes: vR.RouteRecordRaw[] = [
  // Redirect from "/" to "/dashboard"
  {
    path: "/",
    redirect: "/dashboard",
  },
  // Parent route for all `authOnly` routes
  {
    path: "/",
    component: () => import("@/components/layouts/MainLayout.vue"), // Main layout
    meta: { authOnly: true },
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/DashboardPage.vue"),
        name: "dashboard",
        meta: { authOnly: true },
      },
      {
        path: "all-media",
        component: () => import("@/pages/AllMediaPage.vue"),
        name: "all-media",
        meta: { authOnly: true },
      },
      {
        path: "users",
        component: () => import("@/pages/UsersPage.vue"),
        name: "users",
        meta: { authOnly: true },
      },
      {
        path: "companies",
        component: () => import("@/pages/CompaniesPage.vue"),
        name: "companies",
        meta: { authOnly: true },
      },
    ],
  },
  // Route for guest-only pages
  {
    path: "/login",
    component: () => import("@/pages/LoginPage.vue"),
    name: "login",
    meta: { guestOnly: true },
  },
];
