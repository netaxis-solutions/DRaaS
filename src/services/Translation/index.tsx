import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { GetSpecificLanguageTranslationType } from "utils/types/translation";

export const t = (str: string, options?: string | {}) => {
  function T({
    str,
    options,
  }: {
    str: string;
    options?: string | {};
  }): JSX.Element {
    const { t: translate } = useTranslation();
    return translate(str, options);
  }
  return <T str={str} options={options} />;
};

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
    reqToSendResult.map(data => data.json()),
  );

  const resources = jsonResult.reduce((prev, cur) => {
    prev = { ...prev, ...cur };
    return prev;
  }, {});

  i18n.addResourceBundle(lng, "translation", resources, true, true);
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {},
    fallbackLng: localStorage.getItem("i18nextLng") || "en",
    supportedLngs: ["en", "de", "fr"],
    detection: {
      caches: ["localStorage"],
    },
    react: { useSuspense: true },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

i18n.on("languageChanged", function (lng) {
  const direction = i18n.dir(lng);
  document.body.dir = direction;
});
export default i18n;
