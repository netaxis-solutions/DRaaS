import get from "lodash/get";

const createLink = ({ url, params }: { url: string; params: object }) => {
  if (!url) {
    return "";
  }
  if (typeof params === "object") {
    let newUrl = url;
    for (let key in params) {
      const subStr = newUrl.includes(`:${key}?`) ? `:${key}?` : `:${key}`;
      newUrl = newUrl.replace(subStr, get(params, key, key));
    }
    return newUrl;
  }
  return "";
};

export default createLink;
