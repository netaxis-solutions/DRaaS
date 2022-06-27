import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Row } from "react-table";

import DistributorsStore from "storage/singletons/Distributors";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";
import TableInfiniteScroll from "storage/singletons/TableInfiniteScroll";

import { DistributorItemType } from "utils/types/distributors";
import { getIsLoading } from "utils/functions/getIsLoading";
import { TableData } from "utils/types/tableConfig";

import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddDistributor from "./components/AddDistributor";
import DeleteDistributorModal from "./components/DeleteDistributorModal";
import EditDistributorModal from "./components/EditDistributorModal";
import RightSideModal from "components/Modal/RightSideModal";
import TableSkeleton from "components/Table/Skeleton";

const Distributors: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");
  const [originalDistributorValues, setOriginalDistributorValues] = useState<
    DistributorItemType | {}
  >({});

  const {
    tablePageCounter,
    tablePageSize,
    clearPaginationData,
    search,
  } = TablePagination;

  const { byFetchType } = PendingQueries;

  // TODO: Uncomment when drill down to a distributor level
  // const { allAvailvableRouting } = RoutingConfig;
  const {
    distributors,
    isDistributorDeletable,
    isDistributorsEditable,
    isDistributorsCreatable,
    deleteDistributors,
    getDistributorsData,
    getAdditionalDistributorsData,
  } = DistributorsStore;
  const { selectedRows, selectedRowsLength } = TableSelectedRowsStore;
  const { setSelectedRows } = TableSelectedRowsStore;

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",

        // TODO: Uncomment when drill down to a distributor level
        // Cell: ({ row: { original } }: CellProps<DistributorItemType>) => (
        //   <Link
        //     to={createLink({
        //       url: allAvailvableRouting.distributorResellers,
        //       params: { distributorID: original.uuid },
        //     })}
        //   >
        //     {original.name}
        //   </Link>
        // ),
      },
      {
        Header: t("Billing ID"),
        accessor: "billingId",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  useEffect(() => {
    getDistributorsData(TableInfiniteScroll.setNewToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = useMemo(() => {
    const actions = [];
    if (isDistributorDeletable) {
      actions.push({
        id: "delete",
        title: "Delete",
        icon: Trash,
        onClick: () => {
          setModalToOpen("delete");
        },
      });
    }
    if (isDistributorsCreatable) {
      actions.push({
        id: "add",
        title: "Add",
        icon: Plus,
        onClick: () => {
          setModalToOpen("add");
        },
      });
    }
    return actions;
  }, [isDistributorsCreatable, isDistributorDeletable]);

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getDistributorsData();
    handleCloseModal();
  };

  const handleDelete = () => {
    const selectedDistributorIds = distributors.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);
    deleteDistributors(selectedDistributorIds, callback);
  };

  const handleDeleteItem = (row: Row<TableData>) => {
    setModalToOpen("delete");

    setSelectedRows({ [row.index]: true });
  };

  // This function is used for setting current distributor data
  // and opening the edit modal
  const handleEditItem = (row: Row<TableData>) => {
    setOriginalDistributorValues(row.original);
    setModalToOpen("edit");
  };

  const isLoading = getIsLoading("@getDistributorsData", byFetchType);

  return (
    <>
      <div>
        {isLoading ? (
          <TableSkeleton
            title={t("Distributors")}
            columns={columns}
            actions={[isDistributorsEditable, isDistributorDeletable]}
            checkbox={isDistributorDeletable}
          />
        ) : (
          <Table
            title={t("Distributors")}
            columns={columns}
            cardBasedLayout
            data={DistributorsStore.distributors}
            handleLoadNext={getAdditionalDistributorsData}
            setModalToOpen={setModalToOpen}
            toolbarActions={toolbarActions}
            infiniteScroll
            customActions={[
              {
                actionName: "edit",
                iconComponent: <>{t("Edit")}</>,
                isShown: true,
                disabled: false,
                onClick: handleEditItem,
              },
              {
                actionName: "delete",
                iconComponent: (
                  <div style={{ color: "red" }}>{t("Delete")}</div>
                ),
                isShown: true,
                disabled: false,
                onClick: handleDeleteItem,
              },
            ]}
          />
        )}
      </div>
      {modalToOpen === "add" && (
        <AddDistributor handleCancel={handleCloseModal} />
      )}
      {modalToOpen === "delete" && (
        <DeleteDistributorModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          distributors={distributors}
          selectedRowsLength={selectedRowsLength}
        />
      )}
      {modalToOpen === "edit" && (
        <RightSideModal
          handleCancel={handleCloseModal}
          title={t("Edit distributor")}
          children={
            <EditDistributorModal
              originalDistributorValues={
                originalDistributorValues as DistributorItemType
              }
              formId={"editDistributor"}
            />
          }
          submitButton={{
            formId: "editDistributor",
            type: "submit",
          }}
        />
      )}
    </>
  );
};

export default observer(Distributors);
