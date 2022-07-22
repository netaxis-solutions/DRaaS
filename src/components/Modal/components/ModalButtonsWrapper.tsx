import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { TModalButtonsWrapperProps } from "utils/types/modal";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { modalButtonsWrapperUseStyles } from "./styles";

const ModalButtonsWrapper: React.FC<TModalButtonsWrapperProps> = ({
  cancelButton,
  cancelButtonTitle,
  handleCancel,
  submitButtonTitle,
  top,
  formId,
  submitButtonDisabled,
  className,
}) => {
  const { t } = useTranslation();
  const classes = modalButtonsWrapperUseStyles({ top });

  return (
    <div
      className={clsx(classes.modalButtonsWrapper, {
        [className || ""]: className,
      })}
    >
      {cancelButton && (
        <ButtonWithIcon
          onClick={handleCancel}
          title={cancelButtonTitle ? cancelButtonTitle : t("Cancel")}
          className={classes.styleCancel}
        />
      )}
      <ButtonWithIcon
        type="submit"
        variant="contained"
        form={formId}
        disabled={submitButtonDisabled}
        title={submitButtonTitle ? submitButtonTitle : t("Add")}
      />
    </div>
  );
};

export default ModalButtonsWrapper;
