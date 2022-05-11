import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

import SubscriptionProfile from "storage/singletons/SubscriptionProfile";

import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import FormSelect from "components/common/Form/FormSelect";
import FormCheckbox from "components/common/Form/FormCheckbox";
import { addLocationSchema } from "utils/schemas/addLocationSchema";

import { useAddLocationStyles } from "./styles";
import { useParams } from "react-router-dom";

const defaultValues = {
  street: "",
  number: "",
  postbox: "",
  postalCodeId: {
    label: "",
    value: "",
  },
  agreement: false,
};

const AddLocationContent: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const classes = useAddLocationStyles();
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(addLocationSchema(t)),
  });

  const {
    postalCodes,
    postSubscriptionLocation,
    getSubscriptionLocations,
  } = SubscriptionProfile;

  const postalCodeOptions = useMemo(
    () =>
      postalCodes.reduce(
        (
          formattedCodes: Array<{ label: string; value: string }>,
          currentPostalCode,
        ) => [
          ...formattedCodes,
          {
            value: `${currentPostalCode.id}`,
            label: `${currentPostalCode.code} - ${currentPostalCode.city}`,
          },
        ],
        [],
      ),
    [postalCodes],
  );

  const onSubmit = ({ agreement, postalCodeId, postbox, ...values }: any) => {
    if (!isLoading) {
      setIsLoading(true);

      const payload = postbox
        ? {
            postalCodeId: +postalCodeId.value,
            postbox,
            ...values,
          }
        : {
            postalCodeId: +postalCodeId.value,
            ...values,
          };

      postSubscriptionLocation(
        tenantID,
        subscriptionID,
        payload,
        () => {
          handleCancel();
          getSubscriptionLocations(tenantID, subscriptionID);
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        },
      );
    }
  };

  const onCancel = () => {
    handleCancel();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.formWrapper}>
      <ModalButtonsWrapper
        handleCancel={onCancel}
        cancelButton
        submitButtonTitle={t("Add")}
      />
      <Controller
        name="postalCodeId"
        control={control}
        render={({ field, ...props }) => (
          <FormSelect
            label={t("Postal code + city")}
            options={postalCodeOptions}
            {...field}
            {...props}
          />
        )}
      />
      <Controller
        name="street"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Street")} {...field} {...props} />
        )}
      />
      <Controller
        name="number"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Number")} {...field} {...props} />
        )}
      />
      <Controller
        name="postbox"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Postbox")} {...field} {...props} />
        )}
      />
      <Controller
        name="agreement"
        control={control}
        render={({ field, ...props }) => (
          <FormCheckbox
            label={t(
              "By checking this box I confirm that it is my legitimate business location",
            )}
            {...field}
            {...props}
          />
        )}
      />
    </form>
  );
};

export default AddLocationContent;
