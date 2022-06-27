import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AlertTriangle } from "components/Icons";
import { StrokeAlert } from "components/Icons";

import { OperatorConnectionStyle } from "./styles";

const HelperText: FC<{ error: boolean; userInput?: string }> = ({
  error = false,
  // @ts-ignore
  userInput,
}) => {
  const { t } = useTranslation();
  const classes = OperatorConnectionStyle();
  return (
    <div className={classes.helperTextWrapper}>
      {error && (
        <div className={classes.textWithIcon}>
          <div>
            <StrokeAlert />
          </div>
          <span>{t("We are sorry!")}</span>
        </div>
      )}
      <span>
        {error
          ? `${t(
              "We weren’t able to find back the provided details",
            )} (<print_here_the_userInput>)`
          : `${t(
              "Before you can start using our services in combination with Microsoft Teams, we will need to know the Microsoft Tenant you want to link",
            )}.`}
      </span>
      <div className={classes.textWithIconList}>
        <div className={classes.textWithIcon}>
          <div>
            <AlertTriangle />
          </div>
          <span>
            {`${t("Please, make sure you consented ")}`}
            <span>{t("Netaxis Solutions ")}</span>
            {t("as operator in the ")}
            <span>{t("Operator connect ")}</span>
            {t("panel in your MS Teams admin console")}.
          </span>
        </div>
        <div className={classes.textWithIcon}>
          <div>
            <AlertTriangle />
          </div>
          <span>
            {`${t("Please, make sure you provided contact details")}. ${t(
              "We use this to find back your tenant",
            )}`}
          </span>
        </div>
      </div>

      {error
        ? `${t(
            "Before you can start using our services in combination with Microsoft Teams, we will need to know the Microsoft Tenant you want to link",
          )}.`
        : `${t(
            "Please, provide the e-mail address you provided as main contact in the MS Teams console or your Microsoft tenant-id",
          )}:`}
      {error && (
        <span>{`${t("Sorry, we could not link your tenant")}. ${t(
          "Please make sure the pre-requisites mentioned above are fullfilled",
        )}. ${t("When done, please retry")}. ${t(
          "If still not ok, please contact our help desk",
        )} `}</span>
      )}
    </div>
  );
};

export default HelperText;
