import { toast } from "react-toastify";

import getErrorMessage from "./getErrorMessage";
import { SvgCheckCircle } from "components/Icons/CheckCircle";
import { SvgNotification } from "components/Icons/Notification";
import { SvgCross } from "components/Icons/Cross";
import { SvgAlertTriangle } from "components/Icons/AlertTriangle";
import { SvgTrashNotification } from "components/Icons/TrashNotification";

export const successNotification = (msg: JSX.Element) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    icon: SvgCheckCircle,
    closeButton: SvgCross,
  });
};

export const informationNotification = (msg: JSX.Element) => {
  toast.info(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    icon: SvgNotification,
    closeButton: SvgCross,
  });
};

export const errorNotification = (msg: unknown | JSX.Element) => {
  toast.error(getErrorMessage(msg) || msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    icon: SvgNotification,
    closeButton: SvgCross,
  });
};

export const warningNotification = (msg: JSX.Element) => {
  toast.warn(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    icon: SvgAlertTriangle,
    closeButton: SvgCross,
  });
};

export const deleteNotification = (msg: JSX.Element) => {
  toast(msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    icon: SvgTrashNotification,
    closeButton: SvgCross,
  });
};
