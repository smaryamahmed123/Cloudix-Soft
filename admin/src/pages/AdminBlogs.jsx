import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, Breadcrumbs, Button, Link, Paper, Grid, Typography } from "@mui/material";
import {
  AddRounded,
  ArticleOutlined,
  VisibilityOutlined,
  AccessTimeRounded,
  FolderOutlined,
  NavigateNextRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import BlogStatCard from "../components/Blog/BlogStatCard";
import BlogFilters from "../components/Blog/BlogFilters";
import BlogTable from "../components/Blog/BlogTable";
import BlogFormModal from "../components/Blog/BlogFormModal";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const ADMIN_BLOG_URL = import.meta.env.VITE_ADMIN_BLOG_URL;

const DEFAULT_CATEGORIES = [
  "Web Development",
  "E-Commerce",
  "Digital Marketing",
  "SEO",
  "Branding",
  "Graphic Design",
  "Mobile Apps",
  "Technology",
  "Business",
];

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  category: "Web Development",
  author: "Cloudix Soft Team",
  seoTitle: "",
  seoDescription: "",
  slug: "",
  imageFile: null,
  visible: true,
};

// ============================================================
// HELPERS (stats)
// ============================================================

const timeOf = (blog) => {
  const d = blog?.createdAt ? new Date(blog.createdAt) : null;
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

const perMonth = (items) => {
  const times = items.map(timeOf).filter((t) => t !== null);
  return monthRanges().map((r) => times.filter((t) => t >= r.start && t < r.end).length);
};

// Running count of distinct categories, by month of first use
const categoriesPerMonth = (items) => {
  const first = {};
  items.forEach((b) => {
    if (!b.category) return;
    const t = timeOf(b) ?? 0;
    first[b.category] = first[b.category] === undefined ? t : Math.min(first[b.category], t);
  });
  const firsts = Object.values(first);
  return monthRanges().map((r) => firsts.filter((t) => t < r.end).length);
};

const trendOf = (series) => {
  const last = series[series.length - 1] || 0;
  const prev = series[series.length - 2] || 0;
  if (prev === 0) return { label: last > 0 ? "New" : "0%", dir: "up" };
  const pct = Math.round(((last - prev) / prev) * 100);
  return { label: `${Math.abs(pct)}%`, dir: pct < 0 ? "down" : "up" };
};

// ============================================================
// PAGE
// ============================================================

export default function AdminBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // filters / table state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState([]);

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Fetch
  // ---------------------------------------

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(ADMIN_BLOG_URL);
      setBlogs([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (error) {
      console.error("Fetch blogs error:", error);
      notify("Failed to load blogs ❌", "error");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ---------------------------------------
  // Derived data
  // ---------------------------------------

  const allCategories = useMemo(() => {
    const fromData = blogs.map((b) => b.category).filter(Boolean);
    return [...new Set([...DEFAULT_CATEGORIES, ...fromData])].sort();
  }, [blogs]);

  const filtersActive = Boolean(search.trim() || category !== "all" || status !== "all" || dateFrom || dateTo);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const from = dateFrom ? new Date(`${dateFrom}T00:00:00`).getTime() : null;
    const to = dateTo ? new Date(`${dateTo}T23:59:59.999`).getTime() : null;

    return blogs.filter((b) => {
      if (q) {
        const hay = [b.title, b.excerpt, b.category, b.author].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (category !== "all" && b.category !== category) return false;
      const published = b.visible !== false;
      if (status === "published" && !published) return false;
      if (status === "draft" && published) return false;
      if (from !== null || to !== null) {
        const t = timeOf(b);
        if (t === null) return false;
        if (from !== null && t < from) return false;
        if (to !== null && t > to) return false;
      }
      return true;
    });
  }, [blogs, search, category, status, dateFrom, dateTo]);

  // back to page 1 whenever the result set changes shape
  useEffect(() => {
    setPage(1);
  }, [search, category, status, dateFrom, dateTo, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const stats = useMemo(() => {
    const published = blogs.filter((b) => b.visible !== false);
    const drafts = blogs.filter((b) => b.visible === false);

    const total = perMonth(blogs);
    const pub = perMonth(published);
    const dr = perMonth(drafts);
    const cats = categoriesPerMonth(blogs);

    return {
      total: { value: blogs.length, series: total, trend: trendOf(total) },
      published: { value: published.length, series: pub, trend: trendOf(pub) },
      drafts: { value: drafts.length, series: dr, trend: trendOf(dr) },
      categories: {
        value: new Set(blogs.map((b) => b.category).filter(Boolean)).size,
        series: cats,
        trend: trendOf(cats),
      },
    };
  }, [blogs]);

  // ---------------------------------------
  // Filters
  // ---------------------------------------

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setStatus("all");
    setDateFrom("");
    setDateTo("");
  };

  // ---------------------------------------
  // Selection
  // ---------------------------------------

  const toggleOne = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = () => {
    const ids = pageItems.map((b) => b._id);
    const allOn = ids.every((id) => selected.includes(id));
    setSelected((prev) => (allOn ? prev.filter((id) => !ids.includes(id)) : [...new Set([...prev, ...ids])]));
  };

  // ---------------------------------------
  // Form
  // ---------------------------------------

  const updateForm = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setOpenModal(true);
  };

  const openEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      excerpt: blog.excerpt || "",
      category: blog.category || "Web Development",
      author: blog.author || "",
      seoTitle: blog.seoTitle || "",
      seoDescription: blog.seoDescription || "",
      slug: blog.slug || "",
      imageFile: null,
      visible: blog.visible !== false,
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    if (uploading) return;
    setOpenModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  // ---------------------------------------
  // Article image upload (inside the editor)
  // ---------------------------------------

  const uploadArticleImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(`${ADMIN_BLOG_URL}/upload-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notify("Article image uploaded ✅");
      return response.data.url;
    } catch (error) {
      console.error("Article image upload error:", error);
      notify("Article image upload failed ❌", "error");
      throw error;
    }
  };

  // ---------------------------------------
  // Create / update
  // ---------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return notify("Please enter a blog title.", "warning");
    if (!form.content.trim()) return notify("Please write the article content.", "warning");
    if (!form.category) return notify("Please select a category.", "warning");

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("content", form.content);
      formData.append("excerpt", form.excerpt.trim());
      formData.append("category", form.category);
      formData.append("author", form.author.trim());
      formData.append("seoTitle", form.seoTitle.trim());
      formData.append("seoDescription", form.seoDescription.trim());
      formData.append("slug", form.slug.trim());
      formData.append("visible", form.visible);
      if (form.imageFile) formData.append("coverImage", form.imageFile);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (editingId) {
        // NOTE: assumes PUT /blogs/:id exists on the backend
        await axios.put(`${ADMIN_BLOG_URL}/${editingId}`, formData, config);
      } else {
        await axios.post(ADMIN_BLOG_URL, formData, config);
      }

      await fetchBlogs();
      const wasEditing = Boolean(editingId);
      setOpenModal(false);
      setEditingId(null);
      setForm(emptyForm);
      notify(wasEditing ? "Blog updated successfully ✅" : "Blog published successfully ✅");
    } catch (error) {
      console.error("Save blog error:", error);
      notify(error.response?.data?.message || "Failed to save blog ❌", "error");
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------------------
  // Delete
  // ---------------------------------------

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This can't be undone.`)) return;

    try {
      await axios.delete(`${ADMIN_BLOG_URL}/${blog._id}`);
      setSelected((prev) => prev.filter((id) => id !== blog._id));
      await fetchBlogs();
      notify("Blog deleted 🗑️");
    } catch (error) {
      console.error("Delete blog error:", error);
      notify("Failed to delete blog ❌", "error");
    }
  };

  const deleteSelected = async () => {
    if (!window.confirm(`Delete ${selected.length} selected post(s)? This can't be undone.`)) return;

    setUploading(true);
    const results = await Promise.allSettled(selected.map((id) => axios.delete(`${ADMIN_BLOG_URL}/${id}`)));
    const failed = results.filter((r) => r.status === "rejected").length;

    setSelected([]);
    await fetchBlogs();
    setUploading(false);

    if (failed) notify(`${failed} post(s) could not be deleted ❌`, "error");
    else notify("Selected blogs deleted 🗑️");
  };

  // ---------------------------------------
  // Reorder (only when no filters are active)
  // ---------------------------------------

  const handleReorder = async (fromIndex, toIndex) => {
    const reordered = [...blogs];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    setBlogs(reordered);

    try {
      await axios.put(`${ADMIN_BLOG_URL}/reorder`, { ids: reordered.map((b) => b._id) });
      notify("Blog order updated ✅");
    } catch (error) {
      console.error("Reorder error:", error);
      await fetchBlogs();
      notify("Failed to reorder blogs ❌", "error");
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search posts, categories, or keywords..." />

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
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Blog</Typography>
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
              Blog Management
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Create, edit and manage your blog posts. Keep your audience updated with valuable content.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={openCreate}
            disabled={uploading}
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
            Add New Blog
          </Button>
        </Box>

        {/* ---------- Stat cards ---------- */}
        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="total"
              title="Total Posts"
              value={stats.total.value}
              icon={<ArticleOutlined />}
              color={dash.green}
              tint="#EEF4DE"
              trend={stats.total.trend}
              sparkData={stats.total.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="published"
              title="Published"
              value={stats.published.value}
              icon={<VisibilityOutlined />}
              color="#7C6FD0"
              tint="#F0EEFB"
              trend={stats.published.trend}
              sparkData={stats.published.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="drafts"
              title="Drafts"
              value={stats.drafts.value}
              icon={<AccessTimeRounded />}
              color="#E3A81C"
              tint="#FDF6DC"
              trend={stats.drafts.trend}
              sparkData={stats.drafts.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <BlogStatCard
              id="categories"
              title="Categories"
              value={stats.categories.value}
              icon={<FolderOutlined />}
              color="#4A90C2"
              tint="#E9F3FA"
              trend={stats.categories.trend}
              sparkData={stats.categories.series}
            />
          </Grid>
        </Grid>

        {/* ---------- Filters + table ---------- */}
        <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, md: 2.5 } }}>
          <BlogFilters
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
            categories={allCategories}
            status={status}
            onStatus={setStatus}
            dateFrom={dateFrom}
            dateTo={dateTo}
            onDateChange={(from, to) => {
              setDateFrom(from);
              setDateTo(to);
            }}
            onReset={resetFilters}
          />

          {selected.length > 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 2,
                px: 2,
                py: 1,
                borderRadius: "10px",
                backgroundColor: dash.greenLight,
              }}
            >
              <Typography sx={{ fontSize: 13, color: dash.navy, fontWeight: 600 }}>
                {selected.length} selected
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button size="small" onClick={() => setSelected([])} sx={{ textTransform: "none", color: dash.muted }}>
                  Clear
                </Button>
                <Button
                  size="small"
                  onClick={deleteSelected}
                  sx={{ textTransform: "none", fontWeight: 700, color: dash.red }}
                >
                  Delete selected
                </Button>
              </Box>
            </Box>
          )}

          <BlogTable
            blogs={pageItems}
            total={filtered.length}
            page={safePage}
            rowsPerPage={rowsPerPage}
            onPage={setPage}
            onRowsPerPage={setRowsPerPage}
            selected={selected}
            onToggle={toggleOne}
            onToggleAll={toggleAll}
            onEdit={openEdit}
            onDelete={deleteBlog}
            dragEnabled={!filtersActive}
            onReorder={handleReorder}
          />
        </Paper>
      </Box>

      <BlogFormModal
        open={openModal}
        onClose={closeModal}
        form={form}
        updateForm={updateForm}
        onSubmit={handleSubmit}
        uploading={uploading}
        isEditing={Boolean(editingId)}
        categories={DEFAULT_CATEGORIES}
        onImageUpload={uploadArticleImage}
      />

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />

      <LoadingBackdrop open={uploading} />
    </Box>
  );
}