import { ResponseType } from "axios";

export type PublicLoginRequestArgsType = {
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

export type PublicLoginRequestType = (
  object: PublicLoginRequestArgsType
) => Promise<void | object>;

export type RequestType = (object: {
  obj: object;
  key: string;
}) => (route: string, changeObject: object | undefined) => Promise<object>;
