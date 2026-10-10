// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   Avatar,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import axios from "axios";
// import { Delete } from "@mui/icons-material";

// const backendURL = import.meta.env.VITE_BACKEND_URL;
// const ABOUT_BASE_URL = `${backendURL}/api/about`;

// const colors = {
//   primary: "#2C3E50",
//   secondary: "#18BC9C",
//   background: "#ECF0F1",
//   accent: "#E74C3C",
//   text: "#2C3E50",
// };

// const AdminAbout = () => {
//   const [about, setAbout] = useState({
//     intro: { title: "", description: "", image: "", highlight: "" },
//     vision: { title: "", description: "", image: "" },
//     mission: { title: "", description: "", image: "" },
//     compliance: { title: "", description: "", image: "" },
//     teamIntro: { title: "", description: "", image: "" },
//     team: [],
//   });

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await axios.get(ABOUT_BASE_URL);
//         if (res.data) setAbout(res.data);
//       } catch (err) {
//         console.error("Failed to load About data:", err);
//       }
//     };
//     fetchAbout();
//   }, []);

//   const handleNestedChange = (section, key, value) => {
//     setAbout((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], [key]: value },
//     }));
//   };

//   const handleTeamChange = (index, key, value) => {
//     const updatedMembers = [...about.team];
//     updatedMembers[index][key] = value;
//     setAbout({ ...about, team: updatedMembers });
//   };

//   const addTeamMember = () => {
//     setAbout((prev) => ({
//       ...prev,
//       team: [
//         ...prev.team,
//         { name: "", position: "", description: "", image: "", socials: {} },
//       ],
//     }));
//   };

//   const removeTeamMember = (index) => {
//     const updated = [...about.team];
//     updated.splice(index, 1);
//     setAbout((prev) => ({ ...prev, team: updated }));
//   };

//   const handleSocialChange = (index, platform, value) => {
//     setAbout((prev) => {
//       const updatedTeam = [...(prev.team || [])];
//       updatedTeam[index] = {
//         ...updatedTeam[index],
//         socials: {
//           ...(updatedTeam[index]?.socials || {}),
//           [platform]: value,
//         },
//       };
//       return { ...prev, team: updatedTeam };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       const aboutCopy = { ...about };

//       const appendImages = (sectionName, sectionObj) => {
//         if (sectionObj?.image instanceof File) {
//           formData.append(`${sectionName}.image`, sectionObj.image);
//           sectionObj.image = "";
//         }
//       };

//       ["intro", "vision", "mission", "compliance", "teamIntro"].forEach(
//         (sec) => appendImages(sec, aboutCopy[sec])
//       );

//       aboutCopy.team.forEach((member, index) => {
//         if (member.image instanceof File) {
//           formData.append(`team[${index}].image`, member.image);
//           member.image = "";
//         }
//       });

//       formData.append("data", JSON.stringify(aboutCopy));

//       if (about._id) {
//         await axios.put(`${ABOUT_BASE_URL}/${about._id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("✅ About Page Updated!");
//       } else {
//         await axios.post(ABOUT_BASE_URL, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         alert("✅ About Page Created!");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Error saving About page data");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: colors.background,
//         minHeight: "100vh",
//         width: "100%",
//         pb: 10,
//       }}
//     >
//       {/* 🏷 Header Section */}
//       <Box
//         sx={{
//           backgroundColor: colors.primary,
//           color: "#fff",
//           p: 3,
//           mb: 4,
//           textAlign: "center",
//         }}
//       >
//         <Typography variant="h4" fontWeight={700}>
//           🛠 Manage About Page
//         </Typography>
//         <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
//           Update introduction, vision, mission, compliance & team sections
//         </Typography>
//       </Box>

//       {/* Form Body */}
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ px: { xs: 2, md: 8 }, maxWidth: 1200, mx: "auto" }}
//       >
//         {/* 📌 Main Sections */}
//         {["intro", "vision", "mission", "compliance", "teamIntro"].map(
//           (section) => (

//             <Card
//               key={section}
//               sx={{
//                 p: { xs: 2, md: 3 },
//                 mb: 4,
//                 borderRadius: 3,
//                 backgroundColor: "#fff",
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   color: colors.primary,
//                   mb: 3,
//                   borderLeft: `5px solid ${colors.secondary}`,
//                   pl: 2,
//                   fontSize: { xs: "1rem", md: "1.25rem" },
//                 }}
//               >
//                 {section.toUpperCase()} SECTION
//               </Typography>

//               <Grid
//                 container
//                 spacing={3}
//                 alignItems="flex-start"
//                 direction={{ xs: "column-reverse", md: "row" }}
//               >
//                 {/* Left Side - Text Fields */}
//                 <Grid size={{xs: 12, md: 7}}>
//                   <TextField
//                     label="Title"
//                     fullWidth
//                     sx={{ mb: 3 }}
//                     value={about[section]?.title || ""}
//                     onChange={(e) =>
//                       handleNestedChange(section, "title", e.target.value)
//                     }
//                   />

//                   <TextField
//                     label="Description"
//                     fullWidth
//                     multiline
//                     minRows={8}
//                     sx={{ mb: 2 }}
//                     value={about[section]?.description || ""}
//                     onChange={(e) =>
//                       handleNestedChange(section, "description", e.target.value)
//                     }
//                   />

//                    <TextField
//                     label="Highlight"
//                     fullWidth
//                     multiline
//                     minRows={8}
//                     sx={{ mb: 2 }}
//                     value={about[section]?.highlight || ""}
//                     onChange={(e) =>
//                       handleNestedChange(section, "highlight", e.target.value)
//                     }
//                   />
//                 </Grid>

//                 {/* Right Side - Image Upload */}
//                 <Grid
//                   size={{xs: 12, md: 5}}
//                   sx={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     textAlign: "center",
//                   }}
//                 >
//                   <Button
//                     variant="contained"
//                     component="label"
//                     sx={{
//                       mb: 2,
//                       fontSize: { xs: "0.85rem", md: "1rem" },
//                       px: { xs: 2, md: 3 },
//                       backgroundColor: colors.secondary,
//                       "&:hover": { backgroundColor: "#149f84" },
//                     }}
//                   >
//                     Upload Image
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={(e) =>
//                         handleNestedChange(section, "image", e.target.files[0])
//                       }
//                     />
//                   </Button>

//                   {about[section]?.image && typeof about[section].image === "string" && (
//                     <img
//                       src={about[section]?.image}
//                       alt={section}
//                       style={{
//                         width: "100%",
//                         maxWidth: 300,
//                         borderRadius: 12,
//                         marginTop: 8,
//                         objectFit: "cover",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                       }}
//                     />
//                   )}
//                 </Grid>
//               </Grid>
//             </Card>


//           )
//         )}

//         {/* 👥 Team Section */}
//         <Card
//           sx={{
//             p: 3,
//             mb: 4,
//             borderRadius: 3,
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               color: colors.primary,
//               mb: 3,
//               borderLeft: `5px solid ${colors.secondary}`,
//               pl: 2,
//             }}
//           >
//             TEAM MEMBERS
//           </Typography>

//           <Grid container spacing={3}>
//             {(about.team || []).map((member, index) => (
//               <Grid size={{xs: 12, md: 5}} key={index}>
//                 <Card
//                   sx={{
//                     p: 2,
//                     border: `1px solid ${colors.secondary}`,
//                     borderRadius: 2,
//                     height: "100%",
//                   }}
//                 >
//                   <Grid container spacing={2}>
//                     <Grid size={{xs: 12}} textAlign="center">
//                       {/* <Avatar
//                         src={
//                           member.image && typeof member.image === "string"
//                             ? `http://localhost:8000${member.image}`
//                             : ""
//                         }
//                         sx={{
//                           width: 80,
//                           height: 80,
//                           mb: 1,
//                           mx: "auto",
//                           border: `3px solid ${colors.secondary}`,
//                         }}
//                       /> */}
//                       <Avatar
//                         src={member.image || ""}
//                         sx={{
//                           width: 80,
//                           height: 80,
//                           mb: 1,
//                           mx: "auto",
//                           border: `3px solid ${colors.secondary}`,
//                         }}
//                       />
//                       <Button
//                         variant="contained"
//                         component="label"
//                         sx={{
//                           backgroundColor: colors.secondary,
//                           "&:hover": { backgroundColor: "#149f84" },
//                         }}
//                       >
//                         Upload
//                         <input
//                           type="file"
//                           hidden
//                           accept="image/*"
//                           onChange={(e) =>
//                             handleTeamChange(index, "image", e.target.files[0])
//                           }
//                         />
//                       </Button>
//                     </Grid>

//                     <Grid size={{xs:12}}>
//                       <TextField
//                         label="Name"
//                         fullWidth
//                         sx={{ mb: 1 }}
//                         value={member.name || ""}
//                         onChange={(e) =>
//                           handleTeamChange(index, "name", e.target.value)
//                         }
//                       />
//                       <TextField
//                         label="Position"
//                         fullWidth
//                         sx={{ mb: 1 }}
//                         value={member.position || ""}
//                         onChange={(e) =>
//                           handleTeamChange(index, "position", e.target.value)
//                         }
//                       />
//                       <TextField
//                         label="Description"
//                         fullWidth
//                         multiline
//                         rows={2}
//                         sx={{ mb: 2 }}
//                         value={member.description || ""}
//                         onChange={(e) =>
//                           handleTeamChange(index, "description", e.target.value)
//                         }
//                       />

//                       {["instagram", "linkedin", "facebook"].map((platform) => (
//                         <TextField
//                           key={platform}
//                           fullWidth
//                           label={platform.toUpperCase()}
//                           sx={{ mb: 1 }}
//                           value={member?.socials?.[platform] || ""}
//                           onChange={(e) =>
//                             handleSocialChange(index, platform, e.target.value)
//                           }
//                         />
//                       ))}

//                       <IconButton
//                         onClick={() => removeTeamMember(index)}
//                         sx={{ color: colors.accent, mt: 1 }}
//                       >
//                         <Delete />
//                       </IconButton>
//                     </Grid>
//                   </Grid>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           <Box sx={{ display: "flex", justifyContent: "center", mt: 7 }}>
//             <Button
//               variant="outlined"
//               onClick={addTeamMember}
//               sx={{
//                 color: colors.secondary,
//                 borderColor: colors.secondary,
//                 "&:hover": {
//                   backgroundColor: colors.secondary,
//                   color: "#fff",
//                 },
//               }}
//             >
//               + Add Team Member
//             </Button>
//           </Box>
//         </Card>

//         {/* 💾 Fixed Bottom Save Button */}
//         <Box
//           sx={{
//             position: "fixed",
//             bottom: 20,
//             left: 0,
//             right: 0,
//             display: "flex",
//             justifyContent: "center",
//           }}
//         >
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               backgroundColor: colors.primary,
//               px: 5,
//               py: 1.5,
//               fontSize: "1rem",
//               "&:hover": { backgroundColor: "#1F2C38" },
//             }}
//           >
//             Save About Page
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AdminAbout;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Breadcrumbs, Button, Link, Tab, Tabs, Typography } from "@mui/material";
import { AddRounded, NavigateNextRounded, SaveOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import AboutSectionEditor from "../components/About/AboutSectionEditor";
import TeamMemberCard from "../components/About/TeamMemberCard";
import { dash, cardSx } from "../components/Dashboard/dashboardPalette";

const backendURL = import.meta.env.VITE_BACKEND_URL;
const ABOUT_BASE_URL = `${backendURL}/api/about`;

const SECTION_KEYS = ["intro", "vision", "mission", "compliance", "teamIntro"];

const TABS = [
  { key: "intro", label: "Introduction", hint: "The first section visitors see on your About page." },
  { key: "vision", label: "Vision", hint: "Where Cloudix Soft is heading." },
  { key: "mission", label: "Mission", hint: "What the company sets out to do every day." },
  { key: "compliance", label: "Compliance", hint: "Standards, policies and commitments." },
  { key: "teamIntro", label: "Team Intro", hint: "The heading and intro shown above your team." },
  { key: "team", label: "Team Members", hint: "" },
];

const emptyAbout = {
  intro: { title: "", description: "", image: "", highlight: "" },
  vision: { title: "", description: "", image: "" },
  mission: { title: "", description: "", image: "" },
  compliance: { title: "", description: "", image: "" },
  teamIntro: { title: "", description: "", image: "" },
  team: [],
};

const AdminAbout = () => {
  const navigate = useNavigate();

  const [about, setAbout] = useState(emptyAbout);
  const [tab, setTab] = useState("intro");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Load
  // ---------------------------------------

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ABOUT_BASE_URL);
      if (res.data) setAbout({ ...emptyAbout, ...res.data, team: res.data.team || [] });
      setDirty(false);
    } catch (err) {
      console.error("Failed to load About data:", err);
      notify("Failed to load About data ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  // ---------------------------------------
  // Edit handlers (all immutable)
  // ---------------------------------------

  const handleNestedChange = (section, key, value) => {
    setAbout((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
    setDirty(true);
  };

  const handleTeamChange = (index, key, value) => {
    setAbout((prev) => ({
      ...prev,
      team: prev.team.map((member, i) => (i === index ? { ...member, [key]: value } : member)),
    }));
    setDirty(true);
  };

  const handleSocialChange = (index, platform, value) => {
    setAbout((prev) => ({
      ...prev,
      team: prev.team.map((member, i) =>
        i === index ? { ...member, socials: { ...(member.socials || {}), [platform]: value } } : member
      ),
    }));
    setDirty(true);
  };

  const addTeamMember = () => {
    setAbout((prev) => ({
      ...prev,
      team: [...prev.team, { name: "", position: "", description: "", image: "", socials: {} }],
    }));
    setDirty(true);
  };

  const removeTeamMember = (index) => {
    const member = about.team[index];
    const label = member?.name ? `"${member.name}"` : `member ${index + 1}`;
    if (!window.confirm(`Remove ${label} from the team? You still need to press Save to apply it.`)) return;

    setAbout((prev) => ({ ...prev, team: prev.team.filter((_, i) => i !== index) }));
    setDirty(true);
  };

  // ---------------------------------------
  // Save (same payload format as before)
  // ---------------------------------------

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      // Copy everything we touch so React state isn't mutated
      const aboutCopy = { ...about };
      SECTION_KEYS.forEach((sec) => {
        aboutCopy[sec] = { ...(about[sec] || {}) };
      });
      aboutCopy.team = (about.team || []).map((member) => ({ ...member }));

      SECTION_KEYS.forEach((sec) => {
        if (aboutCopy[sec].image instanceof File) {
          formData.append(`${sec}.image`, aboutCopy[sec].image);
          aboutCopy[sec].image = "";
        }
      });

      aboutCopy.team.forEach((member, index) => {
        if (member.image instanceof File) {
          formData.append(`team[${index}].image`, member.image);
          member.image = "";
        }
      });

      formData.append("data", JSON.stringify(aboutCopy));

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      if (about._id) {
        await axios.put(`${ABOUT_BASE_URL}/${about._id}`, formData, config);
        notify("About page updated ✅");
      } else {
        await axios.post(ABOUT_BASE_URL, formData, config);
        notify("About page created ✅");
      }

      // Reload so we get the saved image URLs (and the _id after a first save)
      await fetchAbout();
    } catch (error) {
      console.error(error);
      notify("Error saving About page data ❌", "error");
    } finally {
      setSaving(false);
    }
  };

  const activeTab = TABS.find((t) => t.key === tab);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search..." />

      <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 2.5, md: 3.5 } }}>
        {/* ---------- Heading ---------- */}
        <Breadcrumbs
          separator={<NavigateNextRounded sx={{ fontSize: 16 }} />}
          sx={{ fontSize: 12.5, mb: 1, color: dash.muted }}
        >
          <Link
            component="button"
            type="button"
            underline="hover"
            onClick={() => navigate("/admin/dashboard")}
            sx={{ fontSize: 12.5, color: dash.muted }}
          >
            Dashboard
          </Link>
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>About</Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: dash.navy,
                fontSize: { xs: 28, md: 34 },
                fontWeight: 800,
                letterSpacing: "-0.8px",
                lineHeight: 1.15,
              }}
            >
              About Page
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Update your introduction, vision, mission, compliance and team sections.
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveOutlined />}
            disabled={saving || loading || !dirty}
            sx={{
              height: 44,
              px: 2.6,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14,
              borderRadius: "10px",
              boxShadow: "none",
              backgroundColor: dash.green,
              "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Box>

        {/* ---------- Tabs ---------- */}
        <Box sx={{ ...cardSx, mb: 3, px: 1 }}>
          <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": { backgroundColor: dash.green, height: 3, borderRadius: 3 },
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                fontSize: 13.5,
                minHeight: 52,
                color: dash.muted,
              },
              "& .MuiTab-root.Mui-selected": { color: dash.green, fontWeight: 700 },
            }}
          >
            {TABS.map((t) => (
              <Tab
                key={t.key}
                value={t.key}
                label={t.key === "team" ? `${t.label} (${about.team.length})` : t.label}
              />
            ))}
          </Tabs>
        </Box>

        {/* ---------- Content ---------- */}
        {loading ? (
          <Box sx={{ py: 10, textAlign: "center" }}>
            <Typography sx={{ color: dash.muted, fontSize: 13, fontWeight: 600 }}>Loading About data...</Typography>
          </Box>
        ) : tab === "team" ? (
          <Box sx={{ ...cardSx, p: { xs: 2, md: 3 } }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography sx={{ color: dash.navy, fontSize: 18, fontWeight: 800 }}>Team Members</Typography>
                <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.4 }}>
                  The people shown in the team section of your About page.
                </Typography>
              </Box>

              <Button
                type="button"
                variant="outlined"
                startIcon={<AddRounded />}
                onClick={addTeamMember}
                sx={{
                  height: 42,
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "10px",
                  color: dash.green,
                  borderColor: dash.green,
                  "&:hover": { backgroundColor: dash.greenLight, borderColor: dash.green },
                }}
              >
                Add Team Member
              </Button>
            </Box>

            {about.team.length === 0 ? (
              <Box sx={{ py: 7, textAlign: "center" }}>
                <Typography sx={{ color: dash.navy, fontWeight: 700, fontSize: 14 }}>No team members yet</Typography>
                <Typography sx={{ color: dash.muted, fontSize: 12.5, mt: 0.5 }}>
                  Add your first team member to get started.
                </Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 2.5,
                  gridTemplateColumns: { xs: "1fr", lg: "repeat(2, minmax(0, 1fr))" },
                }}
              >
                {about.team.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    member={member}
                    index={index}
                    onChange={handleTeamChange}
                    onSocialChange={handleSocialChange}
                    onRemove={removeTeamMember}
                  />
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <AboutSectionEditor
            key={tab}
            label={activeTab.label}
            hint={activeTab.hint}
            data={about[tab]}
            onChange={(key, value) => handleNestedChange(tab, key, value)}
          />
        )}

        {/* ---------- Unsaved changes bar ---------- */}
        {dirty && (
          <Box
            sx={{
              position: "sticky",
              bottom: 16,
              zIndex: 5,
              mt: 3,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1.5,
              px: 2.5,
              py: 1.4,
              borderRadius: "14px",
              backgroundColor: dash.navy,
              color: "#FFFFFF",
              boxShadow: "0 12px 30px rgba(16,38,64,0.25)",
            }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>You have unsaved changes</Typography>

            <Box sx={{ display: "flex", gap: 1.2 }}>
              <Button
                type="button"
                onClick={fetchAbout}
                disabled={saving}
                sx={{ textTransform: "none", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}
              >
                Discard
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: "10px",
                  boxShadow: "none",
                  backgroundColor: dash.green,
                  "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <SnackbarAlert
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </Box>
  );
};

export default AdminAbout;