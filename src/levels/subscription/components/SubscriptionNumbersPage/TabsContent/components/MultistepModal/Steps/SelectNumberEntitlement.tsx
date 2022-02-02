import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import MultiStepForm from "storage/singletons/MultiStepForm";
import Entitlements from "storage/singletons/Entitlements";
import TableSelectedRows from "storage/singletons/TableSelectedRows";

import Table from "components/Table";

import { styles } from "./styles";
import { CellProps } from "react-table";
import { TableProps } from "utils/types/tableConfig";

const SelectNumberEntitlement: React.FC = () => {
  const { t } = useTranslation();
  const classes = styles();

  const { setValues, goNext, setPreviousChoices } = MultiStepForm;
  const { entitlements, getEntitlements } = Entitlements;
  const { radioButtonValueInRow } = TableSelectedRows;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
      },
      {
        Header: t("In use"),
        accessor: "assigned",
        Cell: ({ cell }: CellProps<TableProps>) => {
          return (
            <div
              className={clsx({
                [classes.limitCell]: cell.value >= cell.row.values.entitlement,
              })}
            >
              {cell.value}
            </div>
          );
        },
      },
      {
        Header: t("Limited"),
        accessor: "entitlement",
      },
      {
        Header: t("Type"),
        accessor: "numberType",
      },
      {
        Header: t("Country code"),
        accessor: "countryCode",
      },
      {
        Header: t("Vanity type"),
        accessor: "vanityType",
      },
      {
        Header: t("Regions"),
        accessor: "regions",
        Cell: ({ cell }: CellProps<TableProps>) => {
          return (
            <>
              {cell.row.values?.regions.length > 0
                ? cell.row.values.regions.map((el: number, i: number) => {
                    return (
                      <span key={el}>{`${el}${
                        i === cell.row.values.regions.length - 1 ? "" : ", "
                      }`}</span>
                    );
                  })
                : null}
            </>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    getEntitlements(tenantID, subscriptionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionID, tenantID]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setPreviousChoices({ entitlements: radioButtonValueInRow });

    setValues({
      numberType: radioButtonValueInRow.numberType,
      countryCode: radioButtonValueInRow.countryCode,
    });
    goNext();
  };

  return (
    <form id={"SelectFromInventory"} onSubmit={onSubmit}>
      <Table
        title={t("Number entitlements")}
        columns={columns}
        data={entitlements}
        radioButton
      />
    </form>
  );
};

export default observer(SelectNumberEntitlement);
