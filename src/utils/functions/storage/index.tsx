import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse(
  "-4qCx2rtzRGn*tX#X?sRtE3UJAGcKjfZEz?MabRtpqmA%@dbau$#QJm^=f+*WNCskz^^FjpwF^2%dRL6!QHB%Wh7J$AM%PL*DBxa",
);
const iv = CryptoJS.enc.Utf8.parse(
  "-$!9e$P#D5k^h&MFE_R=czufmuKcGkn9LN%hTMws-EG7Cyww!=^yW+5Ghdm+Dss4zz3j5#k&*XwPzS5m4NEdUC$t+FNEntMg*@7#",
);

type TStorageToSet = (keepMeLoggedIn: boolean) => Storage;

export const storageToManipulate: TStorageToSet = keepMeLoggedIn =>
  keepMeLoggedIn ? localStorage : sessionStorage;

export const encrypt = (token: string) => {
  return CryptoJS.AES.encrypt(token, key, { iv }).toString();
};

export const decrypt = (token: string) => {
  return CryptoJS.AES.decrypt(token, key, { iv }).toString(CryptoJS.enc.Utf8);
};
