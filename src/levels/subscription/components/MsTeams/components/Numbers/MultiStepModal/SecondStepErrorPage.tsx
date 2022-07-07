import { FC } from "react";
import { useTranslation } from "react-i18next";

import CardWrapper from "components/CardWrapper";
import { StrokeAlert } from "components/Icons";

import useStyles from "../styles";

const SecondStepErrorPage: FC<{ error?: boolean }> = ({ error }) => {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <div>
      {error ? (
        <CardWrapper
          width={628}
          children={
            <div>
              <div className={classes.textWithIcon}>
                <StrokeAlert />
                <span className={classes.boldTextTitle}>
                  {t(
                    "Sorry, some configuration is missing in your Microsoft tenant!",
                  )}
                </span>
              </div>
              <div className={classes.errorTextWrapper}>
                <span>
                  {t(
                    " Due to the number usage you selected in step 1, Microsoft requires to define the physical address from where the numbers will be used",
                  )}
                  .
                </span>
                <span>
                  {t(
                    "In order to be able to upload numbers to Microsoft Teams, it is required you first define",
                  )}
                  <span className={classes.boldTextTitle}>
                    {` ${t("emergency locations")} `}
                  </span>
                  {t("in the Microsoft Teams admin portal")}:
                </span>
                <ul>
                  <li>
                    <span>{`${t("login to")} office.com ${t(
                      "as administrator",
                    )}`}</span>
                  </li>
                  <li>
                    <span>{t("go to the Microsoft Teams admin center")}</span>
                  </li>
                  <li>
                    <span>
                      {`${t("Select in the left hand menu")}: `}
                      <span className={classes.boldTextTitle}>
                        {t("voice > locations > emergency addresses")}
                      </span>
                    </span>
                  </li>
                  <li>
                    <span>
                      {t(
                        "add at least 1 address in the country for which you want to upload numbers",
                      )}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      ) : (
        `${t("For the selected usage, no address is required")}. ${t(
          "You can continue to the next step",
        )}.`
      )}
    </div>
  );
};

export default SecondStepErrorPage;
