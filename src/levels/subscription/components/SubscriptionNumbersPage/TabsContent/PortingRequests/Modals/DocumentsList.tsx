import { useTranslation } from "react-i18next";
import { FileInput } from "components/common/Form/FileInput";

type Props = {
  requiredDocuments: Array<{
    name: string;
    allowedFormats: Array<string>;
  }>;
  currentDocuments: Array<{
    id: number;
    name: string;
    createdBy: string;
    description: string;
    mimeType: string;
    sizeInBytes: number;
    createdOn: string;
  }>;
  onFileDelete: (
    fileId: number,
    setIsLoading: (newState: boolean) => void,
  ) => void;
  onFileChange: (
    name: string,
  ) => (file: File, setIsLoading: (isLoading: boolean) => void) => void;
};

const DocumentsList: React.FC<Props> = ({
  requiredDocuments,
  currentDocuments,
  onFileDelete,
  onFileChange,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {requiredDocuments.map(({ name, allowedFormats }) => {
        const currentFiles = currentDocuments.filter(
          attachment => attachment?.description === name,
        );
        return (
          <FileInput
            header={t(`dynamic:${name}_documentHeader`)}
            description={t(`dynamic:${name}_documentDescription`)}
            allowedFormats={allowedFormats}
            attachments={currentFiles}
            name={name}
            onDelete={onFileDelete}
            onChangeController={onFileChange(name)}
          />
        );
      })}
    </>
  );
};

export default DocumentsList;

/* 



*/
