import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CloudConnection from "storage/singletons/CloudConnection";

import { AlertTriangle } from "components/Icons";
import { StrokeAlert } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { OperatorConnectionStyle } from "./styles";
import { Typography } from "@material-ui/core";

const HelperText: FC<{
  error: boolean;
  reloadPage?: boolean;
}> = ({ error = false, reloadPage }) => {
  const { t } = useTranslation();
  const classes = OperatorConnectionStyle();
  const { tenantID, subscriptionID } = useParams<{
    subscriptionID: string;
    tenantID: string;
  }>();

  const { unlinkOperatorConnection } = CloudConnection;

  return (
    <Typography variant="subtitle1" className={classes.helperTextWrapper}>
      {error && (
        <div className={classes.textWithIcon}>
          <div>
            <StrokeAlert />
          </div>
          <span className={classes.boldText}>{t("We are sorry!")}</span>
        </div>
      )}
      <span>
        {error ? (
          <div>
            {`${t("We weren’t able to find back the provided details")} `}
            <span className={classes.boldText}>
              {CloudConnection.uncorrectInputData}
            </span>
          </div>
        ) : (
          `${t(
            "Before you can start using our services in combination with Microsoft Teams, we will need to know the Microsoft Tenant you want to link",
          )}.`
        )}
      </span>
      <div className={classes.textWithIconList}>
        <div className={classes.textWithIcon}>
          <div>
            <AlertTriangle />
          </div>
          <span>
            {`${t("Please, make sure you consented ")}`}
            <span className={classes.boldText}>{t("Netaxis Solutions ")}</span>
            {t("as operator in the ")}
            <span className={classes.boldText}>{t("Operator connect ")}</span>
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
      {reloadPage && (
        <div className={classes.buttonWrapper}>
          <ButtonWithIcon
            title={t("Try again")}
            onClick={() => unlinkOperatorConnection(tenantID, subscriptionID)}
          />
        </div>
      )}
    </Typography>
  );
};

export default HelperText;
