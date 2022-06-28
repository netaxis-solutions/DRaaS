import { observer } from "mobx-react-lite";
import PendingQueries from "storage/singletons/PendingQueries";
const LOG_QUANTITY = false;

const Loader = ({ children }: { children: any }) => {
  if (LOG_QUANTITY) {
    console.log("Running queries quantity: ", PendingQueries.length);
  }

  return (
    <div>
      <div
        style={
          PendingQueries.empty
            ? {
                width: "100%",
                height: "100%",
                padding: `24px 30px 30px 30px`,
              }
            : {
                opacity: 1,
                width: "100%",
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
