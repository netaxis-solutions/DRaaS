import { useState, useEffect } from "react";
import { debounce } from "lodash";
import ReactDOM from "react-dom";
import clsx from "clsx";

import RightSideModal from "storage/singletons/RightSideModal";

import { TModalProps, RightSideModalFooterType } from "utils/types/modal";
import useMountTransition from "utils/functions/useMountTransition";

import ModalHeader from "./components/ModalHeader";
import ModalContent from "./components/ModalContent";
import ModalFooter from "./components/ModalFooter";

import useStyles from "./styles";

const Modal: React.FC<
  TModalProps & RightSideModalFooterType & { animationDuration?: number }
> = ({
  title,
  handleCancel,
  children,
  isBackIconHidden,
  className,
  cancelButton,
  submitButton,
  animationDuration = 300,
}) => {
  const classes = useStyles({ animationDuration });

  const [container] = useState(document.createElement("div"));
  const [isMounted, setIsMounted] = useState(false);
  const isTransitioned = useMountTransition(isMounted, animationDuration);

  const { setCurrentModalCloseAction, clearRightSideModal } = RightSideModal;

  // This debounced function purpose is to close modal With a delay
  // long enough for the animation to finish playing
  const delayedModalClose = debounce(handleCancel, animationDuration);

  // This function is used for setting modal state as unmounted and delayed close
  const innerHandleModalClose = () => {
    setIsMounted(false);
    delayedModalClose();
  };

  const handleModalClose = (delayedCallback?: () => void) => {
    setIsMounted(false);
    delayedCallback && debounce(delayedCallback, animationDuration)();
    delayedModalClose();
  };

  useEffect(() => {
    document.body.appendChild(container);
    document.body.classList.add(classes.fixedBackground);
    setIsMounted(true);
    setCurrentModalCloseAction(handleModalClose);

    return () => {
      clearRightSideModal();
      document.body.removeChild(container);
      document.body.classList.remove(classes.fixedBackground);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      {(isTransitioned || isMounted) && (
        <>
          <div
            className={classes.modalCloseHandler}
            onClick={innerHandleModalClose}
          />
          <div
            className={clsx({
              [classes.rightSideModal]: true,
              [className || ""]: className,
              [classes.modalIsVisible]: isTransitioned && isMounted,
            })}
          >
            <ModalHeader
              title={title}
              handleCancel={innerHandleModalClose}
              isBackIconHidden={isBackIconHidden}
            />
            <ModalContent>{children}</ModalContent>
            <ModalFooter
              cancelButton={{
                ...cancelButton,
                onClick: () => {
                  cancelButton?.onClick && cancelButton?.onClick();
                  handleModalClose();
                },
              }}
              submitButton={submitButton}
            />
          </div>
        </>
      )}
    </>,
    container,
  );
};

export default Modal;
