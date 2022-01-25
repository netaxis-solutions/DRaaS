import { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross, Trash } from "components/Icons";
import SingleDeleteForm from "./components/SingleDeleteForm";
import useStyles from "./styles";

type Props = {
  children: ReactNode;
  handleCancel: () => void;
  handleDelete: () => void;
  selectedElementName?: string | false;
};

const DeleteModal: React.FC<Props> = ({
  handleCancel,
  handleDelete,
  children,
  selectedElementName,
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
        {selectedElementName ? (
          <SingleDeleteForm
            selectedElementName={selectedElementName}
            handleCancel={handleCancel}
            handleDelete={handleDelete}
          />
        ) : (
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
        )}
        <IconButton className={classes.closeIcon} onClick={handleCancel}>
          <Cross fontSize="small" />
        </IconButton>
      </div>
      <div className={classes.backdrop} onClick={handleCancel} />
    </>,
    container,
  );
};

export default DeleteModal;
