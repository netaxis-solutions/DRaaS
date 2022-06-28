import { useEffect } from "react";
import MTableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";

import { TableBodyType } from "utils/types/tableConfig";

import { useTableBodyStyles } from "./styles";

const TableBody: React.FC<TableBodyType> = ({
  getTableBodyProps,
  page,
  prepareRow,
  radioButton,
}) => {
  const classes = useTableBodyStyles();

  const {
    selectedRows,
    setSelectedRows,
    setRadioButtonValueInRows,
  } = TableSelectedRowsStore;

  useEffect(() => {
    const selectedRow = page.find(el => el.isSelected);
    if (selectedRow && radioButton) {
      setSelectedRows({ 0: true });
      setRadioButtonValueInRows(selectedRow.original);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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
              [classes.disabled]: row.state.isDisabled,
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

export default observer(TableBody);
