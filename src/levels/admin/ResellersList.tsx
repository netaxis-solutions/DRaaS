import { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Resellers from "storage/singletons/Resellers";
import Table from "components/Table";
import TableActions from "components/Table/components/TableActions";
import { Plus, Trash } from "components/Icons";

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
    Header: "Tenants",
    accessor: "nbOfTenants",
  },
  {
    Header: "Actions",
    accessor: "actions",
    disableSortBy: true,
    Cell: () => <TableActions edit del />,
  },
];

const ResellersList: FC = () => {
  const { t } = useTranslation();
  const { getResellersData, resellers } = Resellers;

  useEffect(() => {
    getResellersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "delete",
      title: "Delete",
      icon: Trash,
      onClick: () => {
        console.log("delete reseller");
      },
    },
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
      title={t("Resellers")}
      columns={columns}
      data={resellers}
      toolbarActions={toolbarActions}
      checkbox
    />
  );
};

export default observer(ResellersList);
