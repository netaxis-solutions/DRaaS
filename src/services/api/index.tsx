import axios, { AxiosInstance, AxiosError } from "axios";

import configStore from "storage/singletons/Config";
import { getMethod } from "utils/functions/api";
import { PublicLoginRequestType } from "utils/types/api";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const publicLoginRequest: PublicLoginRequestType = ({
  method = "get",
  route = "",
  payload,
  responseType = "json",
}) => {
  const publicInstance: AxiosInstance = axios.create({
    headers,
  });
  const { config } = configStore;
  publicInstance.defaults.baseURL = `${config.backendUrl}/${config.apiVersion}`;
  publicInstance.defaults.responseType = responseType;
  const requestMethod = method.toLowerCase();
  let changeObject = payload;

  if (requestMethod === "delete") {
    changeObject = { data: payload };
  }
  const requestToSend = getMethod({ obj: publicInstance, key: requestMethod });

  return requestToSend(route, changeObject).catch(
    (error = {} as Error | AxiosError) => {
      Promise.reject(error?.response?.data);
    }
  );
};
