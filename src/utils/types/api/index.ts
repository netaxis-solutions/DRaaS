import { AxiosResponse, ResponseType } from "axios";

export type RequestArgsType = {
  method?:
    | "get"
    | "delete"
    | "head"
    | "options"
    | "post"
    | "put"
    | "patch"
    | "purge"
    | "link"
    | "unlink";
  route?: string;
  payload?: object;
  responseType?: ResponseType;
};

export type SendRequestType = (
  object: RequestArgsType
) => Promise<AxiosResponse>;

export type RequestType = (object: {
  obj: object;
  key: string;
}) => (
  route: string,
  changeObject: object | undefined
) => Promise<AxiosResponse>;

export type AccessTokenResponse = {
  data: { access_token: string };
};

export type HeadersType = {
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
};
