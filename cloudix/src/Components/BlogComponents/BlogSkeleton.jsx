import React from "react";
import {
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";

const BlogSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={220}
      />

      <CardContent>
        <Skeleton width="35%" height={18} />
        <Skeleton width="90%" height={30} />
        <Skeleton width="100%" />
        <Skeleton width="80%" />

        <Skeleton
          width="35%"
          height={25}
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
};

export default BlogSkeleton;