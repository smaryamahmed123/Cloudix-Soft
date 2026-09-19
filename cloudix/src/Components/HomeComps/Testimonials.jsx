// import React, {
//   useEffect,
//   useState,
// } from "react";

// import axios from "axios";

// import {
//   Box,
//   Container,
//   Typography,
//   Avatar,
//   Rating,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
// } from "@mui/material";

// import CloseIcon from "@mui/icons-material/Close";
// import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
// import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

// const backendURL =
//   import.meta.env.VITE_BACKEND_URL;

// const Testimonials = () => {
//   const [testimonials, setTestimonials] =
//     useState([]);

//   const [selectedTestimonial, setSelectedTestimonial] =
//     useState(null);

//   const fetchTestimonials = async () => {
//     try {
//       const res = await axios.get(
//         `${backendURL}/api/testimonials/published`
//       );

//       setTestimonials(
//         Array.isArray(res.data)
//           ? res.data.slice(0, 6)
//           : []
//       );
//     } catch (error) {
//       console.error(
//         "Failed to load testimonials:",
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   /* ============================================================
//      READ MORE
//   ============================================================ */

//   const handleReadMore = (testimonial) => {
//     setSelectedTestimonial(testimonial);
//   };

//   /* ============================================================
//      CLOSE DIALOG
//   ============================================================ */

//   const handleClose = () => {
//     setSelectedTestimonial(null);
//   };

//   if (!testimonials.length) {
//     return null;
//   }

//   return (
//     <Box
//       sx={{
//         py: {
//           xs: 7,
//           md: 10,
//         },
//         backgroundColor: "#f9f9f9",
//         overflow: "hidden",
//       }}
//     >
//       <Container
//         maxWidth="xl"
//         sx={{
//           overflow: "hidden",
//         }}
//       >
//         {/* ======================================================
//             HEADING
//         ====================================================== */}

//         <Box
//           textAlign="center"
//           maxWidth={700}
//           mx="auto"
//           mb={{
//             xs: 5,
//             md: 6,
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#769914",
//               fontWeight: 700,
//               textTransform: "uppercase",
//               letterSpacing: 2,
//               fontSize: {
//                 xs: "12px",
//                 md: "14px",
//               },
//               mb: 1,
//             }}
//           >
//             Client Feedback
//           </Typography>

//           <Typography
//             component="h2"
//             sx={{
//               color: "#111E2C",
//               fontWeight: 800,
//               fontSize: {
//                 xs: "2rem",
//                 sm: "2.5rem",
//                 md: "3rem",
//               },
//               lineHeight: 1.15,
//             }}
//           >
//             What Our Clients Say
//           </Typography>

//           <Typography
//             color="text.secondary"
//             mt={2}
//             sx={{
//               fontSize: {
//                 xs: "14px",
//                 md: "16px",
//               },
//             }}
//           >
//             Hear directly from the people and
//             businesses we've worked with.
//           </Typography>
//         </Box>

//         {/* ======================================================
//             HORIZONTAL TESTIMONIAL SCROLL
//         ====================================================== */}

//         <Box
//           sx={{
//             position: "relative",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               gap: 0,

//               overflowX: "auto",
//               overflowY: "hidden",

//               pb: 2,

//               scrollSnapType: "x mandatory",
//               WebkitOverflowScrolling: "touch",

//               "&::-webkit-scrollbar": {
//                 height: "7px",
//               },

//               "&::-webkit-scrollbar-track": {
//                 backgroundColor:
//                   "rgba(17,30,44,0.08)",
//                 borderRadius: "20px",
//               },

//               "&::-webkit-scrollbar-thumb": {
//                 backgroundColor: "#769914",
//                 borderRadius: "20px",
//               },

//               "&::-webkit-scrollbar-thumb:hover": {
//                 backgroundColor: "#5f7f0f",
//               },

//               scrollbarColor:
//                 "#769914 rgba(17,30,44,0.08)",
//               scrollbarWidth: "thin",
//             }}
//           >
//             {testimonials.map(
//               (testimonial) => (
//                 <Box
//                   key={testimonial._id}
//                   sx={{
//                     flex: {
//                       xs: "0 0 88%",
//                       sm: "0 0 48%",
//                       md: "0 0 32%",
//                       lg: "0 0 25%",
//                     },

//                     minWidth: 0,

//                     scrollSnapAlign: "start",

//                     border: "1px solid #111E2C",
//                     borderRight: {
//                       xs: "1px solid #111E2C",
//                       md: "1px solid #111E2C",
//                     },

//                     backgroundColor: "#fff",

//                     minHeight: {
//                       xs: 420,
//                       md: 430,
//                     },

//                     display: "flex",
//                     flexDirection: "column",

//                     transition:
//                       "transform 0.3s ease, box-shadow 0.3s ease",

//                     "&:hover": {
//                       boxShadow:
//                         "0 12px 30px rgba(17,30,44,0.10)",
//                     },
//                   }}
//                 >
//                   {/* ==================================================
//                       TOP MEDIA AREA
//                   ================================================== */}

//                   <Box
//                     sx={{
//                       position: "relative",
//                       height: {
//                         xs: 220,
//                         md: 235,
//                       },

//                       backgroundColor:
//                         "#eef0ec",

//                       overflow: "hidden",

//                       flexShrink: 0,
//                     }}
//                   >
//                     {testimonial.type ===
//                       "video" &&
//                     testimonial.video ? (
//                       <>
//                         <video
//                           src={
//                             testimonial.video
//                           }
//                           controls
//                           preload="metadata"
//                           style={{
//                             width: "100%",
//                             height: "100%",
//                             display: "block",
//                             objectFit: "cover",
//                           }}
//                         />

//                         {/* Video label */}

//                         <Box
//                           sx={{
//                             position:
//                               "absolute",
//                             top: 14,
//                             left: 14,
//                             px: 1.5,
//                             py: 0.6,
//                             borderRadius:
//                               "20px",
//                             backgroundColor:
//                               "rgba(17,30,44,0.82)",
//                             color: "#fff",
//                             fontSize: "11px",
//                             fontWeight: 700,
//                             letterSpacing: 1,
//                             pointerEvents:
//                               "none",
//                           }}
//                         >
//                           VIDEO
//                         </Box>
//                       </>
//                     ) : testimonial.clientImage ? (
//                       <Box
//                         component="img"
//                         src={
//                           testimonial.clientImage
//                         }
//                         alt={
//                           testimonial.clientName
//                         }
//                         loading="lazy"
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           display: "block",
//                         }}
//                       />
//                     ) : (
//                       <Box
//                         sx={{
//                           width: "100%",
//                           height: "100%",
//                           display: "flex",
//                           alignItems:
//                             "center",
//                           justifyContent:
//                             "center",
//                           backgroundColor:
//                             "#111E2C",
//                         }}
//                       >
//                         <Avatar
//                           sx={{
//                             width: 90,
//                             height: 90,
//                             backgroundColor:
//                               "#769914",
//                             color: "#fff",
//                             fontSize: 36,
//                             fontWeight: 700,
//                           }}
//                         >
//                           {testimonial.clientName?.charAt(
//                             0
//                           )}
//                         </Avatar>
//                       </Box>
//                     )}
//                   </Box>

//                   {/* ==================================================
//                       CLIENT INFORMATION
//                   ================================================== */}

//                   <Box
//                     sx={{
//                       px: {
//                         xs: 2.5,
//                         md: 3,
//                       },

//                       pt: 2.5,
//                       pb: 2.5,

//                       flex: 1,

//                       display: "flex",
//                       flexDirection: "column",
//                     }}
//                   >
//                     {/* Client Name */}

//                     <Typography
//                       sx={{
//                         color: "#111E2C",
//                         fontWeight: 800,
//                         fontSize: {
//                           xs: "16px",
//                           md: "17px",
//                         },
//                         mb: 0.7,
//                       }}
//                     >
//                       {testimonial.clientName}
//                     </Typography>

//                     {/* Position + Company */}

//                     <Typography
//                       sx={{
//                         color: "#687386",
//                         fontSize: "13px",
//                         mb: 1.5,
//                       }}
//                     >
//                       {testimonial.position}

//                       {testimonial.position &&
//                         testimonial.companyName &&
//                         " • "}

//                       {testimonial.companyName}
//                     </Typography>

//                     {/* =================================================
//                         RATING
//                     ================================================= */}

//                     {testimonial.type !==
//                       "video" &&
//                       testimonial.rating > 0 && (
//                         <Rating
//                           value={
//                             testimonial.rating
//                           }
//                           readOnly
//                           size="small"
//                           sx={{
//                             mb: 1.5,

//                             "& .MuiRating-iconFilled":
//                               {
//                                 color:
//                                   "#BBBF19",
//                               },
//                           }}
//                         />
//                       )}

//                     {/* =================================================
//                         FEEDBACK PREVIEW
//                     ================================================= */}

//                     {testimonial.type !==
//                       "video" &&
//                       testimonial.text && (
//                         <>
//                           <Box
//                             sx={{
//                               position:
//                                 "relative",
//                               pl: 2,
//                               mb: 1.5,
//                               minHeight: 55,
//                               overflow: "hidden",

//                               "&::before": {
//                                 content:
//                                   '""',
//                                 position:
//                                   "absolute",
//                                 left: 0,
//                                 top: 0,
//                                 bottom: 0,
//                                 width: 3,
//                                 backgroundColor:
//                                   "#769914",
//                                 borderRadius:
//                                   "5px",
//                               },
//                             }}
//                           >
//                             <Typography
//                               sx={{
//                                 color:
//                                   "#555",
//                                 fontSize:
//                                   "13px",
//                                 lineHeight:
//                                   1.7,

//                                 display:
//                                   "-webkit-box",
//                                 WebkitLineClamp:
//                                   2,
//                                 WebkitBoxOrient:
//                                   "vertical",
//                                 overflow:
//                                   "hidden",
//                               }}
//                             >
//                               "{testimonial.text}"
//                             </Typography>
//                           </Box>

//                           {/* Read More */}

//                           <Typography
//                             component="button"
//                             type="button"
//                             onClick={() =>
//                               handleReadMore(
//                                 testimonial
//                               )
//                             }
//                             sx={{
//                               alignSelf:
//                                 "flex-start",

//                               border: 0,
//                               background:
//                                 "transparent",

//                               padding: 0,

//                               color:
//                                 "#769914",

//                               fontSize:
//                                 "13px",

//                               fontWeight: 800,

//                               cursor:
//                                 "pointer",

//                               fontFamily:
//                                 "inherit",

//                               "&:hover": {
//                                 color:
//                                   "#111E2C",
//                                 textDecoration:
//                                   "underline",
//                               },
//                             }}
//                           >
//                             Read More →
//                           </Typography>
//                         </>
//                       )}

//                     {/* Video testimonial bottom */}

//                     {testimonial.type ===
//                       "video" && (
//                       <Typography
//                         sx={{
//                           color: "#769914",
//                           fontSize: "13px",
//                           fontWeight: 700,
//                           mt: "auto",
//                         }}
//                       >
//                         Video Testimonial
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               )
//             )}
//           </Box>
//         </Box>

//         {/* ======================================================
//             SCROLL HINT
//         ====================================================== */}

//         {testimonials.length > 1 && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               gap: 1,
//               mt: 2,
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#687386",
//                 fontSize: "12px",
//               }}
//             >
//               ← Scroll to see more feedback →
//             </Typography>
//           </Box>
//         )}
//       </Container>

//       {/* ========================================================
//           FULL FEEDBACK DIALOG
//       ======================================================== */}

//       <Dialog
//         open={Boolean(
//           selectedTestimonial
//         )}
//         onClose={handleClose}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             overflow: "hidden",
//           },
//         }}
//       >
//         {selectedTestimonial && (
//           <>
//             {/* Dialog Header */}

//             <DialogTitle
//               sx={{
//                 backgroundColor: "#111E2C",
//                 color: "#fff",
//                 pr: 7,
//                 fontWeight: 800,
//               }}
//             >
//               Client Feedback

//               <IconButton
//                 onClick={handleClose}
//                 sx={{
//                   position: "absolute",
//                   right: 10,
//                   top: 10,
//                   color: "#fff",
//                 }}
//               >
//                 <CloseIcon />
//               </IconButton>
//             </DialogTitle>

//             <DialogContent
//               sx={{
//                 p: {
//                   xs: 3,
//                   md: 4,
//                 },
//               }}
//             >
//               {/* Client */}

//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   mb: 3,
//                 }}
//               >
//                 <Avatar
//                   src={
//                     selectedTestimonial.clientImage
//                   }
//                   alt={
//                     selectedTestimonial.clientName
//                   }
//                   sx={{
//                     width: 60,
//                     height: 60,
//                     backgroundColor:
//                       "#769914",
//                   }}
//                 >
//                   {selectedTestimonial.clientName?.charAt(
//                     0
//                   )}
//                 </Avatar>

//                 <Box>
//                   <Typography
//                     sx={{
//                       fontWeight: 800,
//                       color: "#111E2C",
//                     }}
//                   >
//                     {
//                       selectedTestimonial.clientName
//                     }
//                   </Typography>

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     {
//                       selectedTestimonial.position
//                     }

//                     {selectedTestimonial.position &&
//                       selectedTestimonial.companyName &&
//                       " • "}

//                     {
//                       selectedTestimonial.companyName
//                     }
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Rating */}

//               {selectedTestimonial.type !==
//                 "video" &&
//                 selectedTestimonial.rating >
//                   0 && (
//                   <Rating
//                     value={
//                       selectedTestimonial.rating
//                     }
//                     readOnly
//                     sx={{
//                       mb: 2,

//                       "& .MuiRating-iconFilled":
//                         {
//                           color:
//                             "#BBBF19",
//                         },
//                     }}
//                   />
//                 )}

//               {/* Quote */}

//               <FormatQuoteRoundedIcon
//                 sx={{
//                   fontSize: 45,
//                   color: "#769914",
//                   mb: -1,
//                 }}
//               />

//               {/* Full Feedback */}

//               <Typography
//                 sx={{
//                   color: "#444",
//                   lineHeight: 1.9,
//                   fontSize: "15px",
//                 }}
//               >
//                 "{selectedTestimonial.text}"
//               </Typography>
//             </DialogContent>
//           </>
//         )}
//       </Dialog>
//     </Box>
//   );
// };

// export default Testimonials;







import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null);

  /* ============================================================
     FETCH TESTIMONIALS
  ============================================================ */

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        `${backendURL}/api/testimonials/published`
      );

      setTestimonials(
        Array.isArray(res.data)
          ? res.data.slice(0, 6)
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load testimonials:",
        error
      );
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ============================================================
     READ MORE
  ============================================================ */

  const handleReadMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  /* ============================================================
     CLOSE DIALOG
  ============================================================ */

  const handleClose = () => {
    setSelectedTestimonial(null);
  };

  /* ============================================================
     HIDE SECTION IF NO TESTIMONIALS
  ============================================================ */

  if (!testimonials.length) {
    return null;
  }

  return (
    <Box
      sx={{
        py: {
          xs: 7,
          md: 10,
        },

        backgroundColor: "#f9f9f9",

        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          overflow: "hidden",
        }}
      >
        {/* ======================================================
            HEADING
        ====================================================== */}

        <Box
          textAlign="center"
          maxWidth={700}
          mx="auto"
          mb={{
            xs: 5,
            md: 6,
          }}
        >
          <Typography
            sx={{
              color: "#769914",

              fontWeight: 700,

              textTransform: "uppercase",

              letterSpacing: 2,

              fontSize: {
                xs: "12px",
                md: "14px",
              },

              mb: 1,
            }}
          >
            Client Feedback
          </Typography>

          <Typography
            component="h2"
            sx={{
              color: "#111E2C",

              fontWeight: 800,

              fontSize: {
                xs: "2rem",
                sm: "2.5rem",
                md: "3rem",
              },

              lineHeight: 1.15,
            }}
          >
            What Our Clients Say
          </Typography>

          <Typography
            color="text.secondary"
            mt={2}
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },
            }}
          >
            Hear directly from the people and
            businesses we've worked with.
          </Typography>
        </Box>

        {/* ======================================================
            HORIZONTAL TESTIMONIAL SCROLL
        ====================================================== */}

        <Box
          sx={{
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",

              gap: {
                xs: 2,
                sm: 2.5,
                md: 3,
              },

              overflowX: "auto",

              overflowY: "hidden",

              pb: 2,

              scrollSnapType: "x mandatory",

              WebkitOverflowScrolling: "touch",

              "&::-webkit-scrollbar": {
                height: "7px",
              },

              "&::-webkit-scrollbar-track": {
                backgroundColor:
                  "rgba(17,30,44,0.08)",

                borderRadius: "20px",
              },

              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#769914",

                borderRadius: "20px",
              },

              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#5f7f0f",
              },

              scrollbarColor:
                "#769914 rgba(17,30,44,0.08)",

              scrollbarWidth: "thin",
            }}
          >
            {/* ==================================================
                TESTIMONIAL CARDS
            ================================================== */}

            {testimonials.map((testimonial) => (
              <Box
                key={testimonial._id}
                sx={{
                  flex: {
                    xs: "0 0 88%",
                    sm: "0 0 48%",
                    md: "0 0 32%",
                    lg: "0 0 25%",
                  },

                  minWidth: 0,

                  scrollSnapAlign: "start",

                  position: "relative",

                  borderRadius: 4,

                  overflow: "hidden",

                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f6f8f2 100%)",

                  border:
                    "1px solid rgba(118,153,20,0.18)",

                  boxShadow:
                    "0 10px 35px rgba(17,30,44,0.08)",

                  minHeight: {
                    xs: 440,
                    md: 455,
                  },

                  display: "flex",

                  flexDirection: "column",

                  transition:
                    "transform 0.35s ease, box-shadow 0.35s ease",

                  "&:hover": {
                    transform:
                      "translateY(-8px)",

                    boxShadow:
                      "0 20px 45px rgba(17,30,44,0.15)",
                  },
                }}
              >
                {/* ==================================================
                    TOP MEDIA
                ================================================== */}

                <Box
                  sx={{
                    position: "relative",

                    height: {
                      xs: 220,
                      md: 230,
                    },

                    overflow: "hidden",

                    background:
                      "linear-gradient(135deg, #111E2C, #27394b)",

                    flexShrink: 0,

                    "&::after": {
                      content: '""',

                      position: "absolute",

                      inset: 0,

                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(17,30,44,0.45) 100%)",

                      pointerEvents: "none",
                    },

                    "& img": {
                      transition:
                        "transform 0.6s ease",
                    },

                    "&:hover img": {
                      transform:
                        "scale(1.05)",
                    },
                  }}
                >
                  {/* ==================================================
                      VIDEO
                  ================================================== */}

                  {testimonial.type === "video" &&
                  testimonial.video ? (
                    <>
                      <video
                        src={testimonial.video}
                        controls
                        preload="metadata"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                          objectFit: "cover",
                        }}
                      />

                      {/* Video Badge */}

                      <Box
                        sx={{
                          position: "absolute",

                          top: 15,

                          left: 15,

                          display: "flex",

                          alignItems: "center",

                          gap: 0.7,

                          px: 1.5,

                          py: 0.7,

                          borderRadius:
                            "999px",

                          backgroundColor:
                            "rgba(17,30,44,0.85)",

                          backdropFilter:
                            "blur(8px)",

                          color: "#fff",

                          fontSize: "10px",

                          fontWeight: 800,

                          letterSpacing: 1,

                          zIndex: 2,

                          pointerEvents:
                            "none",
                        }}
                      >
                        <PlayCircleOutlineRoundedIcon
                          sx={{
                            fontSize: 17,
                          }}
                        />

                        VIDEO TESTIMONIAL
                      </Box>
                    </>
                  ) : testimonial.clientImage ? (
                    /* ==================================================
                       CLIENT IMAGE
                    ================================================== */

                    <Box
                      component="img"
                      src={
                        testimonial.clientImage
                      }
                      alt={
                        testimonial.clientName ||
                        "Client"
                      }
                      loading="lazy"
                      sx={{
                        width: "100%",

                        height: "100%",

                        objectFit: "cover",

                        display: "block",
                      }}
                    />
                  ) : (
                    /* ==================================================
                       AVATAR FALLBACK
                    ================================================== */

                    <Box
                      sx={{
                        width: "100%",

                        height: "100%",

                        display: "flex",

                        alignItems: "center",

                        justifyContent:
                          "center",

                        background:
                          "linear-gradient(135deg, #111E2C, #26394a)",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 95,

                          height: 95,

                          backgroundColor:
                            "#769914",

                          color: "#fff",

                          fontSize: 38,

                          fontWeight: 800,

                          boxShadow:
                            "0 10px 30px rgba(0,0,0,0.25)",
                        }}
                      >
                        {testimonial.clientName?.charAt(
                          0
                        )}
                      </Avatar>
                    </Box>
                  )}

                  {/* ==================================================
                      QUOTE ICON
                  ================================================== */}

                  {testimonial.type !==
                    "video" && (
                    <Box
                      sx={{
                        position:
                          "absolute",

                        right: 18,

                        bottom: 15,

                        width: 42,

                        height: 42,

                        borderRadius: "50%",

                        display: "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        backgroundColor:
                          "rgba(255,255,255,0.92)",

                        color: "#769914",

                        zIndex: 3,

                        boxShadow:
                          "0 5px 18px rgba(0,0,0,0.15)",
                      }}
                    >
                      <FormatQuoteRoundedIcon />
                    </Box>
                  )}
                </Box>

                {/* ==================================================
                    CARD CONTENT
                ================================================== */}

                <Box
                  sx={{
                    px: {
                      xs: 2.5,
                      md: 3,
                    },

                    pt: 2.8,

                    pb: 2.8,

                    flex: 1,

                    display: "flex",

                    flexDirection: "column",
                  }}
                >
                  {/* ==================================================
                      CLIENT
                  ================================================== */}

                  <Box
                    sx={{
                      display: "flex",

                      alignItems:
                        "center",

                      gap: 1.5,

                      mb: 2,
                    }}
                  >
                    {/* Small Avatar */}

                    <Avatar
                      src={
                        testimonial.clientImage ||
                        undefined
                      }
                      sx={{
                        width: 44,

                        height: 44,

                        backgroundColor:
                          "#111E2C",

                        color: "#fff",

                        fontSize: 16,

                        fontWeight: 800,

                        border:
                          "2px solid rgba(118,153,20,0.35)",
                      }}
                    >
                      {testimonial.clientName?.charAt(
                        0
                      )}
                    </Avatar>

                    <Box
                      sx={{
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            "#111E2C",

                          fontWeight: 800,

                          fontSize: "15px",

                          whiteSpace:
                            "nowrap",

                          overflow:
                            "hidden",

                          textOverflow:
                            "ellipsis",
                        }}
                      >
                        {testimonial.clientName}
                      </Typography>

                      {(testimonial.position ||
                        testimonial.companyName) && (
                        <Typography
                          sx={{
                            color:
                              "#687386",

                            fontSize:
                              "11.5px",

                            mt: 0.3,

                            whiteSpace:
                              "nowrap",

                            overflow:
                              "hidden",

                            textOverflow:
                              "ellipsis",
                          }}
                        >
                          {
                            testimonial.position
                          }

                          {testimonial.position &&
                            testimonial.companyName &&
                            " • "}

                          {
                            testimonial.companyName
                          }
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  {/* ==================================================
                      RATING
                  ================================================== */}

                  {testimonial.type !==
                    "video" &&
                    testimonial.rating >
                      0 && (
                      <Box
                        sx={{
                          display: "flex",

                          alignItems:
                            "center",

                          gap: 1,

                          mb: 1.5,
                        }}
                      >
                        <Rating
                          value={
                            testimonial.rating
                          }
                          readOnly
                          size="small"
                          sx={{
                            "& .MuiRating-iconFilled":
                              {
                                color:
                                  "#BBBF19",
                              },
                          }}
                        />

                        <Typography
                          sx={{
                            color:
                              "#687386",

                            fontSize:
                              "11px",

                            fontWeight: 700,
                          }}
                        >
                          {
                            testimonial.rating
                          }
                          /5
                        </Typography>
                      </Box>
                    )}

                  {/* ==================================================
                      FEEDBACK
                  ================================================== */}

                  {testimonial.type !==
                    "video" &&
                    testimonial.text && (
                      <>
                        <Box
                          sx={{
                            position:
                              "relative",

                            pl: 2,

                            mb: 2,

                            "&::before": {
                              content:
                                '""',

                              position:
                                "absolute",

                              left: 0,

                              top: 2,

                              bottom: 2,

                              width: 3,

                              borderRadius:
                                10,

                              background:
                                "linear-gradient(180deg, #769914, #BBBF19)",
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                "#4d5663",

                              fontSize:
                                "13px",

                              lineHeight:
                                1.75,

                              display:
                                "-webkit-box",

                              WebkitLineClamp:
                                3,

                              WebkitBoxOrient:
                                "vertical",

                              overflow:
                                "hidden",
                            }}
                          >
                            "{testimonial.text}"
                          </Typography>
                        </Box>

                        {/* Read More */}

                        <Typography
                          component="button"
                          type="button"
                          onClick={() =>
                            handleReadMore(
                              testimonial
                            )
                          }
                          sx={{
                            alignSelf:
                              "flex-start",

                            border: 0,

                            background:
                              "transparent",

                            padding: 0,

                            color:
                              "#769914",

                            fontSize:
                              "12px",

                            fontWeight: 800,

                            cursor:
                              "pointer",

                            fontFamily:
                              "inherit",

                            transition:
                              "all 0.25s ease",

                            "&:hover": {
                              color:
                                "#111E2C",

                              transform:
                                "translateX(3px)",
                            },
                          }}
                        >
                          Read Full Feedback →
                        </Typography>
                      </>
                    )}

                  {/* ==================================================
                      VIDEO TESTIMONIAL LABEL
                  ================================================== */}

                  {testimonial.type ===
                    "video" && (
                    <Box
                      sx={{
                        mt: "auto",

                        display: "flex",

                        alignItems:
                          "center",

                        gap: 1,

                        pt: 1.5,
                      }}
                    >
                      <PlayCircleOutlineRoundedIcon
                        sx={{
                          color:
                            "#769914",

                          fontSize: 20,
                        }}
                      />

                      <Typography
                        sx={{
                          color:
                            "#769914",

                          fontSize:
                            "12px",

                          fontWeight: 800,
                        }}
                      >
                        Video Testimonial
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ======================================================
            SCROLL HINT
        ====================================================== */}

        {testimonials.length > 1 && (
          <Box
            sx={{
              display: "flex",

              justifyContent:
                "center",

              alignItems: "center",

              gap: 1,

              mt: 2,
            }}
          >
            <Typography
              sx={{
                color: "#687386",

                fontSize: "12px",
              }}
            >
              ← Scroll to see more feedback →
            </Typography>
          </Box>
        )}
      </Container>

      {/* ========================================================
          FULL FEEDBACK DIALOG
      ======================================================== */}

      <Dialog
        open={Boolean(
          selectedTestimonial
        )}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,

            overflow: "hidden",
          },
        }}
      >
        {selectedTestimonial && (
          <>
            {/* ==================================================
                DIALOG HEADER
            ================================================== */}

            <DialogTitle
              sx={{
                backgroundColor:
                  "#111E2C",

                color: "#fff",

                pr: 7,

                fontWeight: 800,
              }}
            >
              Client Feedback

              <IconButton
                onClick={handleClose}
                sx={{
                  position:
                    "absolute",

                  right: 10,

                  top: 10,

                  color: "#fff",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            {/* ==================================================
                DIALOG CONTENT
            ================================================== */}

            <DialogContent
              sx={{
                p: {
                  xs: 3,
                  md: 4,
                },
              }}
            >
              {/* Client */}

              <Box
                sx={{
                  display: "flex",

                  alignItems:
                    "center",

                  gap: 2,

                  mb: 3,
                }}
              >
                <Avatar
                  src={
                    selectedTestimonial.clientImage
                  }
                  alt={
                    selectedTestimonial.clientName
                  }
                  sx={{
                    width: 60,

                    height: 60,

                    backgroundColor:
                      "#769914",
                  }}
                >
                  {selectedTestimonial.clientName?.charAt(
                    0
                  )}
                </Avatar>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,

                      color:
                        "#111E2C",
                    }}
                  >
                    {
                      selectedTestimonial.clientName
                    }
                  </Typography>

                  {(selectedTestimonial.position ||
                    selectedTestimonial.companyName) && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        selectedTestimonial.position
                      }

                      {selectedTestimonial.position &&
                        selectedTestimonial.companyName &&
                        " • "}

                      {
                        selectedTestimonial.companyName
                      }
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Rating */}

              {selectedTestimonial.type !==
                "video" &&
                selectedTestimonial.rating >
                  0 && (
                  <Rating
                    value={
                      selectedTestimonial.rating
                    }
                    readOnly
                    sx={{
                      mb: 2,

                      "& .MuiRating-iconFilled":
                        {
                          color:
                            "#BBBF19",
                        },
                    }}
                  />
                )}

              {/* Quote */}

              <FormatQuoteRoundedIcon
                sx={{
                  fontSize: 45,

                  color: "#769914",

                  mb: -1,
                }}
              />

              {/* Full Feedback */}

              <Typography
                sx={{
                  color: "#444",

                  lineHeight: 1.9,

                  fontSize: "15px",
                }}
              >
                "{selectedTestimonial.text}"
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Testimonials;

