import { FC } from "react";

import { EditIcon, DeleteIcon } from "components/Icons";

import { useStyles } from "./styles";

interface ITableActions {
  [key: string]: boolean;
}

const TableActions: FC<ITableActions> = ({ edit, del }) => {
  const classes = useStyles();
  return (
    <div className={classes.actionsWrapper}>
      {edit && (
        <EditIcon
          onClick={() => console.log("onEdit click")}
          className={classes.wrapper}
        />
      )}
      {del && (
        <DeleteIcon
          onClick={() => console.log("onDelete click")}
          className={classes.wrapper}
        />
      )}
    </div>
  );
};

export default TableActions;
