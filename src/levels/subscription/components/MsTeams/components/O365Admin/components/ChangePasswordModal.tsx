import { observer } from "mobx-react-lite";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { object, string, ref } from "yup";
import { Skeleton, Stack } from "@mui/material";

import RightSideModal from "storage/singletons/RightSideModal";
import MsTeamAdmin from "storage/singletons/MsTeams/CreateDeleteAdmin";
import PendingQueries from "storage/singletons/PendingQueries";

import { getIsLoading } from "utils/functions/getIsLoading";

import FormInput from "components/common/Form/FormInput";

const PasswordModal: FC<{ formId: string }> = ({ formId }) => {
  const { t } = useTranslation();
  const { byFetchType } = PendingQueries;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();

  const { currentDelayedModalCloseAction } = RightSideModal;

  const { createMsTeamAdmin } = MsTeamAdmin;

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const { control, handleSubmit } = useForm<{
    confirmPassword: string;
    password: string;
  }>({
    resolver: yupResolver(
      object().shape({
        password: string().label(t("Password")).min(8),
        confirmPassword: string()
          .label(t("Confirm password"))
          .oneOf([ref("password"), null], t("Passwords must match")),
      }),
    ),
    defaultValues,
  });

  const onSubmit = (value: { confirmPassword: string; password: string }) => {
    const payload = { msPassword: value.password };
    createMsTeamAdmin(tenantID, subscriptionID, payload, () =>
      currentDelayedModalCloseAction(),
    );
  };

  const isLoading = getIsLoading("@createOrUpdateMsTeamAdmin", byFetchType);

  return isLoading ? (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={400} height={40} />
      <Skeleton variant="rectangular" width={400} height={40} />
    </Stack>
  ) : (
    <form id={formId} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <Controller
          name="password"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Password")}
              type={"password"}
              inputProps={{ tabIndex: 1 }}
              {...field}
              {...props}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Confirm password")}
              type={"password"}
              inputProps={{ tabIndex: 1 }}
              {...field}
              {...props}
            />
          )}
        />
      </Stack>
    </form>
  );
};

export default observer(PasswordModal);
