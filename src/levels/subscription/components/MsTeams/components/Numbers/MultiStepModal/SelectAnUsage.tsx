import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";

import CloudConnection from "storage/singletons/CloudConnection";
import TablePagination from "storage/singletons/TablePagination";
import MultiStepForm from "storage/singletons/MultiStepForm";
import TableSelectedRows from "storage/singletons/TableSelectedRows";
import PendingQueries from "storage/singletons/PendingQueries";

import { TableData } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";

const SelectAnUsage: FC = () => {
  const { t } = useTranslation();

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { byFetchType } = PendingQueries;
  const { getAllowUsages, allowedUsages, setFirstStepsData } = CloudConnection;
  const { goNext } = MultiStepForm;
  const { radioButtonValueInRow } = TableSelectedRows;

  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    getAllowUsages(tenantID, subscriptionID);
    clearTablePagesWithoutServerPaginations(allowedUsages.length);
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowedUsages.length]);

  const columns = useMemo(
    () => [
      {
        Header: t("Description"),
        accessor: "description",
      },
      {
        Header: t("Address required?"),
        accessor: "addressRequired",
        Cell: ({ cell }: CellProps<TableData>) => {
          return <div>{cell.value ? "Yes" : "No"}</div>;
        },
      },
      {
        Header: t("Allowed numbers"),
        accessor: "allowedNumberTypes",
        Cell: ({ cell }: CellProps<TableData>) => {
          return (
            <div>
              {cell.value.map((numberType: any, i: number) => {
                return i === cell.value.length - 1 ? (
                  <span key={numberType + i}> {numberType.toLowerCase()}</span>
                ) : (
                  <span key={numberType + i}> {numberType.toLowerCase()},</span>
                );
              })}
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, allowedUsages],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFirstStepsData({
      id: radioButtonValueInRow.id,
      condition: radioButtonValueInRow.addressRequired,
    });
    goNext();
  };

  const isLoading = getIsLoading("@getAllowUsages", byFetchType);

  return (
    <form id={"CreateNumbers"} onSubmit={onSubmit}>
      {isLoading ? (
        <TableSkeleton
          title={t("Allowrd Usages")}
          columns={columns}
          checkbox={true}
        />
      ) : (
        <Table
          title={t("Allowrd Usages")}
          columns={columns}
          data={allowedUsages}
          radioButton
        />
      )}
    </form>
  );
};

export default observer(SelectAnUsage);
