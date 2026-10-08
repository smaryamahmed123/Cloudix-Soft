import React from "react";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  CloudUploadOutlined,
  ImageOutlined,
} from "@mui/icons-material";

import { useTheme } from "@mui/material/styles";


export default function ServiceForm({
  formData,
  setFormData,
  handleSubmit,
  preview,
  setPreview,
  editingId,
}) {
  const theme = useTheme();

  const colors =
    theme.dashboard || {
      navy: "#18344F",
      teal: "#18B6A5",
      tealLight: "#E7F8F5",
      muted: "#718398",
      border: "#E4EBEF",
    };


  const handleImageChange = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setFormData({
      ...formData,
      iconImage: file,
    });

    setPreview(
      URL.createObjectURL(file)
    );
  };


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >

      {/* ==================================================
          IMAGE UPLOAD
      ================================================== */}

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 2,

          p: 1.5,

          mb: 2.5,

          border:
            `1px solid ${colors.border}`,

          borderRadius: "14px",

          backgroundColor:
            "#F8FAFB",
        }}
      >

        <Box
          sx={{
            width: 72,
            height: 72,

            flexShrink: 0,

            borderRadius: "14px",

            overflow: "hidden",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            backgroundColor:
              colors.tealLight,

            border:
              `1px solid ${colors.border}`,
          }}
        >
          {preview ? (
            <Box
              component="img"
              src={preview}
              alt="Service preview"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            <ImageOutlined
              sx={{
                fontSize: 28,
                color: colors.teal,
              }}
            />
          )}
        </Box>


        <Box
          sx={{
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              color: colors.navy,

              fontSize: 13,

              fontWeight: 700,

              mb: 0.3,
            }}
          >
            Service Icon
          </Typography>

          <Typography
            sx={{
              color: colors.muted,

              fontSize: 11,

              mb: 1,
            }}
          >
            Upload an image for this service
          </Typography>

          <Button
            component="label"

            variant="outlined"

            size="small"

            startIcon={
              <CloudUploadOutlined />
            }

            sx={{
              textTransform:
                "none",

              borderRadius: "8px",

              color:
                colors.teal,

              borderColor:
                colors.teal,

              fontSize: 11,

              fontWeight: 700,

              "&:hover": {
                backgroundColor:
                  colors.tealLight,

                borderColor:
                  colors.teal,
              },
            }}
          >
            Upload Image

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={
                handleImageChange
              }
            />
          </Button>
        </Box>

      </Box>


      {/* ==================================================
          TITLE
      ================================================== */}

      <TextField
        label="Service Title"
        placeholder="e.g. Web Development"

        fullWidth

        required

        value={
          formData.title
        }

        onChange={(event) =>
          setFormData({
            ...formData,
            title:
              event.target.value,
          })
        }

        sx={{
          mb: 2,

          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor:
              "#FFFFFF",
          },

          "& .MuiOutlinedInput-root:hover fieldset":
          {
            borderColor:
              colors.teal,
          },

          "& .MuiOutlinedInput-root.Mui-focused fieldset":
          {
            borderColor:
              colors.teal,
          },

          "& .MuiInputLabel-root.Mui-focused":
          {
            color:
              colors.teal,
          },
        }}
      />


      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <TextField
        label="Description"
        placeholder="Describe what this service offers..."

        fullWidth

        required

        multiline

        minRows={4}

        value={
          formData.description
        }

        onChange={(event) =>
          setFormData({
            ...formData,
            description:
              event.target.value,
          })
        }

        sx={{
          mb: 2.5,

          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            backgroundColor:
              "#FFFFFF",
          },

          "& .MuiOutlinedInput-root:hover fieldset":
          {
            borderColor:
              colors.teal,
          },

          "& .MuiOutlinedInput-root.Mui-focused fieldset":
          {
            borderColor:
              colors.teal,
          },

          "& .MuiInputLabel-root.Mui-focused":
          {
            color:
              colors.teal,
          },
        }}
      />


      {/* ==================================================
          SUBMIT
      ================================================== */}

      <Button
        type="submit"

        fullWidth

        variant="contained"

        sx={{
          minHeight: 46,

          borderRadius: "10px",

          backgroundColor:
            colors.teal,

          color: "#FFFFFF",

          fontSize: 13,

          fontWeight: 700,

          textTransform:
            "none",

          boxShadow:
            "0 6px 15px rgba(24,182,165,0.20)",

          "&:hover": {
            backgroundColor:
              colors.tealDark ||
              "#0E8F82",

            boxShadow:
              "0 8px 20px rgba(24,182,165,0.25)",
          },
        }}
      >
        {editingId
          ? "Update Service"
          : "Add Service"}
      </Button>

    </Box>
  );
}