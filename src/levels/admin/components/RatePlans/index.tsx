import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import RatePlansStore from "storage/singletons/RatePlans";
import PendingQueries from "storage/singletons/PendingQueries";

import { Tab } from "utils/types/tabs";
import { getIsLoading } from "utils/functions/getIsLoading";

import RouteIndependedTabs from "components/Tabs/RouteIndependedTabs";
import TabsSkeleton from "components/Tabs/TabsSkeleton";
import RatePlansTable from "./ratePlansTable";

const RatePlans: React.FC = () => {
  const { t } = useTranslation();

  const {
    getRatePlans,
    clearRatePlansStore,
    getSpecificRatePlan,
  } = RatePlansStore;

  //tabs for rate plans page
  const [tabs, setTabs] = useState<Tab[]>([]);

  useEffect(() => {
    getRatePlans(() => {
      setTabs(
        RatePlansStore.ratePlans.map(ratePlan => ({
          name: ratePlan.name,
          id: ratePlan.id,
          component: () => <RatePlansTable />,
        })),
      );
    });

    return () => clearRatePlansStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = getIsLoading("@getRatePlans", PendingQueries.byFetchType);

  return (
    <>
      {isLoading ? (
        <TabsSkeleton tabsAmount={3} />
      ) : tabs.length ? (
        <RouteIndependedTabs
          tabs={tabs}
          onChange={id => {
            getSpecificRatePlan(id);
          }}
          onMountAction={getSpecificRatePlan}
        />
      ) : (
        <div>{t("No rate plans")}</div>
      )}
    </>
  );
};

export default observer(RatePlans);
