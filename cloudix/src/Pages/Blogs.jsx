import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {
  Container, Typography, Card, CardContent, CardMedia,
  Grid, Button, Box, TextField, Snackbar, Alert, useTheme,
  Skeleton, CardActionArea,
} from "@mui/material";
import { styled } from "@mui/system";
import bgImg from "../assets/blog-bg.webp";
import HeroSection from "../Components/HeroSection";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const RootContainer = styled(Container)({
  minHeight: "100vh",
  paddingTop: "40px",
  paddingBottom: "80px",
});

const BlogCard = styled(Card)({
  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CardFooter = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
});

const SidebarCard = styled(Card)({
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  padding: "24px",
});

const BlogPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [subEmail, setSubEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subSnackbar, setSubSnackbar] = useState({
    open: false, message: "", severity: "success",
  });

  useEffect(() => {
    axios
      .get(`${backendURL}/api/blogs`)
      .then((res) => {
        setBlogs(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const truncateText = (text, maxLength) =>
    text?.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const handleSubscribe = async () => {
    if (!subEmail || !subEmail.includes("@")) {
      setSubSnackbar({ open: true, message: "Please enter a valid email address.", severity: "warning" });
      return;
    }
    setSubLoading(true);
    try {
      await axios.post(`${backendURL}/api/newsletter/subscribe`, { email: subEmail });
      setSubSnackbar({ open: true, message: "Subscribed successfully!", severity: "success" });
      setSubEmail("");
    } catch (err) {
      const msg = err.response?.status === 409 ? "Already subscribed!" : "Subscription failed.";
      setSubSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <>
      {/* 1. Page SEO Metadata */}
      <Helmet>
        <title>Blog & Insights | Tech & Marketing - Cloudix Soft</title>
        <meta
          name="description"
          content="Explore Cloudix Soft's latest articles on web development, mobile app creation, graphic design trends, and digital marketing strategies."
        />
        <meta property="og:title" content="Blog & Insights | Cloudix Soft" />
        <meta
          property="og:description"
          content="Latest insights on software engineering, UX/UI design, and digital growth."
        />
        <link rel="canonical" href="https://cloudixsoft.com/blogs" />
      </Helmet>

      {/* 2. Hero Section */}
      <HeroSection
        image={bgImg}
        title="Our Blog"
        subtitle="Stay inspired with our latest design, development, and marketing insights."
      />

      {/* 3. Main Section */}
      <RootContainer maxWidth="lg">
        <Box textAlign="center" sx={{ py: { xs: 4, md: 8 } }}>
          <Typography variant="h6" color="primary" sx={{ mb: 1, fontWeight: 600 }}>
            Blog & Insights
          </Typography>
          <Typography component="h1" variant="h3" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
            Exploring creativity, innovation, and digital excellence
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, maxWidth: 620, mx: "auto", lineHeight: 1.6 }}>
            Discover strategies, tips, and stories that help you grow your brand and build meaningful user experiences.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Blog Grid */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              {loading
                ? [...Array(4)].map((_, i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Skeleton variant="rectangular" height={200} sx={{ borderRadius: "12px", mb: 1 }} />
                      <Skeleton variant="text" width="40%" height={20} />
                      <Skeleton variant="text" width="80%" height={28} />
                      <Skeleton variant="text" width="100%" height={20} />
                    </Grid>
                  ))
                : blogs.slice(0, visibleCount).map((blog) => (
                    <Grid item xs={12} sm={6} key={blog._id}>
                      <BlogCard>
                        {/* Clickable Card Action Area leading to Single Blog Page */}
                        <CardActionArea onClick={() => navigate(`/blogs/${blog.slug || blog._id}`)}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={blog.image}
                            alt={blog.title}
                            loading="lazy"
                          />
                          <CardContent>
                            <Typography variant="caption" color="primary" sx={{ fontWeight: 600 }}>
                              {blog.category || "General"}
                            </Typography>
                            <Typography component="h2" variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }}>
                              {blog.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {truncateText(blog.content, 110)}
                            </Typography>
                            <CardFooter>
                              <Typography variant="caption" color="text.secondary">
                                {blog.author || "Cloudix Team"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                              </Typography>
                            </CardFooter>
                          </CardContent>
                        </CardActionArea>
                      </BlogCard>
                    </Grid>
                  ))}
            </Grid>

            {/* Load More Button */}
            {!loading && visibleCount < blogs.length && (
              <Box textAlign="center" mt={5}>
                <Button
                  variant="outlined"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  sx={{ borderRadius: "999px", px: 4, py: 1, textTransform: "none", fontWeight: 600 }}
                >
                  Load More Articles
                </Button>
              </Box>
            )}
          </Grid>

          {/* Sidebar Newsletter */}
          <Grid item xs={12} md={4}>
            <SidebarCard>
              <Typography component="h3" variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Sign up for our newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Get notified when we publish new blogs and tech updates.
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Enter your email address"
                  size="small"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  sx={{ mb: 1.5 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={subLoading}
                  onClick={handleSubscribe}
                  sx={{
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.common.white,
                    py: 1,
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: theme.palette.primary.main },
                  }}
                >
                  {subLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </Box>
            </SidebarCard>
          </Grid>
        </Grid>
      </RootContainer>

      {/* Snackbar Alerts */}
      <Snackbar
        open={subSnackbar.open}
        autoHideDuration={4000}
        onClose={() => setSubSnackbar({ ...subSnackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={subSnackbar.severity} sx={{ width: "100%" }}>
          {subSnackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default BlogPage;