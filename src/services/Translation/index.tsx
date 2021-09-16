import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import { GetSpecificLanguageTranslationType } from "utils/types/translation";

export const getSpecificLanguageTranslation: GetSpecificLanguageTranslationType = async ({
  name,
  lng = "en",
  customTranslations,
}) => {
  const requestsToSend = [];

  requestsToSend.push(fetch(`/locales/${lng}/translation.json`));

  if (customTranslations) {
    requestsToSend.push(fetch(`/locales/${name}/${lng}/translation.json`));
  }

  const reqToSendResult = await Promise.all(requestsToSend);
  const jsonResult = await Promise.all(
    reqToSendResult.map((data) => data.json())
  );

  const resources = jsonResult.reduce((prev, cur) => {
    prev = { ...prev, ...cur };
    return prev;
  }, {});

  i18n.addResourceBundle(lng, "translation", resources, true, true);
};

i18n.use(Backend).use(initReactI18next).init({
  resources: {},
  fallbackLng: "en",
});

i18n.on("languageChanged", function (lng) {
  const direction = i18n.dir(lng);
  document.body.dir = direction;
});
export default i18n;
