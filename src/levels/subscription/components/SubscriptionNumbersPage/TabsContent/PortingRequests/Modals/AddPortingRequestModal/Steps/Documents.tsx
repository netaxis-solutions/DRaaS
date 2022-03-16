//@ts-nocheck
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";

import { numbersRangeSchema } from "utils/schemas/numbersSchema";

type defaultValuesType = {
  rangeSize: string;
  suggestionsAmount: string;
};

const defaultValues: defaultValuesType = {
  rangeSize: "1",
  suggestionsAmount: "1",
};

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const { setPreviousChoices, goNext } = MultiStepForm;

  const { handleSubmit } = useForm<defaultValuesType>({
    // resolver: yupResolver(),
    defaultValues,
  });

  const onSubmit = (values: defaultValuesType) => {
    // setPreviousChoices({ suggestionsSetting: values });
    goNext();
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      Documents
    </form>
  );
};

export default observer(Documents);
