import { makeObservable, observable, runInAction } from "mobx";
import get from "lodash/get";

import { publicLoginRequest } from "services/api";
import { homeUrl } from "utils/constants/routes";
import { LoginFormTypes } from "utils/types/authentication";
import { ResponseData } from "utils/types/login";
import PendingQueries from "../PendingQueries";
import RoutingConfig from "../RoutingConfig";
import configStore from "../Config";

class Login {
  user = {} as object;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
    });
  }

  login = async (payload: LoginFormTypes): Promise<void> => {
    const queryId = PendingQueries.add("@loginLoader", null);

    try {
      const data: ResponseData | void = await publicLoginRequest({
        payload,
        method: "post",
        route: "auth/login",
      });
      const level = get(data, "data.ids", "admin");

      const accessToken = get(data, "data.access_token", false);
      const refreshToken = get(data, "data.refresh_token", false);
      level && RoutingConfig.setLoggedUser(level, level);

      accessToken &&
        localStorage.setItem(
          `${configStore.config.name}_accessToken`,
          accessToken
        );

      refreshToken &&
        localStorage.setItem(
          `${configStore.config.name}_refreshToken`,
          refreshToken
        );

      const route =
        RoutingConfig.availableRouting.find(
          (el) => el["key" as keyof object] === homeUrl[level]
        )?.["value" as keyof object]?.["path" as keyof object] || "/";

      RoutingConfig.history.push(route);
    } catch (e) {
    } finally {
      runInAction(() => {
        PendingQueries.remove("@loginLoader", queryId);
      });
    }
  };
}

export default new Login();
