import { CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { Upload } from "components/Icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "./styles";

type Props = {
  header: string;
  description: string;
  allowedFormats: Array<string>;
  name: string;
  onSuccesfullChange: (file: File) => void;
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
  header,
  description,
  allowedFormats,
  name,
  onSuccesfullChange,
}) => {
  const [fieldState, setFieldState] = useState<FieldState>("not_initiated");
  const [fileName, setFileName] = useState("");
  const { t } = useTranslation();

  const classes = useStyles();

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
        {fieldState === "failed"
          ? t("an error occured while uploading file")
          : fileName}
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
            console.log(file);
            setFieldState("failed");
            return;
          }
          setFileName(createFileName(file.name, file.size));
          setFieldState("success");
          onSuccesfullChange(file);
        }}
      />
    </div>
  );
};

export default FileInput;
