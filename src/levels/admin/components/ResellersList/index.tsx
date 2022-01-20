import { FC, useEffect, useState, useMemo } from "react";
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
import FormTableInput from "components/common/TableInput";

const defaultValues = {
  uuid: "",
  name: "",
  billingId: "",
  markup: "",
};

const ResellersList: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");
  const { control, setValue, handleSubmit } = useForm<TEditResellerPayload>({
    resolver: yupResolver(editResellerSchema()),
    defaultValues,
  });

  const {
    getResellersData,
    resellers,
    deleteResellers,
    isResellersCreatable,
    isResellersDeletable,
    isResellersEditable,
  } = Resellers;
  const { editReseller } = ResellerStore;
  const { selectedRows, selectedRowsLength } = TableSelectedRowsStore;
  const { setSelectedRows } = TableSelectedRowsStore;

  const onSubmit: SubmitHandler<ResellerItemType> = values => {
    editReseller({
      payload: values,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
        EditComponent: () => (
          <Controller
            name="name"
            control={control}
            render={({ field, ...props }) => (
              <FormTableInput {...field} {...props} />
            )}
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
            render={({ field, ...props }) => (
              <FormTableInput {...field} {...props} />
            )}
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
      {
        Header: t("Markup, %"),
        accessor: "markup",
        EditComponent: () => (
          <Controller
            name="markup"
            control={control}
            render={({ field, ...props }) => (
              <FormTableInput {...field} {...props} />
            )}
          />
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  useEffect(() => {
    getResellersData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = useMemo(() => {
    const actions = [];
    if (isResellersDeletable) {
      actions.push({
        id: "delete",
        title: t("Delete"),
        icon: Trash,
        onClick: () => {
          setModalToOpen("delete");
        },
      });
    }
    if (isResellersCreatable) {
      actions.push({
        id: "add",
        title: t("Add"),
        icon: Plus,
        onClick: () => {
          setModalToOpen("add");
        },
      });
    }
    return actions;
  }, [isResellersCreatable, isResellersDeletable, t]);

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getResellersData({});
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
    setValue("markup", reseller.markup);
  };

  const handleDeleteItem = (props: any) => {
    setModalToOpen("delete");
    setSelectedRows({ [props.row.index]: true });
  };

  const handleEditItem = (props: any) => {
    setDefaultValues(props.row.original);
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
          checkbox={isResellersDeletable}
          setDefaultValues={setDefaultValues}
          isRemovable={isResellersDeletable}
          handleDeleteItem={handleDeleteItem}
          isEditable={isResellersEditable}
          handleEditItem={handleEditItem}
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
