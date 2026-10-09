import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, Breadcrumbs, Button, Grid, InputBase, Link, Paper, Typography } from "@mui/material";
import {
  AddRounded,
  ImageOutlined,
  CalendarMonthOutlined,
  TrendingUpRounded,
  NavigateNextRounded,
  SearchRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import BlogStatCard from "../components/Blog/BlogStatCard"; // reused stat card
import PostTable from "../components/Post/PostTable";
import PostUploadModal from "../components/Post/PostUploadModal";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const BASE_URL = `${backendURL}/api/posts`;
const REORDER_URL = `${backendURL}/api/posts/reorder`;

// ============================================================
// HELPERS (stats)
// ============================================================

const timeOf = (item) => {
  const d = item?.createdAt ? new Date(item.createdAt) : null;
  return d && !Number.isNaN(d.getTime()) ? d.getTime() : null;
};

// Last 12 calendar months: [start, end) in ms
const monthRanges = () => {
  const now = new Date();
  return Array.from({ length: 12 }, (_, i) => {
    const back = 11 - i;
    return {
      start: new Date(now.getFullYear(), now.getMonth() - back, 1).getTime(),
      end: new Date(now.getFullYear(), now.getMonth() - back + 1, 1).getTime(),
    };
  });
};

const perMonth = (times) =>
  monthRanges().map((r) => times.filter((t) => t >= r.start && t < r.end).length);

const cumulative = (times) => monthRanges().map((r) => times.filter((t) => t < r.end).length);

const trendFrom = (prev, last) => {
  if (prev === 0) return { label: last > 0 ? "New" : "0%", dir: "up" };
  const pct = Math.round(((last - prev) / prev) * 100);
  return { label: `${Math.abs(pct)}%`, dir: pct < 0 ? "down" : "up" };
};

const trendOfSeries = (series) => trendFrom(series[series.length - 2] || 0, series[series.length - 1] || 0);

// ============================================================
// PAGE
// ============================================================

export default function AdminPostsManager() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Fetch
  // ---------------------------------------

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setPosts(Array.isArray(res.data) ? res.data : []);
    } catch {
      notify("Failed to fetch posts ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ---------------------------------------
  // Derived data
  // ---------------------------------------

  const query = search.trim().toLowerCase();

  const visiblePosts = useMemo(
    () => (query ? posts.filter((l) => (l.title || "").toLowerCase().includes(query)) : posts),
    [posts, query]
  );

  const stats = useMemo(() => {
    const times = posts.map(timeOf).filter((t) => t !== null);
    const now = new Date();

    const monthly = perMonth(times);
    const totalSeries = cumulative(times);

    const thisYearStart = new Date(now.getFullYear(), 0, 1).getTime();
    const lastYearStart = new Date(now.getFullYear() - 1, 0, 1).getTime();
    const thisYear = times.filter((t) => t >= thisYearStart).length;
    const lastYear = times.filter((t) => t >= lastYearStart && t < thisYearStart).length;

    return {
      total: { value: posts.length, series: totalSeries, trend: trendOfSeries(totalSeries) },
      month: {
        value: monthly[monthly.length - 1],
        series: monthly,
        trend: trendOfSeries(monthly),
      },
      year: { value: thisYear, series: monthly, trend: trendFrom(lastYear, thisYear) },
    };
  }, [posts]);

  // ---------------------------------------
  // Upload
  // ---------------------------------------

  const closeModal = () => {
    if (loading) return;
    setOpenModal(false);
    setTitle("");
    setFile(null);
  };

  const handleUpload = async () => {
    if (!title.trim() || !file) return notify("Please fill all fields", "warning");

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("image", file);

    try {
      setLoading(true);
      await axios.post(BASE_URL, formData);
      setOpenModal(false);
      setTitle("");
      setFile(null);
      await fetchPosts();
      notify("Post uploaded successfully ✅");
    } catch {
      notify("Failed to upload post ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Delete
  // ---------------------------------------

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title || "this post"}"? This can't be undone.`)) return;

    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${post._id}`);
      await fetchPosts();
      notify("Post deleted 🗑️");
    } catch {
      notify("Failed to delete post ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // Reorder (only while the list isn't filtered)
  // ---------------------------------------

  const handleReorder = async (fromIndex, toIndex) => {
    const reordered = [...posts];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setPosts(reordered);

    try {
      await axios.put(REORDER_URL, { ids: reordered.map((l) => l._id) });
      notify("Post order updated ✅");
    } catch {
      await fetchPosts();
      notify("Failed to reorder ❌", "error");
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search posts..." />

      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3.5 } }}>
        {/* ---------- Heading ---------- */}
        <Breadcrumbs
          separator={<NavigateNextRounded sx={{ fontSize: 16 }} />}
          sx={{ fontSize: 12.5, mb: 1, color: dash.muted }}
        >
          <Link
            component="button"
            underline="hover"
            onClick={() => navigate("/admin/dashboard")}
            sx={{ fontSize: 12.5, color: dash.muted }}
          >
            Dashboard
          </Link>
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Posts</Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: dash.navy,
                fontSize: { xs: 28, md: 34 },
                fontWeight: 800,
                letterSpacing: "-0.8px",
                lineHeight: 1.15,
              }}
            >
              Posts Management
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Upload and manage the posts shown on your website. Drag rows to change their order.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={() => setOpenModal(true)}
            disabled={loading}
            sx={{
              height: 44,
              px: 2.6,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: "10px",
              boxShadow: "none",
              backgroundColor: dash.green,
              "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
            }}
          >
            Add New Post
          </Button>
        </Box>

        {/* ---------- Stat cards ---------- */}
        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="post-total"
              title="Total Posts"
              value={stats.total.value}
              icon={<ImageOutlined />}
              color={dash.green}
              tint="#EEF4DE"
              trend={stats.total.trend}
              sparkData={stats.total.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="post-month"
              title="Added This Month"
              value={stats.month.value}
              icon={<CalendarMonthOutlined />}
              color="#7C6FD0"
              tint="#F0EEFB"
              trend={stats.month.trend}
              sparkData={stats.month.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="post-year"
              title="Added This Year"
              value={stats.year.value}
              icon={<TrendingUpRounded />}
              color="#E3A81C"
              tint="#FDF6DC"
              trend={stats.year.trend}
              sparkData={stats.year.series}
            />
          </Grid>
        </Grid>

        {/* ---------- Search + list ---------- */}
        <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, md: 2.5 } }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5, mb: 2.5 }}>
            <Box
              sx={{
                flex: "1 1 260px",
                maxWidth: 480,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                height: 42,
                borderRadius: "10px",
                border: `1px solid ${dash.border}`,
                backgroundColor: "#F8FAFB",
              }}
            >
              <SearchRounded sx={{ color: dash.muted, fontSize: 20 }} />
              <InputBase
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts by title..."
                sx={{ fontSize: 13, color: dash.navy }}
              />
            </Box>

            <Button
              variant="outlined"
              onClick={() => setSearch("")}
              sx={{
                height: 42,
                px: 2.5,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13,
                borderRadius: "10px",
                color: dash.navy,
                borderColor: dash.border,
                "&:hover": { borderColor: dash.green, backgroundColor: dash.greenLight },
              }}
            >
              Reset
            </Button>

            <Typography sx={{ color: dash.muted, fontSize: 12.5, ml: { md: "auto" } }}>
              Showing {visiblePosts.length} of {posts.length} posts
            </Typography>
          </Box>

          <PostTable
            posts={visiblePosts}
            hasAnyPosts={posts.length > 0}
            dragEnabled={!query}
            onReorder={handleReorder}
            onDelete={handleDelete}
            onAdd={() => setOpenModal(true)}
            disabled={loading}
          />
        </Paper>
      </Box>

      <PostUploadModal
        open={openModal}
        onClose={closeModal}
        title={title}
        setTitle={setTitle}
        file={file}
        setFile={setFile}
        onSubmit={handleUpload}
        loading={loading}
      />

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />

      <LoadingBackdrop open={loading} />
    </Box>
  );
}