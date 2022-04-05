import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { CellProps } from "react-table";
import clsx from "clsx";

import Numbers from "storage/singletons/Numbers";
import MultiStepForm from "storage/singletons/MultiStepForm";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import EntitlementsStore from "storage/singletons/Entitlements";

import { FormattedNumberSuggestionsType } from "utils/types/numbers";
import { TableData } from "utils/types/tableConfig";

import Table from "components/Table";

import { useRangeSelectionStyles } from "./styles";

const RangeSelection: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [amountSelected, setAmountSelected] = useState(0);
  const classes = useRangeSelectionStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { previousChoices, setSubmitButtonState } = MultiStepForm;

  const { getEntitlements, setAvailableEntitlementsNumber } = EntitlementsStore;

  const maxSelectedAmount =
    previousChoices[0].entitlements.entitlement -
    previousChoices[0].entitlements.assigned;

  const { selectedRowsValues } = TableSelectedRowsStore;
  const { clearTablePagesWithoutServerPaginations } = TablePagination;
  const { numberSuggestions, addNumber } = Numbers;

  const rangeSize = Number(previousChoices[2].suggestionsSetting.rangeSize);

  const formattedNumberSuggestions: FormattedNumberSuggestionsType[] = useMemo(
    () =>
      numberSuggestions.reduce(
        (suggestions: FormattedNumberSuggestionsType[], suggestion) => [
          ...suggestions,
          { rangeStart: suggestion[0], rangeEnd: suggestion[1], rangeSize },
        ],
        [],
      ),
    [numberSuggestions, rangeSize],
  );
  const columns = useMemo(
    () => [
      {
        Header: t("Range from"),
        Cell: ({ row }: CellProps<TableData>) => {
          return (
            <div>
              {previousChoices[1].numbersRange.countryCode}
              {row.original.rangeStart}
            </div>
          );
        },
      },
      {
        Header: t("Range to"),
        Cell: ({ row }: CellProps<TableData>) => {
          return (
            <div>
              {previousChoices[1].numbersRange.countryCode}
              {row.original.rangeEnd}
            </div>
          );
        },
      },

      {
        Header: t("Range size"),
        accessor: "rangeSize",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNumber(
      tenantID,
      subscriptionID,
      {
        countryCode: previousChoices[0].entitlements.countryCode,
        ranges: selectedRowsValues.map(row => [
          row.original.rangeStart,
          row.original.rangeEnd,
        ]),
      },
      handleCancel,
    );
  };
  useEffect(() => {
    clearTablePagesWithoutServerPaginations(formattedNumberSuggestions.length);
    setAmountSelected(
      selectedRowsValues.reduce(
        (amount, row) => amount + row.values.rangeSize,
        0,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowsValues, selectedRowsValues.length, numberSuggestions.length]);

  useEffect(() => {
    setSubmitButtonState(
      !Boolean(amountSelected && maxSelectedAmount - amountSelected >= 0),
    );
    return () => {
      MultiStepForm.setSubmitButtonState(false);
      getEntitlements(tenantID, subscriptionID, () => {
        setAvailableEntitlementsNumber();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountSelected]);

  return (
    <form id={"SelectFromInventory"} onSubmit={onSubmit}>
      <div className={classes.infoText}>
        {t("Amount of the numbers you can still select of this type is")}{" "}
        <span
          className={clsx({
            [classes.warningText]: maxSelectedAmount - amountSelected <= 0,
          })}
        >
          {maxSelectedAmount - amountSelected > 0
            ? maxSelectedAmount - amountSelected
            : 0}
        </span>
        {
          amountSelected > maxSelectedAmount && (
            <span>
              , {t("amount is exceeded by")}
              <span className={classes.warningText}>
                {" "}
                {amountSelected - maxSelectedAmount}
              </span>
            </span>
          )

          //NOTE: the tooltip needs to be added here when it is implemented}
        }
      </div>

      <Table
        title={t("Numbers inventory")}
        columns={columns}
        data={formattedNumberSuggestions}
        checkbox
      />
    </form>
  );
};

export default observer(RangeSelection);
