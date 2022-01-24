import { observer } from "mobx-react-lite";

import Modal from "components/Modal";
import AccountInfo from "./ChangePassword";

const EditUserProfile: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  return (
    <Modal title={""} handleCancel={handleCancel} isBackIconHidden={true}>
      <AccountInfo handleCancel={handleCancel} />
    </Modal>
  );
};

export default observer(EditUserProfile);
