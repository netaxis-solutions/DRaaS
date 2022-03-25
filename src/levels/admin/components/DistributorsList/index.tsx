import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Distributor from "storage/singletons/Distributor";
import DistributorsStore from "storage/singletons/Distributors";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { DistributorItemType } from "utils/types/distributors";
import { editDistributorSchema } from "utils/schemas/distributors";
import { TEditDistributorPayload } from "utils/types/distributors";
import { getIsLoading } from "utils/functions/getIsLoading";

import Table from "components/Table";
import { Plus, Trash } from "components/Icons";
import AddDistributor from "./components/AddDistributor";
import DeleteDistributorModal from "./components/DeleteDistributorModal";
import FormTableInput from "components/common/TableInput";
import TableSkeleton from "components/Table/Skeleton";

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
    tablePageCounter,
    tablePageSize,
    clearPaginationData,
    search,
  } = TablePagination;

  const { byFetchType } = PendingQueries;

  // TODO: Uncomment when drill down to a distributor level
  // const { allAvailvableRouting } = RoutingConfig;
  const {
    getDistributorsData,
    distributors,
    deleteDistributors,
    isDistributorsCreatable,
    isDistributorsEditable,
    isDistributorDeletable,
  } = DistributorsStore;
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
        // TODO: Uncomment when drill down to a distributor level
        // Cell: ({ row: { original } }: CellProps<DistributorItemType>) => (
        //   <Link
        //     to={createLink({
        //       url: allAvailvableRouting.distributorResellers,
        //       params: { distributorID: original.uuid },
        //     })}
        //   >
        //     {original.name}
        //   </Link>
        // ),
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
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  useEffect(() => {
    getDistributorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolbarActions = useMemo(() => {
    const actions = [];
    if (isDistributorDeletable) {
      actions.push({
        id: "delete",
        title: "Delete",
        icon: Trash,
        onClick: () => {
          setModalToOpen("delete");
        },
      });
    }
    if (isDistributorsCreatable) {
      actions.push({
        id: "add",
        title: "Add",
        icon: Plus,
        onClick: () => {
          setModalToOpen("add");
        },
      });
    }
    return actions;
  }, [isDistributorsCreatable, isDistributorDeletable]);

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

  const isLoading = getIsLoading("@getDistributorsData", byFetchType);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? (
          <TableSkeleton
            columns={columns}
            actions={toolbarActions}
            checkbox={isDistributorDeletable}
          />
        ) : (
          <Table
            title={t("Distributors")}
            columns={columns}
            data={distributors}
            setModalToOpen={setModalToOpen}
            toolbarActions={toolbarActions}
            checkbox={isDistributorDeletable}
            setDefaultValues={setDefaultValues}
            isRemovable={isDistributorDeletable}
            handleDeleteItem={handleDeleteItem}
            isEditable={isDistributorsEditable}
            handleEditItem={handleEditItem}
          />
        )}
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
