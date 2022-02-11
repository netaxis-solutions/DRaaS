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
import { styled, Tooltip } from "@material-ui/core";
import { useStyles } from "./styles";
import { tooltipClasses } from "@mui/material/Tooltip";
import { ThemeDefaultOptions } from "utils/types/themeConfig";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }: { theme: ThemeDefaultOptions }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor:
      "linear-gradient(90deg, rgba(33, 35, 86, 0.8) 21.35%, rgba(33, 35, 86, 0.6) 100%)",
    color: theme.palette.primary.white,
    boxShadow: theme.shadows[1],
    height: 185,
    fontSize: 12,
  },
}));

const ReservedNumbers: FC = () => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { reservedNumbers, getReservedNumbers } = NumbersStore;
  const { getEntitlements } = EntitlementsStore;
  const { selectedRowsLength } = TableSelectedRows;
  const classes = useStyles();
  useEffect(() => {
    getReservedNumbers(tenantID, subscriptionID);
    getEntitlements(tenantID, subscriptionID);
  }, []);

  const isAvailable = (row: any) => {
    const entitlement = EntitlementsStore.entitlements.find(entitlement => {
      return (
        entitlement.countryCode === row.original.countryCode &&
        entitlement.numberType === row.original.numberType
      );
    });

    const available = EntitlementsStore.getAvailableEntitlements;

    return entitlement
      ? available[entitlement.countryCode][entitlement.numberType] -
          TableSelectedRows.selectedRowsValues.filter(
            row =>
              row.original.countryCode === entitlement.countryCode &&
              row.original.numberType === entitlement.numberType,
          ).length >
          0
      : false;
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
        console.log((row.original.isRowDisabled = true));
      },
    },
    {
      actionName: "info",
      iconComponent: (
        <LightTooltip
          className={classes.tooltip}
          arrow
          title="No more entitlements for this number left"
          placement="bottom-end"
        >
          <EyeOpened />
        </LightTooltip>
      ),
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
            action.actionName === "info" ? !isAvailable(row) : action.isShown,
          disabled:
            action.actionName === "addReserved"
              ? !isAvailable(row) &&
                !row.isSelected &&
                (row.original.isRowDisabled = true)
              : action.disabled &&
                (row.original.isRowDisabled = action.disabled),
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
      // disableRowCondition={isUnAvailable}
    />
  );
};

export default observer(ReservedNumbers);
