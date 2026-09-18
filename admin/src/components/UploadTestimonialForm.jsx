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

  return (
    <Box
      component="form"
      onSubmit={handleUpload}
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : 700,
        mx: "auto",
        backgroundColor: "#fff",
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
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

      {/* Type */}

      <TextField
        fullWidth
        select
        label="Testimonial Type"
        value={form.type}
        onChange={(e) =>
          updateForm("type", e.target.value)
        }
        sx={{ mb: 2 }}
      >
        <MenuItem value="text">
          Text + Client Image
        </MenuItem>

        <MenuItem value="video">
          Video Testimonial
        </MenuItem>
      </TextField>

      {/* Client name */}

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

      {/* Company */}

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

      {/* Position */}

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

      {/* Client image */}

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
            onChange={(e) =>
              updateForm(
                "clientImage",
                e.target.files[0]
              )
            }
          />
        </Button>

        {form.clientImage && (
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            {form.clientImage.name}
          </Typography>
        )}
      </Box>

      {/* Video */}

      {form.type === "video" && (
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
              accept="video/*"
              onChange={(e) =>
                updateForm(
                  "video",
                  e.target.files[0]
                )
              }
            />
          </Button>

          {form.video && (
            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
            >
              {form.video.name}
            </Typography>
          )}
        </Box>
      )}

      {/* Testimonial */}

      <TextField
        fullWidth
        required
        multiline
        rows={5}
        label="Client Feedback"
        placeholder="What did the client say about Cloudix Soft?"
        value={form.text}
        onChange={(e) =>
          updateForm("text", e.target.value)
        }
        sx={{ mb: 3 }}
      />

      {/* Rating */}

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

      {/* Published */}

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

      {/* Featured */}

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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          py: 1.5,
          backgroundColor: "#769914",
          "&:hover": {
            backgroundColor: "#657f11",
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