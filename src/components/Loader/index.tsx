import { observer } from "mobx-react-lite";
import PendingQueries from "storage/singletons/PendingQueries";

const LOG_QUANTITY = false;

const Loader = ({ children }: { children: any }) => {
  if (LOG_QUANTITY) {
    console.log("Running queries quantity: ", PendingQueries.length);
  }

  return PendingQueries.empty ? (
    children
  ) : (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        background: "white",
      }}
    >
      <p>...is loading</p>
    </div>
  );
};

export default observer(Loader);
