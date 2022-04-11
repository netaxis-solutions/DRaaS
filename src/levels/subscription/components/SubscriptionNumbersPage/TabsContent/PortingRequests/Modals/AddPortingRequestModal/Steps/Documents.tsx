import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

import MultiStepForm from "storage/singletons/MultiStepForm";

import FileInput from "components/common/Form/FileInput";
import PortingRequests from "storage/singletons/PortingRequests";
import { documentsStyles } from "../../../styles";
import { DocumentsType } from "utils/types/numbers";

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const { previousChoices, goNext } = MultiStepForm;
  const { addAttachment } = PortingRequests;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = documentsStyles();

  const documents: DocumentsType = previousChoices[0].country.documents;

  const { handleSubmit } = useForm({
    // resolver: yupResolver(),
  });

  const onSubmit = () => {
    goNext();
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.cardsWrapper}>
        {documents.map(({ name, allowedFormats }) => (
          <FileInput
            header={t(`dynamic:${name}_documentHeader`)}
            description={t(`dynamic:${name}_documentDescription`)}
            allowedFormats={allowedFormats}
            name={name}
            onSuccesfullChange={file => {
              addAttachment(tenantID, subscriptionID, 279, file);
            }}
          />
        ))}
      </div>
    </form>
  );
};

export default observer(Documents);
