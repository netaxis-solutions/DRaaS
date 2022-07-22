import { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import IconButton from "@material-ui/core/IconButton";

import TablePagination from "storage/singletons/TablePagination";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross } from "components/Icons";
import SingleDeleteForm from "./components/SingleDeleteForm";
import useStyles from "./styles";

type Props = {
  children: ReactNode;
  handleCancel: () => void;
  handleDelete: () => void;
  selectedElementName?: string | false;
  cancelTitle?: string;
  deleteIcon?: React.FC;
  deleteTitle?: string;
};

const DeleteModal: React.FC<Props> = ({
  handleCancel,
  handleDelete,
  children,
  selectedElementName,
  deleteTitle,
  cancelTitle,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [container] = useState(document.createElement("div"));
  const { resetCurrentPage } = TablePagination;

  // Add this component in DOM when mount
  // Unmount component from dom after close modal
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
            handleDelete={() => {
              // Handle Delete -> props from HOC
              // When we click to "Delete" button -> we clean table pagination too
              handleDelete();
              handleCancel();
              resetCurrentPage();
            }}
          />
        ) : (
          <div>
            <ButtonWithIcon
              onClick={handleCancel}
              title={cancelTitle || t("Cancel")}
              className={classes.cancelButton}
            />
            <ButtonWithIcon
              onClick={() => {
                // Handle Delete -> props from HOC
                // When we click to "Delete" button -> we clean table pagination too
                handleDelete();
                handleCancel();
                resetCurrentPage();
              }}
              title={deleteTitle || t("Delete")}
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
