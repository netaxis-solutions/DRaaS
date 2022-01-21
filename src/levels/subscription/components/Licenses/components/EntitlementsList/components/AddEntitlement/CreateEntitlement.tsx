import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";

import EntitlementStorage from "storage/singletons/Entitlements";
import TableSelectedRowsStore from "storage/singletons/TableSelectedRows";
import {
  TAddEntitlementFormProps,
  CreateNewEntitlement,
} from "utils/types/entitlements";

import Table from "components/Table";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";

const defaultValues: CreateNewEntitlement = {
  entitlement: 0,
  externalReference: "",
  licenseModelId: 0,
};

const CreateEntitlement: FC<TAddEntitlementFormProps> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { handleSubmit } = useForm<CreateNewEntitlement>({
    defaultValues,
  });

  const { radioButtonValueInRow } = TableSelectedRowsStore;

  const {
    getEntitlementTypes,
    entitlementTypes,
    createEntitlement,
    filteredEntitlementType,
    filteredDataEntitlementTypes,
    getEntitlements,
  } = EntitlementStorage;

  const columns = useMemo(
    () => [
      {
        Header: t("External Reference"),
        accessor: "externalReference",
      },
      {
        Header: t("Name"),
        accessor: "name",
      },
      {
        Header: t("Country Code"),
        accessor: "countryCode",
      },
      {
        Header: t("Number Type"),
        accessor: "numberType",
      },
      {
        Header: t("Vanity Type"),
        accessor: "vanityType",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, filteredDataEntitlementTypes, entitlementTypes],
  );

  useEffect(() => {
    getEntitlementTypes();
    filteredEntitlementType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<CreateNewEntitlement> = () => {
    createEntitlement(tenantID, subscriptionID, {
      externalReference: radioButtonValueInRow.externalReference,
      licenseModelId: radioButtonValueInRow.id,
    });
    onCancel();
  };

  const onCancel = () => {
    handleCancel();
    getEntitlements(tenantID, subscriptionID);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalButtonsWrapper
          handleCancel={handleCancel}
          cancelButton
          submitButtonTitle={t("Add")}
        />
        <Table
          title={t("Entitlements")}
          columns={columns}
          data={filteredDataEntitlementTypes}
          radioButton
        />
      </form>
    </>
  );
};

export default observer(CreateEntitlement);
