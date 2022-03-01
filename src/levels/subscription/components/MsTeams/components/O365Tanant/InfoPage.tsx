import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import MsTeamAdminStorage from "storage/singletons/MsTeams/CreateDeleteAdmin";
import Onboarding from "storage/singletons/MsTeams/Onboarding";

import FormInput from "components/common/Form/FormInput";
import { SuccessCircle } from "components/Icons";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Unlink } from "components/Icons";

import { EntitlementsStyle } from "./styles";

const InfoPage: FC = () => {
  const classes = EntitlementsStyle();

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
              value={checkMsTeamAdmin?.domain.name || "Domain"}
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
              value={checkMsTeamAdmin?.msTenantId || t("TenantID")}
            />
          )}
        />
      </div>
      <div className={classes.InfoStatus}>
        <div>
          <span className={classes.SuccessIcon}>
            {" "}
            <SuccessCircle />{" "}
          </span>
          <div>
            <span>{t("Powershell integration")}</span>
            <span>
              {checkMsTeamAdmin?.powershell?.msUserName ||
                "christophe.bury@netaxis.be"}
            </span>
          </div>
        </div>
        <div>
          <span className={classes.SuccessIcon}>
            {" "}
            <SuccessCircle />{" "}
          </span>
          <div>
            <span>{t("Microsoft graph integration")}</span>
            <span>
              {checkMsTeamAdmin?.msGraph?.msApplicationId ||
                "cdfd967f-6a92-4234-808a-5dd2047dc61a"}
            </span>
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
