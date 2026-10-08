import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import {
  ArticleOutlined,
  MailOutlineRounded,
} from "@mui/icons-material";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardStatCard from "../components/Dashboard/DashboardStatCard";
import DashboardOverview from "../components/Dashboard/DashboardOverview";
import RecentActivity from "../components/Dashboard/RecentActivity";
import QuickActions from "../components/Dashboard/QuickActions";
import GrowthCard from "../components/Dashboard/GrowthCard";


// ============================================================
// API
// ============================================================

const backendURL = import.meta.env.VITE_BACKEND_URL;

const LOGOS_URL = `${backendURL}/api/logos`;
const SERVICES_URL = `${backendURL}/api/services`;
const ADMIN_BLOG_URL = `${backendURL}/api/blogs`;
const ADMIN_CONTACT_MSG_URL =
  `${backendURL}/api/contact`;
const ABOUT_BASE_URL =
  `${backendURL}/api/about`;


// ============================================================
// HELPERS
// ============================================================

const getDate = (item) => {
  const rawDate =
    item?.createdAt ||
    item?.date ||
    item?.updatedAt;

  if (!rawDate) return null;

  const date = new Date(rawDate);

  return isNaN(date.getTime())
    ? null
    : date;
};


const getMonthlyCounts = (items = []) => {
  const counts = new Array(12).fill(0);

  items.forEach((item) => {
    const date = getDate(item);

    if (!date) return;

    counts[date.getMonth()] += 1;
  });

  return counts;
};


const formatRelativeTime = (date) => {
  if (!date) return "Recently";

  const now = new Date();

  const difference = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  if (difference < 60) {
    return "Just now";
  }

  if (difference < 3600) {
    return `${Math.floor(
      difference / 60
    )} min ago`;
  }

  if (difference < 86400) {
    return `${Math.floor(
      difference / 3600
    )} hr ago`;
  }

  if (difference < 604800) {
    return `${Math.floor(
      difference / 86400
    )} day ago`;
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
};


// ============================================================
// PAGE
// ============================================================

const Dashboard = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const colors = theme.dashboard;

  const [loading, setLoading] =
    useState(true);

  const [counts, setCounts] = useState({
    services: 0,
    blogs: 0,
    portfolio: 0,
    messages: 0,
    visits: 0,
  });

  const [recentBlogs, setRecentBlogs] =
    useState([]);

  const [recentMessages, setRecentMessages] =
    useState([]);

  const [chartData, setChartData] =
    useState({
      months: [],
      blogs: [],
      portfolio: [],
      messages: [],
    });


  // ==========================================================
  // FETCH DASHBOARD DATA
  // ==========================================================

  useEffect(() => {
    const fetchDashboardData =
      async () => {
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
            axios.get(
              ADMIN_CONTACT_MSG_URL
            ),
            axios.get(LOGOS_URL),
            axios.get(ABOUT_BASE_URL),
          ]);

          const servicesData =
            services.status ===
              "fulfilled"
              ? services.value?.data || []
              : [];

          const blogsData =
            blogs.status === "fulfilled"
              ? blogs.value?.data || []
              : [];

          const messagesData =
            messages.status ===
              "fulfilled"
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


          // ------------------------------
          // VISITS
          // ------------------------------

          let visitsCount =
            aboutData?.analytics?.visits ||
            0;

          if (!visitsCount) {
            visitsCount =
              blogsData.reduce(
                (total, blog) =>
                  total +
                  Number(
                    blog?.views || 0
                  ),
                0
              );
          }


          // ------------------------------
          // COUNTS
          // ------------------------------

          setCounts({
            services:
              servicesData.length,

            blogs:
              blogsData.length,

            portfolio:
              logosData.length,

            messages:
              messagesData.length,

            visits:
              visitsCount,
          });


          // ------------------------------
          // CHART
          // ------------------------------

          setChartData({
            months: [
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
            ],

            blogs:
              getMonthlyCounts(
                blogsData
              ),

            portfolio:
              getMonthlyCounts(
                logosData
              ),

            messages:
              getMonthlyCounts(
                messagesData
              ),
          });


          // ------------------------------
          // RECENT BLOGS
          // ------------------------------

          const sortedBlogs =
            [...blogsData]
              .sort(
                (a, b) =>
                  (getDate(b)?.getTime() ||
                    0) -
                  (getDate(a)?.getTime() ||
                    0)
              )
              .slice(0, 4);


          // ------------------------------
          // RECENT MESSAGES
          // ------------------------------

          const sortedMessages =
            [...messagesData]
              .sort(
                (a, b) =>
                  (getDate(b)?.getTime() ||
                    0) -
                  (getDate(a)?.getTime() ||
                    0)
              )
              .slice(0, 4);


          setRecentBlogs(
            sortedBlogs
          );

          setRecentMessages(
            sortedMessages
          );
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


  // ==========================================================
  // RECENT ACTIVITY
  // ==========================================================

  const activities = useMemo(() => {
    const blogs =
      recentBlogs.map((blog) => ({
        date: getDate(blog),

        title:
          "New blog published",

        subtitle:
          blog?.title ||
          "Blog post published",

        icon: (
          <ArticleOutlined
            sx={{ fontSize: 19 }}
          />
        ),

        iconBackground:
          colors.purpleLight,
      }));

    const messages =
      recentMessages.map(
        (message) => ({
          date: getDate(message),

          title:
            "New contact message",

          subtitle:
            message?.name ||
            message?.email ||
            "Client inquiry received",

          icon: (
            <MailOutlineRounded
              sx={{ fontSize: 19 }}
            />
          ),

          iconBackground:
            colors.redLight,
        })
      );

    return [
      ...blogs,
      ...messages,
    ]
      .sort(
        (a, b) =>
          (b.date?.getTime() || 0) -
          (a.date?.getTime() || 0)
      )
      .slice(0, 5)
      .map((item) => ({
        ...item,
        time: formatRelativeTime(
          item.date
        ),
      }));
  }, [
    recentBlogs,
    recentMessages,
    colors.purpleLight,
    colors.redLight,
  ]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "grid",
          placeItems: "center",
          backgroundColor:
            colors.pageBackground,
        }}
      >
        <Stack
          alignItems="center"
          spacing={1.5}
        >
          <CircularProgress
            size={38}
            thickness={4}
          />

          <Typography
            sx={{
              color: colors.muted,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
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
    <Box
      sx={{
        minHeight: "100%",
        backgroundColor:
          colors.pageBackground,

        p: {
          xs: 2,
          sm: 2.5,
          md: 3.5,
          lg: 4,
        },
      }}
    >
      {/* Header */}
      <DashboardHeader />


      {/* Statistics */}
      <Grid
        container
        spacing={2.2}
        sx={{ mb: 3 }}
      >
        <Grid item xs={12} sm={6} lg={3}>
          <DashboardStatCard
            title="Total Visits"
            value={counts.visits}
            icon={
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                ↗
              </Typography>
            }
            iconBackground={
              colors.blueLight
            }
            iconColor={colors.blue}
            trend="Website traffic"
            onClick={() =>
              navigate(
                "/admin/visits"
              )
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <DashboardStatCard
            title="Services"
            value={counts.services}
            icon={
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                ◆
              </Typography>
            }
            iconBackground={
              colors.tealLight
            }
            iconColor={colors.teal}
            trend="Active services"
            onClick={() =>
              navigate(
                "/admin/services"
              )
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <DashboardStatCard
            title="Blog Posts"
            value={counts.blogs}
            icon={
              <ArticleOutlined />
            }
            iconBackground={
              colors.purpleLight
            }
            iconColor={colors.purple}
            trend="Published content"
            onClick={() =>
              navigate(
                "/admin/blogs"
              )
            }
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <DashboardStatCard
            title="Contact Messages"
            value={counts.messages}
            icon={
              <MailOutlineRounded />
            }
            iconBackground={
              colors.redLight
            }
            iconColor={colors.red}
            trend="Client inquiries"
            onClick={() =>
              navigate(
                "/admin/messages"
              )
            }
          />
        </Grid>
      </Grid>


      {/* Overview + Activity */}
      <Grid
        container
        spacing={2.5}
        alignItems="stretch"
        sx={{ mb: 2.5 }}
      >
        <Grid item xs={12} lg={8}>
          <DashboardOverview
            chartData={chartData}
            isMobile={isMobile}
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <RecentActivity
            activities={activities}
            onViewAll={() =>
              navigate(
                "/admin/messages"
              )
            }
          />
        </Grid>
      </Grid>


      {/* Quick Actions + Growth */}
      <Grid
        container
        spacing={2.5}
      >
        <Grid item xs={12} lg={8}>
          <QuickActions
            onAddBlog={() =>
              navigate(
                "/admin/create-blog"
              )
            }
            onAddWebsite={() =>
              navigate(
                "/admin/addWebsite"
              )
            }
            onMessages={() =>
              navigate(
                "/admin/messages"
              )
            }
            onServices={() =>
              navigate(
                "/admin/services"
              )
            }
            onSettings={() =>
              navigate(
                "/admin/settings"
              )
            }
          />
        </Grid>

        <Grid item xs={12} lg={4}>
          <GrowthCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;