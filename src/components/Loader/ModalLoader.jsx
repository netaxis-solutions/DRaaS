import CircularProgress from "@mui/material/CircularProgress";

const ModalLoader = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 140px)",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
};

export default ModalLoader;
