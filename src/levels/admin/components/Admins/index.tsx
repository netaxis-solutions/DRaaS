import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CellProps, TableProps } from "react-table";
import { Row } from "react-table";

import AdminsStorage from "storage/singletons/Admins";
import PendingQueries from "storage/singletons/PendingQueries";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";

import { getIsLoading } from "utils/functions/getIsLoading";
import { TableData } from "utils/types/tableConfig";
import { IAdminsData, IAdminsOfData } from "utils/types/admins";

import { Plus, Trash, Edit } from "components/Icons";
import TableSkeleton from "components/Table/Skeleton";
import Table from "components/Table";
import RightSideModal from "components/Modal/RightSideModal";
import CreateAdmin from "./AddAdmins";
import EditAdmins from "./EditAdmins";

const Admins: FC = () => {
  const { t } = useTranslation();

  const [modalToOpen, setModalToOpen] = useState("");
  const [originalAdminValue, setOriginalAdminValue] = useState<
    IAdminsData | {}
  >({});

  const { getAdmins, admins, clearStorage } = AdminsStorage;
  const { byFetchType } = PendingQueries;
  const { setSelectedRows } = TableSelectedRowsStore;
  const { clearTablePagesWithoutServerPaginations } = TablePagination;

  useEffect(() => {
    getAdmins();
    clearTablePagesWithoutServerPaginations(admins.length);
  }, [admins.length]);

  useEffect(() => () => clearStorage(), []);

  const columns = useMemo(
    () => [
      {
        Header: t("Email"),
        accessor: "email",
      },
      {
        Header: t("First name"),
        accessor: "first_name",
      },
      {
        Header: t("Last name"),
        accessor: "last_name",
      },
      {
        Header: t("Scope"),
        accessor: "",
      },
      {
        Header: t("Level"),
        accessor: "",
      },
      {
        Header: t("Admin of"),
        accessor: "admin_of",
        Cell: ({ cell }: CellProps<TableProps>) => {
          return cell.value.map((el: IAdminsOfData) => {
            return <p>{el.obj?.name}</p>;
          });
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const toolbarActions = [
    {
      id: "delete",
      title: t("Delete"),
      icon: Trash,
      onClick: () => {
        setModalToOpen("delete");
      },
    },
    {
      id: "add",
      title: t("Add"),
      icon: Plus,
      onClick: () => {
        setModalToOpen("add");
      },
    },
  ];

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const handleDeleteItem = (props: any) => {
    setModalToOpen("delete");
    setSelectedRows({ [props.row.index]: true });
  };

  const handleEditItem = (row: Row<TableData>) => {
    setOriginalAdminValue(row.original);
    setModalToOpen("edit");
  };

  const isLoading = getIsLoading("@getAdmins", byFetchType);
  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Admins")}
          columns={columns}
          actions={[true, true]}
          checkbox={true}
        />
      ) : (
        <Table
          title={t("Admins")}
          columns={columns}
          data={admins}
          setModalToOpen={setModalToOpen}
          toolbarActions={toolbarActions}
          checkbox
          isRemovable
          handleDeleteItem={handleDeleteItem}
          customActions={[
            {
              actionName: "edit",
              iconComponent: <Edit />,
              isShown: true,
              disabled: false,
              onClick: handleEditItem,
            },
          ]}
        />
      )}
      {modalToOpen === "add" && (
        <RightSideModal
          handleCancel={handleCloseModal}
          title={t("Add admin")}
          children={
            <CreateAdmin
              formId={"createAdmin"}
              handleCancel={handleCloseModal}
            />
          }
          submitButton={{
            formId: "createAdmin",
            type: "submit",
            title: t("Add"),
          }}
        />
      )}
      {modalToOpen === "edit" && (
        <RightSideModal
          handleCancel={handleCloseModal}
          title={t("Edit admin")}
          children={
            <EditAdmins
              originalAdminValue={originalAdminValue as IAdminsData}
              formId={"editAdmin"}
              handleCancel={handleCloseModal}
            />
          }
          submitButton={{
            formId: "editAdmin",
            type: "submit",
            title: t("Edit"),
          }}
        />
      )}
    </>
  );
};

export default observer(Admins);
