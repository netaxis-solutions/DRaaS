import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";
import { Link } from "react-router-dom";
import RoutingConfig from "storage/singletons/RoutingConfig";
import createLink from "services/createLink";
import TenantsStore from "storage/singletons/Tenants";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import { TenantItemType } from "utils/types/tenant";

import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus, Trash } from "components/Icons";

import AddTenant from "./components/AddTenant";
import DeleteTenantModal from "./components/DeleteTenantModal";

const columns = [
  {
    Header: "Billing ID",
    accessor: "billingId",
  },
  {
    Header: "Owner",
    accessor: "owner.name",
  },
  {
    Header: "Direct tenant",
    accessor: "owner.type",
    Cell: (rows: { row: { original: { owner: { type: string } } } }) =>
      rows.row.original.owner?.type === "distributor" ? "yes" : "no",
  },
  {
    Header: "Markup, %",
    accessor: "markup",
  },
];

const TenantsList: FC = () => {
  const [modalToOpen, setModalToOpen] = useState("");
  const { t } = useTranslation();
  const { getTenantsData, tenants, deleteTenants } = TenantsStore;
  const {
    selectedRows,
    selectedRowsLength,
    setSelectedRows,
  } = TableSelectedRowsStore;
  const { allAvailvableRouting } = RoutingConfig;

  const columnsWithActions = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
        Cell: ({ row: { original } }: CellProps<TenantItemType>) => {
          return (
            <Link
              to={createLink({
                url: allAvailvableRouting.tenantSubscriptions,
                params: { tenantID: original.uuid },
              })}
            >
              {original.name}
            </Link>
          );
        },
      },
      ...columns,
      {
        Header: t("Actions"),
        accessor: "actions",
        disableSortBy: true,
        Cell: ({ row: { index } }: CellProps<TenantItemType>) => (
          <TableActions
            edit
            del
            onDelete={() => {
              setModalToOpen("delete");
              setSelectedRows({ [index]: true });
            }}
          />
        ),
      },
    ],
    [setSelectedRows, t, allAvailvableRouting],
  );

  useEffect(() => {
    getTenantsData();
  }, [getTenantsData]);

  const toolbarActions = [
    {
      id: "delete",
      title: "Delete",
      icon: Trash,
      onClick: () => {
        setModalToOpen("delete");
      },
    },
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        setModalToOpen("add");
      },
    },
  ];

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getTenantsData();
    handleCloseModal();
  };
  const handleDelete = () => {
    const selectedTenantsIds = tenants.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);
    deleteTenants(selectedTenantsIds, callback);
  };

  return (
    <>
      <Table
        title={t("Tenants")}
        columns={columnsWithActions}
        data={tenants}
        toolbarActions={toolbarActions}
        checkbox
      />
      {modalToOpen === "add" && <AddTenant handleCancel={handleCloseModal} />}
      {modalToOpen === "delete" && (
        <DeleteTenantModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          tenants={tenants}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(TenantsList);
