import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import RatePlans from "storage/singletons/RatePlans";
import Tooltip from "components/Tooltip";
import InfoIconOutlined from "components/Icons/InfoIconOutlined";

import useRatePlansTableStyles from "./styles";

const RatePlansList: FC = () => {
  const { t } = useTranslation();
  const classes = useRatePlansTableStyles();

  const { clearPaginationData } = TablePagination;

  const { byFetchType } = PendingQueries;

  const columns = useMemo(
    () => [
      {
        Header: t("Destination"),
        accessor: "destination",
      },
      {
        Header: (
          <div className={classes.columnHeaderWrapper}>
            {t("International")}
            <Tooltip
              placement="top"
              title={t("If source and destination are in different countries")}
            >
              <InfoIconOutlined className={classes.errorNotification} />
            </Tooltip>
          </div>
        ),
        id: "international",
        columns: [
          { Header: t("Setup cost, €"), accessor: "international.setup" },
          {
            Header: t("Cost per minute, €"),
            accessor: "international.duration",
          },
        ],
      },
      {
        Header: (
          <div className={classes.columnHeaderWrapper}>
            {t("National")}
            <Tooltip
              placement="top"
              title={t(
                "If source and destination number are in the same country",
              )}
            >
              <InfoIconOutlined className={classes.errorNotification} />
            </Tooltip>
          </div>
        ),
        id: "national",
        columns: [
          { Header: t("Setup cost, €"), accessor: "national.setup" },
          {
            Header: t("Cost per minute, €"),
            accessor: "national.duration",
          },
        ],
      },
      {
        Header: t("Activation date"),
        accessor: "activeSince",
      },
      {
        Header: t("Next update"),
        accessor: "nextUpdate",
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  useEffect(() => {
    return () => {
      clearPaginationData();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = useMemo(
    () => [
      {
        id: "delete",
        title: t("delete"),
        onClick: () => {},
      },
      {
        id: "add",
        title: t("Add"),
        onClick: () => {},
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const isLoading = getIsLoading("@getSpecificRatePlan", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton title={""} columns={columns} />
      ) : (
        <Table
          title={""}
          columns={columns}
          data={RatePlans.currentRatePlan}
          toolbarActions={toolbarActions}
          checkbox
          isRemovable
          isEditable
        />
      )}
    </>
  );
};

export default observer(RatePlansList);
