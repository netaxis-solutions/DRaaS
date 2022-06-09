import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import PortingRequestsStore from "storage/singletons/PortingRequests";
import PendingQueries from "storage/singletons/PendingQueries";

import { TAddTenantFormProps } from "utils/types/tenant";
import { Tab } from "utils/types/tabs";
import { getIsLoading } from "utils/functions/getIsLoading";

import Modal from "components/Modal";
import RouteIndependedTabs from "components/Tabs/RouteIndependedTabs";
import PortingRequestDetails from "./Tabs/TabsContent/PortingRequestDetails";
import PortingNumbers from "./Tabs/TabsContent/PortingNumbers";
import PortingRequestErrors from "./Tabs/TabsContent/Errors";
import { Cross, InfoIcon } from "components/Icons";
import Tooltip from "components/Tooltip";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import Documents from "./Tabs/TabsContent/Documents";
import TabsSkeleton from "components/Tabs/TabsSkeleton";

import { requestModalStyles } from "./styles";

const PortingRequestInfo: React.FC<TAddTenantFormProps> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = requestModalStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const {
    currentRequestId,
    currentPortingRequest,
    activatePortRequest,
    cancelPortRequest,
    clearCurrentRequest,
  } = PortingRequestsStore;

  const requestTabs: Tab[] = [
    {
      name: t("Request details"),
      id: "details",
      component: () => <PortingRequestDetails />,
    },
    {
      name: (
        <div className={classes.tab}>
          {t("Errors")}
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
      id: "errors",
      component: () => <PortingRequestErrors />,
    },
    {
      name: t("Porting numbers"),
      id: "numbers",
      component: () => <PortingNumbers />,
    },
    {
      name: t("Documents"),
      id: "documents",
      component: () => <Documents />,
    },
  ];

  const [filteredTabs, setFilteredTabs] = useState<Tab[]>(requestTabs);

  useEffect(() => {
    if (currentRequestId) {
      const tabFormatter = () => {
        let finalTabs = [...requestTabs];
        if (!PortingRequestsStore.requiredDocuments.length) {
          finalTabs = finalTabs.filter(tab => tab.id !== "documents");
        }
        if (
          !PortingRequestsStore.currentPortingRequest.instance.errors.length
        ) {
          finalTabs = finalTabs.filter(tab => tab.id !== "errors");
        }
        setFilteredTabs([...finalTabs]);
      };
      PortingRequestsStore.getRequestInfoModalData(
        tenantID,
        subscriptionID,
        currentRequestId,
        tabFormatter,
      );
    }
    return () => clearCurrentRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading =
    getIsLoading("@getExactPortingRequest", PendingQueries.byFetchType) ||
    getIsLoading("@getPortingRequirements", PendingQueries.byFetchType) ||
    getIsLoading("@cancelPortRequest", PendingQueries.byFetchType);
  return (
    <>
      <Modal title={t("")} handleCancel={handleCancel}>
        {isLoading || !Object.values(currentPortingRequest).length ? (
          <TabsSkeleton tabsAmount={3} />
        ) : (
          <RouteIndependedTabs tabs={filteredTabs} />
        )}
      </Modal>
      {currentRequestId && (
        <div className={classes.buttonsWrapper}>
          {currentPortingRequest?.capabilities?.canBeActivated && (
            <ButtonWithIcon
              onClick={() => {
                activatePortRequest(tenantID, subscriptionID, currentRequestId);
              }}
              title={t("Activate")}
              className={classes.activateButton}
            />
          )}
          {currentPortingRequest?.capabilities?.canBeCancelled && (
            <ButtonWithIcon
              onClick={() =>
                cancelPortRequest(tenantID, subscriptionID, currentRequestId)
              }
              disabled={PortingRequestsStore.isCancelPending}
              icon={Cross}
              title={t("Cancel")}
              className={classes.cancelButton}
            />
          )}
        </div>
      )}
    </>
  );
};

export default observer(PortingRequestInfo);
