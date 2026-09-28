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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: seoTitle,
            description: seoDescription,
            image: cover || "https://cloudixsoft.com/og-image.jpg",
            author: { "@type": "Person", name: blog.author || "Cloudix Team" },
            publisher: {
              "@type": "Organization",
              name: "Cloudix Soft",
              logo: { "@type": "ImageObject", url: "https://cloudixsoft.com/logo.png" },
            },
            datePublished: blog.createdAt,
            mainEntityOfPage: `https://cloudixsoft.com/blogs/${blog.slug || slug}`,
          })}
        </script>
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
            sx={{ mt: 2, fontWeight: 700, lineHeight: 1.15, fontSize: { xs: "2rem", md: "3rem" }, color: "#fff", }}
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