import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CellProps, Row, TableProps } from "react-table";
import { has } from "lodash";

import NumbersStore from "storage/singletons/Numbers";
import TableSelectedRows from "storage/singletons/TableSelectedRows";
import EntitlementsStore from "storage/singletons/Entitlements";

import { CustomActionType, TableData } from "utils/types/tableConfig";
import { AvailableEntitlements } from "utils/types/entitlements";

import { InfoIcon, Plus } from "components/Icons";
import Table from "components/Table";
import Tooltip from "components/Tooltip";

const ReservedNumbers: FC = () => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const {
    reservedNumbers,
    getReservedNumbers,
    addReservedNumber,
  } = NumbersStore;
  const { getEntitlements, setAvailable } = EntitlementsStore;
  const { selectedRowsLength } = TableSelectedRows;
  useEffect(() => {
    getReservedNumbers(tenantID, subscriptionID);
    getEntitlements(tenantID, subscriptionID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAvailable = (row: Row<TableData>) => {
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
          0 || row.isSelected
      : false;
  };

  const toolbarActions = selectedRowsLength
    ? [
        {
          id: "add",
          title: t("Add"),
          icon: Plus,
          onClick: () => {
            TableSelectedRows.selectedRowsValues.forEach(row => {
              addReservedNumber(tenantID, subscriptionID, {
                countryCode: row.original.countryCode,
                numbers: [+row.original.nsn],
              });
            });
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
      onClick: (row: Row<TableData>) => {
        addReservedNumber(tenantID, subscriptionID, {
          countryCode: row.original.countryCode,
          numbers: [+row.original.nsn],
        });
      },
    },
    {
      actionName: "info",
      iconComponent: (
        <Tooltip
          arrow
          title="No more entitlements for this number left"
          placement="bottom-end"
        >
          <InfoIcon />
        </Tooltip>
      ),
      isShown: true,
      disabled: false,
      onClick: () => {},
    },
  ];

  const actionDataFormatter = (
    row: Row<TableData>,
    actions: CustomActionType[],
  ) => {
    return actions.reduce(
      (formattedActions: CustomActionType[], action: CustomActionType) => [
        ...formattedActions,
        {
          ...action,
          isShown:
            action.actionName === "info" ? !isAvailable(row) : action.isShown,
          disabled:
            action.actionName === "addReserved"
              ? !isAvailable(row) && !row.isSelected
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

  const selectAllCondition = (page: Row<TableData>[]) => {
    setAvailable(EntitlementsStore.getAvailableEntitlements);

    const { availableEntitlements: available } = EntitlementsStore;

    const availableOnCurrentPage =
      page.length &&
      page.reduce((availableEntitlements: AvailableEntitlements, row) => {
        const countryCode = row.original.countryCode;
        const numberType = row.original.numberType;
        if (
          !has(available, [countryCode, numberType]) ||
          !available[countryCode][numberType]
        ) {
          return {
            ...availableEntitlements,
            [countryCode]: {
              ...availableEntitlements[countryCode],
              [numberType]: 0,
            },
          };
        }
        return {
          ...availableEntitlements,
          [countryCode]: {
            ...availableEntitlements[countryCode],
            [numberType]: has(availableEntitlements, [countryCode, numberType])
              ? availableEntitlements[countryCode][numberType] <
                available[countryCode][numberType]
                ? ++availableEntitlements[countryCode][numberType]
                : availableEntitlements[countryCode][numberType]
              : available[countryCode][numberType]
              ? 1
              : 0,
          },
        };
      }, {});

    const amountAvailable = Object.values(availableOnCurrentPage).reduce(
      (
        availableEntitlementsAmount: number,
        curr: { [key: string]: number },
      ) => {
        return (
          availableEntitlementsAmount +
          Object.values(curr).reduce(
            (availableEntitlements: number, curr: number) => {
              return availableEntitlements + curr;
            },
            0,
          )
        );
      },
      0,
    );
    return (
      amountAvailable === TableSelectedRows.selectedRowsLength &&
      TableSelectedRows.selectedRowsLength !== 0
    );
  };

  const selectAllRowCondition = (isChecked: boolean, row: Row<TableData>) => {
    const { availableEntitlements: available } = EntitlementsStore;

    return isChecked
      ? available[row.original.countryCode][row.original.numberType] &&
          available[row.original.countryCode][row.original.numberType]++
      : !row.isSelected &&
          available[row.original.countryCode][row.original.numberType] -
            TableSelectedRows.selectedRowsValues.filter(
              selectedRow =>
                selectedRow.original.countryCode === row.original.countryCode &&
                selectedRow.original.numberType === row.original.numberType,
            ).length &&
          available[row.original.countryCode][row.original.numberType]--;
  };

  return (
    <Table
      title={t("Reserved numbers")}
      columns={columns}
      data={reservedNumbers}
      customActions={customActions}
      actionsDataFormatter={actionDataFormatter}
      toolbarActions={toolbarActions}
      checkbox
      isCheckboxAvailable={isAvailable}
      isGeneralCheckboxSelected={selectAllCondition}
      selectAllRowCondition={selectAllRowCondition}
    />
  );
};

export default observer(ReservedNumbers);
