import MTableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";

import { TableBodyType } from "utils/types/tableConfig";
import { useTableBodyStyles } from "./styles";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";

const TableBody: React.FC<TableBodyType> = ({
  getTableBodyProps,
  page,
  prepareRow,
  radioButton,
}) => {
  const classes = useTableBodyStyles();

  const { selectedRows } = TableSelectedRowsStore;

  return (
    <MTableBody {...getTableBodyProps()}>
      {page.map(row => {
        if (
          radioButton &&
          Object.keys(selectedRows).length === 0 &&
          row.index === 0
        ) {
          row.isSelected = true;
        }

        prepareRow(row);

        return (
          <TableRow
            {...row.getRowProps()}
            className={clsx({
              [classes.isEditing]: row.state.isEditing,
              [classes.disabled]:
                page.some(row => row.state?.isEditing) && !row.state.isEditing,
            })}
            key={row.id}
          >
            {row.cells.map(cell => {
              return (
                <TableCell
                  {...cell.getCellProps()}
                  className={clsx({
                    [classes.tableCellWithSelection]:
                      cell.column.id === "selection",
                    [classes.tableCellWithAction]: cell.column.id === "actions",
                    [classes.tableCellOverflow]: true,
                  })}
                >
                  {cell.render(
                    row.state.isEditing &&
                      cell.column["EditComponent" as keyof object]
                      ? "EditComponent"
                      : "Cell",
                  )}
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
