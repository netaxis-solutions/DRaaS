import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import PortingRequests from "storage/singletons/PortingRequests";
import {
  errorNotification,
  successNotification,
} from "utils/functions/notifications";

import DocumentsList from "../../../DocumentsList";
import FileInputSkeleton from "components/common/Form/FileInput/FileInputSkeleton";

import { documentsStyles } from "../../styles";

type OnFileChange = (
  name: string,
) => (file: File, setIsLoading: (isLoading: boolean) => void) => void;

const Documents: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const {
    requiredDocuments,
    currentDocuments,
    currentRequestId,
    getCurrentRequestDocuments,
    addAttachment,
    deleteAttachment,
  } = PortingRequests;

  const { tenantID, subscriptionID } = useParams<{
    tenantID: string;
    subscriptionID: string;
  }>();
  const classes = documentsStyles();

  useEffect(() => {
    setLoading(true);

    if (currentRequestId) {
      getCurrentRequestDocuments(
        tenantID,
        subscriptionID,
        currentRequestId,
        () => setLoading(false),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileDelete = (
    id: number,
    setIsLoading: (newState: boolean) => void,
  ) => {
    const onSuccess = () => {
      setLoading(true);
      getCurrentRequestDocuments(
        tenantID,
        subscriptionID,
        currentRequestId!,
        () => {
          successNotification(t("Successfully deleted"));
          setIsLoading(false);
          setLoading(false);
        },
      );
    };

    const onError = () => {
      setIsLoading(false);
      errorNotification(t("Error occurred while deleting a file"));
    };

    setIsLoading(true);

    deleteAttachment(
      tenantID,
      subscriptionID,
      currentRequestId!,
      id,
      onSuccess,
      onError,
    );
  };

  const onFileChange: OnFileChange = name => (file, setIsLoading) => {
    setIsLoading(true);
    addAttachment(
      tenantID,
      subscriptionID,
      currentRequestId!,
      name,
      file,
      () => {
        setLoading(true);
        getCurrentRequestDocuments(
          tenantID,
          subscriptionID,
          currentRequestId!,
          () => {
            successNotification(t("Successfully added"));
            setIsLoading(false);
            setLoading(false);
          },
        );
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  return loading ? (
    <>
      {requiredDocuments.map(() => (
        <FileInputSkeleton />
      ))}
    </>
  ) : (
    <div className={classes.cardsWrapper}>
      {requiredDocuments.length ? (
        <DocumentsList
          requiredDocuments={requiredDocuments}
          currentDocuments={currentDocuments}
          onFileChange={onFileChange}
          onFileDelete={onFileDelete}
        />
      ) : (
        t("No documents neded")
      )}
    </div>
  );
};

export default observer(Documents);
