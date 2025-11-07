// frontend/src/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import {
  Article as ArticleIcon,
  Message as MessageIcon,
  Work as WorkIcon,
  Widgets as WidgetsIcon,
} from "@mui/icons-material";
import { BarChart, LineChart } from "@mui/x-charts";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
// ===== Backend URLs =====
const SERVICES_URL = "http://localhost:8000/api/services";
const ADMIN_BLOG_URL = "http://localhost:8000/api/blogs";
const ADMIN_CONTACT_MSG_URL = "http://localhost:8000/api/contact";
const ABOUT_BASE_URL = "http://localhost:8000/api/about";
const LOGOS_URL = "http://localhost:8000/api/logos"; // portfolio

// ===== Reusable Stat Card =====
const StatCard = ({ title, value, icon, bg, color, to, navigate }) => (
  <Paper
    elevation={3}
    onClick={() => to && navigate(to)}
    sx={{
      p: 3,
      borderRadius: 2,
      minHeight: 110,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.2s ease",
      cursor: to ? "pointer" : "default",
      "&:hover": { transform: to ? "translateY(-4px)" : "none" },
    }}
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="subtitle2" sx={{ color: "#2C3E50", fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ color: "#2C3E50", fontWeight: 800 }}>
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          background: bg,
          color,
        }}
      >
        {icon}
      </Box>
    </Stack>
  </Paper>
);


const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    services: 0,
    blogs: 0,
    portfolio: 0,
    messages: 0,
    visits: 0,
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [chartData, setChartData] = useState({
    months: [],
    lineData: [],
    barData: [],
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [services, blogs, messages, logos, about] = await Promise.allSettled([
          axios.get(SERVICES_URL),
          axios.get(ADMIN_BLOG_URL),
          axios.get(ADMIN_CONTACT_MSG_URL),
          axios.get(LOGOS_URL),
          axios.get(ABOUT_BASE_URL),
        ]);

        const servicesCount = services.value?.data?.length || 0;
        const blogsData = blogs.value?.data || [];
        const msgsData = messages.value?.data || [];
        const logosCount = logos.value?.data?.length || 0;
        let visitsCount = about.value?.data?.analytics?.visits || 0;

        // fallback if analytics not available
        if (!visitsCount) {
          visitsCount = blogsData.reduce((acc, b) => acc + (b.views || 0), 0);
        }

        setCounts({
          services: servicesCount,
          blogs: blogsData.length,
          portfolio: logosCount,
          messages: msgsData.length,
          visits: visitsCount,
        });

        // ===== Prepare Monthly Data =====
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const getMonthlyCounts = (items = [], dateField = "createdAt") => {
          const counts = new Array(12).fill(0);
          items.forEach((it) => {
            const d = new Date(it[dateField] || it.date);
            if (!isNaN(d)) counts[d.getMonth()]++;
          });
          return counts;
        };

        setChartData({
          months,
          lineData: getMonthlyCounts(blogsData),
          barData: getMonthlyCounts(msgsData),
        });

        // ===== Recent Activity =====
        setRecentBlogs(
          blogsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        );
        setRecentMessages(
          msgsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
        );
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "grid", placeItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ background: "#ECF0F1", minHeight: "100vh", p: { xs: 2, md: 4 } }}>
      <Typography variant={isMobile ? "h5" : "h4"} sx={{ color: "#2C3E50", fontWeight: 800, mb: 3 }}>
        Admin Dashboard
      </Typography>

      {/* ===== Stats Section ===== */}
      {/* <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Visits" value={counts.visits} icon={<WidgetsIcon />} bg="#2C3E50" color="#fff" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Services" value={counts.services} icon={<WorkIcon />} bg="#18BC9C" color="#fff" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Blog Posts" value={counts.blogs} icon={<ArticleIcon />} bg="#E74C3C" color="#fff" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Messages" value={counts.messages} icon={<MessageIcon />} bg="#2C3E50" color="#fff" />
        </Grid>
      </Grid> */}
       <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Visits"
            value={counts.visits}
            icon={<WidgetsIcon />}
            bg="#2C3E50"
            color="#fff"
            to="/admin/visits"
            navigate={navigate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Services"
            value={counts.services}
            icon={<WorkIcon />}
            bg="#18BC9C"
            color="#fff"
            to="/admin/services"
            navigate={navigate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Blog Posts"
            value={counts.blogs}
            icon={<ArticleIcon />}
            bg="#E74C3C"
            color="#fff"
            to="/admin/blogs"
            navigate={navigate}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Messages"
            value={counts.messages}
            icon={<MessageIcon />}
            bg="#2C3E50"
            color="#fff"
            to="/admin/messages"
            navigate={navigate}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* ===== Charts ===== */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: "#2C3E50", fontWeight: 700, mb: 1 }}>
              Monthly Overview (Blogs)
            </Typography>
            <LineChart
              xAxis={[{ data: chartData.months, label: "Month" }]}
              series={[{ data: chartData.lineData, label: "Blogs", color: "#18BC9C" }]}
              height={300}
              grid={{ vertical: true, horizontal: true }}
              sx={{ width: "100%" }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: "#2C3E50", fontWeight: 700, mb: 1 }}>
              Messages per Month
            </Typography>
            <BarChart
              xAxis={[{ data: chartData.months, scaleType: "band" }]}
              series={[{ data: chartData.barData, label: "Messages", color: "#E74C3C" }]}
              height={300}
              grid={{ vertical: true, horizontal: true }}
              sx={{ width: "100%" }}
            />
          </Paper>
        </Grid>

        {/* ===== Recent Activity ===== */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ color: "#2C3E50", fontWeight: 700 }}>
              Recent Activity
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Latest Blogs
                </Typography>
                {recentBlogs.length ? (
                  recentBlogs.map((b, i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>{b.title || "Untitled"}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(b.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No blogs yet</Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Latest Messages
                </Typography>
                {recentMessages.length ? (
                  recentMessages.map((m, i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>{m.name || m.email}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {m.message?.slice(0, 80) || ""}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography>No messages yet</Typography>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
