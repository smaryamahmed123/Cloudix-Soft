import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Skeleton,
  Typography,
  Alert,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import BlogCard from "../Components/BlogComponents/BlogCard";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const getReadingTime = (content = "") => {
  const words = content.trim().split(/\s+/).length;

  return Math.max(
    1,
    Math.ceil(words / 200)
  );
};

const BlogDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${backendURL}/api/blogs`
        );

        const blogs = Array.isArray(response.data)
          ? response.data
          : [];

        setAllBlogs(blogs);

        const foundBlog = blogs.find(
          (item) =>
            item.slug === slug ||
            item._id === slug
        );

        if (!foundBlog) {
          setError("Blog article not found.");
          return;
        }

        setBlog(foundBlog);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load this article. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const relatedBlogs = useMemo(() => {
    if (!blog) return [];

    return allBlogs
      .filter(
        (item) =>
          item._id !== blog._id &&
          item.category &&
          item.category.toLowerCase() ===
            blog.category?.toLowerCase()
      )
      .slice(0, 3);
  }, [allBlogs, blog]);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ py: 8 }}
      >
        <Skeleton
          variant="rectangular"
          height={450}
          sx={{ borderRadius: 3 }}
        />

        <Skeleton
          width="40%"
          height={25}
          sx={{ mt: 4 }}
        />

        <Skeleton
          width="90%"
          height={60}
        />

        <Skeleton width="70%" height={30} />

        <Skeleton
          width="100%"
          height={100}
          sx={{ mt: 4 }}
        />
      </Container>
    );
  }

  if (error || !blog) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 12,
          textAlign: "center",
        }}
      >
        <Alert severity="error">
          {error || "Article not found."}
        </Alert>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/blogs")}
          sx={{
            mt: 3,
            color: "#769914",
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Back to Blog
        </Button>
      </Container>
    );
  }

  const canonicalUrl =
    `https://cloudixsoft.com/blogs/${blog.slug || blog._id}`;

  return (
    <>
      <Helmet>
        <title>
          {blog.title} | Cloudix Soft Blog
        </title>

        <meta
          name="description"
          content={blog.content?.slice(0, 155)}
        />

        <meta
          property="og:title"
          content={blog.title}
        />

        <meta
          property="og:description"
          content={blog.content?.slice(0, 155)}
        />

        {blog.image && (
          <meta
            property="og:image"
            content={blog.image}
          />
        )}

        <meta
          property="og:type"
          content="article"
        />

        <link
          rel="canonical"
          href={canonicalUrl}
        />
      </Helmet>

      {/* Article Header */}
      <Box
        sx={{
          backgroundColor: "#111E2C",
          color: "#fff",
          py: { xs: 6, md: 9 },
        }}
      >
        <Container maxWidth="md">
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/blogs")}
            sx={{
              mb: 4,
              color: "rgba(255,255,255,0.7)",
              textTransform: "none",
              "&:hover": {
                color: "#fff",
                backgroundColor: "transparent",
              },
            }}
          >
            Back to Blog
          </Button>

          <Typography
            sx={{
              color: "#BBBF19",
              fontWeight: 700,
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}
          >
            {blog.category || "General"}
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 1.5,
              fontSize: {
                xs: "2.1rem",
                md: "3.6rem",
              },
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            {blog.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2.5,
              mt: 3,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <PersonOutlineIcon fontSize="small" />

              <Typography variant="body2">
                {blog.author || "Cloudix Team"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <CalendarTodayOutlinedIcon fontSize="small" />

              <Typography variant="body2">
                {blog.createdAt
                  ? new Date(
                      blog.createdAt
                    ).toLocaleDateString()
                  : ""}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.7,
              }}
            >
              <AccessTimeIcon fontSize="small" />

              <Typography variant="body2">
                {getReadingTime(blog.content)} min read
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Article */}
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 5, md: 8 },
        }}
      >
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            md={9}
            lg={8}
          >
            {blog.image && (
              <Box
                component="img"
                src={blog.image}
                alt={blog.title}
                sx={{
                  width: "100%",
                  maxHeight: 550,
                  objectFit: "cover",
                  borderRadius: "20px",
                  display: "block",
                  mb: 5,
                }}
              />
            )}

            <Box
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.08rem",
                },
                lineHeight: 1.9,
                color: "#303840",
                whiteSpace: "pre-line",
              }}
            >
              {blog.content}
            </Box>

            <Divider sx={{ my: 6 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  WRITTEN BY
                </Typography>

                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "#111E2C",
                  }}
                >
                  {blog.author || "Cloudix Team"}
                </Typography>
              </Box>

              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/blogs")}
                sx={{
                  color: "#769914",
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                More Articles
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Related */}
        {relatedBlogs.length > 0 && (
          <Box sx={{ mt: { xs: 8, md: 12 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#769914",
                fontWeight: 700,
              }}
            >
              KEEP READING
            </Typography>

            <Typography
              component="h2"
              sx={{
                fontSize: {
                  xs: "1.8rem",
                  md: "2.3rem",
                },
                fontWeight: 800,
                color: "#111E2C",
                mb: 3,
              }}
            >
              Related Articles
            </Typography>

            <Grid container spacing={3}>
              {relatedBlogs.map((item) => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={item._id}
                >
                  <BlogCard
                    blog={item}
                    onClick={(selectedBlog) =>
                      navigate(
                        `/blogs/${
                          selectedBlog.slug ||
                          selectedBlog._id
                        }`
                      )
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default BlogDetails;