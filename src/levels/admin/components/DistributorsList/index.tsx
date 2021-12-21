import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Distributor from "storage/singletons/Distributor";
import DistributorsStore from "storage/singletons/Distributors";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import { DistributorItemType } from "utils/types/distributors";
import { editDistributorSchema } from "utils/schemas/distributors";
import { TEditDistributorPayload } from "utils/types/distributors";
import Table from "components/Table";
// import TableActions from "components/Table/components/TableActions";
import { Plus, Trash } from "components/Icons";
import AddDistributor from "./components/AddDistributor";
import DeleteDistributorModal from "./components/DeleteDistributorModal";
import FormTableInput from "components/common/TableInput";

const defaultValues = {
  uuid: "",
  name: "",
  billingId: "",
  markup: "",
};

const Distributors: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");
  const { control, setValue, handleSubmit } = useForm<TEditDistributorPayload>({
    resolver: yupResolver(editDistributorSchema()),
    defaultValues,
  });
  const {
    getDistributorsData,
    distributors,
    deleteDistributors,
  } = DistributorsStore;

  // TODO: Uncomment when drill down to a distributor level
  // const { allAvailvableRouting } = RoutingConfig;

  const { editDistributor } = Distributor;
  const { selectedRows, selectedRowsLength } = TableSelectedRowsStore;
  const { setSelectedRows } = TableSelectedRowsStore;

  const onSubmit: SubmitHandler<DistributorItemType> = values => {
    editDistributor({
      payload: values,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
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
    [],
  );

  useEffect(() => {
    getDistributorsData();
  }, [getDistributorsData]);

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
    getDistributorsData();
    handleCloseModal();
  };
  const handleDelete = () => {
    const selectedDistributorIds = distributors.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);
    deleteDistributors(selectedDistributorIds, callback);
  };

  const setDefaultValues = (distributor: DistributorItemType) => {
    setValue("name", distributor.name);
    setValue("billingId", distributor.billingId);
    setValue("uuid", distributor.uuid);
    setValue("markup", distributor.markup);
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
          title={t("Distributors")}
          columns={columns}
          data={distributors}
          setModalToOpen={setModalToOpen}
          toolbarActions={toolbarActions}
          checkbox
          setDefaultValues={setDefaultValues}
          handleDeleteItem={handleDeleteItem}
          handleEditItem={handleEditItem}
        />
      </form>
      {modalToOpen === "add" && (
        <AddDistributor handleCancel={handleCloseModal} />
      )}
      {modalToOpen === "delete" && (
        <DeleteDistributorModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          distributors={distributors}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(Distributors);
