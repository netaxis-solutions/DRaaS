import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import PortingRequests from "storage/singletons/PortingRequests";

import FileInput from "components/common/Form/FileInput";

import { documentsStyles } from "../../styles";

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const {
    addAttachment,
    requiredDocuments,
    currentRequestId,
    currentPortingRequest,
    deleteAttachment,
  } = PortingRequests;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = documentsStyles();

  return (
    <div className={classes.cardsWrapper}>
      {requiredDocuments.length
        ? requiredDocuments.map(({ name, allowedFormats }) => {
            const currentFileInfo = currentPortingRequest.attachments?.find(
              (attachment: { description: string }) =>
                attachment?.description === name,
            );
            return (
              <FileInput
                header={t(`dynamic:${name}_documentHeader`)}
                description={t(`dynamic:${name}_documentDescription`)}
                allowedFormats={allowedFormats}
                fileInfo={currentFileInfo}
                name={name}
                onDelete={() => {
                  deleteAttachment(
                    tenantID,
                    subscriptionID,
                    currentRequestId!,
                    name,
                  );
                }}
                onChangeController={(file, setFieldState) => {
                  setFieldState("initiated");
                  addAttachment(
                    tenantID,
                    subscriptionID,
                    currentRequestId!,
                    name,
                    file,
                    () => setFieldState("success"),
                    () => setFieldState("failed"),
                  );
                }}
              />
            );
          })
        : t("No documents neded")}
    </div>
  );
};

export default observer(Documents);
