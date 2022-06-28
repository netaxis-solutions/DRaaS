import { FC, useEffect, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { CellProps } from "react-table";
import { Link } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TenantStore from "storage/singletons/Tenant";
import RoutingConfig from "storage/singletons/RoutingConfig";
import TenantsStore from "storage/singletons/Tenants";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { TenantItemType } from "utils/types/tenant";
import { editTenantSchema } from "utils/schemas/tenant";
import { TEditTenantPayload } from "utils/types/tenant";
import { getIsLoading } from "utils/functions/getIsLoading";
import createLink from "services/createLink";

import Table from "components/Table";
import FormTableInput from "components/common/TableInput";
import { Plus, Trash } from "components/Icons";
import AddTenant from "./components/AddTenant";
import DeleteTenantModal from "./components/DeleteTenantModal";
import TableSkeleton from "components/Table/Skeleton";

const defaultValues = {
  uuid: "",
  name: "",
  billingId: "",
  markup: "",
};

const TenantsList: FC = () => {
  const { t } = useTranslation();
  const [modalToOpen, setModalToOpen] = useState("");

  const { control, setValue, handleSubmit } = useForm<TEditTenantPayload>({
    resolver: yupResolver(editTenantSchema(t)),
    defaultValues,
  });

  const {
    tablePageCounter,
    tablePageSize,
    clearPaginationData,
    search,
  } = TablePagination;

  const {
    getTenantsData,
    tenants,
    deleteTenants,
    isTenantsCreatable,
    isTenantsEditable,
    isTenantsDeletable,
    isTenantsReadable,
  } = TenantsStore;

  const {
    selectedRows,
    selectedRowsLength,
    setSelectedRows,
  } = TableSelectedRowsStore;

  const { allAvailvableRouting } = RoutingConfig;
  const { editTenant } = TenantStore;
  const { byFetchType } = PendingQueries;

  const onSubmit: SubmitHandler<TenantItemType> = values => {
    editTenant({
      payload: values,
    });
  };

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
        Cell: ({ row }: CellProps<TenantItemType>) => {
          return row.state.isEditing ? (
            <Controller
              name="name"
              control={control}
              render={({ field, ...props }) => (
                <FormTableInput {...field} {...props} />
              )}
            />
          ) : isTenantsReadable ? (
            <Link
              to={createLink({
                url: allAvailvableRouting.tenantSubscriptions,
                params: { tenantID: row.original.uuid },
              })}
            >
              {row.original.name}
            </Link>
          ) : (
            row.original.name
          );
        },
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
        Header: t("Direct tenant"),
        accessor: "owner.type",
        Cell: (rows: { row: { original: { owner: { type: string } } } }) =>
          rows.row.original.owner?.type === "distributor" ? "yes" : "no",
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
    [t, control, allAvailvableRouting.tenantSubscriptions, isTenantsReadable],
  );

  useEffect(() => {
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTenantsData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablePageCounter, tablePageSize, search]);

  const toolbarActions = useMemo(() => {
    const actions = [];
    if (isTenantsDeletable) {
      actions.push({
        id: "delete",
        title: t("Delete"),
        icon: Trash,
        onClick: () => {
          setModalToOpen("delete");
        },
      });
    }
    if (isTenantsCreatable) {
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
  }, [isTenantsCreatable, isTenantsDeletable, t]);

  const handleCloseModal = () => {
    setModalToOpen("");
  };

  const callback = () => {
    getTenantsData();
    handleCloseModal();
  };

  const handleDelete = () => {
    const selectedTenantsIds = tenants.reduce((prev, cur, i) => {
      selectedRows[i] && prev.push(cur.uuid);
      return prev;
    }, [] as Array<string>);
    deleteTenants(selectedTenantsIds, callback);
  };

  const setDefaultValues = (tenant: TenantItemType) => {
    setValue("name", tenant.name);
    setValue("billingId", tenant.billingId);
    setValue("uuid", tenant.uuid);
    setValue("markup", tenant.markup);
  };

  const handleDeleteItem = (props: any) => {
    setModalToOpen("delete");
    setSelectedRows({ [props.row.index]: true });
  };

  const handleEditItem = (props: any) => {
    setDefaultValues(props.row.original);
  };

  const isLoading = getIsLoading("@getTenantsData", byFetchType);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? (
          <TableSkeleton
            title={t("Tenants")}
            columns={columns}
            actions={[isTenantsEditable, isTenantsDeletable]}
            checkbox={isTenantsDeletable}
          />
        ) : (
          <Table
            title={t("Tenants")}
            columns={columns}
            data={tenants}
            toolbarActions={toolbarActions}
            checkbox={isTenantsDeletable}
            setModalToOpen={setModalToOpen}
            setDefaultValues={setDefaultValues}
            isRemovable={isTenantsDeletable}
            handleDeleteItem={handleDeleteItem}
            isEditable={isTenantsEditable}
            handleEditItem={handleEditItem}
          />
        )}
      </form>
      {modalToOpen === "add" && <AddTenant handleCancel={handleCloseModal} />}
      {modalToOpen === "delete" && (
        <DeleteTenantModal
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          selectedRows={selectedRows}
          tenants={tenants}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(TenantsList);
