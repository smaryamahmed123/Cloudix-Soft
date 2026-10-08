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

const backendURL =
  import.meta.env.VITE_BACKEND_URL;

const LOGOS_URL =
  `${backendURL}/api/logos`;

const SERVICES_URL =
  `${backendURL}/api/services`;

const ADMIN_BLOG_URL =
  `${backendURL}/api/blogs`;

const ADMIN_CONTACT_MSG_URL =
  `${backendURL}/api/contact`;

const ABOUT_BASE_URL =
  `${backendURL}/api/about`;


// ============================================================
// CONSTANTS
// ============================================================

const MONTHS = [
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


// ============================================================
// HELPERS
// ============================================================

const getArrayData = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};


// ------------------------------------------------------------
// Get date
// ------------------------------------------------------------

const getDate = (item) => {
  const rawDate =
    item?.createdAt ||
    item?.date ||
    item?.updatedAt;

  if (!rawDate) {
    return null;
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};


// ------------------------------------------------------------
// Monthly counts
// ------------------------------------------------------------

const getMonthlyCounts = (
  items = []
) => {
  const counts =
    new Array(12).fill(0);

  if (!Array.isArray(items)) {
    return counts;
  }

  items.forEach((item) => {
    const date = getDate(item);

    if (!date) {
      return;
    }

    const month =
      date.getMonth();

    counts[month] += 1;
  });

  return counts;
};


// ------------------------------------------------------------
// Format relative time
// ------------------------------------------------------------

const formatRelativeTime = (
  date
) => {
  if (!date) {
    return "Recently";
  }

  const now =
    new Date();

  const difference = Math.floor(
    (
      now.getTime() -
      date.getTime()
    ) / 1000
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
// INITIAL CHART DATA
// ============================================================

const createEmptyChartData = () => {
  return MONTHS.map(
    (month) => ({
      month,
      blogs: 0,
      portfolio: 0,
      messages: 0,
    })
  );
};


// ============================================================
// PAGE
// ============================================================

const Dashboard = () => {
  const navigate =
    useNavigate();

  const theme =
    useTheme();

  const isMobile =
    useMediaQuery(
      theme.breakpoints.down("sm")
    );

  const colors =
    theme.dashboard;


  // ==========================================================
  // STATE
  // ==========================================================

  const [loading, setLoading] =
    useState(true);

  const [counts, setCounts] =
    useState({
      services: 0,
      blogs: 0,
      portfolio: 0,
      messages: 0,
      visits: 0,
    });

  const [
    recentBlogs,
    setRecentBlogs,
  ] = useState([]);

  const [
    recentMessages,
    setRecentMessages,
  ] = useState([]);


  // IMPORTANT:
  // chartData MUST be an ARRAY
  //
  // Previously this was an object:
  //
  // {
  //   months: [],
  //   blogs: [],
  //   portfolio: [],
  //   messages: []
  // }
  //
  // DashboardOverview uses chartData.map(),
  // so the state must be an array.

  const [
    chartData,
    setChartData,
  ] = useState(
    createEmptyChartData()
  );


  // ==========================================================
  // FETCH DASHBOARD DATA
  // ==========================================================

  useEffect(() => {
    let mounted = true;

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
          ] =
            await Promise.allSettled([
              axios.get(
                SERVICES_URL
              ),

              axios.get(
                ADMIN_BLOG_URL
              ),

              axios.get(
                ADMIN_CONTACT_MSG_URL
              ),

              axios.get(
                LOGOS_URL
              ),

              axios.get(
                ABOUT_BASE_URL
              ),
            ]);


          // --------------------------------------------------
          // Stop if component was unmounted
          // --------------------------------------------------

          if (!mounted) {
            return;
          }


          // --------------------------------------------------
          // Extract API arrays safely
          // --------------------------------------------------

          const servicesData =
            services.status ===
              "fulfilled"
              ? getArrayData(
                services.value
              )
              : [];


          const blogsData =
            blogs.status ===
              "fulfilled"
              ? getArrayData(
                blogs.value
              )
              : [];


          const messagesData =
            messages.status ===
              "fulfilled"
              ? getArrayData(
                messages.value
              )
              : [];


          const logosData =
            logos.status ===
              "fulfilled"
              ? getArrayData(
                logos.value
              )
              : [];


          const aboutData =
            about.status ===
              "fulfilled"
              ? (
                about.value?.data ||
                {}
              )
              : {};


          // ==================================================
          // VISITS
          // ==================================================

          let visitsCount =
            Number(
              aboutData?.analytics?.visits
            ) || 0;


          // Fallback to blog views
          if (!visitsCount) {
            visitsCount =
              blogsData.reduce(
                (
                  total,
                  blog
                ) => {
                  return (
                    total +
                    (
                      Number(
                        blog?.views
                      ) || 0
                    )
                  );
                },
                0
              );
          }


          // ==================================================
          // COUNTS
          // ==================================================

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


          // ==================================================
          // MONTHLY CHART DATA
          // ==================================================

          const blogCounts =
            getMonthlyCounts(
              blogsData
            );

          const portfolioCounts =
            getMonthlyCounts(
              logosData
            );

          const messageCounts =
            getMonthlyCounts(
              messagesData
            );


          // IMPORTANT:
          // Convert everything into ONE ARRAY
          // of 12 objects.

          const newChartData =
            MONTHS.map(
              (
                month,
                index
              ) => ({
                month,

                blogs:
                  blogCounts[
                  index
                  ] || 0,

                portfolio:
                  portfolioCounts[
                  index
                  ] || 0,

                messages:
                  messageCounts[
                  index
                  ] || 0,
              })
            );


          setChartData(
            newChartData
          );


          // ==================================================
          // RECENT BLOGS
          // ==================================================

          const sortedBlogs =
            [...blogsData]
              .sort(
                (a, b) =>
                  (
                    getDate(b)
                      ?.getTime() ||
                    0
                  ) -
                  (
                    getDate(a)
                      ?.getTime() ||
                    0
                  )
              )
              .slice(0, 4);


          // ==================================================
          // RECENT MESSAGES
          // ==================================================

          const sortedMessages =
            [...messagesData]
              .sort(
                (a, b) =>
                  (
                    getDate(b)
                      ?.getTime() ||
                    0
                  ) -
                  (
                    getDate(a)
                      ?.getTime() ||
                    0
                  )
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
          if (mounted) {
            setLoading(false);
          }
        }
      };


    fetchDashboardData();


    return () => {
      mounted = false;
    };
  }, []);


  // ==========================================================
  // RECENT ACTIVITY
  // ==========================================================

  const activities =
    useMemo(() => {

      const blogs =
        Array.isArray(
          recentBlogs
        )
          ? recentBlogs.map(
            (blog) => ({
              date:
                getDate(
                  blog
                ),

              title:
                "New blog published",

              subtitle:
                blog?.title ||
                "Blog post published",

              icon: (
                <ArticleOutlined
                  sx={{
                    fontSize: 19,
                  }}
                />
              ),

              iconBackground:
                colors.purpleLight,
            })
          )
          : [];


      const messages =
        Array.isArray(
          recentMessages
        )
          ? recentMessages.map(
            (message) => ({
              date:
                getDate(
                  message
                ),

              title:
                "New contact message",

              subtitle:
                message?.name ||
                message?.email ||
                "Client inquiry received",

              icon: (
                <MailOutlineRounded
                  sx={{
                    fontSize: 19,
                  }}
                />
              ),

              iconBackground:
                colors.redLight,
            })
          )
          : [];


      return [
        ...blogs,
        ...messages,
      ]
        .sort(
          (a, b) =>
            (
              b.date
                ?.getTime() ||
              0
            ) -
            (
              a.date
                ?.getTime() ||
              0
            )
        )
        .slice(0, 5)
        .map(
          (item) => ({
            ...item,

            time:
              formatRelativeTime(
                item.date
              ),
          })
        );

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

          placeItems:
            "center",

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
              color:
                colors.muted,

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

      {/* ====================================================
          HEADER
      ==================================================== */}

      <DashboardHeader />


      {/* ====================================================
          STATISTICS
      ==================================================== */}

      <Grid
        container
        spacing={2.2}
        sx={{
          mb: 3,
        }}
      >

        {/* Total Visits */}
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

            iconColor={
              colors.blue
            }

            trend="Website traffic"

            onClick={() =>
              navigate(
                "/admin/visits"
              )
            }
          />
        </Grid>


        {/* Services */}
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

            iconColor={
              colors.teal
            }

            trend="Active services"

            onClick={() =>
              navigate(
                "/admin/services"
              )
            }
          />
        </Grid>


        {/* Blog Posts */}
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
              <ArticleOutlined />
            }

            iconBackground={
              colors.purpleLight
            }

            iconColor={
              colors.purple
            }

            trend="Published content"

            onClick={() =>
              navigate(
                "/admin/blogs"
              )
            }
          />
        </Grid>


        {/* Messages */}
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
        >
          <DashboardStatCard
            title="Contact Messages"
            value={
              counts.messages
            }

            icon={
              <MailOutlineRounded />
            }

            iconBackground={
              colors.redLight
            }

            iconColor={
              colors.red
            }

            trend="Client inquiries"

            onClick={() =>
              navigate(
                "/admin/messages"
              )
            }
          />
        </Grid>

      </Grid>


      {/* ====================================================
          WEBSITE OVERVIEW + RECENT ACTIVITY
      ==================================================== */}

      <Grid
        container
        spacing={2.5}
        alignItems="stretch"
        sx={{
          mb: 2.5,
        }}
      >

        {/* Website Overview */}
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            minWidth: 0,
            display: "flex",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
            }}
          >
            <DashboardOverview
              chartData={
                chartData
              }
              isMobile={
                isMobile
              }
            />
          </Box>
        </Grid>


        {/* Recent Activity */}
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            display: "flex",
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: "100%",
              minWidth: 0,
            }}
          >
            <RecentActivity
              activities={
                activities
              }

              onViewAll={() =>
                navigate(
                  "/admin/messages"
                )
              }
            />
          </Box>
        </Grid>

      </Grid>


      {/* ====================================================
          QUICK ACTIONS + GROWTH
      ==================================================== */}

      <Grid
        container
        spacing={2.5}
      >

        {/* Quick Actions */}
        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            minWidth: 0,
          }}
        >
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


        {/* Growth Card */}
        <Grid
          item
          xs={12}
          lg={4}
          sx={{
            minWidth: 0,
          }}
        >
          <GrowthCard />
        </Grid>

      </Grid>

    </Box>
  );
};


export default Dashboard;