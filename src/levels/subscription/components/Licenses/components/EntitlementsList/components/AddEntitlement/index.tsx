import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { TAddEntitlementFormProps } from "utils/types/entitlements";

import Modal from "components/Modal";
import CreateEntitlement from "./CreateEntitlement";

const AddTenant: React.FC<TAddEntitlementFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t("Add entitlement")}
      handleCancel={handleCancel}
      styleWithSideBar
    >
      <CreateEntitlement handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(AddTenant);
