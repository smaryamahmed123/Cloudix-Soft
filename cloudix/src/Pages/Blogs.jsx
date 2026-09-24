import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BlogHero from "../Components/BlogComponents/BlogHero";
import BlogCategories from "../Components/BlogComponents/BlogCategories";
import FeaturedBlog from "../Components/BlogComponents/FeaturedBlog";
import BlogCard from "../Components/BlogComponents/BlogCard";
import PopularBlogs from "../Components/BlogComponents/PopularBlogs";
import NewsletterCard from "../Components/BlogComponents/NewsletterCard";
import BlogCTA from "../Components/BlogComponents/BlogCTA";
import BlogSkeleton from "../Components/BlogComponents/BlogSkeleton";
import { SectionHeading, stripHtml } from "../Components/BlogComponents/BlogShared";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const PAGE_SIZE = 6;
const gridSx = {
  display: "grid",
  gap: 3,
  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
};

const BlogPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await axios.get(`${backendURL}/api/blogs`);
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Blog fetch error:", err);
        setError("We couldn't load the articles right now. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((b) => b.category?.trim()).filter(Boolean))],
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogs.filter((b) => {
      const inCategory =
        selectedCategory === "All" || b.category?.toLowerCase() === selectedCategory.toLowerCase();
      const inSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        stripHtml(b.content).toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q);
      return inCategory && inSearch;
    });
  }, [blogs, search, selectedCategory]);

  const featuredBlog = !search && selectedCategory === "All" ? blogs[0] : null;
  const articles = featuredBlog ? filteredBlogs.filter((b) => b._id !== featuredBlog._id) : filteredBlogs;
  const visibleBlogs = articles.slice(0, visibleCount);

  const openBlog = (blog) => navigate(`/blogs/${blog.slug || blog._id}`);
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Helmet>
        <title>Blog & Insights | Digital Marketing & Technology | Cloudix Soft</title>
        <meta
          name="description"
          content="Explore Cloudix Soft's insights on digital marketing, web development, e-commerce, branding, social media, technology, and business growth."
        />
        <meta property="og:title" content="Blog & Insights | Cloudix Soft" />
        <meta
          property="og:description"
          content="Practical insights about digital marketing, websites, branding, e-commerce and technology."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://cloudixsoft.com/blogs" />
      </Helmet>

      <BlogHero
        search={search}
        setSearch={(v) => {
          setSearch(v);
          setVisibleCount(PAGE_SIZE);
        }}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}

        {loading ? (
          <>
            <Box sx={gridSx}>
              {[1, 2, 3, 4, 5, 6].map((i) => <BlogSkeleton key={i} />)}
            </Box>
          </>
        ) : blogs.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>No articles yet</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Check back soon for new insights from Cloudix Soft.
            </Typography>
          </Box>
        ) : (
          <>
            {featuredBlog && (
              <Box sx={{ mb: { xs: 6, md: 8 } }}>
                <SectionHeading
                  title="Featured Article"
                  onAction={() =>
                    document.getElementById("latest-articles")?.scrollIntoView({ behavior: "smooth" })
                  }
                />
                <FeaturedBlog blog={featuredBlog} onClick={() => openBlog(featuredBlog)} />
              </Box>
            )}

            <Box id="latest-articles" sx={{ scrollMarginTop: 90 }}>
              <SectionHeading
                title="Latest Articles"
                large
                onAction={visibleCount < articles.length ? () => setVisibleCount(articles.length) : undefined}
              />
              <BlogCategories
                categories={categories}
                selected={selectedCategory}
                onSelect={(c) => {
                  setSelectedCategory(c);
                  setVisibleCount(PAGE_SIZE);
                }}
              />

              {articles.length === 0 ? (
                <Box sx={{ py: 8, textAlign: "center", border: "1px dashed #ccc", borderRadius: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>No matching articles</Typography>
                  <Typography color="text.secondary" sx={{ mt: 1 }}>Try another search or category.</Typography>
                  <Button onClick={resetFilters} sx={{ mt: 2, color: "primary.main", textTransform: "none" }}>
                    Clear filters
                  </Button>
                </Box>
              ) : (
                <>
                  <Box sx={gridSx}>
                    {visibleBlogs.map((b) => <BlogCard key={b._id} blog={b} onClick={openBlog} />)}
                  </Box>

                  {visibleCount < articles.length && (
                    <Box sx={{ textAlign: "center", mt: 5 }}>
                      <Button
                        variant="outlined"
                        onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                        sx={{
                          borderColor: "primary.main", color: "primary.main", borderRadius: "999px",
                          px: 4, py: 1.1, textTransform: "none", fontWeight: 700,
                          "&:hover": { borderColor: "#5f7d10", bgcolor: "rgba(118,153,20,0.05)" },
                        }}
                      >
                        Load More Articles
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>

            <Box
              sx={{
                mt: { xs: 6, md: 8 },
                display: "grid",
                gap: 3,
                gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" },
              }}
            >
              <NewsletterCard />
              <PopularBlogs blogs={articles.length ? articles : blogs} onClick={openBlog} />
            </Box>
          </>
        )}
      </Container>

      {!loading && blogs.length > 0 && <BlogCTA />}
    </>
  );
};

export default BlogPage;