import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import AccountInfo from "./AccountInfo";

const EditUserProfile: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal title={t("")} handleCancel={handleCancel} isBackIconHidden={true}>
      <AccountInfo handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(EditUserProfile);
