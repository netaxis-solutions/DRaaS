import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import FileInput from "components/common/Form/FileInput";
import { documentsStyles } from "../../../../styles";
import PortingRequests from "storage/singletons/PortingRequests";

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const {
    addAttachment,
    requiredDocuments,
    currentRequestId,
  } = PortingRequests;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = documentsStyles();

  return (
    <div className={classes.cardsWrapper}>
      {requiredDocuments.map(({ name, allowedFormats }) => (
        <FileInput
          header={t(`dynamic:${name}_documentHeader`)}
          description={t(`dynamic:${name}_documentDescription`)}
          allowedFormats={allowedFormats}
          name={name}
          onSuccesfullChange={file => {
            addAttachment(tenantID, subscriptionID, currentRequestId!, file);
          }}
        />
      ))}
    </div>
  );
};

export default observer(Documents);
