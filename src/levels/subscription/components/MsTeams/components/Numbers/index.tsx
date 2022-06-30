import { observer } from "mobx-react-lite";
import { CellProps, Row } from "react-table";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import PendingQueries from "storage/singletons/PendingQueries";
import CloudConnection from "storage/singletons/CloudConnection";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import { getIsLoading } from "utils/functions/getIsLoading";
import { IDeleteNumbers } from "utils/types/operatorConnection";
import { TableData } from "utils/types/tableConfig";

import Flag from "components/common/Flag";
import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import DeleteOcNumberModal from "./DeleteOcNumbersModal";

import useStyles from "./styles";

const CloudConnectionNumbers: FC = () => {
  const [modalToOpen, setModalToOpen] = useState("");
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { byFetchType } = PendingQueries;
  const { getOcNumbers, numbers, deleteNumbers } = CloudConnection;
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    selectedRows,
    selectedRowsLength,
    selectedRowsValues,
    setSelectedRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;

  useEffect(() => {
    getOcNumbers(tenantID, subscriptionID);
    clearTablePagesWithoutServerPaginations(numbers.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numbers.length]);

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t("Country"),
        accessor: "msTeams",
        Cell: ({ value }: CellProps<TableData>) => {
          return (
            <div className={classes.flags}>
              <Flag countryCode={value.country} />
              {value.country}
            </div>
          );
        },
      },
      {
        Header: t("Number"),
        accessor: "draas",
        Cell: ({ row }: CellProps<TableData>) => {
          return (
            <div>
              {row.values.draas
                ? row.values.draas.fullNumber
                : row.values.msTeams.number}
            </div>
          );
        },
      },
      {
        Header: t("Usage"),
        accessor: "msTeams.usage",
      },

      {
        Header: t("Uploaded on"),
        accessor: "msTeams.uploadedOn",
        Cell: ({ value }: CellProps<TableData>) => {
          const formattedString = value.replace(/[^0-9,.:/]/g, " ");
          return <div>{formattedString}</div>;
        },
      },
      {
        Header: t("Provisioned"),
        accessor: "msTeams.provisionedOnMSTeams",
        Cell: ({ value }: CellProps<TableData>) => {
          return (
            <div>
              {value ? (
                <span className={classes.positive}>{t("Yes")}</span>
              ) : (
                <span className={classes.negative}>{t("No")}</span>
              )}
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const toolbarActions = [
    {
      id: "delete",
      title: t("delete"),
      onClick: () => {
        setModalToOpen("delete");
      },
    },
    {
      id: "add",
      title: t("Add"),
      onClick: () => {},
    },
  ];

  // Handler in modals. To close delete \ create modal
  const handleCloseModal = () => {
    setModalToOpen("");
  };

  //Any we have in all to same functions
  const handleDeleteItem = (props: any) => {
    setSelectedRows({ [props.row.index]: true });
    setSelectedRowsValues([props.row]);
    setModalToOpen("delete");
  };

  // Function in delete modal -> button "Delete"
  const handleDelete = () => {
    const formattiongData: IDeleteNumbers[] = selectedRowsValues.map(el => {
      return {
        countryCode: `+${el.values.draas.countryCode}`,
        nsn: Number(el.values.draas.nsn),
      };
    });
    deleteNumbers(tenantID, subscriptionID, formattiongData);
    handleCloseModal();
  };

  const isAvailable = (row: Row<TableData>) => {
    return row.original.draas;
  };

  // Option for select all checkbox
  const selectAllCondition = (page: Row<TableData>[]) => {
    const maxSelectedAmount = page.reduce((prev, row) => {
      return !row.original.draas ? prev : ++prev;
    }, 0);

    return (
      maxSelectedAmount === TableSelectedRowsStore.selectedRowsLength &&
      TableSelectedRowsStore.selectedRowsLength !== 0
    );
  };

  // This function calculates if current row is selectable
  //Any we have in all to same functions
  const isRowSelectable = (_: any, row: Row<TableData>) => {
    return row.original.draas;
  };

  const isLoading =
    getIsLoading("@getOcNumbers", byFetchType) ||
    getIsLoading("@deleteNumbers", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Numbers")}
          columns={columns}
          checkbox={true}
          actions={[true]}
        />
      ) : (
        <Table
          title={t("Numbers")}
          columns={columns}
          data={numbers}
          handleDeleteItem={handleDeleteItem}
          toolbarActions={toolbarActions}
          isRemovable
          checkbox
          isCheckboxAvailable={isAvailable}
          isRowSelectable={isRowSelectable}
          isGeneralCheckboxSelected={selectAllCondition}
          deleteDisabledCondition={(row: Row<TableData>) => {
            return !row.original.draas;
          }}
        />
      )}
      {modalToOpen === "delete" && (
        <DeleteOcNumberModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          data={numbers}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(CloudConnectionNumbers);
