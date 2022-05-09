import { useState } from "react";
import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

import MultiStepForm from "storage/singletons/MultiStepForm";
import PortingRequests from "storage/singletons/PortingRequests";
import { DocumentsType } from "utils/types/numbers";
import { errorNotification } from "utils/functions/notifications";

import DocumentsList from "../../DocumentsList";
import FileInputSkeleton from "components/common/Form/FileInput/FileInputSkeleton";

import { documentsStyles } from "../styles";

type OnFileChange = (
  name: string,
) => (file: File, setIsLoading: (isLoading: boolean) => void) => void;

const Documents: React.FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const [isFilesLoading, setIsFilesLoading] = useState<boolean>();

  const { previousChoices } = MultiStepForm;

  const {
    currentDocuments,
    getCurrentRequestDocuments,
    addAttachment,
    deleteAttachment,
  } = PortingRequests;

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

  const onFileDelete = (
    id: number,
    setIsLoading: (newState: boolean) => void,
  ) => {
    const onSuccess = () => {
      setIsFilesLoading(true);
      getCurrentRequestDocuments(tenantID, subscriptionID, portId, () => {
        setIsLoading(false);
        setIsFilesLoading(false);
      });
    };

    const onError = () => {
      setIsLoading(false);
      errorNotification(t("Error occurred while deleting file"));
    };

    setIsLoading(true);

    deleteAttachment(tenantID, subscriptionID, portId, id, onSuccess, onError);
  };

  const onFileChange: OnFileChange = name => (file, setIsLoading) => {
    setIsLoading(true);
    addAttachment(
      tenantID,
      subscriptionID,
      portId,
      name,
      file,
      () => {
        setIsFilesLoading(true);
        getCurrentRequestDocuments(tenantID, subscriptionID, portId, () => {
          setIsLoading(false);
          setIsFilesLoading(false);
        });
      },
      () => setIsLoading(false),
    );
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      {isFilesLoading ? (
        documents.map(() => <FileInputSkeleton />)
      ) : (
        <div className={classes.cardsWrapper}>
          {
            <DocumentsList
              requiredDocuments={documents}
              currentDocuments={currentDocuments}
              onFileDelete={onFileDelete}
              onFileChange={onFileChange}
            />
          }
        </div>
      )}
    </form>
  );
};

export default observer(Documents);
