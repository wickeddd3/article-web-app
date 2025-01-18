import type { User } from "@/types/user";

export type AuthUser = {
  user: User | null;
  token: string;
};

export type AuthState = {
  auth: AuthUser;
  loginForm: { loading: boolean };
};
