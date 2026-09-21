// import React from "react";
// import { Box, Skeleton, Container, useTheme } from "@mui/material";

// const AboutSkeleton = () => {
//   const theme = useTheme();

//   return (
//     <Box>
//       {/* ── AboutContent: text left, image right ── */}
//       <Box sx={{ py: { xs: 6, md: 10 }, background: theme.palette.background.default }}>
//         <Container maxWidth="lg">
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 10 }, alignItems: "center" }}>
//             {/* Left text */}
//             <Box flex={1}>
//               <Skeleton variant="text" width="70%" height={50} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="50%" height={50} sx={{ mb: 3 }} />
//               <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="85%" height={20} sx={{ mb: 3 }} />
//               <Skeleton variant="text" width="60%" height={24} />
//             </Box>
//             {/* Right image */}
//             <Box flex={1}>
//               <Skeleton variant="rounded" width="100%" height={350} sx={{ borderRadius: "35px" }} />
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* ── VisionMission: dark bg, two rows ── */}
//       <Box sx={{ bgcolor: theme.palette.primary.dark, py: { xs: 10, md: 14 } }}>
//         <Container maxWidth="lg">
//           {/* Vision row: text left, image right */}
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 8 }, alignItems: "center", mb: { xs: 9, md: 12 } }}>
//             <Box flex={1}>
//               <Skeleton variant="text" width="30%" height={16} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
//               <Skeleton variant="text" width="65%" height={44} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.1)" }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
//               <Skeleton variant="text" width="80%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
//             </Box>
//             <Box flex={1}>
//               <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: "16px", bgcolor: "rgba(255,255,255,0.08)" }} />
//             </Box>
//           </Box>

//           {/* Divider */}
//           <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: { xs: 9, md: 12 }, bgcolor: "rgba(255,255,255,0.07)" }} />

//           {/* Mission row: image left, text right */}
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row-reverse" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
//             <Box flex={1}>
//               <Skeleton variant="text" width="30%" height={16} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
//               <Skeleton variant="text" width="65%" height={44} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.1)" }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
//               <Skeleton variant="text" width="80%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
//             </Box>
//             <Box flex={1}>
//               <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: "16px", bgcolor: "rgba(255,255,255,0.08)" }} />
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* ── CommitmentSection: text left, image right ── */}
//       <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: theme.palette.background.default }}>
//         <Container maxWidth="lg">
//           <Skeleton variant="text" width="45%" height={44} sx={{ mb: 6, mx: "auto" }} />
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 8 }, alignItems: "center" }}>
//             <Box flex={1}>
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1 }} />
//               <Skeleton variant="text" width="90%" height={18} />
//             </Box>
//             <Box flex={1}>
//               <Skeleton variant="rounded" width="100%" height={300} sx={{ borderRadius: "16px" }} />
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* ── TeamSection: image left, text right ── */}
//       <Box sx={{ bgcolor: theme.palette.primary.dark, py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="lg">
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 5, md: 10 }, alignItems: "center" }}>
//             <Box flex={1}>
//               <Skeleton variant="rounded" width="100%" height={320} sx={{ borderRadius: "35px", bgcolor: "rgba(255,255,255,0.08)" }} />
//             </Box>
//             <Box flex={1}>
//               <Skeleton variant="text" width="60%" height={44} sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.1)" }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
//               <Skeleton variant="text" width="100%" height={18} sx={{ mb: 1, bgcolor: "rgba(255,255,255,0.08)" }} />
//               <Skeleton variant="text" width="75%" height={18} sx={{ bgcolor: "rgba(255,255,255,0.08)" }} />
//             </Box>
//           </Box>
//         </Container>
//       </Box>

//       {/* ── OurTeam: 3 cards ── */}
//       <Box sx={{ bgcolor: theme.palette.background.default, py: { xs: 8, md: 12 } }}>
//         <Container maxWidth="lg">
//           <Skeleton variant="text" width="35%" height={50} sx={{ mx: "auto", mb: 8 }} />
//           <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, justifyContent: "center" }}>
//             {[...Array(3)].map((_, i) => (
//               <Box key={i} sx={{ flex: "0 1 300px", display: "flex", flexDirection: "column", alignItems: "center", pt: 8, position: "relative" }}>
//                 {/* Avatar */}
//                 <Skeleton
//                   variant="circular"
//                   width={120}
//                   height={120}
//                   sx={{ position: "absolute", top: -30, zIndex: 2 }}
//                 />
//                 {/* Card body */}
//                 <Skeleton
//                   variant="rounded"
//                   width="100%"
//                   height={400}
//                   sx={{ borderRadius: "16px", bgcolor: "#e0e0e0" }}
//                 />
//               </Box>
//             ))}
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default AboutSkeleton;


import React from "react";
import {
  Box,
  Skeleton,
  Container,
} from "@mui/material";

const AboutSkeleton = () => {
  return (
    <Box>
      {/* HERO */}
      <Box
        sx={{
          minHeight: { xs: 430, md: 560 },
          backgroundColor: "#101A27",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Skeleton
            variant="text"
            width={100}
            height={25}
            sx={{
              bgcolor:
                "rgba(255,255,255,0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width="55%"
            height={90}
            sx={{
              bgcolor:
                "rgba(255,255,255,0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width="60%"
            height={25}
            sx={{
              bgcolor:
                "rgba(255,255,255,0.08)",
            }}
          />

          <Skeleton
            variant="rounded"
            width={170}
            height={50}
            sx={{
              mt: 3,
              bgcolor:
                "rgba(255,255,255,0.1)",
            }}
          />
        </Container>
      </Box>

      {/* ABOUT */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 8,
              alignItems: "center",
            }}
          >
            <Box>
              <Skeleton
                variant="text"
                width={130}
                height={22}
              />

              <Skeleton
                variant="text"
                width="75%"
                height={55}
              />

              <Skeleton
                variant="text"
                width="100%"
                height={20}
              />

              <Skeleton
                variant="text"
                width="95%"
                height={20}
              />

              <Skeleton
                variant="text"
                width="85%"
                height={20}
              />

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 2,
                  mt: 4,
                }}
              >
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rounded"
                    height={65}
                  />
                ))}
              </Box>
            </Box>

            <Skeleton
              variant="rounded"
              width="100%"
              height={360}
              sx={{
                borderRadius: "20px",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* VISION / MISSION */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: "#0B1421",
        }}
      >
        <Container maxWidth="lg">
          <Skeleton
            variant="text"
            width={180}
            height={25}
            sx={{
              bgcolor:
                "rgba(255,255,255,0.1)",
            }}
          />

          <Skeleton
            variant="text"
            width={350}
            height={55}
            sx={{
              mb: 5,
              bgcolor:
                "rgba(255,255,255,0.1)",
            }}
          />

          {[1, 2].map((item) => (
            <Box
              key={item}
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr",
                },
                gap: 5,
                p: { xs: 3, md: 5 },
                mb: 3,
                border:
                  "1px solid rgba(255,255,255,0.1)",
                borderRadius: "18px",
              }}
            >
              <Box>
                <Skeleton
                  variant="text"
                  width={150}
                  height={30}
                  sx={{
                    bgcolor:
                      "rgba(255,255,255,0.1)",
                  }}
                />

                <Skeleton
                  variant="text"
                  width="70%"
                  height={50}
                  sx={{
                    bgcolor:
                      "rgba(255,255,255,0.1)",
                  }}
                />

                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{
                    bgcolor:
                      "rgba(255,255,255,0.08)",
                  }}
                />

                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{
                    bgcolor:
                      "rgba(255,255,255,0.08)",
                  }}
                />
              </Box>

              <Skeleton
                variant="rounded"
                height={270}
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.08)",
                  borderRadius: "15px",
                }}
              />
            </Box>
          ))}
        </Container>
      </Box>

      {/* VALUES */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 8,
              alignItems: "center",
            }}
          >
            <Box>
              <Skeleton
                variant="text"
                width={130}
                height={22}
              />

              <Skeleton
                variant="text"
                width="65%"
                height={55}
              />

              {[1, 2, 3].map((item) => (
                <Skeleton
                  key={item}
                  variant="text"
                  width="100%"
                  height={20}
                />
              ))}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(4, 1fr)",
                  mt: 4,
                  gap: 1,
                }}
              >
                {[1, 2, 3, 4].map((item) => (
                  <Skeleton
                    key={item}
                    variant="rounded"
                    height={80}
                  />
                ))}
              </Box>
            </Box>

            <Skeleton
              variant="rounded"
              width="100%"
              height={340}
              sx={{
                borderRadius: "20px",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* TEAM INTRO */}
      <Box
        sx={{
          py: { xs: 8, md: 11 },
          backgroundColor: "#111E2C",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
              },
              gap: 8,
              alignItems: "center",
            }}
          >
            <Box>
              <Skeleton
                variant="text"
                width={100}
                height={22}
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.1)",
                }}
              />

              <Skeleton
                variant="text"
                width="75%"
                height={60}
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.1)",
                }}
              />

              <Skeleton
                variant="text"
                width="100%"
                height={20}
                sx={{
                  bgcolor:
                    "rgba(255,255,255,0.08)",
                }}
              />

              <Skeleton
                variant="rounded"
                width={150}
                height={48}
                sx={{
                  mt: 3,
                  bgcolor:
                    "rgba(255,255,255,0.1)",
                }}
              />
            </Box>

            <Skeleton
              variant="rounded"
              width="100%"
              height={340}
              sx={{
                bgcolor:
                  "rgba(255,255,255,0.08)",
                borderRadius: "20px",
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* TEAM CARDS */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Skeleton
            variant="text"
            width={200}
            height={55}
            sx={{ mx: "auto", mb: 5 }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                variant="rounded"
                height={390}
                sx={{
                  borderRadius: "18px",
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutSkeleton;