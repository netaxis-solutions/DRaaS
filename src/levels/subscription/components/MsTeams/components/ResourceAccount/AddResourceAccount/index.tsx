import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import CreateResourceAccount from "./CreateResourceAccount";

const AddResourceAccount: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("Add Resource Account")} handleCancel={handleCancel}>
      <CreateResourceAccount handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(AddResourceAccount);
