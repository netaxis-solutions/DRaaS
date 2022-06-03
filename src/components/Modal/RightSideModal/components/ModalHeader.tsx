import { TModalHeaderProps } from "utils/types/modal";

import { Cross } from "components/Icons";
import IconButton from "components/common/Form/IconButton";

import { modalHeaderUseStyles } from "./styles";

const ModalHeader: React.FC<TModalHeaderProps> = ({
  title,
  handleCancel,
  isBackIconHidden = false,
}) => {
  const classes = modalHeaderUseStyles();

  return (
    <div className={classes.modalHeaderWrapper}>
      <div className={classes.modalHeaderTitleWrapper}>
        <span className={classes.modalHeaderTitle}>{title}</span>
        {!isBackIconHidden && (
          <IconButton
            disableRipple
            onClick={handleCancel}
            icon={Cross}
          ></IconButton>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;
