import MTableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";

import { TableHeadType } from "utils/types/tableConfig";
import TableSort from "./TableSort";
import { useTableHeadStyles } from "./styles";

const TableHead: React.FC<TableHeadType> = ({ headerGroups }) => {
  const classes = useTableHeadStyles();

  return (
    <MTableHead>
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <TableCell
              {...column.getHeaderProps(column.getSortByToggleProps())}
              className={clsx({
                [classes.tableHeadCheckboxRow]: column.id === "selection",
                [classes.tableHeadActionRow]: column.id === "actions",
              })}
            >
              {column.render("Header")}
              {column.canSort && <TableSort column={column} />}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MTableHead>
  );
};

export default TableHead;
