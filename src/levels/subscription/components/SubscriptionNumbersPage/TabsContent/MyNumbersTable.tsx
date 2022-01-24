import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Table from "components/Table";
import { TableData } from "utils/types/tableConfig";
import { Plus, Trash } from "components/Icons";
import SelectFromInventory from "./Modals/SelectFromInventory";

const NumbersList: FC<{ numbers: any[] }> = ({ numbers }) => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: t("country_code"),
        accessor: "countryCode",
      },
      {
        Header: "number",
        accessor: "nsn",
      },
      {
        Header: "number_type",
        accessor: "numberType",
      },
      {
        Header: "Origin",
        accessor: "source",
        Cell: ({ value }: any) => {
          console.log(value, "as");

          return value === "number_inventory" ? "native" : "ported";
        },
      },
      {
        Header: "Status",
        accessor: "Status",
      },
    ],
    [],
  );

  const handleModalClose = () => {
    setModalToOpen("");
  };

  useEffect(() => {
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
  const handleDeleteItem = () => {
    setModalToOpen("delete");
  };

  return (
    <>
      <Table
        title={t("Tenants")}
        columns={columns}
        data={numbers as TableData[]}
        toolbarActions={toolbarActions}
        handleDeleteItem={handleDeleteItem}
        checkbox
        isEditable={false}
      />
      {/* part for future modals*/}
      {modalToOpen === "add" && (
        <SelectFromInventory handleCancel={handleModalClose} />
      )}
      {modalToOpen === "delete" && null}
    </>
  );
};

export default observer(NumbersList);
