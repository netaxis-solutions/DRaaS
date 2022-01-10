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
  const { getEntitlements, entitlements } = EntitlementsStore;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { t } = useTranslation();

  // wait implement modal for create entitlements
  // @ts-ignore
  const [modalToOpen, setModalToOpen] = useState("");
  const classes = EntitlementsStyle();

  const columns = useMemo(
    () => [
      {
        Header: t("Country code"),
        accessor: "country_code",
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
        accessor: "number_type",
      },
      {
        Header: t("Regions"),
        accessor: "regions",
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
          toolbarActions={toolbarActions}
        />
      </form>
    </>
  );
};

export default observer(EntitlementList);
