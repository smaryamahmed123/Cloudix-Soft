// // import React, { useEffect, useMemo, useState } from "react";
// // import axios from "axios";
// // import {
// //   Box,
// //   Button,
// //   Container,
// //   Divider,
// //   Grid,
// //   Skeleton,
// //   Typography,
// //   Alert,
// // } from "@mui/material";
// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import AccessTimeIcon from "@mui/icons-material/AccessTime";
// // import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// // import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// // import { Helmet } from "react-helmet-async";
// // import { useNavigate, useParams } from "react-router-dom";

// // import BlogCard from "../Components/BlogComponents/BlogCard";

// // const backendURL = import.meta.env.VITE_BACKEND_URL;

// // const getReadingTime = (content = "") => {
// //   const words = content.trim().split(/\s+/).length;

// //   return Math.max(
// //     1,
// //     Math.ceil(words / 200)
// //   );
// // };

// // const BlogDetails = () => {
// //   const { slug } = useParams();
// //   const navigate = useNavigate();

// //   const [blog, setBlog] = useState(null);
// //   const [allBlogs, setAllBlogs] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   useEffect(() => {
// //     const fetchBlog = async () => {
// //       try {
// //         setLoading(true);
// //         setError("");

// //         const response = await axios.get(
// //           `${backendURL}/api/blogs`
// //         );

// //         const blogs = Array.isArray(response.data)
// //           ? response.data
// //           : [];

// //         setAllBlogs(blogs);

// //         const foundBlog = blogs.find(
// //           (item) =>
// //             item.slug === slug ||
// //             item._id === slug
// //         );

// //         if (!foundBlog) {
// //           setError("Blog article not found.");
// //           return;
// //         }

// //         setBlog(foundBlog);
// //       } catch (err) {
// //         console.error(err);
// //         setError(
// //           "Unable to load this article. Please try again."
// //         );
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchBlog();
// //   }, [slug]);

// //   const relatedBlogs = useMemo(() => {
// //     if (!blog) return [];

// //     return allBlogs
// //       .filter(
// //         (item) =>
// //           item._id !== blog._id &&
// //           item.category &&
// //           item.category.toLowerCase() ===
// //             blog.category?.toLowerCase()
// //       )
// //       .slice(0, 3);
// //   }, [allBlogs, blog]);

// //   if (loading) {
// //     return (
// //       <Container
// //         maxWidth="md"
// //         sx={{ py: 8 }}
// //       >
// //         <Skeleton
// //           variant="rectangular"
// //           height={450}
// //           sx={{ borderRadius: 3 }}
// //         />

// //         <Skeleton
// //           width="40%"
// //           height={25}
// //           sx={{ mt: 4 }}
// //         />

// //         <Skeleton
// //           width="90%"
// //           height={60}
// //         />

// //         <Skeleton width="70%" height={30} />

// //         <Skeleton
// //           width="100%"
// //           height={100}
// //           sx={{ mt: 4 }}
// //         />
// //       </Container>
// //     );
// //   }

// //   if (error || !blog) {
// //     return (
// //       <Container
// //         maxWidth="md"
// //         sx={{
// //           py: 12,
// //           textAlign: "center",
// //         }}
// //       >
// //         <Alert severity="error">
// //           {error || "Article not found."}
// //         </Alert>

// //         <Button
// //           startIcon={<ArrowBackIcon />}
// //           onClick={() => navigate("/blogs")}
// //           sx={{
// //             mt: 3,
// //             color: "#769914",
// //             textTransform: "none",
// //             fontWeight: 700,
// //           }}
// //         >
// //           Back to Blog
// //         </Button>
// //       </Container>
// //     );
// //   }

// //   const canonicalUrl =
// //     `https://cloudixsoft.com/blogs/${blog.slug || blog._id}`;

// //   return (
// //     <>
// //       <Helmet>
// //         <title>
// //           {blog.title} | Cloudix Soft Blog
// //         </title>

// //         <meta
// //           name="description"
// //           content={blog.content?.slice(0, 155)}
// //         />

// //         <meta
// //           property="og:title"
// //           content={blog.title}
// //         />

// //         <meta
// //           property="og:description"
// //           content={blog.content?.slice(0, 155)}
// //         />

// //         {blog.image && (
// //           <meta
// //             property="og:image"
// //             content={blog.image}
// //           />
// //         )}

// //         <meta
// //           property="og:type"
// //           content="article"
// //         />

// //         <link
// //           rel="canonical"
// //           href={canonicalUrl}
// //         />
// //       </Helmet>

// //       {/* Article Header */}
// //       <Box
// //         sx={{
// //           backgroundColor: "#111E2C",
// //           color: "#fff",
// //           py: { xs: 6, md: 9 },
// //         }}
// //       >
// //         <Container maxWidth="md">
// //           <Button
// //             startIcon={<ArrowBackIcon />}
// //             onClick={() => navigate("/blogs")}
// //             sx={{
// //               mb: 4,
// //               color: "rgba(255,255,255,0.7)",
// //               textTransform: "none",
// //               "&:hover": {
// //                 color: "#fff",
// //                 backgroundColor: "transparent",
// //               },
// //             }}
// //           >
// //             Back to Blog
// //           </Button>

// //           <Typography
// //             sx={{
// //               color: "#BBBF19",
// //               fontWeight: 700,
// //               fontSize: "0.8rem",
// //               textTransform: "uppercase",
// //               letterSpacing: 1.5,
// //             }}
// //           >
// //             {blog.category || "General"}
// //           </Typography>

// //           <Typography
// //             component="h1"
// //             sx={{
// //               mt: 1.5,
// //               fontSize: {
// //                 xs: "2.1rem",
// //                 md: "3.6rem",
// //               },
// //               lineHeight: 1.1,
// //               fontWeight: 800,
// //             }}
// //           >
// //             {blog.title}
// //           </Typography>

// //           <Box
// //             sx={{
// //               display: "flex",
// //               flexWrap: "wrap",
// //               gap: 2.5,
// //               mt: 3,
// //               color: "rgba(255,255,255,0.65)",
// //             }}
// //           >
// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 0.7,
// //               }}
// //             >
// //               <PersonOutlineIcon fontSize="small" />

// //               <Typography variant="body2">
// //                 {blog.author || "Cloudix Team"}
// //               </Typography>
// //             </Box>

// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 0.7,
// //               }}
// //             >
// //               <CalendarTodayOutlinedIcon fontSize="small" />

// //               <Typography variant="body2">
// //                 {blog.createdAt
// //                   ? new Date(
// //                       blog.createdAt
// //                     ).toLocaleDateString()
// //                   : ""}
// //               </Typography>
// //             </Box>

// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 0.7,
// //               }}
// //             >
// //               <AccessTimeIcon fontSize="small" />

// //               <Typography variant="body2">
// //                 {getReadingTime(blog.content)} min read
// //               </Typography>
// //             </Box>
// //           </Box>
// //         </Container>
// //       </Box>

// //       {/* Main Article */}
// //       <Container
// //         maxWidth="lg"
// //         sx={{
// //           py: { xs: 5, md: 8 },
// //         }}
// //       >
// //         <Grid container justifyContent="center">
// //           <Grid
// //             item
// //             xs={12}
// //             md={9}
// //             lg={8}
// //           >
// //             {blog.image && (
// //               <Box
// //                 component="img"
// //                 src={blog.image}
// //                 alt={blog.title}
// //                 sx={{
// //                   width: "100%",
// //                   maxHeight: 550,
// //                   objectFit: "cover",
// //                   borderRadius: "20px",
// //                   display: "block",
// //                   mb: 5,
// //                 }}
// //               />
// //             )}

// //             <Box
// //               sx={{
// //                 fontSize: {
// //                   xs: "1rem",
// //                   md: "1.08rem",
// //                 },
// //                 lineHeight: 1.9,
// //                 color: "#303840",
// //                 whiteSpace: "pre-line",
// //               }}
// //             >
// //               {blog.content}
// //             </Box>

// //             <Divider sx={{ my: 6 }} />

// //             <Box
// //               sx={{
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //                 gap: 2,
// //                 flexWrap: "wrap",
// //               }}
// //             >
// //               <Box>
// //                 <Typography
// //                   variant="caption"
// //                   color="text.secondary"
// //                 >
// //                   WRITTEN BY
// //                 </Typography>

// //                 <Typography
// //                   sx={{
// //                     fontWeight: 700,
// //                     color: "#111E2C",
// //                   }}
// //                 >
// //                   {blog.author || "Cloudix Team"}
// //                 </Typography>
// //               </Box>

// //               <Button
// //                 startIcon={<ArrowBackIcon />}
// //                 onClick={() => navigate("/blogs")}
// //                 sx={{
// //                   color: "#769914",
// //                   textTransform: "none",
// //                   fontWeight: 700,
// //                 }}
// //               >
// //                 More Articles
// //               </Button>
// //             </Box>
// //           </Grid>
// //         </Grid>

// //         {/* Related */}
// //         {relatedBlogs.length > 0 && (
// //           <Box sx={{ mt: { xs: 8, md: 12 } }}>
// //             <Typography
// //               variant="overline"
// //               sx={{
// //                 color: "#769914",
// //                 fontWeight: 700,
// //               }}
// //             >
// //               KEEP READING
// //             </Typography>

// //             <Typography
// //               component="h2"
// //               sx={{
// //                 fontSize: {
// //                   xs: "1.8rem",
// //                   md: "2.3rem",
// //                 },
// //                 fontWeight: 800,
// //                 color: "#111E2C",
// //                 mb: 3,
// //               }}
// //             >
// //               Related Articles
// //             </Typography>

// //             <Grid container spacing={3}>
// //               {relatedBlogs.map((item) => (
// //                 <Grid
// //                   item
// //                   xs={12}
// //                   md={4}
// //                   key={item._id}
// //                 >
// //                   <BlogCard
// //                     blog={item}
// //                     onClick={(selectedBlog) =>
// //                       navigate(
// //                         `/blogs/${
// //                           selectedBlog.slug ||
// //                           selectedBlog._id
// //                         }`
// //                       )
// //                     }
// //                   />
// //                 </Grid>
// //               ))}
// //             </Grid>
// //           </Box>
// //         )}
// //       </Container>
// //     </>
// //   );
// // };

// // export default BlogDetails;


// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { Helmet } from "react-helmet-async";
// import { useParams } from "react-router-dom";

// const BlogDetails = () => {
//   const { slug } = useParams();

//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] =
//     useState(true);
//   const [error, setError] =
//     useState("");

//   const backendURL =
//     import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const response =
//           await axios.get(
//             `${backendURL}/api/blogs/${slug}`
//           );

//         setBlog(response.data);
//       } catch (err) {
//         console.error(err);

//         setError(
//           err.response?.data?.message ||
//             "Blog not found"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [slug, backendURL]);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "60vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CircularProgress
//           sx={{
//             color: "#769914",
//           }}
//         />
//       </Box>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <Container sx={{ py: 10 }}>
//         <Typography variant="h4">
//           {error || "Blog not found"}
//         </Typography>
//       </Container>
//     );
//   }

//   const seoTitle =
//     blog.seoTitle ||
//     blog.title;

//   const seoDescription =
//     blog.seoDescription ||
//     blog.excerpt ||
//     blog.title;

//   return (
//     <>
//       <Helmet>
//         <title>
//           {seoTitle} | Cloudix Soft
//         </title>

//         <meta
//           name="description"
//           content={seoDescription}
//         />

//         <link
//           rel="canonical"
//           href={`https://cloudixsoft.com/blogs/${blog.slug}`}
//         />

//         <meta
//           property="og:title"
//           content={seoTitle}
//         />

//         <meta
//           property="og:description"
//           content={seoDescription}
//         />

//         <meta
//           property="og:type"
//           content="article"
//         />

//         {blog.coverImage && (
//           <meta
//             property="og:image"
//             content={blog.coverImage}
//           />
//         )}
//       </Helmet>

//       <Box
//         sx={{
//           py: {
//             xs: 6,
//             md: 9,
//           },
//           backgroundColor:
//             "#f7f8f4",
//         }}
//       >
//         <Container
//           maxWidth="md"
//         >
//           {/* Category */}

//           <Typography
//             sx={{
//               color: "#769914",
//               fontWeight: 700,
//               textTransform:
//                 "uppercase",
//               letterSpacing: 1,
//               mb: 2,
//             }}
//           >
//             {blog.category}
//           </Typography>

//           {/* Title */}

//           <Typography
//             component="h1"
//             sx={{
//               fontSize: {
//                 xs: "2.2rem",
//                 md: "4rem",
//               },
//               lineHeight: 1.1,
//               fontWeight: 800,
//               color: "#111E2C",
//             }}
//           >
//             {blog.title}
//           </Typography>

//           {/* Meta */}

//           <Typography
//             sx={{
//               mt: 3,
//               color: "text.secondary",
//             }}
//           >
//             By {blog.author} •{" "}
//             {new Date(
//               blog.createdAt
//             ).toLocaleDateString(
//               "en-US",
//               {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               }
//             )}
//           </Typography>

//           {/* Cover */}

//           {blog.coverImage && (
//             <Box
//               component="img"
//               src={blog.coverImage}
//               alt={blog.title}
//               sx={{
//                 width: "100%",
//                 mt: 5,
//                 borderRadius: 3,
//                 display: "block",
//               }}
//             />
//           )}

//           {/* Content */}

//           <Box
//             className="public-blog-content"
//             sx={{
//               mt: 6,
//               color: "#263238",
//               fontSize: {
//                 xs: "1rem",
//                 md: "1.12rem",
//               },
//               lineHeight: 1.9,

//               "& h1": {
//                 fontSize: {
//                   xs: "2rem",
//                   md: "2.7rem",
//                 },
//                 lineHeight: 1.2,
//                 color: "#111E2C",
//                 mt: 5,
//                 mb: 2,
//               },

//               "& h2": {
//                 fontSize: {
//                   xs: "1.6rem",
//                   md: "2.1rem",
//                 },
//                 lineHeight: 1.3,
//                 color: "#111E2C",
//                 mt: 4,
//                 mb: 2,
//               },

//               "& h3": {
//                 fontSize: {
//                   xs: "1.3rem",
//                   md: "1.6rem",
//                 },
//                 color: "#111E2C",
//                 mt: 3,
//                 mb: 1.5,
//               },

//               "& p": {
//                 mb: 2,
//               },

//               "& ul, & ol": {
//                 pl: 4,
//                 mb: 3,
//               },

//               "& li": {
//                 mb: 1,
//               },

//               "& blockquote": {
//                 borderLeft:
//                   "5px solid #769914",
//                 backgroundColor:
//                   "#f0f3e7",
//                 p: 2,
//                 pl: 3,
//                 my: 4,
//                 fontStyle: "italic",
//                 borderRadius:
//                   "0 8px 8px 0",
//               },

//               "& a": {
//                 color: "#769914",
//                 fontWeight: 600,
//               },

//               "& img": {
//                 width: "100%",
//                 maxWidth: "100%",
//                 height: "auto",
//                 borderRadius: 2,
//                 my: 3,
//               },
//             }}
//             dangerouslySetInnerHTML={{
//               __html: blog.content,
//             }}
//           />
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default BlogDetails;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { Helmet } from "react-helmet-async";
import { Alert, Box, Button, Container, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate, useParams } from "react-router-dom";

import BlogCard from "../Components/BlogComponents/BlogCard";
import BlogCTA from "../Components/BlogComponents/BlogCTA";
import { CategoryPill, Cover, Meta, SectionHeading, getImage } from "../Components/BlogComponents/BlogShared";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const decode = (s) => {
  const t = document.createElement("textarea");
  t.innerHTML = s;
  return t.value;
};

// Some entries were saved HTML-escaped (&lt;p&gt;). Decode those, then sanitize.
const prepareHtml = (content = "") => {
  const looksEscaped = !/<[a-z][\s\S]*>/i.test(content) && /&lt;/.test(content);
  return DOMPurify.sanitize(looksEscaped ? decode(content) : content);
};

const contentSx = {
  color: "text.primary",
  fontSize: { xs: "1rem", md: "1.08rem" },
  lineHeight: 1.85,
  "& h1, & h2, & h3": { color: "primary.dark", fontWeight: 700, lineHeight: 1.3 },
  "& h1": { fontSize: { xs: "1.9rem", md: "2.4rem" }, mt: 5, mb: 2 },
  "& h2": { fontSize: { xs: "1.5rem", md: "1.9rem" }, mt: 4, mb: 2 },
  "& h3": { fontSize: { xs: "1.2rem", md: "1.4rem" }, mt: 3, mb: 1.5 },
  "& p": { mb: 2.2 },
  "& ul, & ol": { pl: 4, mb: 3 },
  "& li": { mb: 1 },
  "& blockquote": {
    m: "32px 0", p: "16px 24px", fontStyle: "italic",
    borderLeft: "4px solid #769914", bgcolor: "background.subtle", borderRadius: "0 10px 10px 0",
  },
  "& a": { color: "primary.main", fontWeight: 600 },
  "& img": { width: "100%", height: "auto", borderRadius: "12px", my: 3 },
  "& table": { width: "100%", display: "block", overflowX: "auto" },
};

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await axios.get(`${backendURL}/api/blogs/${slug}`);
        setBlog(data);
      } catch (err) {
        console.error(err);
        setBlog(null);
        setError(err.response?.data?.message || "Blog not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  // Related articles: non-blocking, failure just hides the section.
  useEffect(() => {
    if (!blog) return;
    axios
      .get(`${backendURL}/api/blogs`)
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : [];
        const sameCat = list.filter(
          (b) => b._id !== blog._id && b.category?.toLowerCase() === blog.category?.toLowerCase()
        );
        const others = list.filter((b) => b._id !== blog._id && !sameCat.includes(b));
        setRelated([...sameCat, ...others].slice(0, 3));
      })
      .catch(() => setRelated([]));
  }, [blog]);

  const html = useMemo(() => prepareHtml(blog?.content), [blog]);
  const openBlog = (b) => navigate(`/blogs/${b.slug || b._id}`);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Skeleton width="20%" height={28} />
        <Skeleton width="90%" height={70} />
        <Skeleton width="40%" height={24} />
        <Skeleton variant="rectangular" height={340} sx={{ mt: 4, borderRadius: 3 }} />
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: "center" }}>
        <Alert severity="error">{error || "Blog not found"}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/blogs")}
          sx={{ mt: 3, color: "primary.main", textTransform: "none", fontWeight: 700 }}
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  const seoTitle = blog.seoTitle || blog.title;
  const seoDescription = blog.seoDescription || blog.excerpt || blog.title;
  const cover = getImage(blog);

  return (
    <>
      <Helmet>
        <title>{seoTitle} | Cloudix Soft</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={`https://cloudixsoft.com/blogs/${blog.slug || slug}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:type" content="article" />
        {cover && <meta property="og:image" content={cover} />}
      </Helmet>

      {/* Header */}
      <Box sx={{ bgcolor: "primary.dark", color: "#fff", py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/blogs")}
            sx={{
              mb: 3, px: 0, textTransform: "none", color: "rgba(255,255,255,0.7)",
              "&:hover": { color: "#fff", bgcolor: "transparent" },
            }}
          >
            Back to Blog
          </Button>

          <Box><CategoryPill>{blog.category || "General"}</CategoryPill></Box>

          <Typography
            component="h1"
            sx={{ mt: 2, fontWeight: 700, lineHeight: 1.15, fontSize: { xs: "2rem", md: "3rem" } }}
          >
            {blog.title}
          </Typography>

          <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>
              <PersonOutlineIcon sx={{ fontSize: 15 }} />
              {blog.author || "Cloudix Team"}
            </Box>
            <Meta blog={blog} light />
          </Box>
        </Container>
      </Box>

      {/* Article */}
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        {cover && (
          <Cover
            blog={blog}
            sx={{
              height: { xs: 220, md: 400 },
              borderRadius: "16px",
              mt: { xs: -8, md: -12 },
              mb: { xs: 4, md: 6 },
              boxShadow: "0 12px 40px rgba(17,30,44,0.18)",
            }}
          />
        )}

        <Box sx={contentSx} dangerouslySetInnerHTML={{ __html: html }} />

        <Box
          sx={{
            mt: 6, pt: 3, borderTop: "1px solid", borderColor: "divider",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", letterSpacing: 1 }}>WRITTEN BY</Typography>
            <Typography sx={{ fontWeight: 700, color: "primary.dark" }}>{blog.author || "Cloudix Team"}</Typography>
          </Box>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/blogs")}
            sx={{ color: "primary.main", textTransform: "none", fontWeight: 700 }}
          >
            More Articles
          </Button>
        </Box>
      </Container>

      {related.length > 0 && (
        <Container maxWidth="lg" sx={{ pb: { xs: 2, md: 4 } }}>
          <SectionHeading title="Related Articles" large />
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" } }}>
            {related.map((b) => <BlogCard key={b._id} blog={b} onClick={openBlog} />)}
          </Box>
        </Container>
      )}

      <BlogCTA />
    </>
  );
};

export default BlogDetails;