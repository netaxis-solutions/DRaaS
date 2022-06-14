import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Skeleton } from "@mui/material";

import SidebarConfig from "storage/singletons/SidebarConfig";
import SubscriptionProfileStore from "storage/singletons/SubscriptionProfile";
import SubscriptionsStore from "storage/singletons/Subscriptions";
import RoutingConfig from "storage/singletons/RoutingConfig";
import PendingQueries from "storage/singletons/PendingQueries";

import createLink from "services/createLink";
import { getIsLoading } from "utils/functions/getIsLoading";

import FormInput from "components/common/Form/FormInput";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Plus, Trash } from "components/Icons";

import { useProfileTabStyles } from "./styles";

const Profile: FC = () => {
  const { t } = useTranslation();
  const classes = useProfileTabStyles();
  const [isRequestPending, setRequestPending] = useState(false);
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(
      object().shape({
        name: string().matches(/^[aA-zZ0-9\s]+$/, {
          message: t("Use only letters and digits"),
          excludeEmptyString: true,
        }),
      }),
    ),
    defaultValues: { name: "" },
  });

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { setChosenCustomer } = SidebarConfig;
  const { subscriptionRights, deleteSubscription } = SubscriptionsStore;
  const { history, allAvailvableRouting } = RoutingConfig;
  const { currentProfile, getProfileData } = SubscriptionProfileStore;
  const { byFetchType } = PendingQueries;

  useEffect(() => {
    getProfileData(tenantID, subscriptionID, () => {
      SubscriptionProfileStore.currentProfile &&
        setValue("name", SubscriptionProfileStore.currentProfile.name);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function handles submit of changing the name of subscription
  const onSubmit = (value: { name: string }) => {
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

  // This function handles delete of subscription
  const handleDelete = () => {
    setRequestPending(true);

    if (!isRequestPending) {
      deleteSubscription(
        tenantID,
        subscriptionID,
        () => {
          history.push(
            createLink({
              url: allAvailvableRouting.tenantSubscriptions,
              params: {
                tenantID: tenantID,
              },
            }),
          );
        },
        () => setRequestPending(false),
      );
    }
  };

  const isLoading = getIsLoading("@getProfileData", byFetchType);

  return isLoading ? (
    <div className={classes.profileWrapper}>
      <Skeleton variant={"text"} />
      <Skeleton variant={"text"} />
      <Skeleton variant={"text"} />
      <Skeleton variant={"text"} />
      <Skeleton variant={"text"} />
      <Skeleton variant={"text"} />
    </div>
  ) : (
    <form className={classes.profileWrapper} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span className={classes.boldLabel}>{t("Billing ID")}: </span>
        {currentProfile?.billingId}
      </div>
      <div className={classes.labelContainer}>
        {currentProfile?.suspensionProfileId ? (
          <div className={classes.redLabel}>
            {currentProfile.suspensionProfileId}
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
        {subscriptionRights.find(
          ({ name }: { name: string }) =>
            name === "tenants.instance.subscriptions.instance.edit",
        ) && <ButtonWithIcon icon={Plus} title={t("save")} type={"submit"} />}
      </div>
      <div>
        {t("Amount of numbers")}: {currentProfile?.phoneNumbers.total}
      </div>
      <div>
        {t("Amount of MS Teams users")}: {currentProfile?.licenses.msTeamsUsers}
      </div>
      <div>
        {t("Amount of sip Trunk Channels")}:{" "}
        {currentProfile?.licenses.sipTrunkChannels}
      </div>
      {currentProfile?.isDeletable && (
        <div className={classes.textWithButtonWrapper}>
          {t("You can delete this subscription")}
          <ButtonWithIcon
            icon={Trash}
            title={t("Delete")}
            onClick={handleDelete}
          />
        </div>
      )}
    </form>
  );
};

export default observer(Profile);
