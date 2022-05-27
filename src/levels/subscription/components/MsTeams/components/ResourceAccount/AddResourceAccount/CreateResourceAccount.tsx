import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";
import { observer } from "mobx-react-lite";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import omit from "lodash/omit";

import ResourceAccountStorage from "storage/singletons/MsTeams/resourceAccount";
import PendingQueries from "storage/singletons/PendingQueries";
import NumbersStore from "storage/singletons/Numbers";
import {
  TCreateResourceAccount,
  TCreateResourceAccountPayloadStorage,
} from "utils/types/resourceAccount";
import { getIsLoading } from "utils/functions/getIsLoading";

import Flag from "components/common/Flag";
import FormInput from "components/common/Form/FormInput";
import FormSelect from "components/common/Form/FormSelect";
import FormSelectWithFlags from "components/common/Form/FormSelect/FormSelectWithFlags";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";

import { createResourceAccountStyles } from "./styles";

const defaultValues: TCreateResourceAccount = {
  displayName: "",
  location: "",
  accountType: { label: "", value: "" },
  phoneNumber: "",
  userPrincipalName: "",
};

const typeSelect = [
  { label: "call-queue", value: "call-queue" },
  { label: "auto-attendant", value: "auto-attendant" },
];

const { createMsTeamsResourceAccount } = ResourceAccountStorage;

const CreateResourceAccount: FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = createResourceAccountStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { byFetchType } = PendingQueries;

  // Formatting CountryCode to Autocomplete format
  const countries = ResourceAccountStorage.countryCode.map(requirement => {
    return {
      label: requirement.label,
      value: requirement.value,
      image: <Flag countryCode={requirement.value} />,
    };
  });

  // Use form and add validation to all fields in Create new Resource Account
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(
      object().shape({
        displayName: string().required(),
        accountType: object().shape({
          label: string(),
          value: string().required(),
        }),
        location: string().required(),
        userPrincipalName: string().email().required(),
        phoneNumber: string(),
      }),
    ),
    defaultValues,
  });

  // Close modal
  const onCancel = () => {
    handleCancel();
  };

  // onSubmit -> Take all data from fields and create post request "createMsTeamsResourceAccount"
  const onSubmit: SubmitHandler<TCreateResourceAccount> = values => {
    // formatting for omit
    const validationPhoneNumber =
      values.phoneNumber === "Unselect number" ? "phoneNumber" : "";
    // formatting data for request "Payload"
    const formatData = omit(
      {
        accountType: values.accountType.value,
        displayName: values.displayName,
        location: values.location,
        phoneNumber: values.phoneNumber,
        userPrincipalName: values.userPrincipalName,
      },
      [validationPhoneNumber],
    ) as TCreateResourceAccountPayloadStorage;
    createMsTeamsResourceAccount(tenantID, subscriptionID, formatData, () =>
      onCancel(),
    );
  };

  const isLoading =
    getIsLoading("@createMsTeamResourceAccount", byFetchType) ||
    getIsLoading("@getFreeNumbers", byFetchType);

  return isLoading ? (
    <Stack>
      <Skeleton variant="text" animation="wave" width={500} />
      <Skeleton variant="text" animation="wave" width={500} />
      <Skeleton variant="text" animation="wave" width={500} />
      <Skeleton variant="text" animation="wave" width={500} />
    </Stack>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.createResourceAccountForm}
    >
      <ModalButtonsWrapper
        handleCancel={onCancel}
        cancelButton
        submitButtonTitle={t("Add")}
      />

      <Controller
        name="accountType"
        control={control}
        render={({ field, ...props }) => {
          return (
            <FormSelect
              label={t("Type")}
              options={[...typeSelect]}
              {...field}
              {...props}
              className={classes.selectNumber}
            />
          );
        }}
      />
      <Controller
        name="displayName"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Display name")}
            {...field}
            {...props}
            className={classes.createSubscriptionInput}
          />
        )}
      />
      <Controller
        name="userPrincipalName"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Username (principal name)")}
            {...field}
            {...props}
            className={classes.createSubscriptionInput}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field, ...props }) => (
          <FormSelect
            label={t("Phone number")}
            options={["Unselect number", ...NumbersStore.freeNumbers]}
            {...field}
            {...props}
            className={classes.selectNumber}
          />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field, ...props }) => {
          return (
            <FormSelectWithFlags
              label={t("Location")}
              options={countries}
              {...field}
              {...props}
              className={classes.selectCountry}
              onChange={(props: any) => {
                setValue("location", props?.value || "");
              }}
            />
          );
        }}
      />
    </form>
  );
};

export default observer(CreateResourceAccount);
