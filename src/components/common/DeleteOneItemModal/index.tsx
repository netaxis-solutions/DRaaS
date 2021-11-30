import { useState, useEffect, ReactNode } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { confirmDelete } from "utils/schemas/confirmDelete";
import FormInput from "components/common/Form/FormInput";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import { Cross, Trash } from "components/Icons";
import useStyles from "./styles";

type Props = {
  children: ReactNode;
  handleCancel: () => void;
  handleDelete: () => void;
  selectedElementName: string;
};

const defaultValues = {
  name: "",
};

const DeleteModal: React.FC<Props> = ({
  handleCancel,
  handleDelete,
  children,
  selectedElementName,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { control, handleSubmit } = useForm<{ name: string }>({
    resolver: yupResolver(confirmDelete(t, selectedElementName)),
    defaultValues,
  });
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
        <form onSubmit={handleSubmit(handleDelete)}>
          <div>{children}</div>
          <Controller
            name="name"
            control={control}
            render={({ field, ...props }) => (
              <FormInput label={t("Name")} {...field} {...props} />
            )}
          />
          <div>
            <ButtonWithIcon
              onClick={handleCancel}
              icon={Cross}
              title={t("Cancel")}
              className={classes.cancelButton}
            />
            <ButtonWithIcon
              icon={Trash}
              title={t("Delete")}
              variant="contained"
              type="submit"
            />
          </div>
        </form>
      </div>
      <div className={classes.backdrop} onClick={handleCancel} />
    </>,
    container,
  );
};

export default DeleteModal;
