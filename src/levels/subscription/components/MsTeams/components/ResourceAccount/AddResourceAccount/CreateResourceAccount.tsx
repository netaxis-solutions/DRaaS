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
import SubscriptionLicensesStore from "storage/singletons/Licenses";
import CloudConnection from "storage/singletons/CloudConnection";
import NumbersStore from "storage/singletons/Numbers";
import CreateDeleteAdmin from "storage/singletons/MsTeams/CreateDeleteAdmin";

import {
  TCreateResourceAccount,
  TCreateResourceAccountPayloadStorage,
} from "utils/types/resourceAccount";
import { getIsLoading } from "utils/functions/getIsLoading";

import Tooltip from "components/Tooltip";
import Flag from "components/common/Flag";
import { InfoIcon } from "components/Icons";
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
  validDomains: { label: "", value: "" },
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
  const { checkMsTeamAdmin } = CreateDeleteAdmin;

  const validPhoneNumbers =
    checkMsTeamAdmin?.mode === "operator_connect"
      ? ["Unselect number", ...CloudConnection.freeNumbers]
      : ["Unselect number", ...NumbersStore.freeNumbers];

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
        displayName: string()
          .matches(/^[aA-zZ0-9\s]+$/, {
            message: t("Use only letters and digits"),
            excludeEmptyString: true,
          })
          .required()
          .label(t("Display Name")),
        accountType: object()
          .required()
          .shape({
            label: string(),
            value: string().required().label(t("Type")),
          }),

        location: string().required().label(t("Location")),
        userPrincipalName: string()
          .matches(/^[aA-zZ0-9\s]+$/, {
            message: t("Use only letters and digits"),
            excludeEmptyString: true,
          })
          .required()
          .label(t("Username (principal name)")),
        phoneNumber: string(),
        validDomains: object()
          .required()
          .shape({
            label: string(),
            value: string().required().label(t("Domains")),
          }),
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
      values.phoneNumber === "Unselect number" || values.phoneNumber === ""
        ? "phoneNumber"
        : "";
    // formatting data for request "Payload"
    const formatData = omit(
      {
        accountType: values.accountType.value,
        displayName: values.displayName,
        location: values.location,
        phoneNumber: values.phoneNumber,
        userPrincipalName: `${values.userPrincipalName}@${values.validDomains.value}`,
      },
      [validationPhoneNumber],
    ) as TCreateResourceAccountPayloadStorage;
    createMsTeamsResourceAccount(tenantID, subscriptionID, formatData, () =>
      onCancel(),
    );
  };

  console.log(
    "ResourceAccountStorage.verifiedDomains",
    ResourceAccountStorage.verifiedDomains,
  );

  const isLoading =
    getIsLoading("@createMsTeamResourceAccount", byFetchType) ||
    getIsLoading("@getVerifiedDomains", byFetchType) ||
    getIsLoading("@getOcFreeNumbers", byFetchType) ||
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
      <div className={classes.validDomainWrapper}>
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
        {ResourceAccountStorage.verifiedDomains.length >= 0 && (
          <Controller
            name="validDomains"
            control={control}
            render={({ field, ...props }) => (
              <FormSelect
                label={t("Valid Domains")}
                options={[...ResourceAccountStorage.verifiedDomains]}
                {...field}
                {...props}
              />
            )}
          />
        )}
      </div>
      <div className={classes.phoneNumberBlock}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, ...props }) => (
            <FormSelect
              disabled={
                SubscriptionLicensesStore.licenses[0].inUse >=
                SubscriptionLicensesStore.licenses[0].assigned
              }
              label={t("Phone number")}
              options={validPhoneNumbers}
              {...field}
              {...props}
              className={classes.selectNumber}
            />
          )}
        />
        {SubscriptionLicensesStore.licenses[0].inUse >=
          SubscriptionLicensesStore.licenses[0].assigned && (
          <Tooltip
            placement="right"
            title={t(
              "Sorry, you cannot add any numbers because you don't have any licenses left",
            )}
          >
            <InfoIcon className={classes.phoneNumberBlockIcon} />
          </Tooltip>
        )}
      </div>
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
