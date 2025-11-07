import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import axios from "axios";
import { Delete } from "@mui/icons-material";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const ABOUT_BASE_URL = `${backendURL}/api/about`;

const colors = {
  primary: "#2C3E50",
  secondary: "#18BC9C",
  background: "#ECF0F1",
  accent: "#E74C3C",
  text: "#2C3E50",
};

const AdminAbout = () => {
  const [about, setAbout] = useState({
    intro: { title: "", description: "", image: "" },
    vision: { title: "", description: "", image: "" },
    mission: { title: "", description: "", image: "" },
    compliance: { title: "", description: "", image: "" },
    teamIntro: { title: "", description: "", image: "" },
    team: [],
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(ABOUT_BASE_URL);
        if (res.data) setAbout(res.data);
      } catch (err) {
        console.error("Failed to load About data:", err);
      }
    };
    fetchAbout();
  }, []);

  const handleNestedChange = (section, key, value) => {
    setAbout((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleTeamChange = (index, key, value) => {
    const updatedMembers = [...about.team];
    updatedMembers[index][key] = value;
    setAbout({ ...about, team: updatedMembers });
  };

  const addTeamMember = () => {
    setAbout((prev) => ({
      ...prev,
      team: [
        ...prev.team,
        { name: "", position: "", description: "", image: "", socials: {} },
      ],
    }));
  };

  const removeTeamMember = (index) => {
    const updated = [...about.team];
    updated.splice(index, 1);
    setAbout((prev) => ({ ...prev, team: updated }));
  };

  const handleSocialChange = (index, platform, value) => {
    setAbout((prev) => {
      const updatedTeam = [...(prev.team || [])];
      updatedTeam[index] = {
        ...updatedTeam[index],
        socials: {
          ...(updatedTeam[index]?.socials || {}),
          [platform]: value,
        },
      };
      return { ...prev, team: updatedTeam };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const aboutCopy = { ...about };

      const appendImages = (sectionName, sectionObj) => {
        if (sectionObj?.image instanceof File) {
          formData.append(`${sectionName}.image`, sectionObj.image);
          sectionObj.image = "";
        }
      };

      ["intro", "vision", "mission", "compliance", "teamIntro"].forEach(
        (sec) => appendImages(sec, aboutCopy[sec])
      );

      aboutCopy.team.forEach((member, index) => {
        if (member.image instanceof File) {
          formData.append(`team[${index}].image`, member.image);
          member.image = "";
        }
      });

      formData.append("data", JSON.stringify(aboutCopy));

      if (about._id) {
        await axios.put(`${ABOUT_BASE_URL}/${about._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ About Page Updated!");
      } else {
        await axios.post(ABOUT_BASE_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ About Page Created!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Error saving About page data");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: colors.background,
        minHeight: "100vh",
        width: "100%",
        pb: 10,
      }}
    >
      {/* 🏷 Header Section */}
      <Box
        sx={{
          backgroundColor: colors.primary,
          color: "#fff",
          p: 3,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          🛠 Manage About Page
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
          Update introduction, vision, mission, compliance & team sections
        </Typography>
      </Box>

      {/* Form Body */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ px: { xs: 2, md: 8 }, maxWidth: 1200, mx: "auto" }}
      >
        {/* 📌 Main Sections */}
        {["intro", "vision", "mission", "compliance", "teamIntro"].map(
          (section) => (

            <Card
              key={section}
              sx={{
                p: { xs: 2, md: 3 },
                mb: 4,
                borderRadius: 3,
                backgroundColor: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: colors.primary,
                  mb: 3,
                  borderLeft: `5px solid ${colors.secondary}`,
                  pl: 2,
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {section.toUpperCase()} SECTION
              </Typography>

              <Grid
                container
                spacing={3}
                alignItems="flex-start"
                direction={{ xs: "column-reverse", md: "row" }}
              >
                {/* Left Side - Text Fields */}
                <Grid size={{xs: 12, md: 7}}>
                  <TextField
                    label="Title"
                    fullWidth
                    sx={{ mb: 3 }}
                    value={about[section]?.title || ""}
                    onChange={(e) =>
                      handleNestedChange(section, "title", e.target.value)
                    }
                  />

                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    minRows={8}
                    sx={{ mb: 2 }}
                    value={about[section]?.description || ""}
                    onChange={(e) =>
                      handleNestedChange(section, "description", e.target.value)
                    }
                  />
                </Grid>

                {/* Right Side - Image Upload */}
                <Grid
                  size={{xs: 12, md: 5}}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      mb: 2,
                      fontSize: { xs: "0.85rem", md: "1rem" },
                      px: { xs: 2, md: 3 },
                      backgroundColor: colors.secondary,
                      "&:hover": { backgroundColor: "#149f84" },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        handleNestedChange(section, "image", e.target.files[0])
                      }
                    />
                  </Button>

                  {about[section]?.image && typeof about[section].image === "string" && (
                    <img
                      src={about[section]?.image}
                      alt={section}
                      style={{
                        width: "100%",
                        maxWidth: 300,
                        borderRadius: 12,
                        marginTop: 8,
                        objectFit: "cover",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Card>


          )
        )}

        {/* 👥 Team Section */}
        <Card
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: colors.primary,
              mb: 3,
              borderLeft: `5px solid ${colors.secondary}`,
              pl: 2,
            }}
          >
            TEAM MEMBERS
          </Typography>

          <Grid container spacing={3}>
            {(about.team || []).map((member, index) => (
              <Grid size={{xs: 12, md: 5}} key={index}>
                <Card
                  sx={{
                    p: 2,
                    border: `1px solid ${colors.secondary}`,
                    borderRadius: 2,
                    height: "100%",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid size={{xs: 12}} textAlign="center">
                      {/* <Avatar
                        src={
                          member.image && typeof member.image === "string"
                            ? `http://localhost:8000${member.image}`
                            : ""
                        }
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 1,
                          mx: "auto",
                          border: `3px solid ${colors.secondary}`,
                        }}
                      /> */}
                      <Avatar
                        src={member.image || ""}
                        sx={{
                          width: 80,
                          height: 80,
                          mb: 1,
                          mx: "auto",
                          border: `3px solid ${colors.secondary}`,
                        }}
                      />
                      <Button
                        variant="contained"
                        component="label"
                        sx={{
                          backgroundColor: colors.secondary,
                          "&:hover": { backgroundColor: "#149f84" },
                        }}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) =>
                            handleTeamChange(index, "image", e.target.files[0])
                          }
                        />
                      </Button>
                    </Grid>

                    <Grid size={{xs:12}}>
                      <TextField
                        label="Name"
                        fullWidth
                        sx={{ mb: 1 }}
                        value={member.name || ""}
                        onChange={(e) =>
                          handleTeamChange(index, "name", e.target.value)
                        }
                      />
                      <TextField
                        label="Position"
                        fullWidth
                        sx={{ mb: 1 }}
                        value={member.position || ""}
                        onChange={(e) =>
                          handleTeamChange(index, "position", e.target.value)
                        }
                      />
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                        value={member.description || ""}
                        onChange={(e) =>
                          handleTeamChange(index, "description", e.target.value)
                        }
                      />

                      {["instagram", "linkedin", "facebook"].map((platform) => (
                        <TextField
                          key={platform}
                          fullWidth
                          label={platform.toUpperCase()}
                          sx={{ mb: 1 }}
                          value={member?.socials?.[platform] || ""}
                          onChange={(e) =>
                            handleSocialChange(index, platform, e.target.value)
                          }
                        />
                      ))}

                      <IconButton
                        onClick={() => removeTeamMember(index)}
                        sx={{ color: colors.accent, mt: 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
            <Button
              variant="outlined"
              onClick={addTeamMember}
              sx={{
                color: colors.secondary,
                borderColor: colors.secondary,
                "&:hover": {
                  backgroundColor: colors.secondary,
                  color: "#fff",
                },
              }}
            >
              + Add Team Member
            </Button>
          </Box>
        </Card>

        {/* 💾 Fixed Bottom Save Button */}
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: colors.primary,
              px: 5,
              py: 1.5,
              fontSize: "1rem",
              "&:hover": { backgroundColor: "#1F2C38" },
            }}
          >
            Save About Page
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminAbout;
