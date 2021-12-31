import PendingQueries from "storage/singletons/PendingQueries";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <div
      style={
        PendingQueries.empty
          ? {
              opacity: 0,
              display: "none",
              width: "100%",
              height: "calc(100% - 40px)",
            }
          : {
              display: "flex",
              padding: 50,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "calc(100% - 40px)",
              zIndex: 999,
            }
      }
    >
      <div style={{ fontSize: 26, minWidth: 100, minHeight: 100 }}>
        <CircularProgress color="secondary" />
      </div>
    </div>
  );
};

export default Loader;
