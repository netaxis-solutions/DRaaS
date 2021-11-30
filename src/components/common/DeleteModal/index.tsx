import { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross, Trash } from "components/Icons";
import useStyles from "./styles";

type Props = {
  children: ReactNode;
  handleCancel: () => void;
  handleDelete: () => void;
};

const DeleteModal: React.FC<Props> = ({
  handleCancel,
  handleDelete,
  children,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [container] = useState(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(
    <>
      <div className={classes.modal}>
        <div>{children}</div>
        <div>
          <ButtonWithIcon
            onClick={handleCancel}
            icon={Cross}
            title={t("Cancel")}
            className={classes.cancelButton}
          />
          <ButtonWithIcon
            onClick={handleDelete}
            icon={Trash}
            title={t("Delete")}
            variant="contained"
          />
        </div>
      </div>
      <div className={classes.backdrop} onClick={handleCancel} />
    </>,
    container,
  );
};

export default DeleteModal;
