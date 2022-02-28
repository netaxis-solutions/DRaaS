import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";
import Numbers from "storage/singletons/Numbers";
import TableSelectedRows from "storage/singletons/TableSelectedRows";

import { EntitlementsListType } from "utils/types/entitlements";

import Table from "components/Table";

import { useEntitlementCardStyles } from "./styles";

const NumberInventory: React.FC = () => {
  const { t } = useTranslation();

  const classes = useEntitlementCardStyles();

  const { numberInventoryRanges, getNumbersInventoryRanges } = Numbers;

  const {
    previousChoices,
    setValues,
    goNext,
    setPreviousChoices,
  } = MultiStepForm;
  const { radioButtonValueInRow } = TableSelectedRows;

  const entitlement: EntitlementsListType = previousChoices[0].entitlements;

  const avilableEntitlements: number =
    entitlement.entitlement - (entitlement.assigned || 0);

  const cardData = useMemo(
    () => [
      { fieldName: "Entitlement name", fieldValue: entitlement.name },
      {
        fieldName: "Region",
        fieldValue: entitlement.regions.map(
          (el, index, arr) => `${el}${index === arr.length - 1 ? "" : ", "}`,
        ),
      },
      { fieldName: "Vanity type", fieldValue: entitlement.vanityType },
      { fieldName: "In use", fieldValue: entitlement.assigned },
      { fieldName: "Limited", fieldValue: entitlement.entitlement },
      { fieldName: "Type", fieldValue: entitlement.numberType },
      { fieldName: "Country code", fieldValue: entitlement.countryCode },
    ],
    [entitlement],
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
        accessor: "nbAvailable",
      },
      {
        Header: t("Available entitlements"),
        Cell: () => {
          return <div>{avilableEntitlements}</div>;
        },
      },
      {
        //this empty column is used in purpose to position previous column header which positioned wrongly
        Header: " ",
      },
    ],
    [t, avilableEntitlements],
  );
  useEffect(() => {
    getNumbersInventoryRanges();
  }, [getNumbersInventoryRanges]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setPreviousChoices({ numbersRange: radioButtonValueInRow });

    setValues({
      numberType: radioButtonValueInRow.numberType,
      countryCode: radioButtonValueInRow.countryCode,
    });
    goNext();
  };

  const availableRanges = useMemo(
    () =>
      numberInventoryRanges.filter(
        range =>
          range.countryCode === entitlement.countryCode &&
          (range.numberType === entitlement.numberType ||
            entitlement.numberType === "*"),
      ),
    [numberInventoryRanges, entitlement],
  );    

  return (
    <form id={"SelectFromInventory"} onSubmit={onSubmit}>
      <div className={classes.entitlementCard}>
        {cardData.map(field => {
          return (
            <div key={field.fieldName} className={classes.fieldWrapper}>
              <span className={classes.fieldName}>{field.fieldName} </span>{" "}
              <span className={classes.fieldValue}>{field.fieldValue} </span>
            </div>
          );
        })}
      </div>
      <Table
        title={t("Numbers inventory")}
        columns={columns}
        data={availableRanges}
        radioButton
      />
    </form>
  );
};

export default observer(NumberInventory);
