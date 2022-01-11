import { Skeleton } from "@mui/material";

const StackSkeleton = () => {
  return (
    <>
      <li className={"carousel-stack-item"}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "background.paper",
            height: "100%",
            width: "100%",
          }}
        />
      </li>
      <li className={"carousel-stack-item"}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "background.paper",
            height: "100%",
            width: "100%",
          }}
        />
      </li>
      <li className={"carousel-stack-item"}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "background.paper",
            height: "100%",
            width: "100%",
          }}
        />
      </li>
      <li className={"carousel-stack-item"}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "background.paper",
            height: "100%",
            width: "100%",
          }}
        />
      </li>
      <li className={"carousel-stack-item"}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "background.paper",
            height: "100%",
            width: "100%",
          }}
        />
      </li>
      <li className={"carousel-stack-item"}>
        <Skeleton
          variant="rectangular"
          sx={{
            bgcolor: "background.paper",
            height: "100%",
            width: "100%",
          }}
        />
      </li>
    </>
  );
};

export default StackSkeleton;
