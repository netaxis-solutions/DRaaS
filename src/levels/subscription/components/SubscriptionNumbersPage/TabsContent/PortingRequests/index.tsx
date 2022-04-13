import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CellProps, TableProps } from "react-table";

import PortingRequestsStore from "storage/singletons/PortingRequests";
import PendingQueries from "storage/singletons/PendingQueries";
import TablePagination from "storage/singletons/TablePagination";
import { getIsLoading } from "utils/functions/getIsLoading";

import { Plus } from "components/Icons";
import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import RequestInfoModal from "./Modals/RequestInfoModal";
import AddPortingRequestModal from "./Modals/AddPortingRequestModal";

import styles from "./styles";

const numbersToShowFormatter = (number: Array<[number, number]> | number) => {
  return Array.isArray(number) ? `${number[0]} - ${number[1]}` : number;
};

const PortingRequests: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");
  const classes = styles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const {
    portingRequests,
    getPortingRequests,
    setCurrentRequestId,
  } = PortingRequestsStore;

  const {
    tablePageCounter,
    tablePageSize,
    search,
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    getPortingRequests(tenantID, subscriptionID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  useEffect(() => {
    return clearPaginationData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "add",
      title: t("Add"),
      icon: Plus,
      onClick: () => {
        setModalToOpen("AddPortingRequest");
      },
    },
  ];

  const columns = useMemo(
    () => [
      {
        Header: t("Date"),
        accessor: "createdOn",
        Cell: ({ value }: CellProps<TableProps>) => {
          const a = value.split("T");
          return (
            <div>
              {a[0]} <span className={classes.greyTime}>{a[1]}</span>
            </div>
          );
        },
      },
      {
        Header: t("Numbers"),
        accessor: "numbers",
        Cell: ({
          cell: {
            row: {
              original: { ranges, numbers },
            },
          },
        }: CellProps<any>) => {
          const [isAllNumbersShown, setShown] = useState(false);

          const formattedRanges = ranges
            ? ranges.reduce(
                (
                  formattedRangesArray: Array<[number, number]>,
                  currentRange: { from: string; to: string },
                ) => [
                  ...formattedRangesArray,
                  [currentRange.from, currentRange.to],
                ],
                [],
              )
            : [];

          const allNumbers = formattedRanges.concat(numbers || []);

          return (
            <div onClick={() => setShown(!isAllNumbersShown)}>
              {allNumbers.length > 1 ? (
                isAllNumbersShown ? (
                  <div
                    className={classes.multipleNumbers}
                    onClick={() => setShown(!isAllNumbersShown)}
                  >
                    {allNumbers.map(
                      (currentNumber: Array<[number, number]> | number) => {
                        return (
                          <div>{numbersToShowFormatter(currentNumber)}</div>
                        );
                      },
                    )}
                  </div>
                ) : (
                  <div
                    className={classes.multipleNumbers}
                    onClick={() => setShown(!isAllNumbersShown)}
                  >
                    {numbersToShowFormatter(allNumbers[0])} ...
                  </div>
                )
              ) : (
                numbersToShowFormatter(allNumbers[0])
              )}
            </div>
          );
        },
      },
      {
        Header: t("Provider"),
        accessor: "donor.name",
      },
      {
        Header: t("Port ID"),
        accessor: "portId",
        Cell: ({
          value,
          cell: {
            row: {
              original: { id },
            },
          },
        }: CellProps<any>) => {
          return (
            <div
              onClick={() => {
                setCurrentRequestId(id);
                setModalToOpen("RequestInfo");
              }}
              className={classes.modalLink}
            >
              {value}
            </div>
          );
        },
      },
      {
        Header: t("Status"),
        accessor: "status",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const handleClose = () => {
    setModalToOpen("");
    getPortingRequests(tenantID, subscriptionID);
  };
  const { byFetchType } = PendingQueries;

  const isLoading = getIsLoading("@getPortingRequests", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Porting requests")}
          columns={columns}
          actions={[]}
        />
      ) : portingRequests.length ? (
        <>
          <Table
            title={t("Porting requests")}
            columns={columns}
            data={portingRequests}
            toolbarActions={toolbarActions}
          />
          {modalToOpen === "RequestInfo" && (
            <RequestInfoModal handleCancel={handleClose} />
          )}
        </>
      ) : (
        <div className={classes.noNumbersBlock}>
          <span>{t("You have no porting requests added yet")}</span>
          <ButtonWithIcon
            icon={Plus}
            title={t("Add")}
            onClick={() => setModalToOpen("AddPortingRequest")}
          />
        </div>
      )}
      {modalToOpen === "AddPortingRequest" && (
        <AddPortingRequestModal handleCancel={handleClose} />
      )}
    </>
  );
};

export default observer(PortingRequests);
