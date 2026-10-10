import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import LoginBrandPanel, { BrandMark } from "../components/Auth/LoginBrandPanel";
import GoogleIcon from "../components/Auth/GoogleIcon";
import { dash } from "../components/Dashboard/dashboardPalette";

const ADMIN_LOGIN_URL = `${import.meta.env.VITE_ADMIN_LOGIN_URL}`;
const backendURL = import.meta.env.VITE_BACKEND_URL;

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    "& fieldset": { borderColor: dash.border },
    "&:hover fieldset, &.Mui-focused fieldset": { borderColor: dash.green },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: dash.green },
};

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------
  // Handle the redirect back from Google login
  // ---------------------------------------

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const errorParam = query.get("error");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard", { replace: true });
      return;
    }

    if (errorParam === "unauthorized") {
      setError("You are not authorized to log in with this account.");
      // drop ?error=… from the address bar
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [navigate]);

  // ---------------------------------------
  // Google
  // ---------------------------------------

  const handleLoginWithGoogle = () => {
    window.open(`${backendURL}/api/auth/google/login`, "_self");
  };

  const handleSignupWithGoogle = () => {
    window.open(`${backendURL}/api/auth/google/signup`, "_self");
  };

  // ---------------------------------------
  // Email + password
  // ---------------------------------------

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const res = await axios.post(ADMIN_LOGIN_URL, form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response ? "Invalid credentials" : "Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" },
        backgroundColor: dash.page,
      }}
    >
      <LoginBrandPanel />

      {/* ---------- Form side ---------- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2.5, sm: 4 },
          py: 5,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          {/* Brand (mobile only – desktop shows it in the left panel) */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.2, mb: 4 }}>
            <BrandMark size={40} />
            <Typography sx={{ color: dash.navy, fontSize: 20, fontWeight: 800 }}>
              Cloudix <Box component="span" sx={{ color: dash.green }}>Soft</Box>
            </Typography>
          </Box>

          <Typography
            sx={{ color: dash.navy, fontSize: 30, fontWeight: 800, letterSpacing: "-0.7px", lineHeight: 1.15 }}
          >
            Admin Login
          </Typography>
          <Typography sx={{ color: dash.muted, fontSize: 14, mt: 0.8, mb: 3.5 }}>
            Sign in to manage your website.
          </Typography>

          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ mb: 2.5, borderRadius: "10px", alignItems: "center" }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate={false}>
            <TextField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              fullWidth
              required
              value={form.email}
              onChange={handleChange("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ fontSize: 20, color: dash.muted }} />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2, ...fieldSx }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              fullWidth
              required
              value={form.password}
              onChange={handleChange("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined sx={{ fontSize: 20, color: dash.muted }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlined sx={{ fontSize: 20 }} />
                      ) : (
                        <VisibilityOutlined sx={{ fontSize: 20 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3, ...fieldSx }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitting}
              sx={{
                height: 48,
                textTransform: "none",
                fontSize: 15,
                fontWeight: 700,
                borderRadius: "10px",
                boxShadow: "none",
                backgroundColor: dash.green,
                "&:hover": { backgroundColor: dash.greenDark, boxShadow: "none" },
              }}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </Box>

          <Divider sx={{ my: 3, color: dash.muted, fontSize: 12.5 }}>or continue with</Divider>

          <Box sx={{ display: "grid", gap: 1.4 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleLoginWithGoogle}
              startIcon={<GoogleIcon />}
              sx={{
                height: 46,
                textTransform: "none",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: "10px",
                color: dash.navy,
                borderColor: dash.border,
                backgroundColor: "#FFFFFF",
                "&:hover": { borderColor: dash.green, backgroundColor: dash.greenLight },
              }}
            >
              Login with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={handleSignupWithGoogle}
              startIcon={<GoogleIcon />}
              sx={{
                height: 46,
                textTransform: "none",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: "10px",
                color: dash.navy,
                borderColor: dash.border,
                backgroundColor: "#FFFFFF",
                "&:hover": { borderColor: dash.green, backgroundColor: dash.greenLight },
              }}
            >
              Sign up with Google
            </Button>
          </Box>

          <Typography sx={{ color: dash.muted, fontSize: 12, textAlign: "center", mt: 3.5 }}>
            Only authorized administrators can access this panel.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;