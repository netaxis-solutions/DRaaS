import IconButton from "@material-ui/core/IconButton";

import Stepper from "components/Stepper";
import { ArrowLeft } from "components/Icons";
import { TModalHeaderProps } from "utils/types/modal";
import { modalHeaderUseStyles } from "./styles";

const ModalHeader: React.FC<TModalHeaderProps> = ({
  title,
  handleCancel,
  steps,
  activeStep,
}) => {
  const classes = modalHeaderUseStyles();

  return (
    <div className={classes.modalHeaderWrapper}>
      <div className={classes.modalHeaderTitleWrapper}>
        <IconButton disableRipple onClick={handleCancel}>
          <ArrowLeft />
        </IconButton>
        <span className={classes.modalHeaderTitle}>{title}</span>
      </div>
      {steps && typeof activeStep === "number" && (
        <Stepper steps={steps} activeStep={activeStep} />
      )}
    </div>
  );
};

export default ModalHeader;
