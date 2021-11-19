import { useTranslation } from "react-i18next";

import { TModalButtonsWrapperProps } from "utils/types/modal";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Back, Cross, Plus, Next } from "components/Icons";
import { modalButtonsWrapperUseStyles } from "./styles";

const ModalButtonsWrapper: React.FC<TModalButtonsWrapperProps> = ({
  cancelButton,
  cancelButtonTitle,
  handleCancel,
  submitButtonTitle,
}) => {
  const { t } = useTranslation();
  const classes = modalButtonsWrapperUseStyles();

  return (
    <div className={classes.modalButtonsWrapper}>
      {cancelButton && (
        <ButtonWithIcon
          onClick={handleCancel}
          icon={cancelButtonTitle ? Back : Cross}
          title={cancelButtonTitle ? cancelButtonTitle : t("Cancel")}
        ></ButtonWithIcon>
      )}
      <ButtonWithIcon
        type="submit"
        variant="contained"
        icon={submitButtonTitle ? Next : Plus}
        title={submitButtonTitle ? submitButtonTitle : t("Save")}
      ></ButtonWithIcon>
    </div>
  );
};

export default ModalButtonsWrapper;
