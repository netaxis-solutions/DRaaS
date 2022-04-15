import { useEffect } from "react";
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
import { Cross, InfoIcon } from "components/Icons";
import Tooltip from "components/Tooltip";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import Documents from "./Tabs/TabsContent/Documents";
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
    getExactPortingRequest,
    getPortingRequirements,
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
      component: () => <Documents />,
    },
  ];

  useEffect(() => {
    if (currentRequestId) {
      getExactPortingRequest(tenantID, subscriptionID, currentRequestId);
      getPortingRequirements();
    }
    return () => clearCurrentRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading =
    getIsLoading("@getExactPortingRequest", PendingQueries.byFetchType) ||
    getIsLoading("@getPortingRequirements", PendingQueries.byFetchType);

  return (
    <>
      <Modal
        title={t("Add numbers from inventory")}
        handleCancel={handleCancel}
        styleWithSideBar
      >
        {isLoading || !Object.values(currentPortingRequest).length ? (
          "Loading..."
        ) : (
          <RouteIndependedTabs tabs={requestTabs} />
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
