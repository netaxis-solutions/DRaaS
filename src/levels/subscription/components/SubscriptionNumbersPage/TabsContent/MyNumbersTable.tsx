import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import Table from "components/Table";
import { TableData } from "utils/types/tableConfig";
import { Plus, Trash } from "components/Icons";

const NumbersList: FC<{ numbers: any[] }> = ({ numbers }) => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: t("country_code"),
        accessor: "country_code",
      },
      {
        Header: "number",
        accessor: "number",
      },
      {
        Header: "number_type",
        accessor: "number_type",
      },
      {
        Header: "Origin",
        accessor: "Origin",
      },
      {
        Header: "Status",
        accessor: "Status",
      },
    ],
    [],
  );

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
      {modalToOpen === "add" && <div>Add</div>}
      {modalToOpen === "delete" && <div>Add</div>}
    </>
  );
};

export default observer(NumbersList);
