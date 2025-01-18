import {
  localStorageAuthUser,
  localStorageTokenName,
} from "@/config/app.config";
import { removeLocalStorageState } from "@/utils/local-storage";

export const logout = () => {
  // remove token from local storage
  removeLocalStorageState(localStorageTokenName);
  removeLocalStorageState(localStorageAuthUser);
  // reload and redirect to homepage
  const hostUrl = `${window.location.protocol}//${window.location.host}/login`;
  window.location.href = hostUrl;
};
