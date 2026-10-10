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