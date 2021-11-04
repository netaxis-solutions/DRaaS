import { FC } from "react";

import { Edit, Trash } from "components/Icons";
import { TableActionsType } from "utils/types/tableConfig";

import { useStyles } from "./styles";

const TableActions: FC<TableActionsType> = ({
  edit,
  del,
  onEdit,
  onDelete
}) => {
  const classes = useStyles();

  return (
    <div className={classes.tableActionsWrapper}>
      {edit && <Edit onClick={onEdit} />}
      {del && <Trash onClick={onDelete} />}
    </div>
  );
};

export default TableActions;
