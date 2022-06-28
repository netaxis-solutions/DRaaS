import { useState } from "react";
import AppMenu from "@material-ui/core/Menu";
import { Cell } from "react-table";

import { TableData } from "utils/types/tableConfig";

import { ThreeVerticalDots, UserDefaultAvatar } from "components/Icons";

import { useTableRowStyles } from "./styles";

const TableRowCard: React.FC<{
  key: string | number;
  cells: Array<Cell<TableData>>;
}> = ({ key, cells }) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const classes = useTableRowStyles();
  const selection = cells.find(cell => cell.column.id === "selection");
  const actions = cells.find(cell => cell.column.id === "actions");
  const cellToRender = cells.filter(
    ({ column }) => column.id !== "selection" && column.id !== "actions",
  );

  return (
    <div className={classes.tableRowCard} key={key}>
      <div className={classes.userAvatar}>
        <UserDefaultAvatar />
      </div>
      <div className={classes.actionsMenuButton}>
        <div onClick={handleMenu}>
          <ThreeVerticalDots />
        </div>
        <AppMenu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          className={classes.menuStyles}
        >
          <div onClick={handleCloseMenu}>{actions?.render("Cell")}</div>
        </AppMenu>
      </div>
      <div>{selection?.render("Cell")}</div>
      <div className={classes.cellsWrapper}>
        {cellToRender.map(cell => {
          return <div {...cell.getCellProps()}>{cell.render("Cell")}</div>;
        })}
      </div>
    </div>
  );
};

export default TableRowCard;
