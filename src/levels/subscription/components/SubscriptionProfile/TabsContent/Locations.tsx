import { FC, useEffect, useMemo, useState } from "react";
import { CellProps } from "react-table";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";

import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import TablePagination from "storage/singletons/TablePagination";
import PendingQueries from "storage/singletons/PendingQueries";

import { TableProps } from "utils/types/tableConfig";
import { getIsLoading } from "utils/functions/getIsLoading";
import { Location } from "utils/types/locations";

import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";
import SubscriptionProfile from "storage/singletons/SubscriptionProfile";
import FormSelect from "components/common/Form/FormSelect";
import Trash from "components/Icons/Trash";
import Plus from "components/Icons/Plus";
import AddLocation from "./AddLocation";
import DeleteLocationModal from "./DeleteLocation";
import FormTableInput from "components/common/TableInput";
import Flag from "components/common/Flag";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { useLocationTableStyles } from "./styles";

type DefaultValuesType = {
  street: string;
  number: string;
  postbox: string;
  postalCodeId: number;
};

const defaultValues = {
  street: "",
  number: "",
  postbox: "",
  postalCodeId: 0,
};

const Locations: FC = () => {
  const { t } = useTranslation();
  const [modalOpened, setOpenedModal] = useState("");
  const classes = useLocationTableStyles();

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { control, handleSubmit, setValue } = useForm<DefaultValuesType>({
    defaultValues,
  });

  const {
    subscriptionLocations,
    getSubscriptionLocations,
    getPostalCodes,
    deleteSubscriptionLocations,
    modifySubscriptionLocations,
  } = SubscriptionProfile;

  const { byFetchType } = PendingQueries;

  const {
    selectedRowsLength,
    selectedRowsValues,
    setSelectedRows,
    setSelectedRowsValues,
  } = TableSelectedRowsStore;

  const { clearPaginationData } = TablePagination;

  useEffect(() => {
    getSubscriptionLocations(tenantID, subscriptionID);
    getPostalCodes();

    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: t("Country"),
        accessor: "postalCode.country",
        Cell: ({ value }: CellProps<TableProps>) => (
          <div className={classes.countryCellWrapper}>
            <Flag countryCode={value.isoCode} /> {value.name}
          </div>
        ),
      },
      {
        Header: t("City"),
        accessor: "postalCode.city",
      },
      {
        Header: t("Street"),
        accessor: "street",
        EditComponent: () => {
          return (
            <Controller
              name="street"
              control={control}
              render={({ field, ...props }) => (
                <FormTableInput {...field} {...props} />
              )}
            />
          );
        },
      },
      {
        Header: t("Number"),
        accessor: "number",
        EditComponent: () => {
          return (
            <Controller
              name="number"
              control={control}
              render={({ field, ...props }) => (
                <FormTableInput {...field} {...props} />
              )}
            />
          );
        },
      },
      {
        Header: t("Postbox"),
        accessor: "postbox",
        EditComponent: () => {
          return (
            <Controller
              name="postbox"
              control={control}
              render={({ field, ...props }) => (
                <FormTableInput {...field} {...props} />
              )}
            />
          );
        },
      },
      {
        Header: t("Postal code"),
        accessor: "postalCode.code",
        EditComponent: ({ cell }: CellProps<TableProps>) => {
          useEffect(() => {
            TableSelectedRowsStore.setSelectedRowsValues([cell.row]);
            return () => TableSelectedRowsStore.setSelectedRowsValues([]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, []);
          return (
            <div className={classes.selectController}>
              <Controller
                name="postalCodeId"
                control={control}
                render={({ field, ...props }) => (
                  <FormSelect
                    label={t("Select")}
                    options={[...SubscriptionProfile.postalCodesOptions]}
                    {...field}
                    {...props}
                    className={classes.selectPostalCode}
                  />
                )}
              />
            </div>
          );
        },
      },
      {
        Header: t("Region"),
        accessor: "postalCode.region.name",
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const handleModalClose = () => {
    setOpenedModal("");
  };

  const onSubmit = ({
    postalCodeId,
    ...values
  }: {
    postalCodeId: { label: string; value: number };
  }) => {
    modifySubscriptionLocations(
      tenantID,
      subscriptionID,
      selectedRowsValues[0].original.id,
      { ...values, postalCodeId: postalCodeId.value },
      () => {
        getSubscriptionLocations(tenantID, subscriptionID);
      },
    );
  };

  const toolbarActions = [
    {
      id: "delete",
      title: t("Delete"),
      icon: Trash,
      onClick: () => {
        setOpenedModal("delete");
      },
    },
    {
      id: "add",
      title: "Add",
      icon: Plus,
      onClick: () => {
        setOpenedModal("add");
      },
    },
  ];

  const handleDeleteItem = (props: any) => {
    setOpenedModal("delete");
    setSelectedRows({ [props.row.index]: true });
    setSelectedRowsValues([props.row]);
  };

  const handleDelete = () => {
    const selectedIds = selectedRowsValues.reduce(
      (prev: Array<number>, curr) => [...prev, curr.original.id],
      [],
    );
    deleteSubscriptionLocations(tenantID, subscriptionID, selectedIds, () => {
      handleModalClose();
      getSubscriptionLocations(tenantID, subscriptionID);
    });
  };

  const setDefaultValues = (location: Location) => {
    setValue("street", location.street);
    setValue("number", location.number);
    setValue("postbox", location.postbox || "");
    setValue("postalCodeId", location.postalCode.id);
  };

  const handleEditItem = (props: any) => {
    setDefaultValues(props.row.original);
  };

  const isLoading = getIsLoading("@getSubscriptionLocations", byFetchType);
  return (
    <>
      {isLoading ? (
        <TableSkeleton
          title={t("Locations")}
          columns={columns}
          actions={[true]}
        />
      ) : subscriptionLocations.length ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Table
            title={t("Locations")}
            columns={columns}
            data={subscriptionLocations}
            toolbarActions={toolbarActions}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
            checkbox
            isEditable
            isRemovable
          />
        </form>
      ) : (
        <div className={classes.emptyTableWrapper}>
          {t("You have no locations added yet")}
          <ButtonWithIcon
            title={t("Add")}
            icon={Plus}
            onClick={() => setOpenedModal("add")}
          />
        </div>
      )}
      {modalOpened === "add" && <AddLocation handleCancel={handleModalClose} />}
      {modalOpened === "delete" && (
        <DeleteLocationModal
          handleCloseModal={handleModalClose}
          handleDelete={handleDelete}
          selectedRowsLength={selectedRowsLength}
        />
      )}
    </>
  );
};

export default observer(Locations);
