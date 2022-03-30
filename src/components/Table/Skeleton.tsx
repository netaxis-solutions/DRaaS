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

import { TableData } from "utils/types/tableConfig";

import { useStyles } from "./styles";

const TableSkeleton: FC<{
  title: string;
  columns: Column<TableData>[];
  actions?: boolean[];
  checkbox?: boolean;
}> = ({ title, columns, actions = [], checkbox = false }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <div className={classes.tableToolbarWrapper}>
        <div className={classes.tableToolbarTitle}>{title}</div>
        <div className={classes.tableToolbarSkeleton}>
          <Skeleton variant="rectangular" height={54} />
        </div>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            {checkbox ? (
              <TableCell className={classes.checkboxSkeletonCell}>
                <Skeleton variant="rectangular" height={20} width={20} />
              </TableCell>
            ) : null}
            {columns.map((el: Column<TableData>) => (
              <TableCell key={`${el.accessor}`}>{el.Header}</TableCell>
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
            .map((_: number, index: number) => (
              <TableRow key={index}>
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
                {columns.map((el: Column<TableData>) => (
                  <TableCell
                    key={`${el.accessor}`}
                    className={classes.bodySkeletonCell}
                  >
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
                    {actions
                      .filter(el => el)
                      .map((_: boolean, index: number) => (
                        <Skeleton
                          key={index}
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
