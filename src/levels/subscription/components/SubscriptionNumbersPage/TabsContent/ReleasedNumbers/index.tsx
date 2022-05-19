import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CellProps, Row, TableProps } from "react-table";
import { has } from "lodash";

import NumbersStore from "storage/singletons/Numbers";
import TableSelectedRows from "storage/singletons/TableSelectedRows";
import EntitlementsStore from "storage/singletons/Entitlements";
import PendingQueries from "storage/singletons/PendingQueries";
import TablePagination from "storage/singletons/TablePagination";

import { CustomActionType, TableData } from "utils/types/tableConfig";
import { AvailableEntitlements } from "utils/types/entitlements";
import { getIsLoading } from "utils/functions/getIsLoading";

import { InfoIcon, RestoreNumberIcon } from "components/Icons";
import Table from "components/Table";
import Tooltip from "components/Tooltip";
import TableSkeleton from "components/Table/Skeleton";

import useStyles from "./styles";

const ReleasedNumbers: FC = () => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const {
    releasedNumbers,
    getReleasedNumbers,
    addNumberFromInventory,
  } = NumbersStore;
  const { getEntitlements, setAvailable } = EntitlementsStore;
  const { selectedRowsLength } = TableSelectedRows;
  const { byFetchType } = PendingQueries;

  const {
    tablePageCounter,
    tablePageSize,
    clearPaginationData,
    search,
  } = TablePagination;

  const classes = useStyles();

  //fetching entitlements and released numbers
  useEffect(() => {
    getReleasedNumbers(tenantID, subscriptionID);
    getEntitlements(tenantID, subscriptionID);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  //clearing pagination
  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function calculates if the entitlements left for passed row
  const isAvailable = (row: Row<TableData>) => {
    const entitlement = EntitlementsStore.entitlements.find(entitlement => {
      return (
        entitlement.countryCode === row.original.countryCode &&
        entitlement.numberType === row.original.numberType
      );
    });

    const available = EntitlementsStore.getAvailableEntitlements;

    // Returning avalable current row or not
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
          id: "restore",
          title: t("Restore"),
          icon: RestoreNumberIcon,
          onClick: () => {
            TableSelectedRows.selectedRowsValues.forEach(row => {
              addNumberFromInventory(
                tenantID,
                subscriptionID,
                {
                  countryCode: row.original.countryCode,
                  numbers: [+row.original.nsn],
                },
                () => {
                  getReleasedNumbers(tenantID, subscriptionID);
                },
              );
            });
          },
        },
      ]
    : [];

  //array of actions and their states for each row
  const customActions = [
    {
      actionName: "addReserved",
      iconComponent: <RestoreNumberIcon width={14} height={14} />,
      isShown: true,
      disabled: false,
      onClick: (row: Row<TableData>) => {
        addNumberFromInventory(
          tenantID,
          subscriptionID,
          {
            countryCode: row.original.countryCode,
            numbers: [+row.original.nsn],
          },
          () => {
            getReleasedNumbers(tenantID, subscriptionID);
          },
        );
      },
    },
    {
      actionName: "info",
      iconComponent: (
        <Tooltip
          arrow
          title={t("No more entitlements for this number left")}
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

  // This function formats an action column and establishes the row state
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

  // This function calculates when general checkbox selected
  const selectAllCondition = (page: Row<TableData>[]) => {
    setAvailable(EntitlementsStore.getAvailableEntitlements);

    const { availableEntitlements: available } = EntitlementsStore;
    //this reduce calculates amount of available checkboxes on current page
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

    //this reduce calculates amount of available entitlements that are left
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

  // This function calculates amount of rows that can be selected
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

  // This variable shows if data is loading
  const isLoading =
    getIsLoading("@getReleasedNumbers", byFetchType) ||
    getIsLoading("@getSubscriptionEntitlementsData", byFetchType);

  return isLoading ? (
    <TableSkeleton
      title={t("Released numbers")}
      columns={columns}
      checkbox
      actions={customActions.map(el => el.isShown)}
    />
  ) : releasedNumbers.length > 0 ? (
    <Table
      title={t("Released numbers")}
      columns={columns}
      data={releasedNumbers}
      customActions={customActions}
      actionsDataFormatter={actionDataFormatter}
      toolbarActions={toolbarActions}
      checkbox
      isCheckboxAvailable={isAvailable}
      isGeneralCheckboxSelected={selectAllCondition}
      isRowSelectable={selectAllRowCondition}
    />
  ) : (
    <div className={classes.emptyTableWrapper}>
      <span>{t("You have no released numbers yet")}</span>
    </div>
  );
};

export default observer(ReleasedNumbers);
