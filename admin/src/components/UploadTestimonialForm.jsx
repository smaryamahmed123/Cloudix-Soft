import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Rating,
  Divider,
} from "@mui/material";

const MAX_VIDEO_SIZE =
  100 * 1024 * 1024;

const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

export default function UploadTestimonialForm({
  form,
  setForm,
  handleUpload,
  loading,
  isMobile,
}) {
  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isVideo = form.type === "video";

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      alert(
        "Video is too large. Maximum size is 100 MB."
      );

      e.target.value = "";
      return;
    }

    updateForm("video", file);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      alert(
        "Image is too large. Maximum size is 5 MB."
      );

      e.target.value = "";
      return;
    }

    updateForm("clientImage", file);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;

    if (type === "video") {
      setForm((prev) => ({
        ...prev,

        type: "video",

        clientImage: null,

        text: "",

        rating: 5,
      }));
    } else {
      setForm((prev) => ({
        ...prev,

        type: "text",

        video: null,

        videoUrl: "",

        videoPublicId: "",
      }));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleUpload}
      sx={{
        width: "100%",

        maxWidth: isMobile
          ? "100%"
          : 700,

        mx: "auto",

        backgroundColor: "#fff",

        p: {
          xs: 2,
          sm: 3,
        },

        borderRadius: 3,

        boxShadow: 3,

        maxHeight: isMobile
          ? "90vh"
          : "none",

        overflowY: isMobile
          ? "auto"
          : "visible",
      }}
    >
      {/* ================================================= */}
      {/* TITLE */}
      {/* ================================================= */}

      <Typography
        variant="h5"
        fontWeight={800}
        color="#111E2C"
        mb={1}
      >
        Add Testimonial
      </Typography>

      <Typography
        color="text.secondary"
        mb={3}
      >
        Add client feedback to your website.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* ================================================= */}
      {/* TYPE */}
      {/* ================================================= */}

      <TextField
        fullWidth
        select
        label="Testimonial Type"
        value={form.type}
        onChange={handleTypeChange}
        sx={{ mb: 2 }}
      >
        <MenuItem value="text">
          Text + Client Image
        </MenuItem>

        <MenuItem value="video">
          Video Testimonial
        </MenuItem>
      </TextField>

      {/* ================================================= */}
      {/* CLIENT NAME */}
      {/* ================================================= */}

      <TextField
        fullWidth
        required
        label="Client Name"
        value={form.clientName}
        onChange={(e) =>
          updateForm(
            "clientName",
            e.target.value
          )
        }
        sx={{ mb: 2 }}
      />

      {/* ================================================= */}
      {/* COMPANY */}
      {/* ================================================= */}

      <TextField
        fullWidth
        label="Company / Business"
        value={form.companyName}
        onChange={(e) =>
          updateForm(
            "companyName",
            e.target.value
          )
        }
        sx={{ mb: 2 }}
      />

      {/* ================================================= */}
      {/* POSITION */}
      {/* ================================================= */}

      <TextField
        fullWidth
        label="Position"
        placeholder="CEO / Founder / Customer"
        value={form.position}
        onChange={(e) =>
          updateForm(
            "position",
            e.target.value
          )
        }
        sx={{ mb: 2 }}
      />

      {/* ================================================= */}
      {/* TEXT TESTIMONIAL */}
      {/* ================================================= */}

      {!isVideo && (
        <>
          {/* CLIENT IMAGE */}

          <Box sx={{ mb: 3 }}>
            <Typography
              fontWeight={700}
              mb={1}
            >
              Client Image
            </Typography>

            <Button
              variant="outlined"
              component="label"
            >
              Choose Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />
            </Button>

            {form.clientImage && (
              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {form.clientImage.name}
              </Typography>
            )}
          </Box>

          {/* FEEDBACK */}

          <TextField
            fullWidth
            required
            multiline
            rows={5}
            label="Client Feedback"
            placeholder="What did the client say about Cloudix Soft?"
            value={form.text}
            onChange={(e) =>
              updateForm(
                "text",
                e.target.value
              )
            }
            sx={{ mb: 3 }}
          />

          {/* RATING */}

          <Box sx={{ mb: 3 }}>
            <Typography
              fontWeight={700}
              mb={1}
            >
              Rating
            </Typography>

            <Rating
              value={form.rating}
              onChange={(e, value) =>
                updateForm(
                  "rating",
                  value || 5
                )
              }
            />
          </Box>
        </>
      )}

      {/* ================================================= */}
      {/* VIDEO TESTIMONIAL */}
      {/* ================================================= */}

      {isVideo && (
        <Box sx={{ mb: 3 }}>
          <Typography
            fontWeight={700}
            mb={1}
          >
            Testimonial Video
          </Typography>

          <Button
            variant="outlined"
            component="label"
          >
            Choose Video

            <input
              hidden
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/*"
              onChange={
                handleVideoChange
              }
            />
          </Button>

          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            mt={1}
          >
            Maximum file size: 100 MB
          </Typography>

          {form.video && (
            <Box
              sx={{
                mt: 1,
                p: 1.5,
                borderRadius: 2,
                backgroundColor:
                  "#f5f7f0",
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  wordBreak:
                    "break-word",
                }}
              >
                {form.video.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {(
                  form.video.size /
                  (1024 * 1024)
                ).toFixed(2)}{" "}
                MB
              </Typography>
            </Box>
          )}
        </Box>
      )}

      {/* ================================================= */}
      {/* PUBLISHED */}
      {/* ================================================= */}

      <FormControlLabel
        control={
          <Switch
            checked={form.isPublished}
            onChange={(e) =>
              updateForm(
                "isPublished",
                e.target.checked
              )
            }
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked":
              {
                color: "#769914",
              },

              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
              {
                backgroundColor:
                  "#769914",
              },
            }}
          />
        }
        label={
          form.isPublished
            ? "Published / Visible"
            : "Draft / Hidden"
        }
      />

      {/* ================================================= */}
      {/* FEATURED */}
      {/* ================================================= */}

      <FormControlLabel
        control={
          <Switch
            checked={form.isFeatured}
            onChange={(e) =>
              updateForm(
                "isFeatured",
                e.target.checked
              )
            }
          />
        }
        label="Featured testimonial"
      />

      {/* ================================================= */}
      {/* SUBMIT */}
      {/* ================================================= */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          py: 1.5,

          backgroundColor:
            "#769914",

          "&:hover": {
            backgroundColor:
              "#657f11",
          },
        }}
      >
        {loading
          ? "Uploading..."
          : "Add Testimonial"}
      </Button>
    </Box>
  );
}