// import React from "react";
// import {
//   Card,
//   CardContent,
//   Skeleton,
// } from "@mui/material";

// const BlogSkeleton = () => {
//   return (
//     <Card
//       sx={{
//         height: "100%",
//         borderRadius: "18px",
//         overflow: "hidden",
//       }}
//     >
//       <Skeleton
//         variant="rectangular"
//         height={220}
//       />

//       <CardContent>
//         <Skeleton width="35%" height={18} />
//         <Skeleton width="90%" height={30} />
//         <Skeleton width="100%" />
//         <Skeleton width="80%" />

//         <Skeleton
//           width="35%"
//           height={25}
//           sx={{ mt: 2 }}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default BlogSkeleton;

import React from "react";
import { Box, Skeleton } from "@mui/material";

const BlogSkeleton = () => (
  <Box sx={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(17,30,44,0.08)", bgcolor: "#fff" }}>
    <Skeleton variant="rectangular" height={170} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton width="30%" height={20} />
      <Skeleton width="90%" height={28} />
      <Skeleton width="100%" />
      <Skeleton width="70%" />
      <Skeleton width="45%" height={24} sx={{ mt: 1.5 }} />
    </Box>
  </Box>
);

export default BlogSkeleton;