import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { TModalProps } from "utils/types/modal";
import ModalHeader from "./components/ModalHeader";
import ModalContent from "./components/ModalContent";
import useStyles from "./styles";

const Modal: React.FC<TModalProps> = ({
  title,
  handleCancel,
  children,
  activeStep,
  steps,
}) => {
  const [container] = useState(document.createElement("div"));
  const classes = useStyles();

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(
    <div className={classes.modal}>
      <ModalHeader
        title={title}
        activeStep={activeStep}
        steps={steps}
        handleCancel={handleCancel}
      />
      <ModalContent>{children}</ModalContent>
    </div>,
    container,
  );
};

export default Modal;
