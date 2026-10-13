import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  AddRounded,
  DeleteOutlineRounded,
  SaveRounded,
  SecurityRounded,
} from "@mui/icons-material";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const cardSx = {
  borderRadius: 3,
  border: "1px solid rgba(7,21,31,0.09)",
  backgroundColor: "#FFFFFF",
};

const PrivacyPolicyAdmin = () => {
  const [intro, setIntro] = useState("");
  const [closing, setClosing] = useState({ title: "", text: "" });
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPolicy();
    // Fetch once when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPolicy = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(`${backendURL}/api/privacy-policy`);

      setIntro(data.intro || "");
      setClosing({
        title: data.closing?.title || "",
        text: data.closing?.text || "",
      });
      setSections(Array.isArray(data.sections) ? data.sections : []);
    } catch (err) {
      console.error("Error fetching policy:", err);
      setError(
        err?.response?.data?.message || "Failed to load Privacy Policy."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSectionChange = (index, field, value) => {
    setSections((current) =>
      current.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      )
    );
    setSuccess("");
  };

  const addSection = () => {
    setSections((current) => [...current, { title: "", content: "" }]);
    setSuccess("");
    setError("");
  };

  const deleteSection = (index) => {
    setSections((current) => current.filter((_, i) => i !== index));
    setSuccess("");
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      setSuccess("");
      setError("");

      const cleanedSections = sections
        .map((section) => ({
          title: section.title?.trim() || "",
          content: section.content?.trim() || "",
        }))
        .filter((section) => section.title || section.content);

      const incomplete = cleanedSections.find(
        (section) => !section.title || !section.content
      );

      if (incomplete) {
        setError("Complete both the heading and content for every section.");
        setSaving(false);
        return;
      }

      const { data } = await axios.post(
        `${backendURL}/api/privacy-policy/update`,
        {
          intro: intro.trim(),
          closing: {
            title: closing.title.trim(),
            text: closing.text.trim(),
          },
          sections: cleanedSections,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const savedPolicy = data.policy;
      setIntro(savedPolicy?.intro ?? intro.trim());
      setClosing({
        title: savedPolicy?.closing?.title ?? closing.title.trim(),
        text: savedPolicy?.closing?.text ?? closing.text.trim(),
      });
      setSections(savedPolicy?.sections ?? cleanedSections);
      setSuccess("Privacy Policy updated successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Update failed:", err);
      setError(
        err?.response?.data?.message || "Failed to update Privacy Policy."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 5 },
        background: "linear-gradient(180deg, #F7F9FB 0%, #FFFFFF 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            ...cardSx,
            p: { xs: 2.5, sm: 3, md: 4 },
            mb: 3,
            background: "linear-gradient(135deg, #FFFFFF, #F7FBF0)",
            borderColor: "rgba(118,153,20,0.15)",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  flexShrink: 0,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #769914, #BBBF19)",
                  color: "#FFFFFF",
                }}
              >
                <SecurityRounded />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#111E2C" }}>
                  Privacy Policy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage the introduction, policy sections, and closing banner.
                </Typography>
              </Box>
            </Stack>
            <Chip
              label={`${sections.length} Sections`}
              sx={{
                fontWeight: 700,
                color: "#111E2C",
                backgroundColor: "rgba(118,153,20,0.10)",
              }}
            />
          </Stack>
        </Paper>

        {success && (
          <Alert severity="success" onClose={() => setSuccess("")} sx={{ mb: 2, borderRadius: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Paper elevation={0} sx={{ ...cardSx, p: 6, textAlign: "center" }}>
            <CircularProgress sx={{ color: "#769914", mb: 2 }} />
            <Typography color="text.secondary">Loading Privacy Policy...</Typography>
          </Paper>
        ) : (
          <>
            <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, sm: 3 }, mb: 3 }}>
              <Typography sx={{ fontWeight: 800, color: "#111E2C", mb: 1.5 }}>
                Introduction
              </Typography>
              <TextField
                label="Introduction text"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                fullWidth
                multiline
                minRows={4}
                placeholder="Welcome to Cloudix Soft..."
                helperText="Separate paragraphs with a new line. Start a line with '- ' for a bullet. Basic **bold** and [link text](https://example.com) formatting is supported by the public renderer."
              />
            </Paper>

            <Stack spacing={3}>
              {sections.map((section, index) => (
                <Paper key={section._id || index} elevation={0} sx={{ ...cardSx, overflow: "hidden" }}>
                  <Box
                    sx={{
                      px: { xs: 2, sm: 3 },
                      py: 1.8,
                      background: "linear-gradient(90deg, #F7FBF0, #FFFFFF)",
                      borderBottom: "1px solid #E8EDF0",
                    }}
                  >
                    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            flexShrink: 0,
                            borderRadius: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FFFFFF",
                            fontWeight: 800,
                            fontSize: "0.8rem",
                            background: "linear-gradient(135deg, #769914, #BBBF19)",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </Box>
                        <Typography sx={{ fontWeight: 800, color: "#111E2C" }}>
                          Policy Section {index + 1}
                        </Typography>
                      </Stack>
                      <IconButton
                        color="error"
                        onClick={() => deleteSection(index)}
                        aria-label={`Delete section ${index + 1}`}
                      >
                        <DeleteOutlineRounded />
                      </IconButton>
                    </Stack>
                  </Box>

                  <Box sx={{ p: { xs: 2, sm: 3 } }}>
                    <TextField
                      label="Section Heading"
                      value={section.title || ""}
                      onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                      fullWidth
                      sx={{ mb: 2.5 }}
                      placeholder="e.g. What Information Do We Collect?"
                    />
                    <TextField
                      label="Section Content"
                      value={section.content || ""}
                      onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                      fullWidth
                      multiline
                      minRows={6}
                      placeholder={"Write your policy content here...\n\n- First point\n- Second point"}
                      helperText="Start each bullet with '- '. Separate paragraphs with a blank line."
                    />
                  </Box>
                </Paper>
              ))}

              {sections.length === 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    ...cardSx,
                    p: 5,
                    textAlign: "center",
                    borderStyle: "dashed",
                    borderColor: "rgba(118,153,20,0.35)",
                  }}
                >
                  <SecurityRounded sx={{ fontSize: 45, color: "#769914", mb: 1 }} />
                  <Typography sx={{ fontWeight: 700, mb: 0.5 }}>No sections yet</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add your first Privacy Policy section below.
                  </Typography>
                </Paper>
              )}
            </Stack>

            <Paper elevation={0} sx={{ ...cardSx, p: { xs: 2, sm: 3 }, mt: 3 }}>
              <Typography sx={{ fontWeight: 800, color: "#111E2C", mb: 1.5 }}>
                Closing Banner
              </Typography>
              <TextField
                label="Closing title"
                value={closing.title}
                onChange={(e) => setClosing((current) => ({ ...current, title: e.target.value }))}
                fullWidth
                sx={{ mb: 2 }}
                inputProps={{ maxLength: 200 }}
              />
              <TextField
                label="Closing text"
                value={closing.text}
                onChange={(e) => setClosing((current) => ({ ...current, text: e.target.value }))}
                fullWidth
                multiline
                minRows={3}
              />
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between">
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
                    backgroundColor: "rgba(118,153,20,0.05)",
                  },
                }}
              >
                Add Section
              </Button>
              <Button
                variant="contained"
                startIcon={saving ? <CircularProgress size={19} color="inherit" /> : <SaveRounded />}
                onClick={handleUpdate}
                disabled={saving}
                sx={{
                  minHeight: 48,
                  px: 4,
                  borderRadius: 2,
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #769914, #BBBF19)",
                  boxShadow: "0 8px 20px rgba(118,153,20,0.20)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #657F11, #A9AE18)",
                  },
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PrivacyPolicyAdmin;
