import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import clsx from "clsx";

import Numbers from "storage/singletons/Numbers";
import MultiStepForm from "storage/singletons/MultiStepForm";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";

import { FormattedNumberSuggestionsType } from "utils/types/numbers";

import Table from "components/Table";

import { useRangeSelectionStyles } from "./styles";

const RangeSelection: React.FC = () => {
  const { t } = useTranslation();
  const [amountSelected, setAmountSelected] = useState(0);
  const classes = useRangeSelectionStyles();
  const { tenantId, subscriptionId } = useParams<{
    tenantId: string;
    subscriptionId: string;
  }>();

  const { previousChoices } = MultiStepForm;

  const maxSelectedAmount =
    previousChoices[0].entitlements.entitlement -
    previousChoices[0].entitlements.assigned;

  const { selectedRowsValues } = TableSelectedRowsStore;
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
        accessor: "rangeStart",
      },
      {
        Header: t("Range to"),
        accessor: "rangeEnd",
      },

      {
        Header: t("Range size"),
        accessor: "rangeSize",
      },
    ],
    [t],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addNumber(tenantId, subscriptionId, {
      countryCode: previousChoices[0].entitlements.countryCode,
      ranges: selectedRowsValues.map(row => [
        row.values.rangeStart,
        row.values.rangeEnd,
      ]),
    });
  };
  useEffect(() => {
    setAmountSelected(
      selectedRowsValues.reduce(
        (amount, row) => amount + row.values.rangeSize,
        0,
      ),
    );
  }, [selectedRowsValues, selectedRowsValues.length]);

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
