import MTableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";

import { TableBodyType } from "utils/types/tableConfig";
import { useTableBodyStyles } from "./styles";

const TableBody: React.FC<TableBodyType> = ({
  getTableBodyProps,
  page,
  prepareRow
}) => {
  const classes = useTableBodyStyles();

  return (
    <MTableBody {...getTableBodyProps()}>
      {page.map(row => {
        prepareRow(row);
        return (
          <TableRow {...row.getRowProps()} className={classes.hover}>
            {row.cells.map(cell => {
              return (
                <TableCell
                  {...cell.getCellProps()}
                  className={clsx({
                    [classes.tableCellWithSelection]:
                      cell.column.id === "selection",
                    [classes.tableCellWithAction]: cell.column.id === "actions"
                  })}
                >
                  {cell.render("Cell")}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </MTableBody>
  );
};

export default TableBody;
