import {
  action,
  makeObservable,
  observable,
  runInAction,
  computed,
} from "mobx";
import get from "lodash/get";

import { t } from "services/Translation";
import { publicLoginRequest, request } from "services/api";
import { homeUrl } from "utils/constants/routes";
import {
  changeAccountInfoPayload,
  changePasswordPayload,
} from "utils/types/user";
import {
  LoginFormTypes,
  ForgotPasswordTypes,
  ResetPasswordTypes,
  TTwoFactorAuthentication,
} from "utils/types/authentication";
import { LoggedInUserType } from "utils/types/routingConfig";
import { encrypt, storageToManipulate } from "utils/functions/storage";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";
import { ResponseData } from "utils/types/login";
import RoutingConfig from "../RoutingConfig";
import configStore from "../Config";

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

  putUserData: (payload: changeAccountInfoPayload) => Promise<void> = async (
    payload: changeAccountInfoPayload,
  ) => {
    await request({
      loaderName: "@getUserDataLoader",
      method: "put",
      route: "/system/users/" + this.user.id,
      payload,
    })
      .then(() => {
        successNotification(t("Account information was successfully updated!"));
        this.getUserData();
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  changePassword: (
    payload: changePasswordPayload,
    successCallback: () => void,
    errorCallback: () => void,
  ) => Promise<void> = async (
    payload: changePasswordPayload,
    successCallback: () => void,
    errorCallback: () => void,
  ) => {
    await request({
      loaderName: "@getUserDataLoader",
      method: "put",
      route: "/system/users/local",
      payload,
    })
      .then(() => {
        successNotification(t("Password was successfully updated!"));
        successCallback && successCallback();
        this.getUserData();
      })
      .catch(e => {
        errorNotification(e);
        errorCallback && errorCallback();
      });
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
    } catch (e) {
      errorNotification(t("Invalid credentials"));
    }
  };

  logout = async () => {
    localStorage.removeItem(`${configStore.config.name}_accessToken`);
    localStorage.removeItem(`${configStore.config.name}_refreshToken`);
    sessionStorage.removeItem(`${configStore.config.name}_accessToken`);
    sessionStorage.removeItem(`${configStore.config.name}_refreshToken`);
    await publicLoginRequest({
      loaderName: "@logoutLoader",
      method: "get",
      route: "auth/logout",
    }).catch(e => {
      errorNotification(e);
    });
    RoutingConfig.history.push(this.customLogoutLink || "/login");
  };

  getUserData: () => Promise<void> = async () => {
    type RoutingConfigType = {
      data: { ui_profile: LoggedInUserType; [key: string]: string };
    };

    request({
      loaderName: "@getUserDataLoader",
      route: "/system/users/local",
    })
      .then((data: RoutingConfigType) => {
        const level = data.data.ui_profile;
        RoutingConfig.setLoggedUser(level, level);

        runInAction(() => {
          this.user = data.data;
          this.level = level;
        });
      })
      .catch(e => {
        errorNotification(e);
      });
  };

  forgotPassword = async (payload: ForgotPasswordTypes): Promise<void> => {
    runInAction(() => {
      this.isForgotPasswordNotificationShown = "";
    });
    publicLoginRequest({
      loaderName: "@forgotPasswordLoader",
      payload,
      method: "post",
      route: "auth/reset-password",
    })
      .then(() => {
        runInAction(() => {
          this.isForgotPasswordNotificationShown = "success";
        });
      })
      .catch(() => {
        runInAction(() => {
          this.isForgotPasswordNotificationShown = "fail";
        });
      });
  };

  resetPassword = async (
    payload: ResetPasswordTypes,
    oneTimeToken: string | null,
    callback?: () => void,
    successCallback?: () => void,
  ): Promise<void> => {
    publicLoginRequest({
      loaderName: "@resetPasswordLoader",
      payload: {
        password: payload.password,
      },
      method: "put",
      route: `auth/reset-password/${oneTimeToken}`,
    })
      .then(() => {
        successCallback && successCallback();
      })
      .catch(e => {
        errorNotification(e);
      })
      .finally(() => {
        callback && callback();
      });
  };

  sendTwoFactorCode = async (
    payload: TTwoFactorAuthentication,
  ): Promise<void> => {
    const newPayload = { ...payload, "2fa_payload": this.twoFactorCode };
    console.log(newPayload);

    publicLoginRequest({
      loaderName: "@forgotPasswordLoader",
      payload: newPayload,
      method: "post",
      route: "auth/2fa",
    })
      .then(data => {
        this.successLoggedIn({ data, keepMeLoggedIn: this.keepUserLoggedIn });
      })
      .catch(e => {
        errorNotification(e);
      });
  };
}

export default new Login();
