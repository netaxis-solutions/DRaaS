import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { AddSubscriptionFormPropsType } from "utils/types/subscriptions";
import Modal from "components/Modal";
import CreateSubscription from "./CreateSubscription";

const AddTenantSubscription: React.FC<AddSubscriptionFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("Add subscription")} handleCancel={handleCancel}>
      <CreateSubscription handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(AddTenantSubscription);
