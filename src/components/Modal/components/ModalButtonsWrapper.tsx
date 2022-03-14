import { useTranslation } from "react-i18next";

import { TModalButtonsWrapperProps } from "utils/types/modal";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross, Plus } from "components/Icons";
import { modalButtonsWrapperUseStyles } from "./styles";

const ModalButtonsWrapper: React.FC<TModalButtonsWrapperProps> = ({
  cancelButton,
  cancelButtonTitle,
  handleCancel,
  submitButtonTitle,
  submitIcon,
  cancelIcon,
  top,
  formId,
  submitButtonDisabled,
}) => {
  const { t } = useTranslation();
  const classes = modalButtonsWrapperUseStyles({ top });
  const IconSubmit = submitIcon ? submitIcon : Plus;
  const IconCancel = cancelIcon ? cancelIcon : Cross;

  return (
    <div className={classes.modalButtonsWrapper}>
      {cancelButton && (
        <ButtonWithIcon
          onClick={handleCancel}
          icon={IconCancel}
          title={cancelButtonTitle ? cancelButtonTitle : t("Cancel")}
          className={classes.styleCancel}
        />
      )}
      <ButtonWithIcon
        type="submit"
        variant="contained"
        form={formId}
        disabled={submitButtonDisabled}
        icon={IconSubmit}
        title={submitButtonTitle ? submitButtonTitle : t("Add")}
      />
    </div>
  );
};

export default ModalButtonsWrapper;
