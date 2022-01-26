import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import EntitlementsStore from "storage/singletons/Entitlements";

import { Country } from "utils/functions/countryConfig";

import { Plus } from "components/Icons";
import Table from "components/Table";
import AddEntitlement from "./components/AddEntitlement";
import { EntitlementsStyle } from "./styles";

const EntitlementList: FC = () => {
  const [modalToOpen, setModalToOpen] = useState("");
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { t } = useTranslation();

  const {
    getEntitlements,
    entitlements,
    getEntitlementTypes,
  } = EntitlementsStore;
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
        Header: t("Reserved"),
        accessor: "reserved",
      },
      {
        Header: t("Assigned"),
        accessor: "assigned",
      },
      {
        Header: t("Entitlement"),
        accessor: "entitlement",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, entitlements],
  );

  useEffect(() => {
    getEntitlements(tenantID, subscriptionID);
    getEntitlementTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const toolbarActions = [
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
      {modalToOpen === "add" && (
        <AddEntitlement handleCancel={handleCloseModal} />
      )}
    </>
  );
};

export default observer(EntitlementList);
