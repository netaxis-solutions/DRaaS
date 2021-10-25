import get from "lodash/get";
import { RequestType } from "utils/types/api";

export const getMethod: RequestType = ({ obj, key }) => get(obj, key);
