import * as vR from "vue-router";
import { routes } from "@/router/routes";

const router = vR.createRouter({
  history: vR.createWebHistory(), // WebHash  history will add hash before every route
  routes, // Send the routes here.
});

router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("article.accessToken");

  if (to.meta.authOnly && !token) next({ name: "login" });
  else if (to.meta.guestOnly && token) next({ name: "dashboard" });
  else next();
});

export default router;
