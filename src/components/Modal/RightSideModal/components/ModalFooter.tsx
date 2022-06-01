import clsx from "clsx";

import RightSideModal from "storage/singletons/RightSideModal";
import { RightSideModalFooterType } from "utils/types/modal";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { modalFooterUseStyles } from "./styles";

const ModalHeader: React.FC<
  RightSideModalFooterType & { cancelButton: { onClick: () => void } }
> = ({ cancelButton, submitButton }) => {
  const classes = modalFooterUseStyles();

  return (
    <>
      <div className={classes.modalFooterWrapper}>
        <div className={classes.bottomLine} />
        <div className={classes.modalFooterContent}>
          <div className={classes.modalButtonsWrapper}>
            {!cancelButton.hidden && (
              <ButtonWithIcon
                icon={cancelButton.icon}
                title={cancelButton.title || "Cancel"}
                className={clsx(classes.modalCancelButton, {
                  [classes.buttonHidden]: cancelButton.hidden,
                  [cancelButton.className || ""]: cancelButton.className,
                })}
                onClick={cancelButton.onClick}
              />
            )}

            {!submitButton.hidden && (
              <ButtonWithIcon
                icon={submitButton.icon}
                title={submitButton.title || "Save"}
                form={submitButton.formId}
                type={submitButton.type}
                className={clsx(classes.modalSaveButton, {
                  [classes.buttonHidden]: submitButton.hidden,
                  [submitButton.className || ""]: submitButton.className,
                })}
                onClick={() =>
                  submitButton.onClick &&
                  !submitButton.disabled &&
                  !RightSideModal.isSubmitPending &&
                  submitButton.onClick(cancelButton.onClick)
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalHeader;
