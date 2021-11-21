import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import TenantsStore from "storage/singletons/Tenants";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus } from "components/Icons";

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
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
      rows.row.original.owner.type === "distributor" ? "yes" : "no",
  },
  {
    Header: "Markup, %",
    accessor: "markup",
  },
  {
    Header: "Actions",
    accessor: "actions",
    disableSortBy: true,
    Cell: () => <TableActions edit del />,
  },
];

const TenantsList: FC = () => {
  const { t } = useTranslation();
  const { getTenantsData, tenants } = TenantsStore;

  useEffect(() => {
    getTenantsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        console.log("add all");
      },
    },
  ];

  return (
    <Table
      title={t("Tenants")}
      columns={columns}
      data={tenants}
      toolbarActions={toolbarActions}
      checkbox
    />
  );
};

export default observer(TenantsList);
