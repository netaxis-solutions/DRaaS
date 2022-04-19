import Skeleton from "@mui/material/Skeleton";

const O365AdminSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton
        variant={"text"}
        width={500}
        height={20}
        style={{ marginBottom: 20 }}
      />
      <Skeleton
        variant={"rectangular"}
        width={500}
        height={40}
        style={{ marginBottom: 15 }}
      />

      <Skeleton variant={"rectangular"} width={500} height={40} />
    </>
  );
};

export default O365AdminSkeleton;
