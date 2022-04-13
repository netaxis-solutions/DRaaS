import { CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { Cross, Upload } from "components/Icons";
import ButtonWithIcon from "../ButtonWithIcon";

import useStyles from "./styles";

type Props = {
  fileInfo?: {
    id: number;
    name: string;
    createdBy: string;
    description: string;
    mimeType: string;
    sizeInBytes: number;
    createdOn: string;
  };
  header: string;
  description: string;
  allowedFormats: Array<string>;
  name: string;
  onChangeController: (
    file: File,
    setFieldState: (newState: FieldState) => void,
  ) => void;
  onDelete?: () => void;
};

type FieldState = "not_initiated" | "initiated" | "failed" | "success";

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
  fileInfo,
  header,
  description,
  allowedFormats,
  name,
  onChangeController,
  onDelete,
}) => {
  const [fieldState, setFieldState] = useState<FieldState>("not_initiated");
  const [fileName, setFileName] = useState("");
  const { t } = useTranslation();

  const classes = useStyles();

  useEffect(() => {
    if (fileInfo) {
      setFileName(createFileName(fileInfo.name, fileInfo.sizeInBytes));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.fileCard}>
      <div className={classes.fileCardHeader}>{header}</div>
      <div className={classes.fileCardDescription}>{description}</div>
      <div
        className={clsx({
          [classes.fileCardState]: true,
          [classes.errorState]: fieldState === "failed",
          [classes.successState]: fieldState === "success",
          [classes.notInitiatedState]: fieldState === "not_initiated",
        })}
      >
        {fieldState === "failed" ? (
          t("an error occured while uploading file")
        ) : (
          <div>
            <div>{fileName}</div>
            {onDelete && (
              <ButtonWithIcon
                title={t("Delete file")}
                icon={Cross}
                onClick={onDelete}
              />
            )}
          </div>
        )}
      </div>
      {fieldState === "initiated" ? (
        <CircularProgress />
      ) : (
        <label htmlFor={name} className={classes.uploadButton}>
          <Upload />
          {fieldState === "not_initiated" && t("Upload")}
          {fieldState === "failed" && t("Upload once again")}
          {fieldState === "success" && t("Upload other file")}
        </label>
      )}
      <input
        type="file"
        id={name}
        className={classes.input}
        accept={allowedFormats.join(",")}
        onChange={event => {
          if (!event?.target?.files || !event?.target?.files[0]) {
            setFieldState("not_initiated");
            return;
          }
          const file = event.target.files[0];
          if (file.size > 10485760 || !allowedFormats.includes(file.type)) {
            setFieldState("failed");
            return;
          }
          setFileName(createFileName(file.name, file.size));
          setFieldState("success");
          onChangeController(file, setFieldState);
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
