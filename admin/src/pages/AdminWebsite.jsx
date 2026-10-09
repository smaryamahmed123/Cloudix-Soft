import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import imageCompression from "browser-image-compression";
import {
    Box,
    Breadcrumbs,
    Button,
    Grid,
    InputBase,
    Link,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import {
    AddRounded,
    LanguageOutlined,
    NavigateNextRounded,
    SearchRounded,
    ShoppingCartOutlined,
    WebOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import BlogStatCard from "../components/Blog/BlogStatCard"; // reused stat card
import WebsiteTable from "../components/Website/WebsiteTable";
import WebsiteUploadModal from "../components/Website/WebsiteUploadModal";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const emptyForm = { title: "", link: "", category: "", image: null };

const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("token")}` });

// ============================================================
// HELPERS (stats)
// ============================================================

const timeOf = (item) => {
    const d = item?.createdAt ? new Date(item.createdAt) : null;
    return d && !Number.isNaN(d.getTime()) ? d.getTime() : null;
};

// Running total at the end of each of the last 12 calendar months
const cumulativeSeries = (items) => {
    const times = items.map(timeOf).filter((t) => t !== null);
    const now = new Date();

    return Array.from({ length: 12 }, (_, i) => {
        const end = new Date(now.getFullYear(), now.getMonth() - (11 - i) + 1, 1).getTime();
        return times.filter((t) => t < end).length;
    });
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

export default function AdminWebsitesManager() {
    const navigate = useNavigate();

    const [websites, setWebsites] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

    // ---------------------------------------
    // Fetch
    // ---------------------------------------

    const fetchWebsites = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/websites");
            setWebsites(Array.isArray(res.data) ? res.data : []);
        } catch {
            notify("Failed to fetch websites ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebsites();
    }, []);

    // ---------------------------------------
    // Derived data
    // ---------------------------------------

    const query = search.trim().toLowerCase();
    const filtersActive = Boolean(query || category !== "all");

    const filtered = useMemo(
        () =>
            websites.filter((w) => {
                if (query) {
                    const hay = `${w.title || ""} ${w.link || ""}`.toLowerCase();
                    if (!hay.includes(query)) return false;
                }
                if (category !== "all" && w.category !== category) return false;
                return true;
            }),
        [websites, query, category]
    );

    const stats = useMemo(() => {
        const build = (items) => {
            const series = cumulativeSeries(items);
            return { value: items.length, series, trend: trendOf(series) };
        };

        return {
            total: build(websites),
            static: build(websites.filter((w) => w.category === "static")),
            ecommerce: build(websites.filter((w) => w.category === "ecommerce")),
        };
    }, [websites]);

    // ---------------------------------------
    // Modal
    // ---------------------------------------

    const closeModal = () => {
        if (loading) return;
        setOpenModal(false);
        setForm(emptyForm);
    };

    // ---------------------------------------
    // Upload (image is compressed first)
    // ---------------------------------------

    const handleUpload = async () => {
        if (!form.title || !form.link || !form.category || !form.image) {
            return notify("Please fill all fields ⚠️", "warning");
        }

        try {
            setLoading(true);

            const compressedImage = await imageCompression(form.image, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            });

            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("link", form.link);
            formData.append("category", form.category);
            formData.append("image", compressedImage);

            await api.post("/api/websites", formData, {
                headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
            });

            setForm(emptyForm);
            setOpenModal(false);
            await fetchWebsites();
            notify("Website added successfully ✅");
        } catch (error) {
            console.error(error);
            notify("Failed to add website ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------
    // Delete
    // ---------------------------------------

    const handleDelete = async (site) => {
        if (!window.confirm(`Delete "${site.title}"? This can't be undone.`)) return;

        try {
            setLoading(true);
            await api.delete(`/api/websites/${site._id}`);
            await fetchWebsites();
            notify("Website deleted 🗑️");
        } catch {
            notify("Failed to delete website ❌", "error");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------
    // Reorder (only while the list isn't filtered)
    // ---------------------------------------

    const handleReorder = async (fromIndex, toIndex) => {
        const reordered = [...websites];
        const [moved] = reordered.splice(fromIndex, 1);
        reordered.splice(toIndex, 0, moved);
        setWebsites(reordered);

        try {
            await api.put(
                "/api/websites/reorder",
                { ids: reordered.map((w) => w._id) },
                { headers: authHeader() }
            );
            notify("Website order updated ✅");
        } catch {
            await fetchWebsites();
            notify("Failed to save order ❌", "error");
        }
    };

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
            <DashboardTopBar placeholder="Search websites..." />

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
                    <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Websites</Typography>
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
                            Website Management
                        </Typography>
                        <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
                            Add and manage the websites in your portfolio. Drag rows to change their order.
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
                        Add Website
                    </Button>
                </Box>

                {/* ---------- Stat cards ---------- */}
                <Grid container spacing={2.2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <BlogStatCard
                            id="web-total"
                            title="Total Websites"
                            value={stats.total.value}
                            icon={<LanguageOutlined />}
                            color={dash.green}
                            tint="#EEF4DE"
                            trend={stats.total.trend}
                            sparkData={stats.total.series}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <BlogStatCard
                            id="web-static"
                            title="Static"
                            value={stats.static.value}
                            icon={<WebOutlined />}
                            color="#7C6FD0"
                            tint="#F0EEFB"
                            trend={stats.static.trend}
                            sparkData={stats.static.series}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <BlogStatCard
                            id="web-ecommerce"
                            title="E-commerce"
                            value={stats.ecommerce.value}
                            icon={<ShoppingCartOutlined />}
                            color="#E3A81C"
                            tint="#FDF6DC"
                            trend={stats.ecommerce.trend}
                            sparkData={stats.ecommerce.series}
                        />
                    </Grid>
                </Grid>

                {/* ---------- Filters + table ---------- */}
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
                                placeholder="Search by title or link..."
                                sx={{ fontSize: 13, color: dash.navy }}
                            />
                        </Box>

                        <TextField
                            select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            sx={{
                                width: 180,
                                "& .MuiOutlinedInput-root": {
                                    height: 42,
                                    borderRadius: "10px",
                                    fontSize: 13,
                                    color: dash.navy,
                                    "& fieldset": { borderColor: dash.border },
                                },
                            }}
                        >
                            <MenuItem value="all">All Categories</MenuItem>
                            <MenuItem value="static">Static</MenuItem>
                            <MenuItem value="ecommerce">E-commerce</MenuItem>
                        </TextField>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSearch("");
                                setCategory("all");
                            }}
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
                            Showing {filtered.length} of {websites.length} websites
                        </Typography>
                    </Box>

                    <WebsiteTable
                        websites={filtered}
                        hasAnyWebsites={websites.length > 0}
                        dragEnabled={!filtersActive}
                        onReorder={handleReorder}
                        onDelete={handleDelete}
                        onAdd={() => setOpenModal(true)}
                        disabled={loading}
                    />
                </Paper>
            </Box>

            <WebsiteUploadModal
                open={openModal}
                onClose={closeModal}
                form={form}
                setForm={setForm}
                onSubmit={handleUpload}
                loading={loading}
            />

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            />

            <LoadingBackdrop open={loading} />
        </Box>
    );
}