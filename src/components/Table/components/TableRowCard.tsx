import AppMenu from "@material-ui/core/Menu";
import { Cell } from "react-table";

import { TableData } from "utils/types/tableConfig";

import { useTableRowStyles } from "./styles";
import { useState } from "react";
import { ThreeVerticalDots, UserDefaultAvatar } from "components/Icons";

const TableRowCard: React.FC<{
  key: string | number;
  cells: Array<Cell<TableData>>;
}> = ({ key, cells }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //////////////////////

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
        <ThreeVerticalDots onClick={handleMenu} />
        <AppMenu
          // anchorReference="none"
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
        {cellToRender.map((cell: any) => {
          return <div {...cell.getCellProps()}>{cell.render("Cell")}</div>;
        })}
      </div>
    </div>
  );
};

export default TableRowCard;
