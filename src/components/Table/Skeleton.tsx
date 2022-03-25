import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Column } from "react-table";
import Skeleton from "@mui/material/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import clsx from "clsx";

import { TableData, ToolbarActionType } from "utils/types/tableConfig";

import { useStyles } from "./styles";

const TableSkeleton: FC<{
  columns: Column<TableData>[];
  actions?: ToolbarActionType[] | undefined;
  checkbox?: boolean;
}> = ({ columns, actions = [], checkbox = false }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Skeleton variant="rectangular" height={54} />
      <Table>
        <TableHead>
          <TableRow>
            {checkbox ? (
              <TableCell className={classes.checkboxSkeletonCell}>
                <Skeleton variant="rectangular" height={20} width={20} />
              </TableCell>
            ) : null}
            {columns.map(el => (
              <TableCell>{el.Header}</TableCell>
            ))}
            {actions.length ? (
              <TableCell className={classes.actionsHeaderSkeletonCell}>
                {t("Actions")}
              </TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array(10)
            .fill(0)
            .map(() => (
              <TableRow>
                {checkbox ? (
                  <TableCell
                    className={clsx(
                      classes.checkboxSkeletonCell,
                      classes.bodySkeletonCell,
                    )}
                  >
                    <Skeleton variant="rectangular" height={20} width={20} />
                  </TableCell>
                ) : null}
                {columns.map(() => (
                  <TableCell className={classes.bodySkeletonCell}>
                    <Skeleton />
                  </TableCell>
                ))}
                {actions.length ? (
                  <TableCell
                    className={clsx(
                      classes.actionsBodySkeletonCell,
                      classes.bodySkeletonCell,
                    )}
                  >
                    {actions.map(() => (
                      <Skeleton
                        variant="rectangular"
                        height={20}
                        width={20}
                        className={classes.action}
                      />
                    ))}
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.footerSkeletonCell}>
        <div className={classes.footerSkeletonCellBlock}>
          {checkbox ? <Skeleton height={40} /> : null}
        </div>
        <div className={classes.footerSkeletonCellBlock}></div>
        <div className={classes.footerSkeletonCellBlock}>
          <Skeleton height={40} />
        </div>
      </div>
    </>
  );
};

export default TableSkeleton;
