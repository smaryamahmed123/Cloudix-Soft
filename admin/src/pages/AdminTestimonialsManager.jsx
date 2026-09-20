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

const CLOUDINARY_SIGNATURE_URL =
  `${backendURL}/api/cloudinary/testimonial-video-signature`;

const emptyForm = {
  type: "text",

  clientName: "",

  companyName: "",

  position: "",

  text: "",

  clientImage: null,

  video: null,

  videoUrl: "",

  videoPublicId: "",

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

  // =====================================================
  // FETCH
  // =====================================================

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const res =
        await axios.get(BASE_URL);

      const sorted = [
        ...res.data,
      ].sort(
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

  // =====================================================
  // UPLOAD VIDEO DIRECTLY TO CLOUDINARY
  // =====================================================

  const uploadToCloudinary = async (
    file,
    resourceType
  ) => {
    try {
      const signatureResponse =
        await axios.get(
          `${backendURL}/api/cloudinary/testimonial-upload-signature`,
          {
            params: {
              resourceType,
            },
          }
        );

      const {
        timestamp,
        folder,
        signature,
        cloudName,
        apiKey,
      } = signatureResponse.data;

      const cloudinaryFormData =
        new FormData();

      cloudinaryFormData.append(
        "file",
        file
      );

      cloudinaryFormData.append(
        "api_key",
        apiKey
      );

      cloudinaryFormData.append(
        "timestamp",
        timestamp
      );

      cloudinaryFormData.append(
        "folder",
        folder
      );

      cloudinaryFormData.append(
        "signature",
        signature
      );

      const response =
        await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
          cloudinaryFormData
        );

      return {
        url:
          response.data.secure_url,

        publicId:
          response.data.public_id,
      };
    } catch (error) {
      console.error(
        "❌ Cloudinary upload error:",
        error
      );

      throw new Error(
        error.response?.data?.error?.message ||
        "Cloudinary upload failed"
      );
    }
  };

  // =====================================================
  // ADD TESTIMONIAL
  // =====================================================

  const handleUpload = async (e) => {
    e.preventDefault();

    // =================================================
    // VALIDATION
    // =================================================

    if (!form.clientName.trim()) {
      setSnackbar({
        open: true,
        message:
          "Please enter client name ⚠️",
        severity: "warning",
      });

      return;
    }

    if (
      form.type === "text" &&
      !form.text.trim()
    ) {
      setSnackbar({
        open: true,
        message:
          "Please enter client feedback ⚠️",
        severity: "warning",
      });

      return;
    }

    if (
      form.type === "video" &&
      !form.video
    ) {
      setSnackbar({
        open: true,
        message:
          "Please select a testimonial video ⚠️",
        severity: "warning",
      });

      return;
    }

    try {
      setLoading(true);

      let clientImage = "";
      let clientImagePublicId = "";

      let video = "";
      let videoPublicId = "";

      // =================================================
      // TEXT TESTIMONIAL → IMAGE TO CLOUDINARY
      // =================================================

      if (
        form.type === "text" &&
        form.clientImage
      ) {
        setSnackbar({
          open: true,
          message:
            "Uploading client image to Cloudinary...",
          severity: "info",
        });

        const imageResult =
          await uploadToCloudinary(
            form.clientImage,
            "image"
          );

        clientImage =
          imageResult.url;

        clientImagePublicId =
          imageResult.publicId;
      }

      // =================================================
      // VIDEO TESTIMONIAL → VIDEO TO CLOUDINARY
      // =================================================

      if (
        form.type === "video" &&
        form.video
      ) {
        setSnackbar({
          open: true,
          message:
            "Uploading testimonial video to Cloudinary...",
          severity: "info",
        });

        const videoResult =
          await uploadToCloudinary(
            form.video,
            "video"
          );

        video =
          videoResult.url;

        videoPublicId =
          videoResult.publicId;
      }

      // =================================================
      // SEND ONLY JSON TO BACKEND
      // =================================================

      const payload = {
        type:
          form.type,

        clientName:
          form.clientName,

        companyName:
          form.companyName,

        position:
          form.position,

        text:
          form.type === "text"
            ? form.text
            : "",

        clientImage,

        clientImagePublicId,

        video,

        videoPublicId,

        rating:
          form.type === "text"
            ? form.rating
            : 0,

        isPublished:
          form.isPublished,

        isFeatured:
          form.isFeatured,
      };

      await axios.post(
        BASE_URL,
        payload,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

      // =================================================
      // RESET
      // =================================================

      setForm({
        ...emptyForm,
      });

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
          error.message ||
          error.response?.data?.message ||
          "Failed to add testimonial ❌",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

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
      console.error(error);

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

  // =====================================================
  // REORDER
  // =====================================================

  const handleDragEnd = async (
    result
  ) => {
    if (!result.destination) {
      return;
    }

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
    } catch (error) {
      console.error(error);

      await fetchTestimonials();

      setSnackbar({
        open: true,

        message:
          "Failed to save order ❌",

        severity: "error",
      });
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,

        minHeight: "100vh",

        backgroundColor:
          theme.palette.background
            .default,
      }}
    >
      {/* ================================================= */}
      {/* TITLE */}
      {/* ================================================= */}

      <Typography
        variant="h4"
        textAlign="center"
        mb={1}
        sx={{
          color:
            theme.palette.primary
              .main,

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
        Drag cards to reorder client
        feedback
      </Typography>

      {/* ================================================= */}
      {/* DESKTOP ADD FORM */}
      {/* ================================================= */}

      {!isMobile && (
        <Box sx={{ mb: 5 }}>
          <UploadTestimonialForm
            form={form}
            setForm={setForm}
            handleUpload={
              handleUpload
            }
            loading={loading}
            isMobile={false}
          />
        </Box>
      )}

      {/* ================================================= */}
      {/* TESTIMONIALS */}
      {/* ================================================= */}

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
                (
                  testimonial,
                  index
                ) => (
                  <Draggable
                    key={
                      testimonial._id
                    }
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
                          cursor:
                            "grab",
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

      {/* ================================================= */}
      {/* MOBILE */}
      {/* ================================================= */}

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

              justifyContent:
                "center",
            }}
          >
            <UploadTestimonialForm
              form={form}
              setForm={setForm}
              handleUpload={
                handleUpload
              }
              loading={loading}
              isMobile
            />
          </Modal>
        </>
      )}

      {/* ================================================= */}
      {/* SNACKBAR */}
      {/* ================================================= */}

      <SnackbarAlert
        open={snackbar.open}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,

            open: false,
          }))
        }
        severity={
          snackbar.severity
        }
        message={snackbar.message}
      />

      {/* ================================================= */}
      {/* LOADING */}
      {/* ================================================= */}

      <LoadingBackdrop
        open={loading}
      />
    </Box>
  );
}