import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Resellers from "storage/singletons/Resellers";
import ResellerStore from "storage/singletons/Reseller";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import { ResellerItemType } from "utils/types/resellers";
import { editResellerSchema } from "utils/schemas/resellers";
import { TEditResellerPayload } from "utils/types/resellers";
import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddReseller from "./components/AddReseller";
import DeleteResellerModal from "./components/DeleteResellerModal";
import { TableInput } from "components/common/TableInput";

const defaultValues = {
  uuid: "",
  name: "",
  billingId: "",
};

const ResellersList: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");
  const { control, setValue, handleSubmit } = useForm<TEditResellerPayload>({
    resolver: yupResolver(editResellerSchema()),
    defaultValues,
  });

  const { getResellersData, resellers, deleteResellers } = Resellers;
  const { editReseller } = ResellerStore;
  const { selectedRows, selectedRowsLength } = TableSelectedRowsStore;

  const onSubmit: SubmitHandler<ResellerItemType> = values => {
    editReseller({
      payload: values,
    });
  };

  const columns = [
    {
      Header: t("Name"),
      accessor: "name",
      EditComponent: () => (
        <Controller
          name="name"
          control={control}
          render={({ field, ...props }) => <TableInput {...field} {...props} />}
        />
      ),
    },
    {
      Header: t("Billing ID"),
      accessor: "billingId",
      EditComponent: () => (
        <Controller
          name="billingId"
          control={control}
          render={({ field, ...props }) => <TableInput {...field} {...props} />}
        />
      ),
    },
    {
      Header: t("Owner"),
      accessor: "owner.name",
    },
    {
      Header: t("Tenants"),
      accessor: "nbOfTenants",
    },
  ];

  useEffect(() => {
    getResellersData();
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

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getResellersData();
    handleCloseModal();
  };

  const handleDelete = () => {
    const selectedResellerIds = resellers.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);

    deleteResellers(selectedResellerIds, callback);
  };

  const setDefaultValues = (reseller: ResellerItemType) => {
    setValue("name", reseller.name);
    setValue("billingId", reseller.billingId);
    setValue("uuid", reseller.uuid);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table
          title={t("Resellers")}
          columns={columns}
          data={resellers}
          toolbarActions={toolbarActions}
          setModalToOpen={setModalToOpen}
          checkbox
          setDefaultValues={setDefaultValues}
        />
      </form>
      {modalToOpen === "add" && <AddReseller handleCancel={handleCloseModal} />}
      {modalToOpen === "delete" && (
        <DeleteResellerModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          resellers={resellers}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(ResellersList);
