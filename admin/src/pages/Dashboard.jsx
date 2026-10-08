import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  ArticleOutlined,
  MailOutlineRounded,
  WorkOutlineRounded,
  StarBorderRounded,
} from "@mui/icons-material";

import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardStatCard from "../components/Dashboard/DashboardStatCard";
import DashboardOverview from "../components/Dashboard/DashboardOverview";
import RecentActivity from "../components/Dashboard/RecentActivity";
import QuickActions from "../components/Dashboard/QuickActions";
import GrowthCard from "../components/Dashboard/GrowthCard";
import { dash } from "../components/Dashboard/dashboardPalette";

// ============================================================
// API
// ============================================================

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LOGOS_URL = `${backendURL}/api/logos`;
const ADMIN_BLOG_URL = `${backendURL}/api/blogs`;
const ADMIN_CONTACT_MSG_URL = `${backendURL}/api/contact`;
const TESTIMONIALS_URL = `${backendURL}/api/testimonials`; // ASSUMED endpoint – adjust if different

// ============================================================
// CONSTANTS
// ============================================================

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RANGE_OPTIONS = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "12m": "Last 12 months",
};

// ============================================================
// HELPERS
// ============================================================

const getArrayData = (response) => {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const getDate = (item) => {
  const raw = item?.createdAt || item?.date || item?.updatedAt;
  if (!raw) return null;
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
};

const formatRelativeTime = (date) => {
  if (!date) return "Recently";
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Buckets: each has a label and an exclusive end time
const getBuckets = (range) => {
  const now = new Date();
  const buckets = [];

  if (range === "12m") {
    for (let i = 11; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      buckets.push({ label: MONTHS[start.getMonth()], end: end.getTime() });
    }
    return buckets;
  }

  const days = range === "30d" ? 30 : 7;
  for (let i = days - 1; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i + 1);
    buckets.push({
      label: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      end: end.getTime(),
    });
  }
  return buckets;
};

// Cumulative total of items created up to the end of each bucket
const cumulativeSeries = (items, buckets) => {
  const times = (Array.isArray(items) ? items : [])
    .map((item) => getDate(item)?.getTime())
    .filter(Number.isFinite);

  return buckets.map((b) => times.filter((t) => t < b.end).length);
};

// Month-over-month growth label from a 12-month cumulative series
const getTrendLabel = (series) => {
  const last = series[series.length - 1] || 0;
  const prev = series[series.length - 2] || 0;
  if (prev === 0) return last > 0 ? "New" : "0%";
  return `${Math.round(((last - prev) / prev) * 100)}%`;
};

// ============================================================
// PAGE
// ============================================================

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("7d");
  const [raw, setRaw] = useState({
    blogs: [],
    portfolio: [],
    messages: [],
    testimonials: [],
  });

  // ==========================================================
  // FETCH
  // ==========================================================

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);

        const [blogs, messages, logos, testimonials] = await Promise.allSettled([
          axios.get(ADMIN_BLOG_URL),
          axios.get(ADMIN_CONTACT_MSG_URL),
          axios.get(LOGOS_URL),
          axios.get(TESTIMONIALS_URL),
        ]);

        if (!mounted) return;

        const pick = (r) => (r.status === "fulfilled" ? getArrayData(r.value) : []);

        setRaw({
          blogs: pick(blogs),
          messages: pick(messages),
          portfolio: pick(logos),
          testimonials: pick(testimonials),
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // ==========================================================
  // DERIVED DATA
  // ==========================================================

  const chartData = useMemo(() => {
    const buckets = getBuckets(range);
    const blogs = cumulativeSeries(raw.blogs, buckets);
    const portfolio = cumulativeSeries(raw.portfolio, buckets);
    const messages = cumulativeSeries(raw.messages, buckets);

    return buckets.map((b, i) => ({
      month: b.label,
      blogs: blogs[i],
      portfolio: portfolio[i],
      messages: messages[i],
    }));
  }, [raw, range]);

  // Sparklines + trends always use the 12-month view
  const stats = useMemo(() => {
    const buckets = getBuckets("12m");
    const build = (items) => {
      const series = cumulativeSeries(items, buckets);
      return { series, trend: getTrendLabel(series) };
    };

    return {
      blogs: build(raw.blogs),
      portfolio: build(raw.portfolio),
      testimonials: build(raw.testimonials),
      messages: build(raw.messages),
    };
  }, [raw]);

  const activities = useMemo(() => {
    const latest = (items, n = 3) =>
      [...items]
        .sort((a, b) => (getDate(b)?.getTime() || 0) - (getDate(a)?.getTime() || 0))
        .slice(0, n);

    const icon = (Icon) => <Icon sx={{ fontSize: 20 }} />;

    const list = [
      ...latest(raw.testimonials).map((t) => ({
        date: getDate(t),
        title: "New testimonial added",
        subtitle:
          [t?.name || t?.clientName, t?.company].filter(Boolean).join(" from ") ||
          "Client feedback received",
        icon: icon(StarBorderRounded),
        iconBackground: dash.limeLight,
      })),
      ...latest(raw.messages).map((m) => ({
        date: getDate(m),
        title: "New contact message",
        subtitle: m?.email ? `From: ${m.email}` : m?.name || "Client inquiry received",
        icon: icon(MailOutlineRounded),
        iconBackground: dash.blueLight,
      })),
      ...latest(raw.blogs).map((b) => ({
        date: getDate(b),
        title: "New blog published",
        subtitle: b?.title || "Blog post published",
        icon: icon(ArticleOutlined),
        iconBackground: dash.greenLight,
      })),
      ...latest(raw.portfolio).map((p) => ({
        date: getDate(p),
        title: "Portfolio updated",
        subtitle: p?.title || p?.name || "New portfolio item added",
        icon: icon(WorkOutlineRounded),
        iconBackground: "#EEF1F4",
      })),
    ];

    return list
      .sort((a, b) => (b.date?.getTime() || 0) - (a.date?.getTime() || 0))
      .slice(0, 5)
      .map((item) => ({ ...item, time: formatRelativeTime(item.date) }));
  }, [raw]);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <Box sx={{ minHeight: "80vh", display: "grid", placeItems: "center", backgroundColor: dash.page }}>
        <Stack alignItems="center" spacing={1.5}>
          <CircularProgress size={38} thickness={4} sx={{ color: dash.green }} />
          <Typography sx={{ color: dash.muted, fontSize: 13, fontWeight: 600 }}>
            Loading dashboard...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <Box sx={{ minHeight: "100%", backgroundColor: dash.page }}>
      <DashboardTopBar />

      <Box sx={{ p: { xs: 2, sm: 2.5, md: 3.5 } }}>
        <DashboardHeader />

        {/* ---------- Stat cards ---------- */}
        <Grid container spacing={2.2} sx={{ mb: 2.5 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <DashboardStatCard
              id="blogs"
              title="Total Blogs"
              value={raw.blogs.length}
              icon={<ArticleOutlined />}
              iconBackground={dash.green}
              sparkColor={dash.green}
              sparkData={stats.blogs.series}
              trend={stats.blogs.trend}
              onClick={() => navigate("/admin/blogs")}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <DashboardStatCard
              id="portfolio"
              title="Portfolio"
              value={raw.portfolio.length}
              icon={<WorkOutlineRounded />}
              iconBackground={dash.navy}
              sparkColor={dash.navy}
              sparkData={stats.portfolio.series}
              trend={stats.portfolio.trend}
              onClick={() => navigate("/admin/portfolio")}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <DashboardStatCard
              id="testimonials"
              title="Testimonials"
              value={raw.testimonials.length}
              icon={<StarBorderRounded />}
              iconBackground={dash.lime}
              sparkColor={dash.lime}
              sparkData={stats.testimonials.series}
              trend={stats.testimonials.trend}
              onClick={() => navigate("/admin/testimonials")}
            />
          </Grid>

          <Grid item xs={12} sm={6} lg={3}>
            <DashboardStatCard
              id="messages"
              title="Contact Messages"
              value={raw.messages.length}
              icon={<MailOutlineRounded />}
              iconBackground={dash.indigo}
              sparkColor={dash.indigo}
              sparkData={stats.messages.series}
              trend={stats.messages.trend}
              onClick={() => navigate("/admin/messages")}
            />
          </Grid>
        </Grid>

        {/* ---------- Main area ---------- */}
        <Grid container spacing={2.5} alignItems="stretch">
          {/* Left: overview + quick actions */}
          <Grid item xs={12} lg={8} sx={{ minWidth: 0 }}>
            <Stack spacing={2.5}>
              <DashboardOverview
                chartData={chartData}
                isMobile={isMobile}
                range={range}
                onRangeChange={setRange}
                rangeOptions={RANGE_OPTIONS}
              />

              <QuickActions
                onAddBlog={() => navigate("/admin/blog")}
                onAddWebsite={() => navigate("/admin/addWebsite")}
                onAddTestimonial={() => navigate("/admin/testimonials")}
                onAddLogo={() => navigate("/admin/post-design")}
                onAddService={() => navigate("/admin/services")}
                onViewAll={() => navigate("/admin/dashboard")}
              />
            </Stack>
          </Grid>

          {/* Right: recent activity + growth card */}
          <Grid item xs={12} lg={4} sx={{ minWidth: 0 }}>
            <Stack spacing={2.5} sx={{ height: "100%" }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <RecentActivity
                  activities={activities}
                  onViewAll={() => navigate("/admin/messages")}
                />
              </Box>
              <GrowthCard />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;