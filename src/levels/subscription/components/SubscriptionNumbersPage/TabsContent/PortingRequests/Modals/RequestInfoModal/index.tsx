import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import { TAddTenantFormProps } from "utils/types/tenant";
import { Tab } from "utils/types/tabs";

import Modal from "components/Modal";
import RouteIndependedTabs from "components/Tabs/RouteIndependedTabs";
import PortingRequestDetails from "./Tabs/TabsContent/PortingRequestDetails";
import PortingNumbers from "./Tabs/TabsContent/PortingNumbers";
import { InfoIcon } from "components/Icons";
import Tooltip from "components/Tooltip";

import { tabsStyles } from "../../styles";

const PortingRequestInfo: React.FC<TAddTenantFormProps> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = tabsStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const {
    currentRequestId,
    currentPortingRequest,
    getExactPortingRequest,
  } = PortingRequestsStore;

  const requestTabs: Tab[] = [
    {
      name: (
        <div className={classes.tab}>
          {t("Request details")}
          {currentPortingRequest?.capabilities?.isError && (
            <Tooltip
              title={t("An error(s) occured while processing your request")}
              placement="top-start"
              arrow
            >
              <InfoIcon className={classes.tooltipIcon} />
            </Tooltip>
          )}
        </div>
      ),
      id: "details",
      component: () => <PortingRequestDetails />,
    },
    {
      name: t("Enterprise info"),
      id: "info",
      component: () => <div>Enterprise info</div>,
    },
    {
      name: t("Porting numbers"),
      id: "numbers",
      component: () => <PortingNumbers />,
    },
    {
      name: t("Documents"),
      id: "documents",
      component: () => <div>Documents</div>,
    },
  ];

  useEffect(() => {
    currentRequestId &&
      getExactPortingRequest(tenantID, subscriptionID, currentRequestId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        title={t("Add numbers from inventory")}
        handleCancel={handleCancel}
        styleWithSideBar
      >
        {Object.values(currentPortingRequest).length && (
          <RouteIndependedTabs tabs={requestTabs} />
        )}
      </Modal>
    </>
  );
};

export default observer(PortingRequestInfo);
