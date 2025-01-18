import * as vR from "vue-router";
import { routes } from "@/router/routes";
import { getLocalStorageState } from "@/utils/local-storage";
import { localStorageTokenName } from "@/config/app.config";

const router = vR.createRouter({
  history: vR.createWebHistory(), // WebHash  history will add hash before every route
  routes,
});

router.beforeEach((to, _from, next) => {
  const token = getLocalStorageState(localStorageTokenName);

  if (to.meta.authOnly && !token) next({ name: "login" });
  else if (to.meta.guestOnly && token) next({ name: "dashboard" });
  else next();
});

export default router;
