import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CellProps, TableProps } from "react-table";

// import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import NumbersStore from "storage/singletons/Numbers";

import { EyeOpened, Plus } from "components/Icons";
import Table from "components/Table";
import TableSelectedRows from "storage/singletons/TableSelectedRows";
import EntitlementsStore from "storage/singletons/Entitlements";

const ReservedNumbers: FC = () => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { reservedNumbers, getReservedNumbers } = NumbersStore;
  const { entitlements, getEntitlements } = EntitlementsStore;
  const { selectedRowsLength } = TableSelectedRows;
  useEffect(() => {
    getReservedNumbers(tenantID, subscriptionID);
    getEntitlements(tenantID, subscriptionID);
  }, []);

  const isUnAvailable = (row: any) => {
    const entitlement = entitlements.find(entitlement => {
      return (
        entitlement.countryCode === row.countryCode &&
        entitlement.numberType === row.numberType
      );
    });
    return !(entitlement
      ? entitlement.entitlement - entitlement.assigned > selectedRowsLength
      : false);
  };

  const toolbarActions = selectedRowsLength
    ? [
        {
          id: "add",
          title: t("Add"),
          icon: Plus,
          onClick: () => {
            console.log("add");
          },
        },
      ]
    : [];

  const customActions = [
    {
      actionName: "addReserved",
      iconComponent: <Plus />,
      isShown: true,
      disabled: false,
      onClick: (row: any) => {
        console.log(row);
      },
    },
    {
      actionName: "info",
      iconComponent: <EyeOpened />,
      isShown: true,
      disabled: false,
      onClick: () => {
        console.log("tooltip");
      },
    },
  ];

  const actionDataFormatter = (row: any, actions: any[]) => {
    return actions.reduce(
      (sum: any, action: any) => [
        ...sum,
        {
          ...action,
          isShown:
            action.actionName === "info" ? row.index === 0 : action.isShown,
          disabled:
            action.actionName === "addReserved"
              ? isUnAvailable(row)
              : action.disabled,
        },
      ],
      [],
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: t("Country code"),
        accessor: "countryCode",
      },
      {
        Header: t("Number"),
        accessor: "nsn",
      },
      {
        Header: t("Number type"),
        accessor: "numberType",
      },
      {
        Header: t("Origin"),
        accessor: "source",
        Cell: ({ value }: CellProps<TableProps>) => {
          return value === "number_inventory" ? "native" : "ported";
        },
      },
    ],
    [t],
  );

  return (
    <Table
      title={t("Reserved numbers")}
      columns={columns}
      data={reservedNumbers}
      customActions={customActions}
      actionsDataFormatter={actionDataFormatter}
      toolbarActions={toolbarActions}
      checkbox
      disableRowCondition={isUnAvailable}
    />
  );
};

export default observer(ReservedNumbers);
