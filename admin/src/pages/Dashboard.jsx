
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Grid,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  Article as ArticleIcon,
  Message as MessageIcon,
  Work as WorkIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Dashboard Components
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardStatCard from "../components/Dashboard/DashboardStatCard";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import RecentActivity from "../components/Dashboard/RecentActivity";

// ======================================================
// BACKEND URLS
// ======================================================

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LOGOS_URL = `${backendURL} /api/logos`;
const SERVICES_URL = `${backendURL} /api/services`;
const ADMIN_BLOG_URL = `${backendURL} /api/blogs`;
const ADMIN_CONTACT_MSG_URL = `${backendURL} /api/contact`;
const ABOUT_BASE_URL = `${backendURL} /api/about`;

// ======================================================
// DASHBOARD
// ======================================================

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

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

  // ======================================================
  // FETCH DASHBOARD DATA
  // ======================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          services,
          blogs,
          messages,
          logos,
          about,
        ] = await Promise.allSettled([
          axios.get(SERVICES_URL),
          axios.get(ADMIN_BLOG_URL),
          axios.get(ADMIN_CONTACT_MSG_URL),
          axios.get(LOGOS_URL),
          axios.get(ABOUT_BASE_URL),
        ]);

        // -----------------------------------------------
        // DATA
        // -----------------------------------------------

        const servicesData =
          services.status === "fulfilled"
            ? services.value?.data || []
            : [];

        const blogsData =
          blogs.status === "fulfilled"
            ? blogs.value?.data || []
            : [];

        const messagesData =
          messages.status === "fulfilled"
            ? messages.value?.data || []
            : [];

        const logosData =
          logos.status === "fulfilled"
            ? logos.value?.data || []
            : [];

        const aboutData =
          about.status === "fulfilled"
            ? about.value?.data || {}
            : {};

        // -----------------------------------------------
        // VISITS
        // -----------------------------------------------

        let visitsCount =
          aboutData?.analytics?.visits || 0;

        // Fallback
        if (!visitsCount) {
          visitsCount = blogsData.reduce(
            (total, blog) =>
              total + (blog.views || 0),
            0
          );
        }

        // -----------------------------------------------
        // COUNTS
        // -----------------------------------------------

        setCounts({
          services: servicesData.length,
          blogs: blogsData.length,
          portfolio: logosData.length,
          messages: messagesData.length,
          visits: visitsCount,
        });

        // ==================================================
        // MONTHLY CHART DATA
        // ==================================================

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const getMonthlyCounts = (
          items = [],
          dateField = "createdAt"
        ) => {
          const monthlyCounts =
            new Array(12).fill(0);

          items.forEach((item) => {
            const rawDate =
              item?.[dateField] ||
              item?.date;

            if (!rawDate) return;

            const date = new Date(rawDate);

            if (!isNaN(date.getTime())) {
              monthlyCounts[
                date.getMonth()
              ]++;
            }
          });

          return monthlyCounts;
        };

        setChartData({
          months,
          lineData:
            getMonthlyCounts(blogsData),
          barData:
            getMonthlyCounts(messagesData),
        });

        // ==================================================
        // RECENT BLOGS
        // ==================================================

        const sortedBlogs = [...blogsData]
          .sort(
            (a, b) =>
              new Date(
                b.createdAt || b.date
              ) -
              new Date(
                a.createdAt || a.date
              )
          )
          .slice(0, 5);

        // ==================================================
        // RECENT MESSAGES
        // ==================================================

        const sortedMessages = [...messagesData]
          .sort(
            (a, b) =>
              new Date(
                b.createdAt || b.date
              ) -
              new Date(
                a.createdAt || a.date
              )
          )
          .slice(0, 5);

        setRecentBlogs(sortedBlogs);
        setRecentMessages(sortedMessages);
      } catch (error) {
        console.error(
          "Dashboard error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#F5F7F9",
        }}
      >
        <Stack
          alignItems="center"
          spacing={2}
        >
          <CircularProgress
            size={38}
            thickness={4}
            sx={{
              color: "#18BC9C",
            }}
          />

          <Typography
            sx={{
              color: "#7A8793",
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Loading dashboard...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F5F7F9",
        p: {
          xs: 2,
          sm: 2.5,
          md: 3.5,
          lg: 4,
        },
      }}
    >
      {/* HEADER */}

      <DashboardHeader />

      {/* ==================================================
          STAT CARDS
      ================================================== */}

      <Grid
        container
        spacing={2.2}
        sx={{ mb: 3 }}
      >
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardStatCard
            title="Total Visits"
            value={counts.visits}
            icon={
              <VisibilityIcon />
            }
            iconBg="#EAF3FC"
            iconColor="#4A90E2"
            trendText="Website traffic"
            to="/admin/visits"
            navigate={navigate}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardStatCard
            title="Services"
            value={counts.services}
            icon={
              <WorkIcon />
            }
            iconBg="#E8F8F5"
            iconColor="#18BC9C"
            trendText="Active services"
            to="/admin/services"
            navigate={navigate}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardStatCard
            title="Blog Posts"
            value={counts.blogs}
            icon={
              <ArticleIcon />
            }
            iconBg="#F2ECFA"
            iconColor="#8E6BBE"
            trendText="Published content"
            to="/admin/blogs"
            navigate={navigate}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardStatCard
            title="Messages"
            value={counts.messages}
            icon={
              <MessageIcon />
            }
            iconBg="#FDECEA"
            iconColor="#E74C3C"
            trendText="Contact inquiries"
            to="/admin/messages"
            navigate={navigate}
          />
        </Grid>
      </Grid>

      {/* ==================================================
          CHARTS
      ================================================== */}

      <DashboardCharts
        chartData={chartData}
        isMobile={isMobile}
      />

      {/* ==================================================
          RECENT ACTIVITY
      ================================================== */}

      <RecentActivity
        recentBlogs={recentBlogs}
        recentMessages={recentMessages}
        navigate={navigate}
      />
    </Box>
  );
};

export default Dashboard;
