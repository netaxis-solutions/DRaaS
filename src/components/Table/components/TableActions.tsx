import { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import { Row } from "react-table";

import {
  CustomActionType,
  TableActionsType,
  TableData,
} from "utils/types/tableConfig";

import Tooltip from "components/Tooltip";
import { Edit, Trash, Cross, Check } from "components/Icons";

import { useStyles } from "./styles";

const TableActions: FC<
  TableActionsType & {
    customActions?: CustomActionType[];
    rowData: Row<TableData>;
    editDisabled?: (row: Row<TableData>) => boolean;
    deleteDisabled?: (row: Row<TableData>) => boolean;
    tooltipTrashButton?: {
      text: string;
      filterConditions: (rowData: Row<TableData>) => boolean;
    };
    tooltipEditButton?: {
      text: string;
      filterConditions: (rowData: Row<TableData>) => boolean;
    };
  }
> = ({
  edit,
  del,
  save,
  cancel,
  customActions,
  rowData,
  tooltipTrashButton,
  tooltipEditButton,
  editDisabled = _ => false,
  deleteDisabled = _ => false,
  onEdit,
  onDelete,
  onCancel,
}) => {
  const classes = useStyles();
  const isEditDisabled = editDisabled(rowData);
  const isDeleteDisabled = deleteDisabled(rowData);
  const tooltipValidation = tooltipTrashButton?.filterConditions(rowData);
  const tooltipValidationEdit = tooltipEditButton?.filterConditions(rowData);

  return (
    <div className={classes.tableActionsWrapper}>
      {edit && (
        <div
          className={clsx({
            [classes.editButton]: !isEditDisabled,
            [classes.disabledButton]: isEditDisabled,
          })}
        >
          {tooltipValidationEdit ? (
            <Tooltip
              arrow
              title={tooltipEditButton?.text}
              placement="bottom-end"
            >
              <Edit
                className={classes.editButton}
                onClick={isEditDisabled ? () => {} : onEdit}
              />
            </Tooltip>
          ) : (
            <Edit
              className={classes.editButton}
              onClick={isEditDisabled ? () => {} : onEdit}
            />
          )}
        </div>
      )}

      {del && (
        <div className={clsx({ [classes.disabledButton]: isDeleteDisabled })}>
          {tooltipValidation ? (
            <Tooltip
              arrow
              title={tooltipTrashButton?.text}
              placement="bottom-end"
            >
              <Trash
                className={classes.trashButton}
                onClick={isDeleteDisabled ? () => {} : onDelete}
              />
            </Tooltip>
          ) : (
            <Trash
              className={classes.trashButton}
              onClick={isDeleteDisabled ? () => {} : onDelete}
            />
          )}
        </div>
      )}

      {customActions &&
        customActions.map(({ isShown, onClick, iconComponent, disabled }) => (
          <div
            className={clsx({
              [classes.disabledButton]: disabled,
              [classes.hidden]: !isShown,
            })}
            onClick={() => {
              !disabled && isShown && rowData && onClick(rowData);
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
