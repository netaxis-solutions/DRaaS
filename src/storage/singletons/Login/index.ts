import { makeObservable, observable, reaction, runInAction } from "mobx";
import get from "lodash/get";

import { publicLoginRequest, request } from "services/api";
import { homeUrl } from "utils/constants/routes";
import {
  LoginFormTypes,
  ForgotPasswordTypes,
  ResetPasswordTypes,
} from "utils/types/authentication";
import { LoggedInUserType } from "utils/types/routingConfig";
import { ResponseData } from "utils/types/login";
import RoutingConfig from "../RoutingConfig";
import configStore from "../Config";

class Login {
  user = {} as object;
  level = "" as LoggedInUserType;
  isForgotPasswordNotificationShown: string = "";

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      level: observable,
      isForgotPasswordNotificationShown: observable,
    });

    reaction(
      () => this.level,
      () => {
        if (this.level) {
          const routeVal = RoutingConfig.availableRouting.find(
            el => el.key === homeUrl[RoutingConfig.currentLevel],
          );

          const route = routeVal?.value?.path || "/";
          RoutingConfig.history.push(route);
        }
      },
    );
  }

  login = async (payload: LoginFormTypes): Promise<void> => {
    try {
      const data: ResponseData | void = await publicLoginRequest({
        loaderName: "@loginLoader",
        payload,
        method: "post",
        route: "auth/login",
      });

      const accessToken = get(data, "data.access_token", false);
      const refreshToken = get(data, "data.refresh_token", false);

      accessToken &&
        localStorage.setItem(
          `${configStore.config.name}_accessToken`,
          accessToken,
        );

      refreshToken &&
        localStorage.setItem(
          `${configStore.config.name}_refreshToken`,
          refreshToken,
        );
      this.getUserData();
    } catch (e) {}
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
}

export default new Login();
