// import React from "react";
// import {
//   Box,
//   Button,
//   Container,
// } from "@mui/material";

// const BlogCategories = ({ categories, selected, onSelect }) => {
//   return (
//     <Box
//       sx={{
//         borderBottom: "1px solid",
//         borderColor: "divider",
//         backgroundColor: "#fff",
//         position: "sticky",
//         top: 0,
//         zIndex: 10,
//       }}
//     >
//       <Container maxWidth="lg">
//         <Box
//           sx={{
//             display: "flex",
//             gap: 1,
//             overflowX: "auto",
//             py: 1.5,
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": {
//               display: "none",
//             },
//           }}
//         >
//           {categories.map((category) => (
//             <Button
//               key={category}
//               onClick={() => onSelect(category)}
//               variant={selected === category ? "contained" : "text"}
//               sx={{
//                 flexShrink: 0,
//                 borderRadius: "999px",
//                 px: 2.5,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 color:
//                   selected === category ? "#fff" : "#111E2C",
//                 backgroundColor:
//                   selected === category ? "#769914" : "transparent",
//                 "&:hover": {
//                   backgroundColor:
//                     selected === category
//                       ? "#5f7d10"
//                       : "rgba(118,153,20,0.08)",
//                 },
//               }}
//             >
//               {category}
//             </Button>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default BlogCategories;


import React from "react";
import { Box, ButtonBase } from "@mui/material";

// Not in the mockup, kept so category filtering isn't lost. Compact, non-sticky.
const BlogCategories = ({ categories, selected, onSelect }) => (
  <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1, mb: 3, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
    {categories.map((c) => {
      const active = selected === c;
      return (
        <ButtonBase
          key={c}
          onClick={() => onSelect(c)}
          sx={{
            flexShrink: 0,
            px: 1.8,
            py: 0.6,
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: 600,
            fontFamily: "inherit",
            border: "1px solid",
            borderColor: active ? "primary.main" : "divider",
            bgcolor: active ? "primary.main" : "transparent",
            color: active ? "#fff" : "primary.dark",
            "&:hover": { bgcolor: active ? "primary.main" : "rgba(118,153,20,0.08)" },
          }}
        >
          {c}
        </ButtonBase>
      );
    })}
  </Box>
);

export default BlogCategories;