import { RequestType } from "utils/types/api";

export const getMethod: RequestType = ({ obj, key }) =>
  obj[key as keyof object];
