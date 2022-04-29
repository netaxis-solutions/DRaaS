import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@material-ui/core";
import clsx from "clsx";

import { errorNotification } from "utils/functions/notifications";

import { Cross, Upload } from "components/Icons";
import IconButton from "../IconButton";

import useStyles from "./styles";

type Props = {
  attachments?: Array<{
    id: number;
    name: string;
    createdBy: string;
    description: string;
    mimeType: string;
    sizeInBytes: number;
    createdOn: string;
  }>;
  header: string;
  description: string;
  allowedFormats: Array<string>;
  name: string;
  onChangeController: (
    file: File,
    setIsLoading: (newState: boolean) => void,
  ) => void;
  onDelete?: (
    fileId: number,
    setIsLoading: (newState: boolean) => void,
  ) => void;
};

const sizeFormatter = (size: number) => {
  let currentSize = size;
  let divisionAmount = 0;
  const sizes = ["Bytes", "KB", "MB"];
  while (currentSize > 1024) {
    currentSize = currentSize / 1024;
    divisionAmount++;
  }

  return `${currentSize.toFixed()}${sizes[divisionAmount]}`;
};

const createFileName = (name: string, size: number) => {
  const formattedSize = sizeFormatter(size);
  return `${name} (${formattedSize})`;
};

export const FileInput: React.FC<Props> = ({
  attachments,
  header,
  description,
  allowedFormats,
  name,
  onChangeController,
  onDelete,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<Array<{ name: string; id: number }>>([]);
  const { t } = useTranslation();

  const classes = useStyles();

  useEffect(() => {
    if (attachments && attachments.length) {
      const attachmentsArray: Array<{ name: string; id: number }> = [];

      attachments.forEach(attachment => {
        attachmentsArray.push({
          name: createFileName(attachment.name, attachment.sizeInBytes),
          id: attachment.id,
        });
      });

      setFiles([...attachmentsArray]);
      setIsLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.fileCard}>
      <div className={classes.fileCardHeader}>{header}</div>
      <div className={classes.fileCardDescription}>{description}</div>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            className={clsx({
              [classes.fileCardState]: true,
              [classes.successState]: !isLoading,
            })}
          >
            {files.map(file => (
              <div className={classes.fileNameBlock}>
                <div>{file.name}</div>
                {onDelete && (
                  <div className={classes.crossWrapper}>
                    <IconButton
                      icon={Cross}
                      disableRipple
                      onClick={() => {
                        onDelete(file.id, setIsLoading);
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <label htmlFor={name} className={classes.uploadButton}>
            <Upload />
            {files.length ? t("Upload other file") : t("Upload")}
          </label>
        </>
      )}
      <input
        type="file"
        id={name}
        className={classes.input}
        accept={allowedFormats.join(",")}
        onChange={event => {
          if (!event.target.files || !event.target.files[0]) {
            return;
          }
          const file = event.target.files[0];
          if (file.size > 10485760 || !allowedFormats.includes(file.type)) {
            errorNotification(t("Wrong file type or size"));
            return;
          }

          onChangeController(file, setIsLoading);
          // NOTE: this string a written in purpose to clear the field
          // if user want to upload the same file after an error
          //@ts-ignore
          event.target.value = null;
        }}
      />
    </div>
  );
};

export default FileInput;
