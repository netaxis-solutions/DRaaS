import { useMemo, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import SubscriptionProfile from "storage/singletons/SubscriptionProfile";
import MultiStepForm from "storage/singletons/MultiStepForm";

import { addLocationSchema } from "utils/schemas/addLocationSchema";

import FormInput from "components/common/Form/FormInput";
import FormSelect from "components/common/Form/FormSelect";
import FormCheckbox from "components/common/Form/FormCheckbox";

import { useAddLocationStyles } from "./styles";

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
  const { previousChoices } = MultiStepForm;

  const {
    postalCodes,
    postSubscriptionLocation,
    getSubscriptionLocations,
  } = SubscriptionProfile;

  const postalCodeOptions = useMemo(() => {
    const currentCountry = previousChoices[0].selectedCountryName;
    return postalCodes
      .filter(({ country }) => country?.name === currentCountry)
      .reduce(
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
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCodes]);

  const onSubmit = ({
    agreement,
    postalCodeId,
    postbox,
    ...values
  }: {
    street: string;
    number: string;
    postbox: string;
    postalCodeId: {
      label: string;
      value: string;
    };
    agreement: boolean;
  }) => {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.formWrapper}
      id={"addLocation"}
    >
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
