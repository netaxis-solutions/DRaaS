import { FC, useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Row } from "react-table";

import Resellers from "storage/singletons/Resellers";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { getIsLoading } from "utils/functions/getIsLoading";
import { TableData } from "utils/types/tableConfig";
import { ResellerItemType } from "utils/types/resellers";

import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddReseller from "./components/AddReseller";
import DeleteResellerModal from "./components/DeleteResellerModal";
import TableSkeleton from "components/Table/Skeleton";
import RightSideModal from "components/Modal/RightSideModal";
import EditResellerModal from "./components/EditResellerModal";

const ResellersList: FC = () => {
  const { t } = useTranslation();

  const [modalToOpen, setModalToOpen] = useState("");
  const [defaultValues, setDefaultValues] = useState<ResellerItemType>();

  const {
    tablePageCounter,
    tablePageSize,
    clearPaginationData,
    search,
  } = TablePagination;

  const {
    getResellersData,
    deleteResellers,
    getMoreResellers,
    resellers,
    isResellersCreatable,
    isResellersDeletable,
    isResellersEditable,
  } = Resellers;

  const { selectedRows, selectedRowsLength } = TableSelectedRowsStore;
  const { setSelectedRows } = TableSelectedRowsStore;
  const { byFetchType } = PendingQueries;

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
      },
      {
        Header: t("Billing ID"),
        accessor: "billingId",
      },
      {
        Header: t("Owner"),
        accessor: "owner.name",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getResellersData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  const toolbarActions = useMemo(() => {
    const actions = [];
    if (isResellersDeletable) {
      actions.push({
        id: "delete",
        title: t("Delete"),
        icon: Trash,
        onClick: () => {
          setModalToOpen("delete");
        },
      });
    }
    if (isResellersCreatable) {
      actions.push({
        id: "add",
        title: t("Add"),
        icon: Plus,
        onClick: () => {
          setModalToOpen("add");
        },
      });
    }
    return actions;
  }, [isResellersCreatable, isResellersDeletable, t]);

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getResellersData({});
    handleCloseModal();
  };

  const handleDelete = () => {
    const selectedResellerIds = resellers.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);

    deleteResellers(selectedResellerIds, callback);
  };

  const handleDeleteItem = (row: Row<TableData>) => {
    setModalToOpen("delete");
    setSelectedRows({ [row.index]: true });
  };

  const handleEditItem = (row: Row<TableData>) => {
    const defaultResellerValues: ResellerItemType = {
      uuid: row.original.uuid,
      name: row.original.name,
      billingId: row.original.billingId,
    };
    setDefaultValues(defaultResellerValues);
    setModalToOpen("edit");
  };

  const isLoading = getIsLoading("@getResellersData", byFetchType);

  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Resellers")}
          columns={columns}
          actions={[isResellersEditable, isResellersDeletable]}
          checkbox={isResellersDeletable}
        />
      ) : (
        <Table
          title={t("Resellers")}
          columns={columns}
          data={Resellers.resellers}
          cardBasedLayout
          infiniteScroll
          handleLoadNext={getMoreResellers}
          toolbarActions={toolbarActions}
          setModalToOpen={setModalToOpen}
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
              iconComponent: <div style={{ color: "red" }}>{t("Delete")}</div>,
              isShown: true,
              disabled: false,
              onClick: handleDeleteItem,
            },
          ]}
        />
      )}

      {modalToOpen === "add" && <AddReseller handleCancel={handleCloseModal} />}
      {modalToOpen === "delete" && (
        <DeleteResellerModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          resellers={resellers}
          selectedRowsLength={selectedRowsLength}
        />
      )}
      {modalToOpen === "edit" && (
        <RightSideModal
          handleCancel={handleCloseModal}
          title={t("Edit reseller")}
          children={
            <EditResellerModal
              originalResellerValues={defaultValues!}
              formId={"editReseller"}
            />
          }
          submitButton={{
            formId: "editReseller",
            type: "submit",
          }}
        />
      )}
    </>
  );
};

export default observer(ResellersList);
