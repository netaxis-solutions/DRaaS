import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import { TAddTenantFormProps } from "utils/types/tenant";

import Modal from "components/Modal";

const PortingRequestInfo: React.FC<TAddTenantFormProps> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const { currentRequestId } = PortingRequestsStore;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        title={t("Add numbers from inventory")}
        handleCancel={handleCancel}
      >
        {currentRequestId}
      </Modal>
    </>
  );
};

export default observer(PortingRequestInfo);
