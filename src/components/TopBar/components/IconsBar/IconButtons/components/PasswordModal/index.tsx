import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Modal from "components/Modal";
import AccountInfo from "./ChangePassword";

const EditUserProfile: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();

  return (
    <Modal title={""} handleCancel={handleCancel} isBackIconHidden={true}>
      <AccountInfo handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(EditUserProfile);
