import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import { TAddTenantFormProps } from "utils/types/tenant";

import CreateTenant from "./Steps/CreateTenant";

const AddTenant: React.FC<TAddTenantFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("Add tenant")} handleCancel={handleCancel}>
      <CreateTenant handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(AddTenant);
