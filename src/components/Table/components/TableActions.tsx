import { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import { Edit, Trash, Cross, Check } from "components/Icons";
import { TableActionsType } from "utils/types/tableConfig";

import { useStyles } from "./styles";
import clsx from "clsx";

const TableActions: FC<
  TableActionsType & { customActions?: any[]; rowData?: any }
> = ({
  edit,
  del,
  save,
  cancel,
  customActions,
  rowData,
  onEdit,
  onDelete,
  onCancel,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.tableActionsWrapper}>
      {edit && <Edit onClick={onEdit} />}
      {del && <Trash onClick={onDelete} />}
      {customActions &&
        customActions.map(({ isShown, onClick, iconComponent, disabled }) => (
          <div
            className={clsx({
              [classes.disabled]: disabled,
              [classes.hidden]: !isShown,
            })}
            onClick={() => {
              !disabled && isShown && onClick(rowData);
            }}
          >
            {iconComponent}
          </div>
        ))}
      {save && (
        <IconButton type="submit" className={classes.iconButton}>
          <Check style={{ width: 14, height: 12 }} />
        </IconButton>
      )}
      {cancel && <Cross onClick={onCancel} style={{ width: 14, height: 14 }} />}
    </div>
  );
};

export default TableActions;
