import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import AddLocationContent from "./AddLocationContent";

const AddLocation: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("Add Location")} handleCancel={handleCancel}>
      <AddLocationContent handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(AddLocation);
