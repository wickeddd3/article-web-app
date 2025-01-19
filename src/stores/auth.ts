import { defineStore } from "pinia";
import type { AuthState, AuthUser } from "@/types/auth";
import type { LoginSchemaType } from "@/schema/auth";
import { getAuthUser, login } from "@/services/auth";
import { logout } from "@/utils/logout";
import { setLocalStorageState } from "@/utils/local-storage";
import {
  localStorageAuthUser,
  localStorageTokenName,
} from "@/config/app.config";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    auth: {
      user: null,
      token: "",
    },
    loginForm: {
      loading: false,
    },
  }),
  getters: {
    authUser: (state) => state.auth.user,
    authUserIsEditor: (state) => state.auth.user?.type === "Editor",
  },
  actions: {
    async loginUser(formData: LoginSchemaType) {
      this.loginForm.loading = true;
      const { data, status } = await login(formData);
      if (status === 200) {
        const { token, user } = data as AuthUser;
        this.auth = data;
        setLocalStorageState(localStorageTokenName, token);
        setLocalStorageState(localStorageAuthUser, JSON.stringify(user));
        this.loginForm.loading = false;
        return true;
      }
      this.loginForm.loading = false;
      return false;
    },
    async logoutUser() {
      logout();
    },
    async fetchAuthUser() {
      if (!this.auth.token) {
        const { data, status } = await getAuthUser();
        if (status === 200) {
          this.auth.user = data;
          setLocalStorageState(localStorageAuthUser, JSON.stringify(data));
          return true;
        }
        return false;
      }
    },
  },
});
