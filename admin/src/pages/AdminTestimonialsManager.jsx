import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Box,
  Grid,
  Typography,
  Modal,
  useMediaQuery,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import UploadTestimonialForm from "../components/UploadTestimonialForm";
import TestimonialCard from "../components/TestimonialCard";
import FloatingAddButton from "../components/FloatingAddButton";
import SnackbarAlert from "../components/SnackbarAlert";
import LoadingBackdrop from "../components/LoadingBackdrop";

const backendURL =
  import.meta.env.VITE_BACKEND_URL;

const BASE_URL =
  `${backendURL}/api/testimonials`;

const emptyForm = {
  type: "text",
  clientName: "",
  companyName: "",
  position: "",
  text: "",
  clientImage: null,
  video: null,
  rating: 5,
  isPublished: true,
  isFeatured: false,
};

export default function AdminTestimonialsManager() {
  const [testimonials, setTestimonials] =
    useState([]);

  const [form, setForm] =
    useState(emptyForm);

  const [openModal, setOpenModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [snackbar, setSnackbar] =
    useState({
      open: false,
      message: "",
      severity: "success",
    });

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  // ============================================
  // FETCH
  // ============================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const res =
        await axios.get(BASE_URL);

      const sorted = [...res.data].sort(
        (a, b) =>
          (a.order ?? 0) -
          (b.order ?? 0)
      );

      setTestimonials(sorted);
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message:
          "Failed to fetch testimonials ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // ============================================
  // ADD
  // ============================================

  const handleUpload = async (e) => {
    e.preventDefault();

    // Client name
    if (!form.clientName.trim()) {
      setSnackbar({
        open: true,
        message: "Please enter client name ⚠️",
        severity: "warning",
      });

      return;
    }

    // Text testimonial validation
    if (
      form.type === "text" &&
      !form.text.trim()
    ) {
      setSnackbar({
        open: true,
        message: "Please enter client feedback ⚠️",
        severity: "warning",
      });

      return;
    }

    // Video testimonial validation
    if (
      form.type === "video" &&
      !form.video
    ) {
      setSnackbar({
        open: true,
        message: "Please select a testimonial video ⚠️",
        severity: "warning",
      });

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("type", form.type);
      formData.append(
        "clientName",
        form.clientName
      );

      formData.append(
        "companyName",
        form.companyName
      );

      formData.append(
        "position",
        form.position
      );

      // Only send feedback/rating for text testimonials
      if (form.type === "text") {
        formData.append("text", form.text);
        formData.append("rating", form.rating);

        if (form.clientImage) {
          formData.append(
            "clientImage",
            form.clientImage
          );
        }
      }

      // Only send video for video testimonial
      if (
        form.type === "video" &&
        form.video
      ) {
        formData.append(
          "video",
          form.video
        );
      }

      formData.append(
        "isPublished",
        form.isPublished
      );

      formData.append(
        "isFeatured",
        form.isFeatured
      );

      await axios.post(BASE_URL, formData);

      setForm(emptyForm);
      setOpenModal(false);

      await fetchTestimonials();

      setSnackbar({
        open: true,
        message:
          "Testimonial added successfully ✅",
        severity: "success",
      });
    } catch (error) {
      console.error(
        "Upload testimonial error:",
        error
      );

      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to add testimonial ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = async (id) => {
    try {
      setLoading(true);

      await axios.delete(
        `${BASE_URL}/${id}`
      );

      await fetchTestimonials();

      setSnackbar({
        open: true,
        message:
          "Testimonial deleted 🗑️",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          "Failed to delete testimonial ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // REORDER
  // ============================================

  const handleDragEnd = async (
    result
  ) => {
    if (!result.destination) return;

    const reordered =
      Array.from(testimonials);

    const [moved] =
      reordered.splice(
        result.source.index,
        1
      );

    reordered.splice(
      result.destination.index,
      0,
      moved
    );

    setTestimonials(reordered);

    try {
      await axios.put(
        `${BASE_URL}/reorder`,
        {
          ids: reordered.map(
            (item) => item._id
          ),
        }
      );

      setSnackbar({
        open: true,
        message:
          "Testimonial order updated ✅",
        severity: "success",
      });
    } catch {
      await fetchTestimonials();

      setSnackbar({
        open: true,
        message:
          "Failed to save order ❌",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        minHeight: "100vh",
        backgroundColor:
          theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        mb={1}
        sx={{
          color:
            theme.palette.primary.main,
          fontWeight: 700,
        }}
      >
        Testimonials Manager
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Drag cards to reorder client feedback
      </Typography>

      {/* Desktop add form */}

      {!isMobile && (
        <Box sx={{ mb: 5 }}>
          <UploadTestimonialForm
            form={form}
            setForm={setForm}
            handleUpload={handleUpload}
            loading={loading}
            isMobile={false}
          />
        </Box>
      )}

      {/* Testimonials */}

      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <Droppable
          droppableId="testimonials"
        >
          {(provided) => (
            <Grid
              container
              spacing={3}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {testimonials.map(
                (testimonial, index) => (
                  <Draggable
                    key={testimonial._id}
                    draggableId={
                      testimonial._id
                    }
                    index={index}
                  >
                    {(provided) => (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        ref={
                          provided.innerRef
                        }
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          cursor: "grab",
                        }}
                      >
                        <TestimonialCard
                          testimonial={
                            testimonial
                          }
                          onDelete={
                            handleDelete
                          }
                        />
                      </Grid>
                    )}
                  </Draggable>
                )
              )}

              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>

      {/* Mobile */}

      {isMobile && (
        <>
          <FloatingAddButton
            onClick={() =>
              setOpenModal(true)
            }
            disabled={loading}
          />

          <Modal
            open={openModal}
            onClose={() =>
              !loading &&
              setOpenModal(false)
            }
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UploadTestimonialForm
              form={form}
              setForm={setForm}
              handleUpload={handleUpload}
              loading={loading}
              isMobile
            />
          </Modal>
        </>
      )}

      <SnackbarAlert
        open={snackbar.open}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
        severity={snackbar.severity}
        message={snackbar.message}
      />

      <LoadingBackdrop open={loading} />
    </Box>
  );
}