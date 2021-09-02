import { useTranslation } from "react-i18next";
import { getSpecificLanguageTranslation } from "services/Translation";

const Buttons = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng, () => {
      getSpecificLanguageTranslation({
        name: "client",
        lng,
        customTranslations: false,
      });
    });
  };

  return (
    <div>
      <button onClick={() => changeLanguage("de")}>de</button>
      <button onClick={() => changeLanguage("en")}>en</button>
    </div>
  );
};

export default Buttons;
