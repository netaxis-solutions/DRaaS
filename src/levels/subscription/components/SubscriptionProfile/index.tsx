import { lazy } from "react";
import { observer } from "mobx-react-lite";

import SidebarConfig from "storage/singletons/SidebarConfig";
import { useProfileStyles } from "./styles";
import { useTranslation } from "react-i18next";
import SubscriptionProfileSkeleton from "./SubscriptionProfileSkeleton";

const SubscriptionTabs = lazy(() => import("./SubscriptionTabs"));

const SubscriptionProfile = () => {
  const { t } = useTranslation();
  const { extraLevelData } = SidebarConfig;
  const classes = useProfileStyles();

  return extraLevelData ? (
    <>
      <div className={classes.profileHeaderWrapper}>
        <div className={classes.subscriptionName}>{extraLevelData?.name}</div>
        <div className={classes.subscriptionLevel}>{t("Subscription")}</div>
        <div className={classes.labelContainer}>
          {extraLevelData.suspensionProfileId ? (
            <div className={classes.redLabel}>
              {extraLevelData.suspensionProfileId}
            </div>
          ) : (
            <div className={classes.greenLabel}>{t("Active")}</div>
          )}
        </div>
      </div>
      <SubscriptionTabs />
    </>
  ) : (
    <>
      <SubscriptionProfileSkeleton />
    </>
  );
};

export default observer(SubscriptionProfile);
