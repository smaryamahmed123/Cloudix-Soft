import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import BlogHero from "../Components/BlogComponents/BlogHero";
import BlogCategories from "../Components/BlogComponents/BlogCategories";
import FeaturedBlog from "../Components/BlogComponents/FeaturedBlog";
import BlogCard from "../Components/BlogComponents/BlogCard";
import PopularBlogs from "../Components/BlogComponents/PopularBlogs";
import NewsletterCard from "../Components/BlogComponents/NewsletterCard";
import BlogCTA from "../Components/BlogComponents/BlogCTA";
import BlogSkeleton from "../Components/BlogComponents/BlogSkeleton";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const BlogPage = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${backendURL}/api/blogs`
        );

        const data = Array.isArray(response.data)
          ? response.data
          : [];

        setBlogs(data);
      } catch (err) {
        console.error("Blog fetch error:", err);

        setError(
          "We couldn't load the articles right now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = blogs
      .map((blog) => blog.category?.trim())
      .filter(Boolean);

    return [
      "All",
      ...Array.from(new Set(uniqueCategories)),
    ];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" ||
        blog.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

      const matchesSearch =
        !normalizedSearch ||
        blog.title?.toLowerCase().includes(normalizedSearch) ||
        blog.content?.toLowerCase().includes(normalizedSearch) ||
        blog.category?.toLowerCase().includes(normalizedSearch) ||
        blog.author?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [blogs, search, selectedCategory]);

  const featuredBlog =
    !search && selectedCategory === "All"
      ? blogs[0]
      : null;

  const articles = featuredBlog
    ? filteredBlogs.filter(
        (blog) => blog._id !== featuredBlog._id
      )
    : filteredBlogs;

  const visibleBlogs = articles.slice(0, visibleCount);

  const openBlog = (blog) => {
    navigate(`/blogs/${blog.slug || blog._id}`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setVisibleCount(6);
  };

  return (
    <>
      <Helmet>
        <title>
          Blog & Insights | Digital Marketing & Technology |
          Cloudix Soft
        </title>

        <meta
          name="description"
          content="Explore Cloudix Soft's insights on digital marketing, web development, e-commerce, branding, social media, technology, and business growth."
        />

        <meta
          name="keywords"
          content="Cloudix Soft blog, digital marketing, web development, e-commerce, branding, SEO, social media marketing, Pakistan"
        />

        <meta
          property="og:title"
          content="Blog & Insights | Cloudix Soft"
        />

        <meta
          property="og:description"
          content="Practical insights about digital marketing, websites, branding, e-commerce and technology."
        />

        <meta
          property="og:type"
          content="website"
        />

        <link
          rel="canonical"
          href="https://cloudixsoft.com/blogs"
        />
      </Helmet>

      <BlogHero
        search={search}
        setSearch={handleSearch}
      />

      <BlogCategories
        categories={categories}
        selected={selectedCategory}
        onSelect={handleCategoryChange}
      />

      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 5, md: 8 },
        }}
      >
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 4 }}
          >
            {error}
          </Alert>
        )}

        {loading ? (
          <>
            <Box sx={{ mb: 6 }}>
              <BlogSkeleton />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#111E2C",
                mb: 3,
              }}
            >
              Latest Articles
            </Typography>

            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={item}
                >
                  <BlogSkeleton />
                </Grid>
              ))}
            </Grid>
          </>
        ) : blogs.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 700 }}
            >
              No articles yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 1 }}
            >
              Check back soon for new insights from Cloudix Soft.
            </Typography>
          </Box>
        ) : (
          <>
            {featuredBlog && (
              <FeaturedBlog
                blog={featuredBlog}
                onClick={() => openBlog(featuredBlog)}
              />
            )}

            <Grid
              container
              spacing={5}
            >
              <Grid
                item
                xs={12}
                md={8}
              >
                <Box>
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "#769914",
                          fontWeight: 700,
                        }}
                      >
                        EXPLORE OUR INSIGHTS
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
                        }}
                      >
                        Latest Articles
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {articles.length}{" "}
                      {articles.length === 1
                        ? "article"
                        : "articles"}
                    </Typography>
                  </Box>

                  {articles.length === 0 ? (
                    <Box
                      sx={{
                        py: 8,
                        textAlign: "center",
                        border: "1px dashed #ccc",
                        borderRadius: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 700 }}
                      >
                        No matching articles
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        Try another search or category.
                      </Typography>

                      <Button
                        onClick={() => {
                          setSearch("");
                          setSelectedCategory("All");
                        }}
                        sx={{
                          mt: 2,
                          color: "#769914",
                          textTransform: "none",
                        }}
                      >
                        Clear filters
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <Grid
                        container
                        spacing={3}
                      >
                        {visibleBlogs.map((blog) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            key={blog._id}
                          >
                            <BlogCard
                              blog={blog}
                              onClick={openBlog}
                            />
                          </Grid>
                        ))}
                      </Grid>

                      {visibleCount <
                        articles.length && (
                        <Box
                          sx={{
                            textAlign: "center",
                            mt: 5,
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() =>
                              setVisibleCount(
                                (previous) =>
                                  previous + 6
                              )
                            }
                            sx={{
                              borderColor: "#769914",
                              color: "#769914",
                              borderRadius: "999px",
                              px: 4,
                              py: 1.1,
                              textTransform: "none",
                              fontWeight: 700,
                              "&:hover": {
                                borderColor: "#5f7d10",
                                backgroundColor:
                                  "rgba(118,153,20,0.05)",
                              },
                            }}
                          >
                            Load More Articles
                          </Button>
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    position: {
                      md: "sticky",
                    },
                    top: {
                      md: 75,
                    },
                  }}
                >
                  <NewsletterCard />

                  <PopularBlogs
                    blogs={articles}
                    onClick={openBlog}
                  />
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Container>

      {!loading && blogs.length > 0 && <BlogCTA />}
    </>
  );
};

export default BlogPage;