// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   Grid,
//   Typography,
//   Card,
//   CardMedia,
//   CardActionArea,
//   IconButton,
//   Modal,
//   Fade,
//   Backdrop,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { motion as Motion } from "framer-motion"; // 👈 import Framer Motion

// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export default function PostDesignSection() {
//   const [posts, setPosts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`${backendURL}/api/posts`)
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setPosts(res.data);
//         } else {
//           console.error("Unexpected API response. Expected an array.");
//           setPosts([]);
//         }
//       })
//       .catch((err) => console.error("Error fetching posts:", err));
//   }, []);

//   const handleOpen = (image) => {
//     setSelectedImage(image);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedImage(null);
//   };

//   return (
//     <Box sx={{ bgcolor: "#FFFFFF", py: 10 }}>
//       {/* Section Title */}
//       <Box sx={{ textAlign: "center", mb: 6 }}>
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: "bold",
//             color: "#111E2C",
//             textTransform: "uppercase",
//             letterSpacing: 1,
//           }}
//         >
//           Post Designing
//         </Typography>
//       </Box>

//       {/* Posts Grid */}
//       <Container maxWidth="lg">
//         <Grid container spacing={3} justifyContent="center">
//           {posts.length > 0 ? (
//             posts.map((post, index) => (
//               <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
//                 {/* ✅ Animate Each Card */}
//                 <Motion.div
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{
//                     duration: 0.6,
//                     delay: index * 0.15, // stagger animation
//                     ease: "easeOut",
//                   }}
//                 >
//                   <Box
//                     onClick={() => handleOpen(post.image)}
//                     sx={{
//                       position: "relative",
//                       overflow: "hidden",
//                       boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//                       transition: "all 0.4s ease",
//                       cursor: "pointer",
//                       "&:hover": {
//                         transform: "scale(1.05)",
//                       },
//                       "&:hover .hover-overlay": {
//                         opacity: 1,
//                         backdropFilter: "blur(6px)",
//                       },
//                       "&:hover .plus-icon": {
//                         opacity: 1,
//                         transform: "scale(1)",
//                       },
//                     }}
//                   >
//                     <Card>
//                       <CardActionArea>
//                         <CardMedia
//                           component="img"
//                           image={post.image}
//                           alt={post.title}
//                           sx={{
//                             height: 350,
//                             objectFit: "cover",
//                             width: "100%",
//                           }}
//                         />
//                       </CardActionArea>
//                     </Card>

//                     {/* Hover Overlay */}
//                     <Box
//                       className="hover-overlay"
//                       sx={{
//                         position: "absolute",
//                         top: 0,
//                         left: 0,
//                         width: "100%",
//                         height: "100%",
//                         background: "rgba(0, 0, 0, 0.3)",
//                         opacity: 0,
//                         transition: "all 0.4s ease",
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                       }}
//                     >
//                       <IconButton
//                         className="plus-icon"
//                         sx={{
//                           color: "#fff",
//                           transition: "all 0.3s ease",
//                           transform: "scale(0.7)",
//                           opacity: 0,
//                         }}
//                       >
//                         <AddIcon sx={{ fontSize: 40 }} />
//                       </IconButton>
//                     </Box>
//                   </Box>
//                 </Motion.div>
//               </Grid>
//             ))
//           ) : (
//             <Typography
//               variant="h6"
//               sx={{ textAlign: "center", color: "#777", mt: 4 }}
//             >
//               No posts found.
//             </Typography>
//           )}
//         </Grid>
//       </Container>

//       {/* Modal for Full Image */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{ timeout: 500 }}
//       >
//         <Fade in={open}>
//           <Box
//             onClick={handleClose}
//             sx={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "100vw",
//               height: "100vh",
//               background: "rgba(64, 62, 62, 0.47)",
//               backdropFilter: "blur(8px)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               cursor: "zoom-out",
//             }}
//           >
//             {selectedImage && (
//               <Motion.img
//                 src={selectedImage}
//                 alt="Full view"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4 }}
//                 style={{
//                   maxWidth: "90%",
//                   maxHeight: "90%",
//                   borderRadius: "10px",
//                   objectFit: "contain",
//                 }}
//               />
//             )}
//           </Box>
//         </Fade>
//       </Modal>
//     </Box>
//   );
// }





import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Skeleton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion as Motion } from "framer-motion";

const backendURL = import.meta.env.VITE_BACKEND_URL;

// 🔹 Cloudinary image optimizer
const getOptimizedImage = (url, width = 600) => {
  if (!url?.includes("cloudinary")) return url;
  return url.replace(
    "/upload/",
    `/upload/w_${width},h_${width},c_fill,q_auto,f_auto/`
  );
};

export default function PostDesignSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(`${backendURL}/api/posts`);
      if (Array.isArray(res.data)) setPosts(res.data);
      else setPosts([]);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box component="section" sx={{ bgcolor: "#FFFFFF", py: 10 }}>
      {/* Section Title */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#111E2C",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Post Designing
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          {loading
            ? Array.from(new Array(8)).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
                </Grid>
              ))
            : error
            ? (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "error.main", mt: 4 }}
              >
                Failed to load posts.
              </Typography>
            )
            : posts.length === 0
            ? (
              <Typography
                variant="h6"
                sx={{ textAlign: "center", color: "#777", mt: 4 }}
              >
                No posts found.
              </Typography>
            )
            : posts.map((post, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={post._id}>
                  <Motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  >
                    <Box
                      onClick={() => handleOpen(post.image)}
                      sx={{
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                        transition: "all 0.4s ease",
                        cursor: "pointer",
                        willChange: "transform, opacity",
                        "&:hover": { transform: "scale(1.05)" },
                        "&:hover .hover-overlay": {
                          opacity: 1,
                          backdropFilter: "blur(6px)",
                        },
                        "&:hover .plus-icon": {
                          opacity: 1,
                          transform: "scale(1)",
                        },
                      }}
                    >
                      <Card>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            image={getOptimizedImage(post.image, 350)}
                            alt={post.title || "Post Design"}
                            sx={{
                              height: 350,
                              objectFit: "cover",
                              width: "100%",
                            }}
                          />
                        </CardActionArea>
                      </Card>

                      {/* Hover Overlay */}
                      <Box
                        className="hover-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(0, 0, 0, 0.3)",
                          opacity: 0,
                          transition: "all 0.4s ease",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          className="plus-icon"
                          sx={{
                            color: "#fff",
                            transition: "all 0.3s ease",
                            transform: "scale(0.7)",
                            opacity: 0,
                          }}
                        >
                          <AddIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Motion.div>
                </Grid>
              ))}
        </Grid>
      </Container>

      {/* Modal for Full Image */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        aria-labelledby="post-full-image"
        aria-describedby="full-view-of-selected-post"
      >
        <Fade in={open}>
          <Box
            onClick={handleClose}
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(64, 62, 62, 0.47)",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "zoom-out",
            }}
          >
            {selectedImage && (
              <Motion.img
                src={getOptimizedImage(selectedImage, 800)}
                alt="Full view"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  borderRadius: "10px",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
