import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SidebarConfig from "storage/singletons/SidebarConfig";
import SubscriptionProfileStore from "storage/singletons/SubscriptionProfile";

import FormInput from "components/common/Form/FormInput";

import { useProfileTabStyles } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Plus } from "components/Icons";

const Profile: FC = () => {
  const { t } = useTranslation();
  const classes = useProfileTabStyles();
  const [isRequestPending, setRequestPending] = useState(false);
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: { name: "" },
  });

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { extraLevelData, setChosenCustomer } = SidebarConfig;

  useEffect(() => {
    setValue("name", extraLevelData?.name || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraLevelData]);

  const onSubmit = (value: any) => {
    setRequestPending(true);
    if (!isRequestPending) {
      SubscriptionProfileStore.changeSubscriptionProfile(
        tenantID,
        subscriptionID,
        value,
        () => {
          setChosenCustomer(tenantID, subscriptionID);
          setRequestPending(false);
        },
        () => {
          setRequestPending(false);
        },
      );
    }
  };

  return (
    <form className={classes.profileWrapper} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span className={classes.boldLabel}>{t("Billing ID")}:</span>{" "}
        {extraLevelData?.billingId}
      </div>
      <div className={classes.labelContainer}>
        {extraLevelData?.suspensionProfileId ? (
          <div className={classes.redLabel}>
            {extraLevelData.suspensionProfileId}
          </div>
        ) : (
          <div className={classes.greenLabel}>{t("Active")}</div>
        )}
      </div>
      <div className={classes.fieldWithButtonWrapper}>
        <Controller
          name="name"
          control={control}
          render={({ field, ...props }) => (
            <FormInput label={t("Name")} {...field} {...props} />
          )}
        />
        <ButtonWithIcon icon={Plus} title={t("save")} type={"submit"} />
      </div>
    </form>
  );
};

export default observer(Profile);
