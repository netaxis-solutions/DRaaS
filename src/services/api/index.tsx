import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import get from "lodash/get";

import configStore from "storage/singletons/Config";
import PendingQueries from "storage/singletons/PendingQueries";
import { getMethod } from "utils/functions/api";
import {
  AccessTokenResponse,
  HeadersType,
  SendRequestType
} from "utils/types/api";

const headers: HeadersType = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const publicLoginRequest: SendRequestType = ({
  loaderName,
  method = "get",
  route = "",
  payload,
  responseType = "json"
}) => {
  let queryID = 0;
  if (loaderName) {
    queryID = PendingQueries.add(loaderName, null);
  }

  const publicInstance: AxiosInstance = axios.create({
    headers
  });

  const { config } = configStore;
  const requestMethod = method.toLowerCase();
  let changeObject = payload;

  publicInstance.defaults.baseURL = `${config.backendUrl}/${config.apiVersion}`;
  publicInstance.defaults.responseType = responseType;

  if (requestMethod === "delete") {
    changeObject = { data: payload };
  }

  const requestToSend = getMethod({ obj: publicInstance, key: requestMethod });

  return requestToSend(route, changeObject)
    .catch((error = {} as Error | AxiosError) => Promise.reject(error))
    .finally(
      () => queryID && loaderName && PendingQueries.remove(loaderName, queryID)
    );
};

const onResponse = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage.getItem(`${configStore.config.name}_accessToken`);
  if (token) {
    config["headers" as keyof AxiosRequestConfig][
      "Authorization" as keyof HeadersType
    ] = `Bearer ${token}`;
  }
  return config;
};

const onResponseError = async (
  error: AxiosError
): Promise<AxiosError | AxiosRequestConfig> => {
  const status = get(error, "response.status", 0);
  const config: AxiosRequestConfig = get(error, "config", {});
  if (
    status === 401 &&
    config.url === `${configStore.config.backendUrl}/api/v01/auth/access_token`
  ) {
    console.log("logout");
    return Promise.reject(error);
  } else if (status === 401) {
    const refreshToken = localStorage.getItem(
      `${configStore.config.name}_refreshToken`
    );
    try {
      const response: AccessTokenResponse = await axios.get(
        `${configStore.config.backendUrl}/api/v01/auth/access_token`,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      );

      if (response.data) {
        const accessToken = response.data.access_token;
        localStorage.setItem(
          `${configStore.config.name}_accessToken`,
          accessToken
        );
        config["headers" as keyof AxiosRequestConfig][
          "Authorization" as keyof HeadersType
        ] = `Bearer ${accessToken}`;
        return axios(config);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.reject(error);
};

export const request: SendRequestType = ({
  method = "get",
  route = "",
  payload,
  responseType = "json",
  loaderName
}) => {
  const privateInstance: AxiosInstance = axios.create({
    headers
  });
  const { config } = configStore;
  let queryID = 0;
  if (loaderName) {
    queryID = PendingQueries.add(loaderName, null);
  }
  if (config.backendUrl) {
    privateInstance.interceptors.response.use(onResponse, onResponseError);

    privateInstance.defaults.baseURL = `${config.backendUrl}/${config.apiVersion}`;
    privateInstance.defaults.responseType = responseType;
    const requestMethod = method.toLowerCase();
    let changeObject = payload;

    if (requestMethod === "delete") {
      changeObject = { data: payload };
    }

    const requestToSend = getMethod({
      obj: privateInstance,
      key: requestMethod
    });

    return requestToSend(route, changeObject)
      .catch((error = {} as Error | AxiosError) => Promise.reject(error))
      .finally(() => {
        queryID && loaderName && PendingQueries.remove(loaderName, queryID);
      });
  } else throw new Error("no request sent");
};
