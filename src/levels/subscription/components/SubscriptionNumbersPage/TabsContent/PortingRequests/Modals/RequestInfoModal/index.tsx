import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import { TAddTenantFormProps } from "utils/types/tenant";

import Modal from "components/Modal";
import { t } from "services/Translation";
import RouteIndependedTabs from "components/Tabs/RouteIndependedTabs";
import { Tab } from "utils/types/tabs";
import PortingRequestDetails from "./Tabs/TabsContent/PortingRequestDetails";

const requestTabs: Tab[] = [
  {
    name: t("Request details"),
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
    component: () => <div>Porting numbers</div>,
  },
  {
    name: t("Documents"),
    id: "documents",
    component: () => <div>Documents</div>,
  },
];

const PortingRequestInfo: React.FC<TAddTenantFormProps> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const {
    currentRequestId,
    currentPortingRequest,
    getExactPortingRequest,
  } = PortingRequestsStore;
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
