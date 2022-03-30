import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { CellProps } from "react-table";
import { useParams } from "react-router-dom";

import MultiStepForm from "storage/singletons/MultiStepForm";
import Entitlements from "storage/singletons/Entitlements";
import TableSelectedRows from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";

import { TableProps } from "utils/types/tableConfig";

import Table from "components/Table";

const SelectNumberEntitlement: React.FC = () => {
  const { t } = useTranslation();

  const { setValues, goNext, setPreviousChoices } = MultiStepForm;
  const { entitlements, getEntitlements } = Entitlements;
  const {
    clearTablePagesWithoutServerPaginations,
    clearPaginationData,
  } = TablePagination;
  const { radioButtonValueInRow } = TableSelectedRows;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const availableEntitlements = useMemo(
    () =>
      entitlements.filter(
        entitlement => entitlement.assigned !== entitlement.entitlement,
      ),
    [entitlements],
  );

  useEffect(() => {
    MultiStepForm.setSubmitButtonState(!Boolean(availableEntitlements.length));

    return () => {
      MultiStepForm.setSubmitButtonState(false);
    };
  }, [availableEntitlements]);

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
      },
      {
        Header: t("Numbers Left"),
        Cell: ({ row }: CellProps<TableProps>) => {
          return (
            <div>
              {availableEntitlements[row.index].entitlement -
                availableEntitlements[row.index].assigned}
            </div>
          );
        },
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
    clearTablePagesWithoutServerPaginations(availableEntitlements.length);
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionID, tenantID, entitlements.length]);

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
        data={availableEntitlements}
        radioButton
      />
    </form>
  );
};

export default observer(SelectNumberEntitlement);
