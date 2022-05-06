import { observer } from "mobx-react-lite";
import { FC, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import LicensesStore from "storage/singletons/Licenses";
import PendingQueries from "storage/singletons/PendingQueries";
import TablePagination from "storage/singletons/TablePagination";

import { EditLicensesPayload } from "utils/types/licenses";
import { editLicenseSchema } from "utils/schemas/license";
import { MsTeamsUsersType } from "utils/types/licenses";
import { getIsLoading } from "utils/functions/getIsLoading";

import FormTableInput from "components/common/TableInput";
import Table from "components/Table";
import TableSkeleton from "components/Table/Skeleton";

const defaultValues = {
  assigned: "",
  inUse: "",
  name: "",
};

const LicensesList: FC = () => {
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { t } = useTranslation();

  const {
    clearTablePagesWithoutServerPaginations,
    uploadTableConfig,
    clearPaginationData,
  } = TablePagination;
  const { getSubscriptionLicensesData, licenses, editLicense } = LicensesStore;
  const { byFetchType } = PendingQueries;

  const { control, setValue, handleSubmit } = useForm<EditLicensesPayload>({
    resolver: yupResolver(editLicenseSchema(t)),
    defaultValues,
  });

  const onSubmit: SubmitHandler<MsTeamsUsersType> = payload => {
    editLicense({ tenantID, subscriptionID, payload });
  };

  const columns = useMemo(
    () => [
      {
        Header: t("Name"),
        accessor: "name",
      },
      {
        Header: t("inUse"),
        accessor: "inUse",
      },
      {
        Header: t("Assigned"),
        accessor: "assigned",
        EditComponent: ({ cell }: any) => {
          return (
            <Controller
              name="assigned"
              control={control}
              render={({ field, ...props }) => (
                <FormTableInput
                  error={
                    cell.row.values.inUse > cell.row.values.assigned ||
                    props.fieldState.error?.message
                  }
                  {...field}
                  {...props}
                />
              )}
            />
          );
        },
      },
    ],
    [t, control],
  );

  useEffect(() => {
    getSubscriptionLicensesData(tenantID, subscriptionID);
    clearTablePagesWithoutServerPaginations(licenses.length);
    uploadTableConfig(true);
    return () => clearPaginationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setDefaultValues = (license: MsTeamsUsersType) => {
    setValue("assigned", `${license.assigned}`);
    setValue("name", `${license.name}`);
  };

  const isLoading = getIsLoading("@getSubscriptionLicensesData", byFetchType);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLoading ? (
        <TableSkeleton
          title={t("Licenses")}
          columns={columns}
          actions={[true]}
        />
      ) : (
        <Table
          title={t("Licenses")}
          columns={columns}
          data={licenses}
          isEditable
          setDefaultValues={setDefaultValues}
        />
      )}
    </form>
  );
};

export default observer(LicensesList);
