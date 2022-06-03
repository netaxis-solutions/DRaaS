import { ChildrenInProps } from "utils/types/components";

import { modalContentUseStyles } from "./styles";

const ModalContent: React.FC<ChildrenInProps> = ({ children }) => {
  const classes = modalContentUseStyles();

  return <div className={classes.modalContentWrapper}>{children}</div>;
};

export default ModalContent;
