import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  InputBase,
  Link,
  MenuItem,
  Pagination,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutlineRounded,
  GroupOutlined,
  ManageSearchRounded,
  NavigateNextRounded,
  RefreshRounded,
  SearchRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import SubscriberStatCard from "../components/Subscriber/SubscriberStatCard";
import SubscribersTable from "../components/Subscriber/SubscribersTable";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Subscribers = () => {
  const navigate = useNavigate();

  const [subscribers, setSubscribers] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0); // matches for the current search
  const [grandTotal, setGrandTotal] = useState(null); // all subscribers (no search)
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Debounce the search box
  // ---------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ---------------------------------------
  // Fetch (ignores out-of-date responses)
  // ---------------------------------------

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${backendURL}/api/newsletter`, {
          params: { page, limit, search: debouncedSearch },
        });

        if (cancelled) return;

        setSubscribers(res.data.subscribers || []);
        setTotalPages(res.data.pages || 1);
        setTotal(res.data.total || 0);
        if (!debouncedSearch) setGrandTotal(res.data.total || 0);
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setSnackbar({ open: true, message: "Failed to load subscribers ❌", severity: "error" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [page, limit, debouncedSearch, refreshKey]);

  // ---------------------------------------
  // Actions
  // ---------------------------------------

  const handleDelete = async (sub) => {
    if (!window.confirm(`Delete ${sub.email}? This will unsubscribe them.`)) return;

    try {
      await axios.post(`${backendURL}/api/newsletter/unsubscribe`, { email: sub.email });
      notify("Subscriber deleted 🗑️");

      // If that was the last row on this page, step back one page
      if (subscribers.length === 1 && page > 1) setPage((p) => p - 1);
      else setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error(err);
      notify("Failed to delete subscriber ❌", "error");
    }
  };

  const handleCopy = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      notify("Email copied 📋");
    } catch {
      notify("Couldn't copy the email", "warning");
    }
  };

  // ---------------------------------------
  // Derived
  // ---------------------------------------

  const hasSearch = Boolean(debouncedSearch);
  const from = total === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);
  const activeOnPage = subscribers.filter((s) => s.active).length;

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search subscribers..." />

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
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Subscribers</Typography>
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
              Subscribers
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              People who signed up for your newsletter. Search, review and remove subscribers.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<RefreshRounded />}
            onClick={() => setRefreshKey((k) => k + 1)}
            disabled={loading}
            sx={{
              height: 44,
              px: 2.4,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: "10px",
              color: dash.navy,
              borderColor: dash.border,
              backgroundColor: "#FFFFFF",
              "&:hover": { borderColor: dash.green, backgroundColor: dash.greenLight },
            }}
          >
            Refresh
          </Button>
        </Box>

        {/* ---------- Stat cards ---------- */}
        <Grid container spacing={2.2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={4}>
            <SubscriberStatCard
              title="Total Subscribers"
              value={grandTotal === null ? "—" : grandTotal.toLocaleString()}
              caption="All newsletter sign-ups"
              icon={<GroupOutlined />}
              color={dash.green}
              tint="#EEF4DE"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <SubscriberStatCard
              title={hasSearch ? "Search Results" : "Showing"}
              value={total.toLocaleString()}
              caption={hasSearch ? `Matching “${debouncedSearch}”` : "No search filter applied"}
              icon={<ManageSearchRounded />}
              color="#7C6FD0"
              tint="#F0EEFB"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <SubscriberStatCard
              title="Active on this page"
              value={`${activeOnPage} / ${subscribers.length}`}
              caption={`Page ${page} of ${totalPages}`}
              icon={<CheckCircleOutlineRounded />}
              color="#E3A81C"
              tint="#FDF6DC"
            />
          </Grid>
        </Grid>

        {/* ---------- Search + table ---------- */}
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
                placeholder="Search by email..."
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
          </Box>

          <SubscribersTable
            subscribers={subscribers}
            loading={loading}
            hasSearch={hasSearch}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />

          {/* ---------- Pagination ---------- */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mt: 2.5,
            }}
          >
            <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>
              Showing {from} to {to} of {total} subscribers
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  fontWeight: 600,
                  color: dash.navy,
                  border: `1px solid ${dash.border}`,
                },
                "& .MuiPaginationItem-root.Mui-selected": {
                  color: "#FFFFFF",
                  backgroundColor: dash.green,
                  borderColor: dash.green,
                  "&:hover": { backgroundColor: dash.greenDark },
                },
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>Show</Typography>
              <TextField
                select
                size="small"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                sx={{
                  width: 78,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: 13,
                    "& fieldset": { borderColor: dash.border },
                  },
                }}
              >
                {[10, 20, 50].map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </TextField>
              <Typography sx={{ color: dash.muted, fontSize: 12.5 }}>per page</Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default Subscribers;