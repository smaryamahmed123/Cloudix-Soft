import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Stack, Typography, useMediaQuery } from "@mui/material";
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
import { withCreatedAt } from "../utils/dates";

// ============================================================
// API
// ============================================================

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LOGOS_URL = `${backendURL}/api/logos`;
const ADMIN_BLOG_URL = `${backendURL}/api/blogs`;
const WEBSITES_URL = `${backendURL}/api/websites`
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
// Month-over-month change from a 12-month cumulative series
const getTrend = (series) => {
  const last = series[series.length - 1] || 0;
  const prev = series[series.length - 2] || 0;

  if (last === prev) return { label: "0%", direction: "flat" };
  if (prev === 0) return { label: "New", direction: "up" };

  const pct = Math.round(((last - prev) / prev) * 100);
  return {
    label: `${pct > 0 ? "+" : ""}${pct}%`,
    direction: pct > 0 ? "up" : "down",
  };
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
    messages: [],
    websites: [],
    portfolio: [],
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

        const [blogs, messages, logos, testimonials, websites] = await Promise.allSettled([
          axios.get(`${ADMIN_BLOG_URL}/admin/all`), // admin list includes drafts
          axios.get(ADMIN_CONTACT_MSG_URL),
          axios.get(LOGOS_URL),
          axios.get(TESTIMONIALS_URL),
          axios.get(WEBSITES_URL),
        ]);

        if (!mounted) return;

        const pick = (r) => (r.status === "fulfilled" ? withCreatedAt(getArrayData(r.value)) : []);

        setRaw({
          blogs: pick(blogs),
          portfolio: pick(logos),
          websites: pick(websites),
          messages: pick(messages),
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
    const messages = cumulativeSeries(raw.messages, buckets);
    const websites = cumulativeSeries(raw.websites, buckets);
    const portfolio = cumulativeSeries(raw.portfolio, buckets);

    return buckets.map((b, i) => ({
      month: b.label,
      blogs: blogs[i],
      website: websites[i],
      messages: messages[i],
      portfolio: portfolio[i],
    }));
  }, [raw, range]);

  // Sparklines + trends always use the 12-month view
  const stats = useMemo(() => {
    const buckets = getBuckets("12m");
    const build = (items) => {
      const series = cumulativeSeries(items, buckets);
      return { series, trend: getTrendLabel(series) };
    };

    // return {
    //   blogs: build(raw.blogs),
    //   portfolio: build(raw.portfolio),
    //   testimonials: build(raw.testimonials),
    //   messages: build(raw.messages),
    // };
    return { series, trend: getTrend(series) };
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 2.2,
            mb: 2.5,
            width: "100%",
            "@media (max-width: 1200px)": {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
            "@media (max-width: 600px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
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

          <DashboardStatCard
            id="portfolio"
            title="Total Logos"
            value={raw.portfolio.length}
            icon={<WorkOutlineRounded />}
            iconBackground={dash.navy}
            sparkColor={dash.navy}
            sparkData={stats.portfolio.series}
            trend={stats.portfolio.trend}
            onClick={() => navigate("/admin/portfolio")}
          />

          <DashboardStatCard
            id="testimonials"
            title="Total Testimonials"
            value={raw.testimonials.length}
            icon={<StarBorderRounded />}
            iconBackground={dash.lime}
            sparkColor={dash.lime}
            sparkData={stats.testimonials.series}
            trend={stats.testimonials.trend}
            onClick={() => navigate("/admin/testimonials")}
          />

          <DashboardStatCard
            id="messages"
            title="Total Messages"
            value={raw.messages.length}
            icon={<MailOutlineRounded />}
            iconBackground={dash.indigo}
            sparkColor={dash.indigo}
            sparkData={stats.messages.series}
            trend={stats.messages.trend}
            onClick={() => navigate("/admin/messages")}
          />
        </Box>

        {/* ---------- Main area ---------- */}
        <Box
          sx={{
            display: "grid",
            gap: 2.5,
            alignItems: "stretch",
            gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 2fr) minmax(0, 1fr)" },
          }}
        >
          {/* Left: overview + quick actions */}
          <Box sx={{ minWidth: 0 }}>
            <Stack spacing={2.5}>
              <DashboardOverview
                chartData={chartData}
                isMobile={isMobile}
                range={range}
                onRangeChange={setRange}
                rangeOptions={RANGE_OPTIONS}
              />

              <QuickActions
                onAddBlog={() => navigate("/admin/blogs")}
                onAddWebsite={() => navigate("/admin/addWebsite")}
                onAddTestimonial={() => navigate("/admin/testimonials")}
                onAddLogo={() => navigate("/admin/portfolio")}
                onAddService={() => navigate("/admin/services")}
              />
            </Stack>
          </Box>

          {/* Right: recent activity + growth card */}
          <Box sx={{ minWidth: 0 }}>
            <Stack spacing={2.5} sx={{ height: "100%" }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <RecentActivity
                  activities={activities}
                  onViewAll={() => navigate("/admin/messages")}
                />
              </Box>
              <GrowthCard />
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;