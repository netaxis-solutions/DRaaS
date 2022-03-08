import TableSortLabel from "@material-ui/core/TableSortLabel";
import clsx from "clsx";

import { TableSortPropsType } from "utils/types/tableConfig";
import SortIcon from "./SortIcon";

import { useTableSortStyles } from "./styles";

const TableSort: React.FC<TableSortPropsType> = ({ column }) => {
  const classes = useTableSortStyles();
  return (
    <TableSortLabel
      active={column.isSorted}
      IconComponent={SortIcon}
      classes={{
        root: clsx(classes.tableSortWrapper, {
          [classes.tableSortWrapperIsSorted]: column.isSorted,
        }),
      }}
    />
  );
};

export default TableSort;
