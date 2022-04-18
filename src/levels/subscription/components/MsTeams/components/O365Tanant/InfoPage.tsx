import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import Onboarding from "storage/singletons/MsTeams/Onboarding";

import FormInput from "components/common/Form/FormInput";
import { InfoIcon, SuccessCircle } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Unlink } from "components/Icons";

import { O365Styles } from "./styles";

const InfoPage: FC = () => {
  const classes = O365Styles();

  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { checkMsTeamAdmin, getCheckMsTeamAdmin } = MsTeamAdminStorage;
  const { cleanUpOnboarding } = Onboarding;

  const { control } = useForm<{ domain: string; tenantID: string }>({});

  useEffect(() => {
    getCheckMsTeamAdmin(tenantID, subscriptionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.StatusWrapper}>
      <div>
        <Controller
          name="domain"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Domain")}
              {...field}
              {...props}
              default
              value={checkMsTeamAdmin?.domain?.name || ""}
            />
          )}
        />
        <Controller
          name="tenantID"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("TenantID")}
              {...field}
              {...props}
              default
              value={checkMsTeamAdmin?.msTenantId || ""}
            />
          )}
        />
      </div>
      <div className={classes.InfoStatus}>
        <div>
          <span className={classes.SuccessIcon}>
            {" "}
            {checkMsTeamAdmin?.powershell?.active ? (
              <SuccessCircle />
            ) : (
              <div className={classes.errorIcon}>
                <InfoIcon />
              </div>
            )}{" "}
          </span>
          <div>
            <span>{t("Powershell integration")}</span>
            <span>{checkMsTeamAdmin?.powershell?.msUserName || ""}</span>
          </div>
        </div>
        <div>
          <span className={classes.SuccessIcon}>
            {" "}
            {checkMsTeamAdmin?.msGraph?.active ? (
              <SuccessCircle />
            ) : (
              <div className={classes.errorIcon}>
                <InfoIcon />
              </div>
            )}{" "}
          </span>
          <div>
            <span>{t("Microsoft graph integration")}</span>
            <span>{checkMsTeamAdmin?.msGraph?.msApplicationId || ""}</span>
          </div>
        </div>
      </div>
      <div className={classes.buttonUnlinkPositions}>
        <ButtonWithIcon
          className={classes.buttonUnlink}
          title={t("Unlink your tenant now")}
          icon={Unlink}
          onClick={() => cleanUpOnboarding(tenantID, subscriptionID)}
        />
      </div>
    </div>
  );
};

export default observer(InfoPage);
