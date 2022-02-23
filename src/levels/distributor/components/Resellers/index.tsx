import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { useParams } from "react-router";

import Resellers from "storage/singletons/Resellers";
import Table from "components/Table";
import { Plus, Trash } from "components/Icons";

const getTranslatedColumns = (t: TFunction) => [
  {
    Header: t("Name"),
    accessor: "name",
  },
  {
    Header: t("Billing ID"),
    accessor: "billingId",
  },
  {
    Header: t("Tenants"),
    accessor: "nbOfTenants",
  },
  {
    Header: t("Markup, %"),
    accessor: "markup",
  },
];

type TResellerListParams = {
  distributorID: string;
};

const ResellersList: FC = () => {
  const { t } = useTranslation();
  const params: TResellerListParams = useParams();

  const { getResellersData, resellers } = Resellers;

  const columns = useMemo(() => getTranslatedColumns(t), [t]);

  useEffect(() => {
    getResellersData({ id: params.distributorID });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "delete",
      title: t("Delete"),
      icon: Trash,
      onClick: () => {
        console.log("delete reseller");
      },
    },
    {
      id: "add",
      title: t("Add"),
      icon: Plus,
      onClick: () => {},
    },
  ];

  return (
    <>
      <Table
        title={t("Resellers")}
        columns={columns}
        data={resellers}
        toolbarActions={toolbarActions}
        checkbox
        isEditable
        isRemovable
      />
    </>
  );
};

export default observer(ResellersList);
