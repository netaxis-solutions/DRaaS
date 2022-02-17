import { FC } from "react";

import { TStartMsTeamModal } from "utils/types/msTeam";

import Modal from "components/Modal";
import StepperStart from "./Stepper";

const StepperMsTeam: FC<TStartMsTeamModal> = ({ handleCancel }) => {
  return (
    <Modal
      title={"Link MS Teams to the platform"}
      handleCancel={handleCancel}
      styleWithSideBar
    >
      <StepperStart handleCancel={handleCancel} />
    </Modal>
  );
};

export default StepperMsTeam;
