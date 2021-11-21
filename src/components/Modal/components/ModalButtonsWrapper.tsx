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
}) => {
  const { t } = useTranslation();
  const classes = modalButtonsWrapperUseStyles();
  const IconSubmit = submitIcon ? submitIcon : Plus;
  const IconCancel = cancelIcon ? cancelIcon : Cross;

  return (
    <div className={classes.modalButtonsWrapper}>
      {cancelButton && (
        <ButtonWithIcon
          onClick={handleCancel}
          icon={IconCancel}
          title={cancelButtonTitle ? cancelButtonTitle : t("Cancel")}
          className={classes.cancelButton}
        />
      )}
      <ButtonWithIcon
        type="submit"
        variant="contained"
        icon={IconSubmit}
        title={submitButtonTitle ? submitButtonTitle : t("Add")}
      />
    </div>
  );
};

export default ModalButtonsWrapper;
