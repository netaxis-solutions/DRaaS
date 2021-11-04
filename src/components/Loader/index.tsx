import { observer } from "mobx-react-lite";
import PendingQueries from "storage/singletons/PendingQueries";
import LoaderComponent from "./Loader";
const LOG_QUANTITY = false;

const Loader = ({ children }: { children: any }) => {
  if (LOG_QUANTITY) {
    console.log("Running queries quantity: ", PendingQueries.length);
  }

  return (
    <div style={{ position: "relative", height: "calc(100% - 40px)" }}>
      <div
        style={
          PendingQueries.empty
            ? {
                position: "absolute",
                zIndex: 999,
                width: "100%",
                height: "100%"
              }
            : {
                opacity: 0,
                position: "absolute",
                width: "100%",
                height: "100%"
              }
        }
      >
        {children}
      </div>
      <LoaderComponent />
    </div>
  );
};

export default observer(Loader);
