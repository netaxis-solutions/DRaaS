import { observer } from "mobx-react-lite";
import PendingQueries from "storage/singletons/PendingQueries";

const LOG_QUANTITY = false;

const Loader: React.FC = () => {
  if (LOG_QUANTITY) {
    console.log("Running queries quantity: ", PendingQueries.length);
  }
  return PendingQueries.empty ? <></> : <p>...is loading</p>;
};

export default observer(Loader);
