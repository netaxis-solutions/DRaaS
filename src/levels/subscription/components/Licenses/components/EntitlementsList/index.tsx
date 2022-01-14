import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import { Country } from "utils/functions/countryConfig";
import EntitlementsStore from "storage/singletons/Entitlements";

import { Plus, Trash } from "components/Icons";
import Table from "components/Table";
import { EntitlementsStyle } from "./styles";

const EntitlementList: FC = () => {
  // wait implement modal for create entitlements
  // @ts-ignore
  const [modalToOpen, setModalToOpen] = useState("");
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { t } = useTranslation();

  const { getEntitlements, entitlements } = EntitlementsStore;
  const classes = EntitlementsStyle();

  const columns = useMemo(
    () => [
      {
        Header: t("Country code"),
        accessor: "countryCode",
        Cell: ({ cell }: any) => {
          return (
            <div className={classes.root}>
              {cell.value}
              {Country[cell.value]}
            </div>
          );
        },
      },
      {
        Header: t("Type"),
        accessor: "numberType",
      },
      {
        Header: t("Regions"),
        accessor: "regions",
        Cell: ({ cell }: any) => {
          return (
            <>
              {cell.row.values?.regions.length > 0 ? (
                cell.row.values.regions.map((el: any, i: any) => {
                  return i === cell.row.values.regions.length - 1 ? (
                    <span key={el}>{el}</span>
                  ) : (
                    <span key={el}>{el}, </span>
                  );
                })
              ) : (
                <></>
              )}
            </>
          );
        },
      },
      {
        Header: t("Assigned"),
        accessor: "assigned",
      },
      {
        Header: t("Reserved"),
        accessor: "reserved",
      },
      {
        Header: t("Entitlement"),
        accessor: "entitlement",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  useEffect(() => {
    getEntitlements(tenantID, subscriptionID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = [
    {
      id: "delete",
      title: "Delete",
      icon: Trash,
      onClick: () => {
        setModalToOpen("delete");
      },
    },
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        setModalToOpen("add");
      },
    },
  ];

  return (
    <>
      <form>
        <Table
          title={t("Entitlements")}
          columns={columns}
          data={entitlements}
          isEditable
          isRemovable
          toolbarActions={toolbarActions}
        />
      </form>
    </>
  );
};

export default observer(EntitlementList);
