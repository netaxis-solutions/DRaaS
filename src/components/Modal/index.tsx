import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import { TModalProps } from "utils/types/modal";
import ModalHeader from "./components/ModalHeader";
import ModalContent from "./components/ModalContent";
import Loader from "components/Loader";
import useStyles from "./styles";

const Modal: React.FC<TModalProps> = ({
  title,
  handleCancel,
  children,
  activeStep,
  steps,
  isBackIconHidden,
  styleWithSideBar,
  className,
}) => {
  const [container] = useState(document.createElement("div"));
  const classes = useStyles();

  useEffect(() => {
    document.body.appendChild(container);
    document.body.classList.add(classes.fixedBackground);

    return () => {
      document.body.removeChild(container);
      document.body.classList.remove(classes.fixedBackground);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  return ReactDOM.createPortal(
    <div
      className={clsx(classes.modal, {
        [classes.modalWithSideBar]: styleWithSideBar,
        [className || ""]: className,
      })}
    >
      <ModalHeader
        title={title}
        activeStep={activeStep}
        steps={steps}
        handleCancel={handleCancel}
        isBackIconHidden={isBackIconHidden}
      />
      <Loader>
        <ModalContent>{children}</ModalContent>
      </Loader>
    </div>,

    container,
  );
};

export default Modal;
