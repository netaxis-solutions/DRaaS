//@ts-nocheck
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

import MultiStepForm from "storage/singletons/MultiStepForm";

import FileInput from "components/common/Form/FileInput";
import PortingRequests from "storage/singletons/PortingRequests";
import { documentsStyles } from "../../../styles";

type defaultValuesType = {
  rangeSize: string;
  suggestionsAmount: string;
};

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const { previousChoices, goNext } = MultiStepForm;
  const { addAttachment } = PortingRequests;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = documentsStyles();

  const documents = previousChoices[0].country.documents;

  const { handleSubmit, control } = useForm<defaultValuesType>({
    // resolver: yupResolver(),
  });

  const onSubmit = (values: defaultValuesType) => {
    goNext();
    console.log(values);
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.cardsWrapper}>
        {documents.map(({ name, allowedFormats }) => (
          <Controller
            name={name}
            control={control}
            render={({ field, ...props }) => (
              <FileInput
                header={t(`dynamic:${name}_documentHeader`)}
                description={t(`dynamic:${name}_documentDescription`)}
                allowedFormats={allowedFormats}
                name={name}
                onSuccesfullChange={file => {
                  addAttachment(tenantID, subscriptionID, 279, file);
                }}
              />
            )}
          />
        ))}
      </div>
    </form>
  );
};

export default observer(Documents);
