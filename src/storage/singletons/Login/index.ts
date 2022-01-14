import {
  action,
  makeObservable,
  observable,
  runInAction,
  computed,
} from "mobx";
import get from "lodash/get";

import { publicLoginRequest, request } from "services/api";
import { homeUrl } from "utils/constants/routes";
import {
  LoginFormTypes,
  ForgotPasswordTypes,
  ResetPasswordTypes,
  TTwoFactorAuthentication,
} from "utils/types/authentication";
import { LoggedInUserType } from "utils/types/routingConfig";
import { ResponseData } from "utils/types/login";
import RoutingConfig from "../RoutingConfig";
import configStore from "../Config";
import { encrypt, storageToManipulate } from "utils/functions/storage";

class Login {
  user = {} as {
    [key: string]: any;
  };

  level = "" as LoggedInUserType;
  isForgotPasswordNotificationShown: string = "";
  keepUserLoggedIn: boolean = false;
  twoFactorCode: string = "";

  get customLogoutLink() {
    return (
      "customLogOut" in configStore.config.authentication &&
      configStore.config.authentication.customLogOut.enabled &&
      configStore.config.authentication.customLogOut.route
    );
  }

  get userRights() {
    return this.user.profile ? this.user.profile.api_rules : [];
  }

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      level: observable,
      isForgotPasswordNotificationShown: observable,
      keepUserLoggedIn: observable,
      setKeepUserLoggenIn: action,
      twoFactorCode: observable,
      userRights: computed,
    });
  }

  putUserData: (payload?: any) => Promise<void> = async (payload: any) => {
    try {
      await request({
        loaderName: "@getUserDataLoader",
        method: "put",
        route: "/system/users/" + this.user.id,
        payload,
      });
      this.getUserData();
    } catch (e) {}
  };

  setKeepUserLoggenIn = (keepUserLoggedIn: boolean) => {
    this.keepUserLoggedIn = keepUserLoggedIn;
  };
  successLoggedIn = async ({
    data,
    keepMeLoggedIn,
  }: {
    data: object;
    keepMeLoggedIn: boolean;
  }) => {
    const storage = storageToManipulate(keepMeLoggedIn);

    const accessToken = get(data, "data.access_token", false);
    const refreshToken = get(data, "data.refresh_token", false);
    accessToken &&
      storage.setItem(
        `${configStore.config.name}_accessToken`,
        encrypt(accessToken),
      );

    refreshToken &&
      storage.setItem(
        `${configStore.config.name}_refreshToken`,
        encrypt(refreshToken),
      );
    storage.setItem(
      `${configStore.config.name}_keepUserLoggedIn`,
      `${keepMeLoggedIn}`,
    );

    await this.getUserData();

    const routeVal = RoutingConfig.availableRouting.find(
      el => el.key === homeUrl[RoutingConfig.currentLevel],
    );

    const route = routeVal?.value?.path || "/";
    RoutingConfig.history.push(route);
  };

  login = async ({
    keepMeLoggedIn,
    ...payload
  }: LoginFormTypes): Promise<void> => {
    runInAction(() => {
      this.setKeepUserLoggenIn(keepMeLoggedIn);
    });
    try {
      const data: ResponseData | void = await publicLoginRequest({
        loaderName: "@loginLoader",
        payload,
        method: "post",
        route: "auth/login",
      });
      const twoFactorPayload =
        data["data" as keyof object]["2fa_payload" as keyof object] || false;

      if (twoFactorPayload) {
        this.twoFactorCode = twoFactorPayload;
        RoutingConfig.history.push("/two-factor");
      } else {
        this.successLoggedIn({ data, keepMeLoggedIn });
      }
    } catch (e) {}
  };

  logout = async () => {
    localStorage.removeItem(`${configStore.config.name}_accessToken`);
    localStorage.removeItem(`${configStore.config.name}_refreshToken`);
    sessionStorage.removeItem(`${configStore.config.name}_accessToken`);
    sessionStorage.removeItem(`${configStore.config.name}_refreshToken`);
    try {
      await publicLoginRequest({
        loaderName: "@logoutLoader",
        method: "get",
        route: "auth/logout",
      });
    } catch (error) {
      console.log(error);
    }
    RoutingConfig.history.push(this.customLogoutLink || "/login");
  };

  getUserData: () => Promise<void> = async () => {
    type RoutingConfigType = {
      data: { ui_profile: LoggedInUserType; [key: string]: string };
    };

    try {
      const data: RoutingConfigType = await request({
        loaderName: "@getUserDataLoader",
        route: "/system/users/local",
      });
      const level = data.data.ui_profile;
      RoutingConfig.setLoggedUser(level, level);

      runInAction(() => {
        this.user = data.data;
        this.level = level;
      });
    } catch {}
  };

  forgotPassword = async (payload: ForgotPasswordTypes): Promise<void> => {
    runInAction(() => {
      this.isForgotPasswordNotificationShown = "";
    });
    try {
      await publicLoginRequest({
        loaderName: "@forgotPasswordLoader",
        payload,
        method: "post",
        route: "auth/reset-password",
      });
      runInAction(() => {
        this.isForgotPasswordNotificationShown = "success";
      });
    } catch (e) {
      runInAction(() => {
        this.isForgotPasswordNotificationShown = "fail";
      });
    }
  };

  resetPassword = async (
    payload: ResetPasswordTypes,
    oneTimeToken: string | null,
    callback?: () => void,
    successCallback?: () => void,
  ): Promise<void> => {
    try {
      await publicLoginRequest({
        loaderName: "@resetPasswordLoader",
        payload: {
          password: payload.password,
        },
        method: "put",
        route: `auth/reset-password/${oneTimeToken}`,
      });
      successCallback && successCallback();
    } catch (e) {
    } finally {
      callback && callback();
    }
  };

  sendTwoFactorCode = async (
    payload: TTwoFactorAuthentication,
  ): Promise<void> => {
    const newPayload = { ...payload, "2fa_payload": this.twoFactorCode };
    console.log(newPayload);

    try {
      const data = await publicLoginRequest({
        loaderName: "@forgotPasswordLoader",
        payload: newPayload,
        method: "post",
        route: "auth/2fa",
      });
      this.successLoggedIn({ data, keepMeLoggedIn: this.keepUserLoggedIn });
    } catch (e) {
      console.log(e);
    }
  };
}

export default new Login();
