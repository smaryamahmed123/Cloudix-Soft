// src/Admin/AdminContactMessages.jsx
import React, { useEffect, useMemo, useState } from "react";
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
  CheckCircleOutline,
  MailOutlineRounded,
  NavigateNextRounded,
  PendingActionsOutlined,
  RefreshRounded,
  SearchRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import BlogStatCard from "../components/Blog/BlogStatCard"; // reused stat card
import ContactMessagesTable from "../components/Contact/ContactMessagesTable";
import MessageDetailDialog from "../components/Contact/MessageDetailDialog";
import ConfirmDeleteDialog from "../components/Contact/ConfirmDeleteDialog";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const ADMIN_CONTACT_MSG_URL = `${import.meta.env.VITE_ADMIN_CONTACT_MSG_URL}`;

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

const AdminContactMessages = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailId, setDetailId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Fetch
  // ---------------------------------------

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ADMIN_CONTACT_MSG_URL, { headers: authHeader() });
      const list = Array.isArray(res.data) ? res.data : [];

      // Newest first (messages without a date keep their original order)
      setMessages([...list].sort((a, b) => (timeOf(b) ?? 0) - (timeOf(a) ?? 0)));
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setMessages([]);
      notify("Failed to load messages ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ---------------------------------------
  // Derived data
  // ---------------------------------------

  const services = useMemo(
    () => [...new Set(messages.map((m) => m.service).filter(Boolean))].sort(),
    [messages]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return messages.filter((m) => {
      if (q) {
        const hay = [m.name, m.email, m.phoneNo, m.service, m.message].filter(Boolean).join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      const verified = m.status === "verified";
      if (status === "verified" && !verified) return false;
      if (status === "pending" && verified) return false;
      if (service === "__none") return !m.service;
      if (service !== "all" && m.service !== service) return false;
      return true;
    });
  }, [messages, search, status, service]);

  // back to page 1 whenever the result set changes shape
  useEffect(() => {
    setPage(1);
  }, [search, status, service, rowsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
  const from = filtered.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const to = Math.min(safePage * rowsPerPage, filtered.length);

  const stats = useMemo(() => {
    const verified = messages.filter((m) => m.status === "verified");
    const pending = messages.filter((m) => m.status !== "verified");

    const build = (items) => {
      const series = cumulativeSeries(items);
      return { value: items.length, series, trend: trendOf(series) };
    };

    return { total: build(messages), verified: build(verified), pending: build(pending) };
  }, [messages]);

  const detailMessage = messages.find((m) => m._id === detailId) || null;

  // ---------------------------------------
  // Verify (optimistic)
  // ---------------------------------------

  const handleVerify = async (msg) => {
    setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, status: "verified" } : m)));

    try {
      await axios.patch(
        `${ADMIN_CONTACT_MSG_URL}/${msg._id}/status`,
        { status: "verified" },
        { headers: authHeader() }
      );
      notify("Message marked as verified ✅");
    } catch (err) {
      console.error("❌ Status update error:", err);
      await fetchMessages();
      notify("Failed to update status ❌", "error");
    }
  };

  // ---------------------------------------
  // Delete (with confirmation dialog)
  // ---------------------------------------

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      await axios.delete(`${ADMIN_CONTACT_MSG_URL}/${deleteTarget._id}`, { headers: authHeader() });

      if (detailId === deleteTarget._id) setDetailId(null);
      setDeleteTarget(null);
      await fetchMessages();
      notify("Message deleted 🗑️");
    } catch (err) {
      console.error("❌ Delete error:", err);
      notify("Failed to delete message ❌", "error");
    } finally {
      setDeleting(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search messages..." />

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
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Contact Messages</Typography>
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
              Contact Messages
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Review enquiries from your contact form, reply to clients and mark messages as verified.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<RefreshRounded />}
            onClick={fetchMessages}
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
            <BlogStatCard
              id="msg-total"
              title="Total Messages"
              value={stats.total.value}
              icon={<MailOutlineRounded />}
              color={dash.green}
              tint="#EEF4DE"
              trend={stats.total.trend}
              sparkData={stats.total.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="msg-verified"
              title="Verified"
              value={stats.verified.value}
              icon={<CheckCircleOutline />}
              color="#7C6FD0"
              tint="#F0EEFB"
              trend={stats.verified.trend}
              sparkData={stats.verified.series}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <BlogStatCard
              id="msg-pending"
              title="Pending"
              value={stats.pending.value}
              icon={<PendingActionsOutlined />}
              color="#E3A81C"
              tint="#FDF6DC"
              trend={stats.pending.trend}
              sparkData={stats.pending.series}
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
                placeholder="Search by name, email, phone or message..."
                sx={{ fontSize: 13, color: dash.navy }}
              />
            </Box>

            <TextField
              select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                width: 150,
                "& .MuiOutlinedInput-root": {
                  height: 42,
                  borderRadius: "10px",
                  fontSize: 13,
                  color: dash.navy,
                  "& fieldset": { borderColor: dash.border },
                },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>

            <TextField
              select
              value={service}
              onChange={(e) => setService(e.target.value)}
              sx={{
                width: 190,
                "& .MuiOutlinedInput-root": {
                  height: 42,
                  borderRadius: "10px",
                  fontSize: 13,
                  color: dash.navy,
                  "& fieldset": { borderColor: dash.border },
                },
              }}
            >
              <MenuItem value="all">All Services</MenuItem>
              {services.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
              <MenuItem value="__none">Not selected</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              onClick={() => {
                setSearch("");
                setStatus("all");
                setService("all");
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
          </Box>

          {loading && messages.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ color: dash.muted, fontSize: 13, fontWeight: 600 }}>
                Loading messages...
              </Typography>
            </Box>
          ) : (
            <ContactMessagesTable
              messages={pageItems}
              hasAnyMessages={messages.length > 0}
              onView={(m) => setDetailId(m._id)}
              onVerify={handleVerify}
              onDelete={setDeleteTarget}
            />
          )}

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
              Showing {from} to {to} of {filtered.length} messages
            </Typography>

            <Pagination
              count={totalPages}
              page={safePage}
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
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                sx={{
                  width: 78,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: 13,
                    "& fieldset": { borderColor: dash.border },
                  },
                }}
              >
                {[5, 10, 20, 50].map((n) => (
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

      <MessageDetailDialog
        message={detailMessage}
        onClose={() => setDetailId(null)}
        onVerify={handleVerify}
        onDelete={setDeleteTarget}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        name={deleteTarget?.name}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default AdminContactMessages;