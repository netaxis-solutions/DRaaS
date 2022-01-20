import has from "lodash/has";
import get from "lodash/get";

const getErrorMessage = (error: any) => {
  const data = get(error, "response.data" || {});
  if (has(data, "status") && error.status === 401) {
    if (has(data, "error")) {
      return data.error;
    }
    return "Your current session has expired. Please login again to continue.";
  }
  if (error?.response?.status === 403) {
    return "You do not have permission to perform this action";
  }
  if (has(data, "error") && typeof get(data, "error") === "string") {
    return data.error;
  }
  if (has(data, "error")) {
    return data.error.reason;
  }
};

export default getErrorMessage;
