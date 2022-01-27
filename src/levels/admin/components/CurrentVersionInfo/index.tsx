import { useTranslation } from "react-i18next";
import preval from "preval.macro";
import packageJson from "../../../../../package.json";

const buildTimestamp = new Date(preval`module.exports = new Date().getTime();`);

const BuildInfo: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>
        {t("Current version")}: {packageJson.version}
      </div>
      <div>
        {t("Last build")}: {`${buildTimestamp}`}
      </div>
      <div>
        {t("Last commit")}: {process.env.REACT_APP_GIT_SHA}
      </div>
    </>
  );
};

export default BuildInfo;
