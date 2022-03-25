import { observer } from "mobx-react-lite";
import PendingQueries from "storage/singletons/PendingQueries";
const LOG_QUANTITY = false;

const Loader = ({ children }: { children: any }) => {
  if (LOG_QUANTITY) {
    console.log("Running queries quantity: ", PendingQueries.length);
  }

  return (
    <div style={{ position: "relative", height: "calc(90% - 140px)" }}>
      <div
        style={
          PendingQueries.empty
            ? {
                position: "absolute",
                width: "100%",
                height: "100%",
                padding: 30,
              }
            : {
                opacity: 1,
                position: "absolute",
                width: "100%",
                height: "100%",
                padding: 30,
              }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default observer(Loader);
