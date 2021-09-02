// import { useTranslation } from "react-i18next";
// import { getSpecificLanguageTranslation } from "services/Translation";
import Text from "./Text";

const Buttons = ({ test, color }: { test: string; color: string }) => {
  // const { i18n } = useTranslation();
  console.log(color);
  const changeLanguage = (lng: string) => {
    console.log(lng);
    // i18n.changeLanguage(lng, () => {
    //   getSpecificLanguageTranslation({
    //     name: "client",
    //     lng,
    //     customTranslations: false,
    //   });
    // });
  };

  return (
    <div style={{ color }}>
      <span>{test}</span>
      <button onClick={() => changeLanguage("de")}>de</button>
      <button onClick={() => changeLanguage("en")}>en</button>
      <Text text={test} color={"green"} />
    </div>
  );
};

export default Buttons;
