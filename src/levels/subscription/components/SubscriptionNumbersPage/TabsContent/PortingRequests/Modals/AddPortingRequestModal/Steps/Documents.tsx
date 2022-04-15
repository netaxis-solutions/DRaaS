import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";

import MultiStepForm from "storage/singletons/MultiStepForm";
import PortingRequests from "storage/singletons/PortingRequests";
import { DocumentsType } from "utils/types/numbers";

import FileInput from "components/common/Form/FileInput";

import { documentsStyles } from "../../../styles";

const Documents: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const { previousChoices } = MultiStepForm;
  const { addAttachment } = PortingRequests;
  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = documentsStyles();

  const documents: DocumentsType = previousChoices[0].country.documents;
  const portId = previousChoices[3].portId;
  const { handleSubmit } = useForm();

  const onSubmit = () => {
    handleCancel();
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
            onChangeController={(file, setFieldState) => {
              setFieldState("initiated");
              addAttachment(
                tenantID,
                subscriptionID,
                portId,
                name,
                file,
                () => setFieldState("success"),
                () => setFieldState("failed"),
              );
            }}
          />
        ))}
      </div>
    </form>
  );
};

export default observer(Documents);
