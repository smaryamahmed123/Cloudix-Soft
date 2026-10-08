import React, {
  useEffect,
  useState,
} from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import {
  Add,
  Close,
  DesignServicesOutlined,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";

import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  reorderServices,
  updateServiceVisibility,
} from "../api/services";

import ServiceForm from "../components/Service/ServiceForm";

import ServiceList from "../components/Service/ServiceList";


// ============================================================
// PAGE
// ============================================================

export default function AdminServicesManager() {
  const theme =
    useTheme();

  const colors =
    theme.dashboard || {
      navy: "#18344F",
      navyDark: "#102A40",
      teal: "#18B6A5",
      tealLight: "#E7F8F5",
      muted: "#718398",
      border: "#E4EBEF",
      pageBackground: "#F5F8FA",
    };


  // ==========================================================
  // STATE
  // ==========================================================

  const [
    services,
    setServices,
  ] = useState([]);

  const [
    formData,
    setFormData,
  ] = useState({
    iconImage: "",
    title: "",
    description: "",
  });

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    preview,
    setPreview,
  ] = useState(null);

  const [
    openModal,
    setOpenModal,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(true);


  // ==========================================================
  // LOAD SERVICES
  // ==========================================================

  useEffect(() => {
    loadServices();
  }, []);


  const loadServices =
    async () => {
      try {
        setLoading(true);

        const res =
          await fetchServices();

        setServices(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );

      } catch (error) {
        console.error(
          "Error loading services:",
          error
        );
      } finally {
        setLoading(false);
      }
    };


  // ==========================================================
  // RESET FORM
  // ==========================================================

  const resetForm = () => {
    setFormData({
      iconImage: "",
      title: "",
      description: "",
    });

    setEditingId(null);

    setPreview(null);
  };


  // ==========================================================
  // CLOSE MODAL
  // ==========================================================

  const handleCloseModal = () => {
    setOpenModal(false);

    resetForm();
  };


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      try {
        const data =
          new FormData();

        data.append(
          "title",
          formData.title
        );

        data.append(
          "description",
          formData.description
        );

        if (
          formData.iconImage &&
          formData.iconImage instanceof
          File
        ) {
          data.append(
            "iconImage",
            formData.iconImage
          );
        }


        if (editingId) {
          await updateService(
            editingId,
            data
          );
        } else {
          await createService(
            data
          );
        }


        resetForm();

        setOpenModal(false);

        await loadServices();

      } catch (error) {
        console.error(
          "Error saving service:",
          error
        );
      }
    };


  // ==========================================================
  // EDIT
  // ==========================================================

  const handleEdit =
    (service) => {
      setFormData({
        iconImage:
          service.iconImage ||
          "",

        title:
          service.title ||
          "",

        description:
          service.description ||
          "",
      });

      setPreview(
        service.iconImage ||
        null
      );

      setEditingId(
        service._id
      );

      setOpenModal(true);
    };


  // ==========================================================
  // DELETE
  // ==========================================================

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this service?"
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteService(id);

        await loadServices();

      } catch (error) {
        console.error(
          "Error deleting service:",
          error
        );
      }
    };


  // ==========================================================
  // VISIBILITY
  // ==========================================================

  const handleVisibilityToggle =
    async (service) => {
      try {
        await updateServiceVisibility(
          service._id,
          !service.visible
        );

        await loadServices();

      } catch (error) {
        console.error(
          "Error updating visibility:",
          error
        );
      }
    };


  // ==========================================================
  // DRAG END
  // ==========================================================

  const handleDragEnd =
    async (result) => {
      if (
        !result.destination
      ) {
        return;
      }

      const reordered =
        Array.from(services);

      const [
        moved,
      ] = reordered.splice(
        result.source.index,
        1
      );

      reordered.splice(
        result.destination.index,
        0,
        moved
      );


      // Optimistic UI update
      setServices(
        reordered
      );


      try {
        await reorderServices(
          reordered.map(
            (service) =>
              service._id
          )
        );
      } catch (error) {
        console.error(
          "Error reordering services:",
          error
        );

        // Restore server data
        await loadServices();
      }
    };


  // ==========================================================
  // COUNTS
  // ==========================================================

  const totalServices =
    services.length;

  const visibleServices =
    services.filter(
      (service) =>
        service.visible
    ).length;

  const hiddenServices =
    totalServices -
    visibleServices;


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",

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
          PAGE HEADER
      ==================================================== */}

      <Box
        sx={{
          display: "flex",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          justifyContent:
            "space-between",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 2,

          mb: 3,
        }}
      >

        <Box>
          <Typography
            sx={{
              color:
                colors.navy,

              fontSize: {
                xs: 24,
                md: 28,
              },

              fontWeight: 800,

              lineHeight: 1.2,
            }}
          >
            Services
          </Typography>

          <Typography
            sx={{
              color:
                colors.muted,

              fontSize: 13,

              mt: 0.6,
            }}
          >
            Manage the services displayed on your website.
          </Typography>
        </Box>


        <Button
          variant="contained"

          startIcon={
            <Add />
          }

          onClick={() => {
            resetForm();
            setOpenModal(true);
          }}

          sx={{
            minHeight: 44,

            px: 2.2,

            borderRadius: "10px",

            textTransform:
              "none",

            fontSize: 13,

            fontWeight: 700,

            backgroundColor:
              colors.teal,

            boxShadow:
              "0 6px 16px rgba(24,182,165,0.20)",

            "&:hover": {
              backgroundColor:
                colors.tealDark ||
                "#0E8F82",
            },
          }}
        >
          Add Service
        </Button>

      </Box>


      {/* ====================================================
          SUMMARY
      ==================================================== */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}

        spacing={1.5}

        sx={{
          mb: 3,
        }}
      >

        <SummaryBox
          icon={
            <DesignServicesOutlined />
          }

          label="Total Services"

          value={
            totalServices
          }

          color={
            colors.teal
          }

          background={
            colors.tealLight
          }
        />


        <SummaryBox
          label="Visible"

          value={
            visibleServices
          }

          color="#4B91D1"

          background="#EAF3FB"
        />


        <SummaryBox
          label="Hidden"

          value={
            hiddenServices
          }

          color="#8974D8"

          background="#F1EEFC"
        />

      </Stack>


      {/* ====================================================
          SERVICE LIST
      ==================================================== */}

      {loading ? (
        <Box
          sx={{
            minHeight: 300,

            display: "grid",

            placeItems:
              "center",
          }}
        >
          <Typography
            sx={{
              color:
                colors.muted,

              fontSize: 13,

              fontWeight: 600,
            }}
          >
            Loading services...
          </Typography>
        </Box>
      ) : (
        <ServiceList
          services={
            services
          }

          onDragEnd={
            handleDragEnd
          }

          onEdit={
            handleEdit
          }

          onDelete={
            handleDelete
          }

          onToggle={
            handleVisibilityToggle
          }
        />
      )}


      {/* ====================================================
          ADD / EDIT DIALOG
      ==================================================== */}

      <Dialog
        open={openModal}

        onClose={
          handleCloseModal
        }

        fullWidth

        maxWidth="sm"

        PaperProps={{
          sx: {
            borderRadius:
              "18px",

            backgroundColor:
              "#FFFFFF",

            boxShadow:
              "0 25px 70px rgba(24,52,79,0.18)",
          },
        }}
      >

        {/* Dialog Header */}
        <Box
          sx={{
            display: "flex",

            alignItems: "center",

            justifyContent:
              "space-between",

            px: 3,

            py: 2,

            borderBottom:
              `1px solid ${colors.border}`,
          }}
        >

          <Box>
            <Typography
              sx={{
                color:
                  colors.navy,

                fontSize: 17,

                fontWeight: 800,
              }}
            >
              {editingId
                ? "Edit Service"
                : "Add New Service"}
            </Typography>

            <Typography
              sx={{
                color:
                  colors.muted,

                fontSize: 11,

                mt: 0.3,
              }}
            >
              {editingId
                ? "Update your service information."
                : "Add a new service to your website."}
            </Typography>
          </Box>


          <IconButton
            onClick={
              handleCloseModal
            }

            sx={{
              color:
                colors.muted,

              backgroundColor:
                "#F5F8FA",

              "&:hover": {
                backgroundColor:
                  "#EAF0F3",
              },
            }}
          >
            <Close />
          </IconButton>

        </Box>


        <DialogContent
          sx={{
            p: 3,
          }}
        >
          <ServiceForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            handleSubmit={
              handleSubmit
            }

            preview={
              preview
            }

            setPreview={
              setPreview
            }

            editingId={
              editingId
            }
          />
        </DialogContent>

      </Dialog>

    </Box>
  );
}


// ============================================================
// SUMMARY BOX
// ============================================================

const SummaryBox = ({
  icon,
  label,
  value,
  color,
  background,
}) => {
  return (
    <Box
      sx={{
        minWidth: {
          xs: "100%",
          sm: 165,
        },

        flex: {
          sm: "0 0 auto",
        },

        display: "flex",

        alignItems: "center",

        gap: 1.3,

        px: 1.8,

        py: 1.4,

        backgroundColor:
          "#FFFFFF",

        border:
          "1px solid #E4EBEF",

        borderRadius:
          "13px",
      }}
    >

      {icon && (
        <Box
          sx={{
            width: 36,
            height: 36,

            borderRadius:
              "10px",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "center",

            backgroundColor:
              background,

            color: color,

            "& svg": {
              fontSize: 19,
            },
          }}
        >
          {icon}
        </Box>
      )}


      <Box>
        <Typography
          sx={{
            color:
              "#718398",

            fontSize: 10.5,

            fontWeight: 600,
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            color:
              "#18344F",

            fontSize: 18,

            fontWeight: 800,

            lineHeight: 1.2,

            mt: 0.2,
          }}
        >
          {value}
        </Typography>
      </Box>

    </Box>
  );
};