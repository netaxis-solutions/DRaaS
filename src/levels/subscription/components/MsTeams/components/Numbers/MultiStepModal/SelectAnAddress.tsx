import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";

import CloudConnection from "storage/singletons/CloudConnection";
import PendingQueries from "storage/singletons/PendingQueries";
import TablePagination from "storage/singletons/TablePagination";
import MultiStepForm from "storage/singletons/MultiStepForm";
import TableSelectedRows from "storage/singletons/TableSelectedRows";

import { TableData } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";

import SecondStepErrorPage from "./SecondStepErrorPage";
import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import Flag from "components/common/Flag";

import useStyles from "../styles";

const SelectAnAdress: FC = () => {
  const { t } = useTranslation();
  const { byFetchType } = PendingQueries;
  const classes = useStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const {
    getCivicAddresses,
    civicAddresses,
    civicError,
    setSecondStepData,
    getFreeNumbers,
  } = CloudConnection;
  const { radioButtonValueInRow } = TableSelectedRows;
  const { goNext } = MultiStepForm;

  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    getCivicAddresses(tenantID, subscriptionID);
    clearTablePagesWithoutServerPaginations(civicAddresses.length);
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [civicAddresses.length]);

  const columns = useMemo(
    () => [
      {
        Header: t("Country"),
        accessor: "country",
        Cell: ({ value }: CellProps<TableData>) => {
          return (
            <div className={classes.flags}>
              <Flag countryCode={value} />
              {value}
            </div>
          );
        },
      },
      {
        Header: t("description"),
        accessor: "description",
      },
      {
        Header: t("Allowed numbers"),
        accessor: "allowedNumberTypes",
        Cell: ({ row }: CellProps<TableData>) => {
          return (
            <div>{`${row.original.number} ${row.original.street}, ${row.original.state}`}</div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, civicAddresses],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      country: radioButtonValueInRow.country || "",
      id: radioButtonValueInRow.id || "",
    };
    setSecondStepData(payload);
    getFreeNumbers(tenantID, subscriptionID);
    goNext();
  };

  const isLoading = getIsLoading("@getCivicAddresses", byFetchType);
  return (
    <>
      {CloudConnection.savedFirstStepsData.condition ? (
        <>
          {isLoading ? (
            <TableSkeleton
              title={t("Civic Addresses")}
              columns={columns}
              checkbox={true}
            />
          ) : (
            <form id={"CreateNumbers"} onSubmit={onSubmit}>
              {(civicAddresses.length === 0 || civicError) && (
                <SecondStepErrorPage error={civicError} />
              )}
              {!civicError && civicAddresses.length !== 0 && (
                <Table
                  title={t("Civic Addresses")}
                  columns={columns}
                  data={civicAddresses}
                  radioButton
                />
              )}
            </form>
          )}
        </>
      ) : (
        <form id={"CreateNumbers"} onSubmit={onSubmit}>
          <SecondStepErrorPage />
        </form>
      )}
    </>
  );
};

export default observer(SelectAnAdress);
