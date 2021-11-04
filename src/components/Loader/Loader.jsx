import PendingQueries from "storage/singletons/PendingQueries";

const Loader = () => {
  return (
    <div
      style={
        PendingQueries.empty
          ? { opacity: 0, position: "absolute", width: "100%", height: "100%" }
          : {
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: 999
            }
      }
    >
      <div style={{ fontSize: 26, minWidth: 100, minHeight: 100 }}>
        ...is loading
      </div>
    </div>
  );
};

export default Loader;
