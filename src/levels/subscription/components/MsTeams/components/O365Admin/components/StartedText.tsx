import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { EntitlementsStyle } from "../styles";

const StartedText: FC = () => {
  const { t } = useTranslation();
  const classes = EntitlementsStyle();
  const appropriateRightsList = [
    "Domain name administrator",
    "Privileged role administrator",
    "Teams administrator",
    "User administrator",
  ];
  const credentialsList = [
    t(
      "launch powershell commands to do MS Teams provisioning and configuration",
    ),
    t(
      "setup an application in your tenant that allows us to make Microsoft graph API calls",
    ),
    t(
      "manage phone number assignment of users once the linking was executed successfully",
    ),
  ];

  return (
    <div className={classes.starterTextLoginScreenWrapper}>
      <div className={classes.adminBody}>
        <span>
          {t(
            "Please provide the credentials of a tenant administrator that has the",
          )}
          <Link to="#">{` ${t("appropriate rights")} `}</Link>
          {t("within your tenant")}:
        </span>
        <ul className={classes.startTextItemUl}>
          {appropriateRightsList.map((el: string) => (
            <li className={classes.startTextItemLi} key={el}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.adminBody}>
        <span>{t("We use these credentials to")}: </span>
        <ul className={classes.startTextItemUl}>
          {credentialsList.map((el: string) => (
            <li className={classes.startTextItemLi} key={el}>
              {el}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StartedText;
