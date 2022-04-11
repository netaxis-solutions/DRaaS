//NOTE: it's unfinished component that will be finished in future
import { observer } from "mobx-react-lite";

import { requestInfoStyles } from "../../../../styles";

const PortingRequestDetails: React.FC = () => {
  const classes = requestInfoStyles();

  return <div className={classes.portingDetails}>Enterprise info</div>;
};

export default observer(PortingRequestDetails);
