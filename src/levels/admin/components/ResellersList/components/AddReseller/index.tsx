import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { AddDistributorFormPropsType } from "utils/types/distributor";
import Modal from "components/Modal";
import CreateReseller from "./Steps/CreateReseller";

const AddDistributor: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("Add reseller")} handleCancel={handleCancel}>
      <CreateReseller handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(AddDistributor);
