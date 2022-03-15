import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CellProps, TableProps } from "react-table";

import PortingRequestsStore from "storage/singletons/PortingRequests";

import { Plus } from "components/Icons";
import Table from "components/Table";

import styles from "./styles";
import RequestInfoModal from "./Modals/RequestInfoModal";

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
    clearCurrentRequest,
  } = PortingRequestsStore;

  useEffect(() => {
    getPortingRequests(tenantID, subscriptionID);

    return () => {
      clearCurrentRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "add",
      title: t("Add"),
      icon: Plus,
      onClick: () => {
        console.log("aaaaa");
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
        accessor: "donor.id",
      },
      {
        Header: t("Port ID"),
        accessor: "recipient.id",
        Cell: ({
          value,
          cell: {
            row: {
              original: { portId, id },
            },
          },
        }: CellProps<any>) => {
          return (
            <div
              onClick={() => {
                setCurrentRequestId(id);
                setModalToOpen("RequestInfo");
              }}
            >
              {value || portId}
            </div>
          );
        },
      },
      {
        Header: t("Status"),
        accessor: "status",
      },
    ],
    [t],
  );

  const handleClose = () => {
    setModalToOpen("");
  };

  return (
    <>
      <Table
        title={t("PortingRequests")}
        columns={columns}
        data={portingRequests}
        toolbarActions={toolbarActions}
      />
      {modalToOpen === "RequestInfo" && (
        <RequestInfoModal handleCancel={handleClose} />
      )}
    </>
  );
};

export default observer(PortingRequests);
