import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageIcon from "@mui/icons-material/Image";

import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import LogoFilters from "../components/Logo/LogoFilters";
import LogoStatCard from "../components/Logo/LogoStatCard";
import LogoTable from "../components/Logo/LogoTable";
import LogoFormModal from "../components/Logo/LogoFormModal";

import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/logos`;

const getImage = (logo) =>
  logo?.image ||
  logo?.imageUrl ||
  logo?.url ||
  logo?.logo ||
  "";

const getVisible = (logo) => logo?.visible !== false;

const emptyForm = {
  title: "",
  imageFile: null,
  currentImage: "",
};

export default function AdminLogos() {
  const [logos, setLogos] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("");

  const [selected, setSelected] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [editingLogo, setEditingLogo] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showMessage = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const fetchLogos = async () => {
    try {
      setLoading(true);

      const response = await axios.get(BASE_URL);

      const data = Array.isArray(response.data)
        ? response.data
        : response.data?.logos || [];

      setLogos(
        [...data].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        )
      );
    } catch (error) {
      console.error(error);
      showMessage("Failed to load logos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  const filteredLogos = useMemo(() => {
    let result = [...logos];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((logo) =>
        String(logo.title || "")
          .toLowerCase()
          .includes(query)
      );
    }

    if (status === "active") {
      result = result.filter(getVisible);
    }

    if (status === "hidden") {
      result = result.filter((logo) => !getVisible(logo));
    }

    if (dateRange) {
      const now = new Date();

      result = result.filter((logo) => {
        if (!logo.createdAt) return false;

        const date = new Date(logo.createdAt);

        if (dateRange === "today") {
          return date.toDateString() === now.toDateString();
        }

        if (dateRange === "7days") {
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7);
          return date >= sevenDaysAgo;
        }

        if (dateRange === "30days") {
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(now.getDate() - 30);
          return date >= thirtyDaysAgo;
        }

        return true;
      });
    }

    return result;
  }, [logos, search, status, dateRange]);

  const totalLogos = logos.length;

  const activeLogos = logos.filter(getVisible).length;

  const hiddenLogos = logos.filter(
    (logo) => !getVisible(logo)
  ).length;

  const recentLogos = logos.filter((logo) => {
    if (!logo.createdAt) return false;

    const created = new Date(logo.createdAt);
    const now = new Date();

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    return created >= thirtyDaysAgo;
  }).length;

  const openAddModal = () => {
    setEditingLogo(null);
    setForm(emptyForm);
    setOpenModal(true);
  };

  const openEditModal = (logo) => {
    setEditingLogo(logo);

    setForm({
      title: logo.title || "",
      imageFile: null,
      currentImage: getImage(logo),
    });

    setOpenModal(true);
  };

  const closeModal = () => {
    if (loading) return;

    setOpenModal(false);
    setEditingLogo(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      showMessage("Please enter a logo title", "error");
      return;
    }

    if (!editingLogo && !form.imageFile) {
      showMessage("Please select a logo image", "error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      if (editingLogo) {
        await axios.put(
          `${BASE_URL}/${editingLogo._id}`,
          formData
        );

        showMessage("Logo updated successfully");
      } else {
        await axios.post(BASE_URL, formData);

        showMessage("Logo added successfully");
      }

      closeModal();
      await fetchLogos();
    } catch (error) {
      console.error(error);
      showMessage(
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (logo) => {
    const confirmed = window.confirm(
      `Delete "${logo.title || "this logo"}"?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await axios.delete(`${BASE_URL}/${logo._id}`);

      setSelected((prev) =>
        prev.filter((id) => id !== logo._id)
      );

      showMessage("Logo deleted successfully");

      await fetchLogos();
    } catch (error) {
      console.error(error);
      showMessage("Failed to delete logo", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!selected.length) return;

    const confirmed = window.confirm(
      `Delete ${selected.length} selected logo(s)?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await Promise.all(
        selected.map((id) =>
          axios.delete(`${BASE_URL}/${id}`)
        )
      );

      setSelected([]);

      showMessage("Selected logos deleted successfully");

      await fetchLogos();
    } catch (error) {
      console.error(error);
      showMessage("Some logos could not be deleted", "error");
      await fetchLogos();
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (newLogos) => {
    setLogos(newLogos);

    try {
      await axios.put(`${BASE_URL}/reorder`, {
        ids: newLogos.map((logo) => logo._id),
      });
    } catch (error) {
      console.error(error);
      showMessage("Failed to save new order", "error");
      await fetchLogos();
    }
  };

  const allFilteredSelected =
    filteredLogos.length > 0 &&
    filteredLogos.every((logo) =>
      selected.includes(logo._id)
    );

  const handleSelectAll = () => {
    if (allFilteredSelected) {
      setSelected((prev) =>
        prev.filter(
          (id) =>
            !filteredLogos.some(
              (logo) => logo._id === id
            )
        )
      );
    } else {
      setSelected((prev) => [
        ...new Set([
          ...prev,
          ...filteredLogos.map((logo) => logo._id),
        ]),
      ]);
    }
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "dash.page" }}>
      <DashboardTopBar />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          mb={4}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "dash.green",
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              BRAND ASSETS
            </Typography>

            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ color: "dash.navy", mt: 0.5 }}
            >
              Logo Management
            </Typography>

            <Typography
              sx={{
                color: "dash.muted",
                mt: 0.7,
              }}
            >
              Manage, organize and reorder your website logos.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openAddModal}
            sx={{
              bgcolor: "dash.green",
              borderRadius: 2,
              px: 2.5,
              py: 1.25,
              fontWeight: 700,
              "&:hover": {
                bgcolor: "dash.greenDark",
              },
            }}
          >
            Add New Logo
          </Button>
        </Stack>

        {/* Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 3,
          }}
        >
          <LogoStatCard
            title="Total Logos"
            value={totalLogos}
            icon={<ImageIcon />}
            tint="green"
          />

          <LogoStatCard
            title="Active Logos"
            value={activeLogos}
            icon={<ImageIcon />}
            tint="blue"
          />

          <LogoStatCard
            title="Hidden Logos"
            value={hiddenLogos}
            icon={<ImageIcon />}
            tint="orange"
          />

          <LogoStatCard
            title="Added Recently"
            value={recentLogos}
            icon={<ImageIcon />}
            tint="purple"
          />
        </Box>

        {/* Filters */}
        <LogoFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onReset={() => {
            setSearch("");
            setStatus("all");
            setDateRange("");
          }}
        />

        {/* Bulk actions */}
        {selected.length > 0 && (
          <Paper
            sx={{
              mt: 2,
              p: 1.5,
              borderRadius: 2.5,
              border: "1px solid",
              borderColor: "dash.border",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack direction="row" alignItems="center">
              <Checkbox
                checked={allFilteredSelected}
                onChange={handleSelectAll}
              />

              <Typography fontWeight={700}>
                {selected.length} selected
              </Typography>
            </Stack>

            <Button
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleBulkDelete}
            >
              Delete Selected
            </Button>
          </Paper>
        )}

        {/* Table */}
        <Paper
          sx={{
            mt: 2,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "dash.border",
            overflow: "hidden",
          }}
        >
          <LogoTable
            logos={filteredLogos}
            selected={selected}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            allSelected={allFilteredSelected}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        </Paper>
      </Container>

      <LogoFormModal
        open={openModal}
        form={form}
        setForm={setForm}
        editingLogo={editingLogo}
        onClose={closeModal}
        onSave={handleSave}
        loading={loading}
      />

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />

      <LoadingBackdrop open={loading} />
    </Box>
  );
}