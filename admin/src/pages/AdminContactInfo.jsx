// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, TextField, Button, useMediaQuery, Paper, Typography } from '@mui/material';
// import { motion } from 'framer-motion';

// const ADMIN_CONTACT_INFO_URL = `${import.meta.env.VITE_ADMIN_CONTACT_INFO_URL}`;
// const MotionPaper = motion.create(Paper);
// const AdminContactInfoForm = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');

//   const [info, setInfo] = useState({
//     email: '',
//     phone: '',
//     address: '',
//     description: '',
//     workingHours: {
//       monday: '',
//       tuesday: '',
//       wednesday: '',
//       thursday: '',
//       friday: '',
//       saturday: '',
//       sunday: '',
//     },
//     socialLinks: {
//       facebook: '',
//       twitter: '',
//       linkedin: '',
//       instagram: '',
//     },
//   });

//   useEffect(() => {
//     axios.get(ADMIN_CONTACT_INFO_URL).then((res) =>
//       setInfo({
//         email: res.data?.email || '',
//         phone: res.data?.phone || '',
//         address: res.data?.address || '',
//         description: res.data?.description || '',
//         workingHours: res.data?.workingHours || {
//           monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: ''
//         },
//         socialLinks: {
//           facebook: res.data?.socialLinks?.facebook || '',
//           twitter: res.data?.socialLinks?.twitter || '',
//           linkedin: res.data?.socialLinks?.linkedin || '',
//           instagram: res.data?.socialLinks?.instagram || '',
//         },
//       })
//     );
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name in info.socialLinks) {
//       setInfo({
//         ...info,
//         socialLinks: { ...info.socialLinks, [name]: value },
//       });
//     } else {
//       setInfo({ ...info, [name]: value });
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(ADMIN_CONTACT_INFO_URL, info, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Contact Info Updated');
//     } catch (err) {
//       console.error(err);
//       alert('Unauthorized or error updating contact info');
//     }
//   };

//   return (
//     <MotionPaper
//       initial={{ opacity: 0, y: 40 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//       elevation={4}
//       sx={{
//         p: isMobile ? 3 : 5,
//         maxWidth: 600,
//         mx: 'auto',
//         mt: 4,
//       }}
//     >
//       <Typography
//         variant="h5"
//         sx={{
//           mb: 3,
//           textAlign: 'center',
//           color: 'primary.main',
//         }}
//       >
//         Update Contact Info
//       </Typography>

//       <Box component="form" noValidate autoComplete="off">
//         <TextField label="Email" name="email" fullWidth value={info.email} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Phone" name="phone" fullWidth value={info.phone} onChange={handleChange} sx={{ mb: 2 }} />
//         {/* <TextField label="Working Hours" name="Working Hours" fullWidth value={info.workingHours} onChange={handleChange} sx={{ mb: 2 }} /> */}
//         <Box sx={{ mb: 2 }}>
//   <Typography variant="subtitle1" sx={{ mb: 1 }}>
//     Working Hours
//   </Typography>
//   {Object.entries(info.workingHours).map(([day, value]) => (
//     <TextField
//       key={day}
//       label={day.charAt(0).toUpperCase() + day.slice(1)} // Monday, Tuesday, ...
//       name={day}
//       fullWidth
//       value={value}
//       onChange={(e) => {
//         const { name, value } = e.target;
//         setInfo({
//           ...info,
//           workingHours: {
//             ...info.workingHours,
//             [name]: value,
//           },
//         });
//       }}
//       sx={{ mb: 1 }}
//       placeholder="e.g., 09:00-17:00 or Closed"
//     />
//   ))}
// </Box>

//         <TextField label="Address" name="address" fullWidth value={info.address} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Description" name="description" fullWidth value={info.description} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Facebook" name="facebook" fullWidth value={info.socialLinks.facebook} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Twitter" name="twitter" fullWidth value={info.socialLinks.twitter} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="LinkedIn" name="linkedin" fullWidth value={info.socialLinks.linkedin} onChange={handleChange} sx={{ mb: 2 }} />
//         <TextField label="Instagram" name="instagram" fullWidth value={info.socialLinks.instagram} onChange={handleChange} sx={{ mb: 2 }} />

//         <Button
//           fullWidth
//           variant="contained"
//           onClick={handleSubmit}
//           sx={{
//             background: `linear-gradient(90deg, ${'#18BC9C'}, ${'#E74C3C'})`,
//             color: '#fff',
//             mt: 1,
//             '&:hover': {
//               background: `linear-gradient(90deg, ${'#E74C3C'}, ${'#18BC9C'})`,
//             },
//           }}
//         >
//           Update Info
//         </Button>
//       </Box>
//     </MotionPaper>
//   );
// };

// export default AdminContactInfoForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import { NavigateNextRounded, SaveOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SnackbarAlert from "../components/SnackbarAlert";
import DashboardTopBar from "../components/Dashboard/DashboardTopBar";
import ContactDetailsForm from "../components/ContactInfo/ContactDetailsForm";
import WorkingHoursEditor from "../components/ContactInfo/WorkingHoursEditor";
import SocialLinksForm from "../components/ContactInfo/SocialLinksForm";
import { dash } from "../components/Dashboard/dashboardPalette";

const ADMIN_CONTACT_INFO_URL = `${import.meta.env.VITE_ADMIN_CONTACT_INFO_URL}`;

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const WEEKDAYS = ["tuesday", "wednesday", "thursday", "friday"];
const SOCIALS = ["facebook", "twitter", "linkedin", "instagram"];

const emptyHours = () =>
  DAYS.reduce((acc, day) => ({ ...acc, [day]: { open: "", close: "" } }), {});

const emptyInfo = () => ({
  email: "",
  phone: "",
  address: "",
  description: "",
  workingHours: emptyHours(),
  socialLinks: { facebook: "", twitter: "", linkedin: "", instagram: "" },
});

// Merge whatever the API returned into a complete, safe object
const normalize = (data) => {
  const info = emptyInfo();

  info.email = data?.email || "";
  info.phone = data?.phone || "";
  info.address = data?.address || "";
  info.description = data?.description || "";

  DAYS.forEach((day) => {
    info.workingHours[day] = {
      open: data?.workingHours?.[day]?.open || "",
      close: data?.workingHours?.[day]?.close || "",
    };
  });

  SOCIALS.forEach((name) => {
    info.socialLinks[name] = data?.socialLinks?.[name] || "";
  });

  return info;
};

const AdminContactInfoForm = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState(emptyInfo());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const notify = (message, severity = "success") => setSnackbar({ open: true, message, severity });

  // ---------------------------------------
  // Load existing contact info
  // ---------------------------------------

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const res = await axios.get(ADMIN_CONTACT_INFO_URL);
      setInfo(normalize(res.data));
      setDirty(false);
    } catch (err) {
      console.error(err);
      notify("Failed to load contact info ❌", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // ---------------------------------------
  // Edit handlers
  // ---------------------------------------

  // General fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setDirty(true);
  };

  // Social links
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [name]: value } }));
    setDirty(true);
  };

  // Working hours
  const handleWorkingHoursChange = (day, field, value) => {
    setInfo((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: { ...prev.workingHours[day], [field]: value },
      },
    }));
    setDirty(true);
  };

  const copyMondayToWeekdays = () => {
    setInfo((prev) => {
      const monday = prev.workingHours.monday;
      const workingHours = { ...prev.workingHours };
      WEEKDAYS.forEach((day) => {
        workingHours[day] = { ...monday };
      });
      return { ...prev, workingHours };
    });
    setDirty(true);
  };

  const clearAllHours = () => {
    if (!window.confirm("Clear the opening hours for every day?")) return;
    setInfo((prev) => ({ ...prev, workingHours: emptyHours() }));
    setDirty(true);
  };

  // ---------------------------------------
  // Save
  // ---------------------------------------

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setSaving(true);

      const token = localStorage.getItem("token");
      await axios.put(ADMIN_CONTACT_INFO_URL, info, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setDirty(false);
      notify("Contact info updated successfully ✅");
    } catch (err) {
      console.error(err);
      const unauthorized = err.response?.status === 401 || err.response?.status === 403;
      notify(
        unauthorized
          ? "Unauthorized — please log in again ❌"
          : "Error updating contact info ❌",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: dash.page }}>
      <DashboardTopBar placeholder="Search..." />

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ p: { xs: 2, sm: 2.5, md: 3.5 } }}>
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
          <Typography sx={{ fontSize: 12.5, color: dash.muted }}>Edit Contact</Typography>
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
              Contact Info
            </Typography>
            <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8 }}>
              Keep your email, phone, address, opening hours and social links up to date.
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

        {/* ---------- Content ---------- */}
        {loading ? (
          <Box sx={{ py: 10, textAlign: "center" }}>
            <Typography sx={{ color: dash.muted, fontSize: 13, fontWeight: 600 }}>
              Loading contact info...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              alignItems: "start",
              gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.5fr) minmax(0, 1fr)" },
            }}
          >
            <Box sx={{ display: "grid", gap: 2.5, minWidth: 0 }}>
              <ContactDetailsForm info={info} onChange={handleChange} />
              <WorkingHoursEditor
                workingHours={info.workingHours}
                onChange={handleWorkingHoursChange}
                onCopyMonday={copyMondayToWeekdays}
                onClearAll={clearAllHours}
              />
            </Box>

            <Box sx={{ minWidth: 0 }}>
              <SocialLinksForm socialLinks={info.socialLinks} onChange={handleSocialChange} />
            </Box>
          </Box>
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
                onClick={fetchInfo}
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

export default AdminContactInfoForm;
