import Stepper from "components/Stepper";
import { ArrowLeft } from "components/Icons";
import { TModalHeaderProps } from "utils/types/modal";
import { modalHeaderUseStyles } from "./styles";
import IconButton from "components/common/Form/IconButton";

const ModalHeader: React.FC<TModalHeaderProps> = ({
  title,
  handleCancel,
  steps,
  activeStep,
  isBackIconHidden = false,
}) => {
  const classes = modalHeaderUseStyles();

  return (
    <div className={classes.modalHeaderWrapper}>
      <div className={classes.modalHeaderTitleWrapper}>
        {!isBackIconHidden && (
          <IconButton
            disableRipple
            onClick={handleCancel}
            icon={ArrowLeft}
            
          ></IconButton>
        )}
        <span className={classes.modalHeaderTitle}>{title}</span>
      </div>
      {steps && typeof activeStep === "number" && (
        <Stepper steps={steps} activeStep={activeStep} />
      )}
    </div>
  );
};

export default ModalHeader;
