import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

import ResellerStore from "storage/singletons/Reseller";
//TODO: Uncomment when multistep form will be impelemented
// import MultiStepForm from "storage/singletons/MultiStepForm";
import DistributorsStore from "storage/singletons/Distributors";
import { addResellerSchema } from "utils/schemas/resellers";
import { TAddResellerValues } from "utils/types/resellers";
import { AddDistributorFormPropsType } from "utils/types/distributor";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import FormSelect from "components/common/Form/FormSelect";
import { Percent } from "components/Icons";
import { createResellerStyles } from "./styles";

const defaultValues = {
  name: "",
  billingId: "",
  distributor: {
    label: "",
    value: "",
  },
  markup: "",
};

const CreateDistributor: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = createResellerStyles();
  const { control, handleSubmit } = useForm<TAddResellerValues>({
    resolver: yupResolver(addResellerSchema(t)),
    defaultValues,
  });

  //TODO: Uncomment when multistep form will be impelemented
  // const { goNext, goBack } = MultiStepForm;
  const { createReseller } = ResellerStore;
  const {
    distributors,
    distributorsForResellerCreation,
    getDistributorsData,
  } = DistributorsStore;

  useEffect(() => {
    !distributorsForResellerCreation && getDistributorsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<TAddResellerValues> = ({
    markup,
    distributor,
    ...values
  }) => {
    const payload: any = markup
      ? { markup: +markup, ...values }
      : { ...values };
    if (distributor.value) {
      payload.owner = {
        type: "distributor",
        uuid: distributors!.find(el => el.name === distributor.label)?.uuid,
      };
    }
    //TODO: Uncomment when multistep form will be impelemented
    // createReseller({ payload, callback: goNext });
    createReseller({ payload, callback: handleCancel });
  };

  const onCancel = () => {
    //TODO: Uncomment when multistep form will be impelemented
    // goBack(handleCancel);
    handleCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.createDistributorForm}
    >
      <ModalButtonsWrapper
        handleCancel={onCancel}
        cancelButton
        //TODO: Uncomment when multistep form will be impelemented
        // submitButtonTitle={t("Next")}
        submitButtonTitle={t("Add")}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Name")}
            {...field}
            {...props}
            className={classes.createResellerInput}
          />
        )}
      />
      <Controller
        name="billingId"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Billing ID")}
            helper={t(
              "Use only letters and digits, don’t use special characters (e.g. *,%,#)",
            )}
            {...field}
            {...props}
            className={clsx(
              classes.createResellerInput,
              classes.createDistributorBillingInput,
            )}
          />
        )}
      />
      <Controller
        name="distributor"
        control={control}
        render={({ field, ...props }) => (
          <FormSelect
            label={t("Distributor")}
            options={distributorsForResellerCreation}
            {...field}
            {...props}
            className={classes.createResellerInput}
          />
        )}
      />
      <Controller
        name="markup"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Markup")}
            helper={t(
              "Set the markup for rates plan costs for this distributor",
            )}
            {...field}
            {...props}
            icon={Percent}
            className={clsx(
              classes.createResellerInput,
              classes.createDistributorBillingInput,
            )}
          />
        )}
      />
    </form>
  );
};

export default CreateDistributor;
