import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Paper,
  IconButton,
  Stack,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";

import {
  DeleteOutlineRounded,
  AddRounded,
  SaveRounded,
  DragIndicatorRounded,
  SecurityRounded,
} from "@mui/icons-material";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const PrivacyPolicyAdmin = () => {
  const [sections, setSections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendURL}/api/privacy-policy`
      );

      setSections(data.sections || []);
    } catch (error) {
      console.error("Error fetching policy:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to load Privacy Policy."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (
    index,
    field,
    value
  ) => {
    setSections((previousSections) =>
      previousSections.map((section, i) =>
        i === index
          ? {
              ...section,
              [field]: value,
            }
          : section
      )
    );
  };

  const addSection = () => {
    setSections((previousSections) => [
      ...previousSections,
      {
        title: "",
        content: "",
      },
    ]);

    setSuccess("");
    setError("");
  };

  const deleteSection = (index) => {
    setSections((previousSections) =>
      previousSections.filter(
        (_, i) => i !== index
      )
    );

    setSuccess("");
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setSuccess("");
      setError("");

      const cleanedSections = sections.map(
        (section) => ({
          title: section.title?.trim() || "",
          content: section.content || "",
        })
      );

      await axios.post(
        `${backendURL}/api/privacy-policy/update`,
        {
          sections: cleanedSections,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      setSections(cleanedSections);

      setSuccess(
        "Privacy Policy updated successfully!"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("Update failed:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to update Privacy Policy."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #F7F9FB 0%, #FFFFFF 100%)",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="lg">
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.5,
              sm: 3,
              md: 4,
            },
            mb: 3,
            borderRadius: 3,
            border:
              "1px solid rgba(118,153,20,0.15)",
            background:
              "linear-gradient(135deg, #FFFFFF, #F7FBF0)",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            alignItems={{
              xs: "flex-start",
              sm: "center",
            }}
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, #769914, #BBBF19)",
                  color: "#fff",
                }}
              >
                <SecurityRounded />
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: "#111E2C",
                  }}
                >
                  Privacy Policy
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Manage the privacy policy displayed
                  on your website.
                </Typography>
              </Box>
            </Stack>

            <Chip
              label={`${sections.length} Sections`}
              sx={{
                fontWeight: 700,
                color: "#111E2C",
                backgroundColor:
                  "rgba(118,153,20,0.10)",
              }}
            />
          </Stack>
        </Paper>

        {/* =====================================================
            ALERTS
        ===================================================== */}

        {success && (
          <Alert
            severity="success"
            onClose={() => setSuccess("")}
            sx={{
              mb: 2,
              borderRadius: 2,
            }}
          >
            {success}
          </Alert>
        )}

        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{
              mb: 2,
              borderRadius: 2,
            }}
          >
            {error}
          </Alert>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading ? (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              border: "1px solid #E8EDF0",
            }}
          >
            <CircularProgress
              sx={{
                color: "#769914",
                mb: 2,
              }}
            />

            <Typography color="text.secondary">
              Loading Privacy Policy...
            </Typography>
          </Paper>
        ) : (
          <>
            {/* =================================================
                SECTIONS
            ================================================= */}

            <Stack spacing={3}>
              {sections.map((section, index) => (
                <Paper
                  key={section._id || index}
                  elevation={0}
                  sx={{
                    overflow: "hidden",
                    borderRadius: 3,
                    border:
                      "1px solid rgba(7,21,31,0.09)",
                    backgroundColor: "#fff",
                    transition:
                      "box-shadow 0.25s ease",

                    "&:hover": {
                      boxShadow:
                        "0 12px 35px rgba(7,21,31,0.07)",
                    },
                  }}
                >
                  {/* Card Header */}

                  <Box
                    sx={{
                      px: {
                        xs: 2,
                        sm: 3,
                      },
                      py: 1.8,
                      background:
                        "linear-gradient(90deg, #F7FBF0, #FFFFFF)",
                      borderBottom:
                        "1px solid #E8EDF0",
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <DragIndicatorRounded
                          sx={{
                            color: "#A9B838",
                          }}
                        />

                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                            background:
                              "linear-gradient(135deg, #769914, #BBBF19)",
                          }}
                        >
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </Box>

                        <Typography
                          sx={{
                            fontWeight: 800,
                            color: "#111E2C",
                          }}
                        >
                          Policy Section {index + 1}
                        </Typography>
                      </Stack>

                      <IconButton
                        color="error"
                        onClick={() =>
                          deleteSection(index)
                        }
                        aria-label="Delete section"
                      >
                        <DeleteOutlineRounded />
                      </IconButton>
                    </Stack>
                  </Box>

                  {/* Card Content */}

                  <Box
                    sx={{
                      p: {
                        xs: 2,
                        sm: 3,
                      },
                    }}
                  >
                    <TextField
                      label="Section Heading"
                      value={section.title || ""}
                      onChange={(e) =>
                        handleSectionChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      fullWidth
                      sx={{ mb: 2.5 }}
                      placeholder="e.g. What Information Do We Collect?"
                    />

                    <TextField
                      label="Section Content"
                      value={section.content || ""}
                      onChange={(e) =>
                        handleSectionChange(
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      fullWidth
                      multiline
                      minRows={6}
                      placeholder={
                        "Write your privacy policy content here...\n\nUse a new line for each paragraph or point."
                      }
                    />
                  </Box>
                </Paper>
              ))}

              {/* =================================================
                  EMPTY STATE
              ================================================= */}

              {sections.length === 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    textAlign: "center",
                    borderRadius: 3,
                    border:
                      "1px dashed rgba(118,153,20,0.35)",
                  }}
                >
                  <SecurityRounded
                    sx={{
                      fontSize: 45,
                      color: "#769914",
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                    }}
                  >
                    No sections yet
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Add your first Privacy Policy section
                    below.
                  </Typography>
                </Paper>
              )}
            </Stack>

            <Divider sx={{ my: 4 }} />

            {/* =================================================
                ACTIONS
            ================================================= */}

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              spacing={2}
              justifyContent="space-between"
            >
              <Button
                variant="outlined"
                startIcon={<AddRounded />}
                onClick={addSection}
                sx={{
                  minHeight: 48,
                  px: 3,
                  borderRadius: 2,
                  fontWeight: 700,
                  color: "#769914",
                  borderColor: "#769914",

                  "&:hover": {
                    borderColor: "#111E2C",
                    backgroundColor:
                      "rgba(118,153,20,0.05)",
                  },
                }}
              >
                Add Section
              </Button>

              <Button
                variant="contained"
                startIcon={
                  saving ? (
                    <CircularProgress
                      size={19}
                      color="inherit"
                    />
                  ) : (
                    <SaveRounded />
                  )
                }
                onClick={handleUpdate}
                disabled={saving}
                sx={{
                  minHeight: 48,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 800,
                  background:
                    "linear-gradient(135deg, #769914, #BBBF19)",
                  boxShadow:
                    "0 8px 20px rgba(118,153,20,0.20)",

                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #657F11, #A9AE18)",
                  },
                }}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PrivacyPolicyAdmin;